
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import clsx from 'clsx';
import Link from "next/link"

import Hamburger from "@/src/modules/common/components/hamburger";
import MobileMenu from "@/src/components/mobileMenu/MobileMenu";

const Nav = () => {
    const pathname = usePathname()
    const [isHome, setIsHome] = useState(true)
    const [isScrolled, setIsScrolled] = useState(false)

    const [open, setOpen] = useState(false)
    const openMobileMenu = () => setOpen(true)
    const closeMobileMenu = () => setOpen(false)

    useEffect(() => {
        console.log(open);
    }, [open])

    //useEffect that detects if window is scrolled > 5px on the Y axis
    useEffect(() => {
        if (isHome) {
            const detectScrollY = () => {
                if (window.scrollY > 5) {
                    setIsScrolled(true)
                } else {
                    setIsScrolled(false)
                }
            }

            window.addEventListener("scroll", detectScrollY)

            return () => {
                window.removeEventListener("scroll", detectScrollY)
            }
        }
    }, [isHome])

    useEffect(() => {
        pathname === "/" ? setIsHome(true) : setIsHome(false)
    }, [pathname])


    return (
        <div
            className={clsx("sticky top-0 inset-x-0 z-50 group", {
                "!fixed": isHome,
            })}
        >
            <header
                className={clsx(
                    "relative h-16 px-8 mx-auto transition-colors bg-transparent border-b border-transparent duration-200 group-hover:bg-white group-hover:border-gray-200",
                    {
                        "!bg-white !border-gray-200": !isHome || isScrolled,
                    }
                )}
            >
                <nav
                    className={clsx(
                        "text-gray-900 flex items-center justify-between w-full h-full text-small-regular transition-colors duration-200",
                        {
                            "text-white group-hover:text-gray-900": isHome && !isScrolled,
                        }
                    )}
                >
                    <div className="flex-1 basis-0 h-full flex items-center">
                        <div className="block small:hidden">
                            <Hamburger setOpen={openMobileMenu}/>
                        </div>
                        <div className="hidden small:block h-full">
                            {/*<DropdownMenu />*/}
                        </div>
                    </div>

                    <div className="flex items-center h-full">
                        <Link href="/" className="text-xl-semi uppercase">
                            Acme my
                        </Link>
                    </div>
                </nav>
                <MobileMenu isOpen={open} close={closeMobileMenu}/>
            </header>
        </div>
    );
};

export default Nav;