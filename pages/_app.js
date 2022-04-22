import Footer from "components/Footer";
import Header from "components/Header";
import { Box, Grommet } from "grommet";
import useMounted from "hook/useMounted";
import Head from "next/head";
import Script from "next/script";
import "styles/globals.scss";
import "aos/dist/aos.css";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect, createContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import AOS from "aos";
import { useRouter } from "next/router";
import BasePageLoading from "components/BasePageLoading";
import SideBar from "components/SideBar";
import { useMediaQuery } from "react-responsive";
import useLocalStorage from "hook/useLocalStorage";
import { CaretDown, CaretNext } from "grommet-icons";

export const WrapContext = createContext();
export const initialAuth = {
  user: null,
  accessToken: null,
};

const theme = {
  tab: {
    extend: {
      border: "none",
    },
    active: {
      color: "#1fc895",
    },
    color: "#ff5f6d",
    hover: {
      color: "#1fc895",
    },
    disabled: {
      color: "#e9b2b7",
    },
  },
};

function MyApp({ Component, pageProps }) {
  const mounted = useMounted();
  const [basePageLoading, setBasePageLoading] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [auth, setAuth] = useLocalStorage("auth", initialAuth);
  const [isTachyonAdmin, setIsTachyonAdmin] = useState(false);
  const router = useRouter();
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 900px)",
  });
  useEffect(() => {
    AOS.init({
      duration: 500,
      delay: 500,
      easing: "ease-out",
      once: true,
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

  useEffect(() => {
    const listenChangeStorage = ({ newValue, oldValue, key }) => {
      if (key === "auth" && oldValue !== newValue) {
        setAuth(newValue ? JSON.parse(newValue) : initialAuth);
        if (newValue) {
          toast.success("Welcome! Login successfully!");
        }
      }
    };
    window.addEventListener("storage", listenChangeStorage);
    return () => {
      window.removeEventListener("storage", listenChangeStorage);
    };
  }, [setAuth]);

  const initialValue = {
    // auth
    auth,
    setAuth,
    isTachyonAdmin,
    setIsTachyonAdmin,
  };

  return (
    <WrapContext.Provider value={initialValue}>
      <Grommet theme={theme}>
        <Head>
          <title>BuiThi Agriculture</title>
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
          <link rel="icon" href="/images/logo.png" />
        </Head>
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js" />

        {mounted && !basePageLoading ? (
          <Box
            flex
            style={{
              position: "relative",
            }}
          >
            <Header setShowSidebar={setShowSidebar} />
            <Box
              width="100%"
              onClick={() => setShowSidebar(false)}
              style={{
                cursor: "unset",
                backgroundColor: "#f5e3e6",
                backgroundImage:
                  "linear-gradient(315deg, #f5e3e6 0%, #d9e4f5 74%)",
              }}
            >
              <ToastContainer
                position="top-right"
                autoClose={2000}
                closeOnClick
                pauseOnHover
              />
              <Component {...pageProps} />
            </Box>
            <Footer />
            {showSidebar && !isDesktopOrLaptop && <SideBar />}
          </Box>
        ) : (
          <BasePageLoading />
        )}
      </Grommet>
    </WrapContext.Provider>
  );
}

export default MyApp;
