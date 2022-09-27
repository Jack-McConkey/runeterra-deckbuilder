import {Html, Head, Main, NextScript} from "next/document";

export default function Document() {
    return (
        <Html lang="en-gb">
            <Head>
                <meta charSet="utf-8" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&family=Poppins:ital,wght@0,300;0,400;0,600;0,700;1,700&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <body>
                <Main />
                <div id="modal" />
                <NextScript />
            </body>
        </Html>
    );
}
