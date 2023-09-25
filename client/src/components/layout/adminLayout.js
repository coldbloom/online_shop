import React from 'react';

export default function AdminLayout({children}) {
    return (
        <main className='relative'
        >
            <h1>Админ-панель</h1>
            {children}
        </main>
    )
}
