import React, {useRef, useState, useEffect, useImperativeHandle} from 'react';
import Eye from "@/src/modules/common/icons/eye";
import EyeOff from "@/src/modules/common/icons/eye-off";
import clsx from "clsx";

const Input2 = React.forwardRef((props, ref) => {
    const {type, name, label, required, ...rest} = props;
    const inputRef = useRef(null);
    const [showPassword, setShowPassword] = useState(false);
    const [inputType, setInputType] = useState(type);

    useEffect(() => {
        if (type === "password" && showPassword) {
            setInputType("text");
        }

        if (type === "password" && !showPassword) {
            setInputType("password");
        }
    }, [type, showPassword])

    useImperativeHandle(ref, () => inputRef.current); /// без него мы onSubmit не работает!

    return (
        <>
            <div className='relative z-0 w-full text-base-regular'>
                <input
                    type={inputType}
                    name={name}
                    placeholder=" " // для анимации лейбла при активном инпуте
                    className={clsx(
                        "pt-4 pb-1 block w-full px-4 mt-0 bg-transparent border appearance-none focus:outline-none focus:ring-0 focus:border-gray-400 border-gray-200"
                    )}
                    {...rest}
                    ref={inputRef}
                />
                <label
                    htmlFor={name}
                    onClick={() => inputRef.current.focus()}
                    className={clsx("mx-3 px-1 transition-all absolute duration-300 top-3 -z-1 origin-0 text-gray-500")}
                >
                    {label}
                    {required && <span className="text-rose-500">*</span>}
                </label>
                {type === "password" && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-400 px-4 focus:outline-none transition-all duration-150 outline-none focus:text-gray-700 absolute right-0 top-3"
                    >
                        {showPassword ? <Eye /> : <EyeOff />}
                    </button>
                )}
            </div>
        </>
    );
});

export default Input2;