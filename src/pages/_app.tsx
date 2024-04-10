import "@/styles/globals.css";
import { Lato } from "next/font/google";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/navbar/";
import { ProfileProvider } from "@/context/profileContext";
import { SessionContextProvider } from "@/context/sessionContext";
import { GetDataProvider } from "@/context/getDataContext";
import { KpiProvider } from "@/context/kpiContext";
import { DekidakaProvider } from "@/context/dekidakaContext";
import { AppStateProvider } from "@/context/appStateContext";
import { ModalFunctionProvider } from "@/context/modalFunctionContext";

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
      <AppStateProvider>
        <SessionContextProvider>
          <GetDataProvider>
            <KpiProvider>
              <DekidakaProvider>
                <ProfileProvider>
                  <ModalFunctionProvider>
                    <div className={lato.className}>
                      <Navbar />
                      <Component {...pageProps} />
                    </div>
                  </ModalFunctionProvider>
                </ProfileProvider>
              </DekidakaProvider>
            </KpiProvider>
          </GetDataProvider>
        </SessionContextProvider>
      </AppStateProvider>
    </SessionProvider>
  );
}
