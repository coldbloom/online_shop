import React, {useEffect} from 'react';
import Link from "next/link";
import clsx from "clsx";
import style from './MobileMenu.module.css'
import cn from "classnames"

const MobileMenu = ({isOpen, close}) => {
    const collections = [];
    const customer = null;

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        }

        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [isOpen])

    return (
        isOpen &&
        <div className={isOpen ? cn(style.menu, style.active) : style.menu}>
            <button onClick={close}>close</button>
        </div>
    );
};

export default MobileMenu;