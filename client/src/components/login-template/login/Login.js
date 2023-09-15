import React from 'react';

const Login = () => {
    return (
        <div className="max-w-sm w-full flex flex-col items-center">
            <h1 className="text-large-semi uppercase mb-6">Welcome back</h1>
            <p className="text-center text-base-regular text-gray-700 mb-8">
                Sign in to access an enhanced shopping experience.
            </p>
            <form className="w-full" onSubmit={onSubmit}>
                <div className="flex flex-col w-full gap-y-2">
                    {/*<Input*/}
                    {/*    label="Email"*/}
                    {/*    {...register("email", { required: "Email is required" })}*/}
                    {/*    autoComplete="email"*/}
                    {/*    errors={errors}*/}
                    {/*/>*/}
                    {/*<Input*/}
                    {/*    label="Password"*/}
                    {/*    {...register("password", { required: "Password is required" })}*/}
                    {/*    type="password"*/}
                    {/*    autoComplete="current-password"*/}
                    {/*    errors={errors}*/}
                    {/*/>*/}
                </div>
                {authError && (
                    <div>
                        <span className="text-rose-500 w-full text-small-regular">
                          These credentials do not match our records
                        </span>
                    </div>
                )}
                {/*<Button className="mt-6">Enter</Button>*/}
            </form>
        </div>
    );
};

export default Login;