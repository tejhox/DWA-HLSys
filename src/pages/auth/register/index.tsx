import Link from "next/link";
import style from "./register.module.css";
import { useRouter } from "next/router";
import { FormEvent } from "react";

const RegisterPage = () => {
  const { push } = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = {
      fullname: form.fullname.value,
      email: form.email.value,
      phone: form.phone.value,
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
      push("/auth/login");
    } else {
      console.log("error");
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <div>
        <form onSubmit={handleSubmit} className={style.container}>
          <label htmlFor="fullname">Full Name</label>
          <input type="text" name="fullname" id="fullname" />
          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="email" />
          <label htmlFor="phone">Phone</label>
          <input type="text" name="phone" id="phone" />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
          <div>
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
      <p>
        Have an account? sign in <Link href="/auth/login">here</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
