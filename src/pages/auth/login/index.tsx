import { FormEvent, useState } from "react";
import style from "./login.module.css";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

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
    <>
      <div className={style.container}>
        <div className={style.formWrapper}>
          <div className={style.head}>Sign In</div>
          {error && <div>{error}</div>}
          <div className={style.loginForm}>
            <form onSubmit={handleSubmit}>
              <label htmlFor="nik" className={style.label}>
                NIK
              </label>
              <input type="text" id="nik" name="nik" className={style.input} />
              <label htmlFor="nik" className={style.label}>
                Password
              </label>
              <input type="password" id="password" name="password" className={style.input} />
              <button type="submit" className={style.button}>
                {isLoading ? "Loading..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default LoginPage;
