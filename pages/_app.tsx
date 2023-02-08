import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import Head from "next/head";
import NavBar from '../components/NavBar'
import React from 'react';
import {Hydrate, Query, QueryClient, QueryClientProvider} from "react-query";

import PropTypes from "prop-types";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider,EmotionCache  } from "@emotion/react";

import theme from "@/src/components/theme";
import createEmotionCache from "@/src/components/createEmotionCache";
import { IntlProvider, FormattedMessage, FormattedNumber } from "react-intl";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

const clientSideEmotionCache = createEmotionCache();
interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
  }
export default function App(props: MyAppProps) {

    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
    
    const queryClient = React.useRef(new QueryClient());
    // Client-side cache, shared for the whole session of the user in the browser.

    const { locale, locales } = useRouter();

    const [data, setData] = useState({});
  
    useEffect(() => {
      axios
        .get(`/languages/${locale}.json`)
        .then((response) => {
          if (response.data) {
            setData(response.data);
          }
        })
        .catch((error) => console.error(error));
    }, [data]);

    return (
        <CacheProvider value={emotionCache}>
             <IntlProvider locale={locale} messages={data}>
            <QueryClientProvider client={queryClient.current} >
                <ThemeProvider theme={theme}>
                    <Hydrate state={pageProps.dehydratedState}>
                        <Head>
                            <title>Todome Next App</title>
                        </Head>
                        <header>
                            <NavBar/>
                        </header>
                        <Component {...pageProps} />
                    </Hydrate>
                </ThemeProvider>
            </QueryClientProvider>
            </IntlProvider>
        </CacheProvider>
    )
}

App.propTypes = {
    Component: PropTypes.elementType.isRequired,
    emotionCache: PropTypes.object,
    pageProps: PropTypes.object.isRequired,
  };
