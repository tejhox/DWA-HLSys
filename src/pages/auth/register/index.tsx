import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import authServices from "@/lib/services/auth";

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

    const result = await authServices.registerAccount(data);

    if (result.status === 200) {
      form.reset();
      setIsLoading(true);
      push("/auth/login");
    } else {
      setIsLoading(false);
      setError("NIK Belum Terdaftar");
    }
  };

  return (
    <div>
      <div>
        <div>Sign Up</div>
        {error && <div>{error}</div>}
        <div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="nik">NIK</label>
            <input type="text" name="nik" id="nik" />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
            <div>
              <button type="submit">{isLoading ? "Loading..." : "Register"}</button>
            </div>
          </form>
        </div>
      </div>
      <p>
        Have an account? sign in <Link href="/auth/login">here</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
