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
    <>
      <div>
        <div>
          <div>Sign In</div>
          {error && <div>{error}</div>}
          <div>
            <form onSubmit={handleSubmit}>
              <label htmlFor="nik">NIK</label>
              <input type="text" id="nik" name="nik" placeholder="Masukkan NIK" />
              <label htmlFor="nik">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Masukkan Password"
              />
              <button type="submit">{isLoading ? "Loading..." : "Login"}</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default LoginPage;
