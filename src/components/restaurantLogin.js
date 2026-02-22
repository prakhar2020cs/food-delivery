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
    const router = useRouter();

    useEffect(() => {
        const verifyToken = async () => {
            let tokenToVerify = Cookies.get("token");
            if (!tokenToVerify) return;

            try {
                let tokenVerify = await fetch("/api/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${tokenToVerify}`,
                    },
                });

                const response = await tokenVerify.json();
                if (response.success) {
                    router.push("/dashboard");
                }
            } catch (error) {
                console.log("error verifying token", error);
            }
        };
        verifyToken();
    }, [router]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!userEmail || !userPassword) {
            toast.error("Email and password are required");
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
                const { token } = response;
                Cookies.set("token", token, {
                    expires: 7,
                    sameSite: "strict",
                });
                router.push("/dashboard");
            } else {
                toast.error("Invalid credentials");
            }
        } catch (e) {
            console.log("some error occurred", e);
            toast.error("some error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={style.login}>
            <ToastContainer position="bottom-right" />
            <form onSubmit={handleLogin}>
                <div className={style.authContainer}>
                    <div className={style.inputGroup}>
                        <label htmlFor="email">Email Address</label>
                        <input
                            className={style.formInput}
                            type="email"
                            placeholder="e.g. name@restaurant.com"
                            value={userEmail}
                            onChange={(e) => setEmail(e.target.value)}
                            name="email"
                            required
                        />
                    </div>

                    <div className={style.inputGroup}>
                        <label htmlFor="password">Password</label>
                        <input
                            className={style.formInput}
                            type="password"
                            value={userPassword}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            name="password"
                            required
                        />
                    </div>

                    <div className={style.forgotLink}>
                        <Link href="/forgotpassword">Forgot password?</Link>
                    </div>

                    <button className={style.submitBtn} type="submit" disabled={loading}>
                        {loading ? "Verifying..." : "Sign In to Dashboard"}
                    </button>
                </div>

                demo details:-
                Restaurant Owner:-
                email: prakhar@gmail.com
                password: 123456
            </form>
        </div>
    );
};

export default Login;
