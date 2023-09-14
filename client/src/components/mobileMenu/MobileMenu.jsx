import React from 'react';
import Link from "next/link";

const MobileMenu = ({isOpen, close}) => {
    const collections = [];
    const customer = null;
    return (
        isOpen &&
        <div className='bg-white fixed inset-0 flex z-50 h-screen'>
            <button onClick={close}>close</button>
        </div>
    );
};

export default MobileMenu;