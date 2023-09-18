import React from 'react';
import MainLayout from "@/src/components/layout";
import Login from "@/src/components/login-template/login/Login";

const Index = () => {
    return (
        <div className='w-full flex justify-center py-24'>
            <Login />
        </div>
    );
};

Index.layout = MainLayout
export default Index;