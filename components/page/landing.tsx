'use client';
import { getPhotoList } from '@/api/get';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Card from '../ui/card';
import Loading from '../ui/loading';
import Modal from '../ui/modal';
import Popup from '../ui/popup';
import Image from 'next/image';

export type IlistData = {
    author: string;
    download_url: string;
    height: number;
    id: string;
    url: string;
    width: number;
};

export default function Landing() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [lists, setList] = useState<IlistData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(9);
    const [isFetching, setIsFetching] = useState<boolean>(false);

    const [imageUrl, setImageUrl] = useState<string>('');
    const [height, setHeight] = useState<number | null>(null);
    const [width, setWidth] = useState<number | null>(null);
    const [author, setAuthor] = useState<string>('');
    const [download, setDownload] = useState<string>('');

    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

    const handleOnClickOpenModal = ({
        url,
        author,
        download_url,
        height,
        width,
    }: IlistData) => {
        setIsOpenModal(true);
        setImageUrl(url);
        setAuthor(author);
        setDownload(download_url);
        setHeight(height);
        setWidth(width);
    };

    const handleOnCloseModal = (value: boolean) => {
        setIsOpenModal(value);
    };

    useEffect(() => {
        try {
            const pageParams = searchParams.get('page');
            const limitParams = searchParams.get('limit');
            const getList = async () => {
                setLoading(true);
                const response = await getPhotoList(pageParams, limitParams);
                setList((prevImg) => [...prevImg, ...response]);
            };
            getList();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, [searchParams]);

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight - 100
            ) {
                setTimeout(() => {
                    setIsFetching(true);
                }, 500);
            }
        };
        if (isFetching && !loading) {
            setTimeout(() => {
                setPage(page + 1);
                setIsFetching(false);
            }, 500);
        }
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isFetching]);

    useEffect(() => {
        router.push(`/?page=${page}&limit=${limit}`, { scroll: false });
    }, [limit, page]);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {lists.map((item) => (
                    <div
                        key={item.id}
                        className="flex justify-center items-center"
                        onClick={() =>
                            handleOnClickOpenModal({
                                id: item.id,
                                url: item.url,
                                author: item.author,
                                download_url: item.download_url,
                                height: item.height,
                                width: item.width,
                            })
                        }
                    >
                        <Card
                            id={item.id}
                            image={item.download_url}
                            author={item.author}
                            height={item.height}
                            width={item.width}
                        />
                    </div>
                ))}
                <div className="grid col-span-1 md:col-span-2 lg:col-span-3 px-10 py-20">
                    <Loading />
                </div>
            </div>
            <Popup
                close={() => handleOnCloseModal(false)}
                open={isOpenModal}
            >
                <Modal
                        image={imageUrl}
                        author={author}
                        height={height}
                        width={width}
                        download={download}
                        onClick={(value) => handleOnCloseModal(value)}
                    />
            </Popup>
        </>
    );
}
