import "@/styles/globals.css";
import { Lato } from "next/font/google";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/navbar/";
import { ProfileProvider } from "@/context/profileContext";
import { DekidakaProvider } from "@/context/dekidakaContext";
import { SessionContextProvider } from "@/context/sessionContext";

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <SessionContextProvider>
        <ProfileProvider>
          <DekidakaProvider>
            <div className={lato.className}>
              <Navbar />
              <Component {...pageProps} />
            </div>
          </DekidakaProvider>
        </ProfileProvider>
      </SessionContextProvider>
    </SessionProvider>
  );
}
