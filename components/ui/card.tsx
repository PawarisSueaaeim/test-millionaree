'use client';
import Image from 'next/image';
import React, { useState } from 'react';

type Props = {
    id?: string;
    image: string;
    author: string;
    height: number;
    width: number;
};

export default function Card({ id, image, author, height, width }: Props) {
    const [isHovered, setIsHovered] = useState<boolean>(false);

    return (
        <div
            id={id}
            className="relative max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Image
                className="rounded-lg object-cover"
                src={image}
                alt={image}
                height={height}
                width={width}
            />
            <div
                className={`${
                    isHovered ? 'bottom-0' : 'bottom-[-100%]'
                } absolute p-5 rounded-b-lg w-full duration-500 bg-gradient-to-t from-black`}
            >
                <p className="text-white">{author}</p>
            </div>
        </div>
    );
}
