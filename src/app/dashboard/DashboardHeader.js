"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import style from "./DashboardHeader.module.css";
import Cookies from 'js-cookie';

const DashboardHeader = () => {
  const [userDetails, setUserDetails] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/restaurant");
      return;
    }

    async function checkToken() {
      try {
        const tokenVerify = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        const res = await tokenVerify.json();
        if (!res.success) {
          router.push("/restaurant");
        }
      } catch (error) {
        console.error("Dashboard Header Auth Error:", error);
        router.push("/restaurant");
      }
    }

    checkToken();
  }, [router]);

  const logout = () => {
    setUserDetails('');
    Cookies.remove("token", { path: "/" });
    router.push("/restaurant");
  };

  return (
    <header className={style.header}>
      <Link href="/dashboard" className={style.logo}>
        <img src="delivery-boy-logo.webp" alt="FoodZilla Logo" />
        <span>FoodZilla</span>
      </Link>

      <div className={style.headerRight}>
        <Link href="/dashboard">Dashboard</Link>
        <button className={style.logoutBtn} onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default DashboardHeader;