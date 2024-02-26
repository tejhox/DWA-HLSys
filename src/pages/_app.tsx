import "@/styles/globals.css";
import { Lato } from "next/font/google";
import Navbar from "@/components/navbar";

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className={lato.className}>
        <Navbar />
        <Component {...pageProps} />
      </div>
    </>
  );
}
