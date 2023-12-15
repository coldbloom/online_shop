import '../styles/globals.css'
import MainLayout from "../src/components/layout";  // импортируем MainLayout, чтобы header и footer всегда были на страницах
import {Provider} from "react-redux";
import {store} from "@/store";


export default function App({ Component, pageProps }) {
  const Layout = Component.layout || MainLayout
  return <Provider store={store}><Layout><Component {...pageProps} /></Layout></Provider>
}
