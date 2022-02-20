import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import Script from "next/script";
import "./global.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
      <Script
        type="text/javascript"
        src="https://code.jquery.com/jquery-1.12.4.min.js"
      />
      <Script
        type="text/javascript"
        src="https://cdn.iamport.kr/js/iamport.payment-1.1.8.js"
      />
    </Layout>
  );
}

export default MyApp;
