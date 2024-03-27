import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Home = () => {
  const { data } = useSession();

  return (
    <div className="flex flex-col mt-24 h-screen">
      <div className="px-5 md:text-center">
        <div className="container md:mx-auto w-full md:w-96 md:flex md:flex-col">
          <h1 className="text-4xl font-bold text-primary mb-8">HL-M</h1>
          <h1 className="text-2xl font-semibold mb-3">
            Quick Reports, Easy Checks!
          </h1>
          <p className="text-lg text-gray-400">
            Create in a Snap, Monitor on the Fly!
          </p>
          <div className="divider divider-neutral pe-5 md:w-full md:mx-auto"></div>
          {data ? (
            <div className="flex items-center md:justify-center">
              <Link
                href="/production"
                className="text-2xl/8 font-semibold link link-hover">
                Buat Laporan
              </Link>
              <FontAwesomeIcon
                icon={faArrowRight}
                size="lg"
                className="ms-3 mt-1.5"
              />
            </div>
          ) : (
            <Link href={"/auth/login"} className="link mt-3">
              Sign in!
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
