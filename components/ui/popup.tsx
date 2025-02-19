import React from 'react';
import { IoIosClose } from 'react-icons/io';

type Props = {
    open: boolean;
    close: () => void;
    children?: React.ReactNode;
};

export default function Popup({ open, close, children }: Props) {
    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            close();
        }
    };
    document.addEventListener('keydown', handleKeyDown);
    
    return (
        <div
            onClick={close}
            className={`fixed inset-0 flex justify-center items-center transition-colors ${
                open ? ' visible bg-black/50' : 'invisible'
            }`}
        >
            <div
                onClick={(event) => event.stopPropagation()}
                className={`p-4 md:p-20 lg:p-40 transition-all ${
                    open ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
                }`}
            >
                {children}
            </div>
        </div>
    );
}
