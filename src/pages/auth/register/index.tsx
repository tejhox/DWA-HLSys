import Link from "next/link";
import style from "./register.module.css";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push } = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    const form = event.target as HTMLFormElement;
    const data = {
      nik: form.nik.value,
      password: form.password.value,
    };

    const result = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (result.status === 200) {
      form.reset();
      setIsLoading(true);
      push("/auth/login");
    } else {
      setIsLoading(false);
      setError("NIK belum terdaftar");
    }
  };

  return (
    <div className={style.container}>
      <div className={style.formWrapper}>
        <div className={style.head}>Sign Up</div>
        {error && <div>{error}</div>}
        <div className={style.registerForm}>
          <form onSubmit={handleSubmit}>
            <label htmlFor="nik" className={style.label}>
              NIK
            </label>
            <input type="text" name="nik" id="nik" className={style.input} />
            <label htmlFor="password" className={style.label}>
              Password
            </label>
            <input type="password" name="password" id="password" className={style.input} />
            <div>
              <button type="submit" className={style.button}>
                {isLoading ? "Loading..." : "Register"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <p className={style.link}>
        Have an account? sign in <Link href="/auth/login">here</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
