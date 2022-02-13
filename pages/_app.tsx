import "../styles/globals.css";
import type { AppProps } from "next/app";

import Navigation from "../components/navigation";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navigation {...pageProps} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
