'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';

type Props = {};

export default function Error({}: Props) {
    const search = useSearchParams();
    const message = search.get('message');
    const response = search.get('response');

    return <div className='flex flex-col justify-center items-center h-screen gap-8'>
        <div>Error</div>
        <div>{message}</div>
        <div>{response}</div>
        <Link href="/">
            <Button>Reset</Button>
        </Link>
    </div>;
}
