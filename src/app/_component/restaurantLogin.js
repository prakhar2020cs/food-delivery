"use client";
import Cookies from "js-cookie";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import style from "./restaurant.module.css";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const [userEmail, setEmail] = useState("");
  const [userPassword, setPassword] = useState("");
  // let [tokenToVerify, setTokenToVerify] = useState(null);
  const router = useRouter();
  // let tokenToVerify = null;

  useEffect(() => {
    console.log("use effect");
    // let storedUser = localStorage.getItem("registeredUser");
    // console.log("storedUser", storedUser);
    // const parsedtoken = JSON.parse(storedUser);
    // tokenToVerify = parsedtoken?.token;
    // console.log("tokenToverify---login page", tokenToVerify);

    // if no token st

    const verifyToken = async () => {
      let tokenToVerify = Cookies.get("token"); // Get the token from cookies

      //      if (Cookies.get("token")) {
      //   console.log("signup-token, redirected to dashboard")
      //   router.replace("/dashboard")
      // }

      console.log("verifying token...");
      try {
        if (!tokenToVerify) {
          console.log("NO token found");

          return;
        }
        console.log("check2");

        let tokenVerify = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenToVerify}`,
          },
          // body: JSON.stringify({ tokenToVerify: tokenToVerify })
        });

        const response = await tokenVerify.json();

        if (response.success) {
          console.log("user token is valid");

          router.push("/dashboard");
        }
      } catch (error) {
        console.log("error verifying token", error);
      }
    };
    verifyToken();
  }, []);

  const handleLogin = async (e) => {
    setLoading(true);

    if (!userEmail || !userPassword) {
      window.alert("Email and password are required");
      setLoading(false);
      return;
    }

    try {
      let result = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail, userPassword }),
      });
      let response = await result.json();
      if (response.success) {
        const { userData, token } = response;
        console.log(userData, token);
        // localStorage.setItem("registeredUser", JSON.stringify({ userData, token }));
        Cookies.set("token", token, {
          expires: 7, // Cookie expires in 7 days

          sameSite: "strict", // Protect against CSRF
        });

        router.push("/dashboard");
      } else {
        toast.error("invalid user");
      }
    } catch (e) {
      console.log("some error occurred", e);
      toast.error("some error occurred");
    } finally {
      setLoading(false);
    }
  };
  // console.log(email);

  return (
    <div>
      <ToastContainer />
      <h2>Login</h2>
      <form className={style.login}>
        <div className={style.imgContainer}>
          <img src="dish.avif" alt="Avatar" className="avatar" />
        </div>

        <div className={style.container}>
          <label htmlFor="uname">
            <b>Email</b>
          </label>
          <input
            className={style.formInput}
            type="text"
            placeholder="Enter Username"
            value={userEmail}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            required
          />

          <label htmlFor="psw">
            <b>Password</b>
          </label>
          <input
            type="password"
            value={userPassword}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Enter Password"
            name="password"
            required
          />

          <button type="submit" onClick={handleLogin} disabled={loading}>
            {loading ? "Logging In.." : "Login"}
          </button>
        </div>

        <div className={style.container}>
          <span className="psw">
            {" "}
            <Link href="/forgotpassword">Forgot password?</Link>
          </span>
        </div>
      </form>
    </div>
  );
};
export default Login;
