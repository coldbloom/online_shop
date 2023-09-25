import React from 'react';
import AdminLayout from "@/src/components/layout/adminLayout";
import CategoryModal from "@/pages/admin/components/categoryModal";
import ProductModal from "@/pages/admin/components/ProductModal";

const Admin = () => {
    const [open, setOpen] = React.useState('')
    return (
        <div className='flex flex-col'>
            <button
                className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-2'
                onClick={() => setOpen('category')}
            >
                Добавить категорию
            </button>
            <button
                className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-2'
                onClick={() => setOpen('product')}
            >
                Добавить товар
            </button>

            {open === 'category' && <CategoryModal />}
            {open === 'product' && <ProductModal />}
        </div>
    );
};

Admin.layout = AdminLayout;
export default Admin;