import type { DocumentProps, DocumentContext } from 'next/document';
import type { DocumentHeadTagsProps } from '@mui/material-nextjs/v15-pagesRouter';
import { Html, Head, Main, NextScript } from 'next/document';
import {
  DocumentHeadTags,
  documentGetInitialProps,
} from '@mui/material-nextjs/v15-pagesRouter';

export default function Document(props: DocumentProps & DocumentHeadTagsProps) {
  return (
    <Html lang="en">
      <Head>
        <DocumentHeadTags {...props} />

        <link
          rel="icon"
          href="https://cdn.dwolla.com/images/favicons/favicon.ico?v=4"
          sizes="48x48"
        />
        <link
          rel="icon"
          href="https://cdn.dwolla.com/images/favicons/favicon.svg?v=4"
          sizes="any"
          type="image/svg+xml"
        />

        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

Document.getInitialProps = async (ctx: DocumentContext) => {
  const finalProps = await documentGetInitialProps(ctx);
  return finalProps;
};
