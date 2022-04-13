import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const originalRenderPage = ctx.renderPage;

    // Run the React rendering logic synchronously
    ctx.renderPage = () =>
      originalRenderPage({
        // Useful for wrapping the whole react tree
        enhanceApp: (App) => App,
        // Useful for wrapping in a per-page basis
        enhanceComponent: (Component) => Component,
      });

    // Run the parent `getInitialProps`, it now includes the custom `renderPage`
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html>
        <Head>
          
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta
            name="description"
            content="Vietnamese leading exporter of Spices, Agro Products and Medical Herbs"
          />
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content="Vietnamese leading exporter of Spices, Agro Products and Medical Herbs - Vietnamese leading exporter of Spices, Agro Products and Medical Herbs"
          />
          <meta
            property="og:description"
            content="Vietnamese leading exporter of Spices, Agro Products and Medical Herbs"
          />
          <meta property="og:url" content="http://vnspice.com/" />
          <meta
            property="og:site_name"
            content="Vietnamese leading exporter of Spices, Agro Products and Medical Herbs"
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:description"
            content="Vietnamese leading exporter of Spices, Agro Products and Medical Herbs"
          />
          <meta
            name="twitter:title"
            content="Vietnamese leading exporter of Spices, Agro Products and Medical Herbs - Vietnamese leading exporter of Spices, Agro Products and Medical Herbs"
          />
          <link
            rel="preload"
            href="/fonts/Pacifico-Regular.woff2"
            as="font"
            crossOrigin=""
          />
          <link
            rel="preconnect"
            href="https://fonts.googleapis.com"
            crossOrigin
          />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Pacifico&family=Space+Grotesk:wght@605&display=swap"
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
}

export default MyDocument;
