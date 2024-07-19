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
import { ModalFunctionProvider } from "@/context/modalFunctionContext";
import { AllStateProvider } from "@/context/allStateContext";

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
      <AllStateProvider>
        <SessionContextProvider>
          <GetDataProvider>
            <KpiProvider>
              <DekidakaProvider>
                <ProfileProvider>
                  <ModalFunctionProvider>
                    <Navbar />
                    <div>
                      <div
                        className="absolute inset-0 overflow-hidden bg-cover bg-center -z-50"
                        style={{
                          backgroundImage: "url('/static/assets/17545.jpg')",
                          height: "720px",
                          maxHeight: "720px",
                          overflow: "hidden",
                        }}
                      />
                      <div className={lato.className}>
                        <Component {...pageProps} />
                      </div>
                    </div>
                  </ModalFunctionProvider>
                </ProfileProvider>
              </DekidakaProvider>
            </KpiProvider>
          </GetDataProvider>
        </SessionContextProvider>
      </AllStateProvider>
    </SessionProvider>
  );
}
