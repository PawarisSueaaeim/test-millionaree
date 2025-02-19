'use client';
import { getPhotoList } from '@/api/get';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Card from '../ui/card';
import { Button } from '../ui/button';
import Loading from '../ui/loading';

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

    useEffect(() => {
        try {
            const pageParams = searchParams.get('page');
            const limitParams = searchParams.get('limit');
            const getList = async () => {
                setLoading(true);
                const response = await getPhotoList(pageParams, limitParams);
                setList(response);
                console.log(pageParams, limitParams);
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
        if (isFetching) {
            setTimeout(() => {
                setLimit(limit + 9);
                setIsFetching(false);
            }, 500);
        }
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isFetching]);

    useEffect(() => {
        router.push(`/?page=${page}&limit=${limit}`, { scroll: false });
    }, [limit]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lists.map((item) => (
                <div key={item.id} className="flex justify-center items-center">
                    <Card
                        id={item.id}
                        image={
                            'https://images.unsplash.com/photo-1421104138464-46c0563487a4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D'
                        }
                        author={item.author}
                        height={item.height}
                        width={item.width}
                    />
                </div>
            ))}
            {loading && (
                <div className="grid col-span-1 md:col-span-2 lg:col-span-3 px-10 py-20">
                    <Loading />
                </div>
            )}
        </div>
    );
}
