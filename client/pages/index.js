import Nav from "@/src/components/layout/nav";
import Footer from "@/src/components/layout/footer";
import Start from "@/src/components/home/Start";



import {Inter} from 'next/font/google'
const inter = Inter({subsets: ['latin']})

export default function Home() {
    return (
        <main className='relative'
        >
            <Nav />
                <Start />
            <Footer />
        </main>
    )
}
