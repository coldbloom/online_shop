import {Html, Head, Main, NextScript} from 'next/document'

export default function Document() {
    return (
        <Html lang="ru">
            <Head>
                <link rel='icon' hrev='/favicon.svg' sizes='any' type='image/svg+xml'/>
                {/*meta  прописать icon favicon.svg из папки public*/}
            </Head>
            <body>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    )
}
