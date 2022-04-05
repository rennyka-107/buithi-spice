import Footer from "components/Footer";
import Header from "components/Header";
import { Box, Grommet } from "grommet";
import useMounted from "hook/useMounted";
import Head from "next/head";
import Script from "next/script";
import "styles/globals.scss";
import "aos/dist/aos.css";
import { useState, useEffect } from "react";
import AOS from "aos";
import { useRouter } from "next/router";
import BasePageLoading from "components/BasePageLoading";
import SideBar from "components/SideBar";
import { useMediaQuery } from "react-responsive";

function MyApp({ Component, pageProps }) {
  const mounted = useMounted();
  const [basePageLoading, setBasePageLoading] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const router = useRouter();
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 900px)",
  });
  useEffect(() => {
    AOS.init({
      duration: 500,
      delay: 500,
      easing: "ease-out",
    });
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      setBasePageLoading(true);
    };
    const handleRouteChangeComplete = () => {
      setBasePageLoading(false);
    };
    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, []);

  return (
    <Grommet plain>
      <Head>
        <title>VN Spices</title>
        <link
          rel="icon"
          href="/images/275063685_1005091196774697_8380784716009099865_n.png"
        />
      </Head>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js" />

      {mounted && !basePageLoading ? (
        <Box flex style={{ position: "relative" }}>
          <Header setShowSidebar={setShowSidebar} />
          <Box onClick={() => setShowSidebar(false)}>
            <Component {...pageProps} />
          </Box>
          <Footer />
          {showSidebar && !isDesktopOrLaptop && <SideBar />}
        </Box>
      ) : (
        <BasePageLoading />
      )}
    </Grommet>
  );
}

export default MyApp;
