import React, {useEffect} from 'react';
import Link from "next/link";
import X from "@/src/modules/common/icons/x";
import ChevronDown from "@/src/modules/common/icons/chevron-down";


const MobileMenu = ({close}) => {

    return (
        <div className='flex flex-col flex-1'>
            <div className="flex items-center justify-between w-full border-b border-gray-200 py-4 px-6">
                <div className="flex-1 basis-0">
                    <button onClick={close}>close</button>
                </div>
                <div>
                    <h1 className="text-xl-semi uppercase">Acme</h1>
                </div>
                <div className="flex-1 basis-0 flex justify-end">
                    <button onClick={close}>
                        <X size={20} />
                    </button>
                </div>
            </div>

            <div className="space-y-6 flex-1 flex flex-col justify-between p-6">
                <div className="flex flex-col">
                    <div className="flex flex-col gap-y-8 text-small-regular">
                        <div className="flex flex-col gap-y-4">
                            <span className="text-gray-700 uppercase">Account</span>
                            <Link href={`/account/login`} passHref>
                                <button
                                    className="flex items-center justify-between border-b border-gray-200 py-2 w-full"
                                    onClick={close}
                                >
                                    <span className="sr-only">Go to sign in page</span>
                                    <span className="normal-case">Sign in</span>
                                    <ChevronDown className="-rotate-90" />
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileMenu;