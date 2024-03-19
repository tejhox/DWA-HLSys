import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push, query } = useRouter();

  const callbackUrl: any = query.callbackUrl || "/home";

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
    <div className="container flex w-screen h-screen items-center justify-center -mt-10 sm:w-1/2 sm:mx-auto lg:w-1/3 lg:mx-auto">
      <div className="container flex flex-col w-11/12 p-6 my-auto border rounded-lg border-slate-600 ">
        <h1 className="text-xl text-center">Sign In</h1>
        <div className="divider"></div>
        {error && <div>{error}</div>}
        <form onSubmit={handleSubmit} className="form-control">
          <div className="flex flex-col">
            <label htmlFor="nik">NIK</label>
            <input
              type="text"
              id="nik"
              name="nik"
              placeholder="Masukkan NIK"
              className="input input-sm input-bordered mt-1"
            />
          </div>
          <div className="flex flex-col mt-2">
            <label htmlFor="nik">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Masukkan Password"
              className="input input-sm input-bordered mt-1"
            />
          </div>
          <div className="divider mt-10">
            <button type="submit" className="btn btn-neutral btn-sm w-32">
              {isLoading ? "Loading..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default LoginPage;
