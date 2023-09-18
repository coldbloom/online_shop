import React from 'react';
import {useForm} from "react-hook-form";
import clsx from "clsx";
import Input from "@/src/modules/common/components/Input"
import Input2 from "@/src/modules/common/components/Input/Input2";
const Login = () => {
    const {register, handleSubmit, reset, formState: {errors, isValid}} = useForm();

    const onSubmit = data => {
        console.log(JSON.stringify(data));
        reset();
    }

    return (
        <div className="max-w-sm w-full flex flex-col items-center">
            <h1 className="text-large-semi uppercase mb-6">Welcome back</h1>
            <p className="text-center text-base-regular text-gray-700 mb-8">
                Sign in to access an enhanced shopping experience.
            </p>
            <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                <Input2
                    label="Text"
                    type='text'
                    {...register('text1')}
                />
                <Input2
                    label="Email"
                    type='text'
                    {...register('text2')}
                />
                <Input2
                    label="Password"
                    type='password'
                    {...register('password')}
                />
                <Input
                    label="Password"
                    type='password'
                    {...register('password')}
                />
                <button
                    className={clsx('px-3 py-2 border bg-gray-90', {
                        "backdrop-opacity-90": !isValid
                    })}
                    disabled={!isValid}>
                    Отправить
                </button>
            </form>
        </div>
    );
};

export default Login;