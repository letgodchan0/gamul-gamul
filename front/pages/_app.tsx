import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Backdrop, Box, createTheme, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import { HeaderBar } from "../src/components/HeaderBar";
import { Navbar } from "../src/components/Navbar";
import { SearchComp } from "../src/components/templates/SearchComp";
import { useRouter } from "next/router";
import { showHeaderBar, getNavBarActiveIndex } from "../src/utils/headerNavUtil";
import Head from "next/head";
import { useMediaQuery } from "react-responsive";

export const theme = createTheme({
  palette: {
    success: {
      main: "#4411AA",
    },
    secondary: {
      main: "#000",
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(getNavBarActiveIndex(router.pathname));
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      setShowSearch(false);
      setActiveIndex(getNavBarActiveIndex(url));
    };

    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events]);

  const onClickSearch = () => {
    setShowSearch(true);
  };
  const onCloseSearch = () => {
    setShowSearch(false);
  };

  const [showHeader, setShowHeader] = useState<boolean>(true);
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  useEffect(() => {
    setShowHeader(!isMobile || showHeaderBar(router.pathname));
  }, [isMobile, router.pathname]);
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>가물가물</title>
        <link rel="icon" href="/icon.png" />
        <link
            rel="shortcut icon"
            href="alarm-clock.png"
            type="image/x-icon"
          />
          <link rel="manifest" href="/manifest.json" />
      </Head>
      <Box className="page-background">
        {showHeader && <HeaderBar badgeContent={6} onClickSearch={onClickSearch} />}
        <Component {...pageProps} />
        <Navbar activeIndex={activeIndex} />
      </Box>
      <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={showSearch}>
        <SearchComp onCloseSearch={onCloseSearch} />
      </Backdrop>
    </ThemeProvider>
  );
}

export default MyApp;
