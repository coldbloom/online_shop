import '@/styles/globals.css'
import MainLayout from "@/src/components/layout";


export default function App({ Component, pageProps }) {
  const Layout = Component.layout || MainLayout
  return <Layout><Component {...pageProps} /></Layout>
}
