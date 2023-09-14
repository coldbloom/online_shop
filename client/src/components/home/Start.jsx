import React from 'react';
import Image from "next/image"

const Start = () => {
    return (
        <>
            <div className="h-[90vh] w-full relative">
                <div className="text-white absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:text-left small:justify-end small:items-start small:p-32">
                    <h1 className="text-2xl-semi mb-4 drop-shadow-md shadow-black">
                        Introducing the Latest Summer Styles
                    </h1>
                    <p className="text-base-regular max-w-[32rem] mb-6 drop-shadow-md shadow-black">
                        This season, our new summer collection embraces designs to provide
                        comfort and style - ensuring you&apos;re well-prepared for whatever
                        comes your way.
                    </p>
                    <h2>Explore products</h2>
                </div>
                <Image
                    src="/hero.webp"
                    loading="eager"
                    priority={true}
                    quality={90}
                    alt="Photo by @thevoncomplex https://unsplash.com/@thevoncomplex"
                    className="absolute inset-0"
                    draggable="false"
                    fill
                    sizes="100vw"
                    style={{
                        objectFit: "cover",
                    }}
                />
            </div>

            <div className='w-12 bg-black text-white'>
                <p>123</p>
                <p>123</p>
                <p>123</p>
                <p>123</p>
                <p>123</p>
                <p>123</p>
            </div>

            <div className='w-12 bg-black text-white'>
                <p>123</p>
                <p>123</p>
                <p>123</p>
                <p>123</p>
                <p>123</p>
                <p>123</p>
            </div>

            <div className='w-12 bg-black text-white'>
                <p>123</p>
                <p>123</p>
                <p>123</p>
                <p>123</p>
                <p>123</p>
                <p>123</p>
            </div>

            <div className='w-12 bg-black text-white'>
                <p>123</p>
                <p>123</p>
                <p>123</p>
                <p>123</p>
                <p>123</p>
                <p>123</p>
            </div>
        </>
    );
};

export default Start;