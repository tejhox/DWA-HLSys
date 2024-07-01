import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  const { data } = useSession();

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>DWA-PRO</title>
      </Head>
      <div className="flex flex-col justify-center h-screen">
        <div className="px-5 md:text-center">
          <div className="container flex flex-col md:mx-auto w-full md:w-96 md:flex md:flex-col">
            <h1 className="text-4xl font-bold text-primary mb-8">HL-M</h1>
            <h1 className="text-2xl font-semibold mb-3">
              Quick Reports, Easy Checks!
            </h1>
            <p className="text-lg text-gray-400">
              Create in a Snap, Monitor on the Fly!
            </p>
            <div className="divider divider-primary pe-5 md:w-full md:mx-auto"></div>
            {data ? (
              <div className="flex items-center md:justify-center">
                <Link
                  href="/production"
                  className="btn btn-primary text-lg font-semibold shadow-md shadow-indigo-500/60">
                  Laporan
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    size="lg"
                    className="ms-1 mt-1"
                  />
                </Link>
              </div>
            ) : (
              ""
            )}
            {data ? (
              <div className="flex items-center md:justify-center mt-3">
                <Link
                  href="/production/monthly-kpi"
                  className="btn btn-success btn-wide text-lg text-white font-semibold shadow-md shadow-indigo-500/60 ">
                  KPI
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    size="lg"
                    className="ms-1 mt-0.5"
                  />
                </Link>
              </div>
            ) : (
              <Link
                href={"/auth/login"}
                className="link underlined mt-3 font-bold text-blue-700">
                SIGN IN!
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
