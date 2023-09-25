import '@/styles/globals.css'
import MainLayout from "@/src/components/layout";  // импортируем MainLayout, чтобы header и footer всегда были на страницах


export default function App({ Component, pageProps }) {
  const Layout = Component.layout || MainLayout
  return <Layout><Component {...pageProps} /></Layout>
}
