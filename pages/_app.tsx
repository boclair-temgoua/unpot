import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ConfigProvider } from "antd";
import "react-quill/dist/quill.snow.css";
import "toastify-js/src/toastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import "animate.css";

import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ContextUserProvider } from "@/components/util/context-user";
import { ThemeProvider } from "@/components/util/theme-provider";
import { LoadingFile } from "@/components/ui";
import { createTranslator, NextIntlClientProvider } from "next-intl";

import { Suspense } from "react";
import { GetStaticPropsContext } from "next";
const queryClient = new QueryClient();

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../lang/${locale}.json`)).default,
    },
  };
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<LoadingFile />}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <NextIntlClientProvider locale={"en"} messages={pageProps.messages}>
            <HydrationBoundary state={pageProps.dehydratedState}>
              <ConfigProvider>
                <ContextUserProvider>
                  <Component {...pageProps} />

                  {Boolean(process.env.NEXT_PUBLIC_QUERY_DEV_TOOLS) && (
                    <ReactQueryDevtools
                      buttonPosition="bottom-left"
                      initialIsOpen={false}
                    />
                  )}
                </ContextUserProvider>
              </ConfigProvider>
            </HydrationBoundary>
          </NextIntlClientProvider>
        </ThemeProvider>
      </Suspense>
    </QueryClientProvider>
  );
}
