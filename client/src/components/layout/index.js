import Nav from "@/src/components/layout/nav";
import Footer from "@/src/components/layout/footer";



import {Inter} from 'next/font/google'
const inter = Inter({subsets: ['latin']})

export default function MainLayout({children}) {
    return (
        <main className='relative'
        >
            <Nav />
                {children}
            <Footer />
        </main>
    )
}
