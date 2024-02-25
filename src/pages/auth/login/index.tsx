import style from "./login.module.css";

const LoginPage = () => {
  return (
    <>
      <div className={style.container}>
        <div className={style.head}>Sign In</div>
        <div className={style.loginForm}>
          <form action="">
            <label htmlFor="nik" className={style.label}>
              NIK
            </label>
            <input type="text" id="nik" name="nik" className={style.input} />
            <label htmlFor="nik" className={style.label}>
              Password
            </label>
            <input type="password" id="password" name="password" className={style.input} />
            <button type="submit" className={style.button}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default LoginPage;
