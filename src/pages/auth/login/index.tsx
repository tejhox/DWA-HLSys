import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import Container from "@/components/layout/container";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push, query } = useRouter();

  const callbackUrl: any = query.callbackUrl || "/";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    const form = event.target as HTMLFormElement;
    try {
      const res = await signIn("credentials", {
        redirect: false,
        nik: form.nik.value,
        password: form.password.value,
        callbackUrl,
      });
      if (!res?.error) {
        setIsLoading(false);
        form.reset();
        push(callbackUrl);
      } else {
        setIsLoading(false);
        setError("NIK atau password salah");
      }
    } catch (error) {
      setIsLoading(false);
      setError("NIK atau password salah");
    }
  };

  return (
    <Container
      contentClass={"h-screen sm:w-full"}
      content={
        <div className="flex h-full justify-center mt-20 sm:w-1/3 sm:mx-auto">
          <div className="flex flex-col h-96 px-6 py-2 bg-slate-100/60 rounded-lg shadow-lg shadow-gray-500/60 w-11/12">
            <div className="my-auto">
              <h1 className="text-2xl font-bold ">SIGN IN</h1>
              <div className="divider"></div>
              {error && <p className="text-center mb-3 text-error">{error}</p>}
              <form onSubmit={handleSubmit} className="form-control">
                <label className="input input-bordered flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                  </svg>
                  <input
                    type="text"
                    className="grow rounded"
                    name="nik"
                    placeholder="NIK"
                  />
                </label>
                <label className="input input-bordered flex items-center gap-2 mt-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70">
                    <path
                      fillRule="evenodd"
                      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="grow rounded"
                  />
                </label>
                <div className="divider mt-10">
                  <button
                    type="submit"
                    className="btn btn-outline btn-primary btn-sm w-32">
                    {isLoading ? "Loading..." : "SIGN IN"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      }
    />
  );
};
export default LoginPage;
