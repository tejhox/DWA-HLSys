import "@/styles/globals.css";
import { Lato } from "next/font/google";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/navbar/";
import { ProfileProvider } from "@/context/ProfileContext";
import { DekidakaProvider } from "@/context/DekidakaContext";
import { SessionContextProvider } from "@/context/SessionContext";
import { GetDataProvider } from "@/context/GetDataContext";
import { KpiProvider } from "@/context/KpiContext";

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
        <GetDataProvider>
          <KpiProvider>
            <DekidakaProvider>
              <ProfileProvider>
                <div className={lato.className}>
                  <Navbar />
                  <Component {...pageProps} />
                </div>
              </ProfileProvider>
            </DekidakaProvider>
          </KpiProvider>
        </GetDataProvider>
      </SessionContextProvider>
    </SessionProvider>
  );
}
