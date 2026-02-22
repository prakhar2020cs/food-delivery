'use client'

import { useState } from "react";
import RestaurantFooter from "@/components/RestaurantFooter";
import RestaurantHeader from "@/components/RestaurantHeader";
import Login from "@/components/restaurantLogin";
import Signup from "@/components/restaurantSignUp";
import styles from './restaurant.module.css';

const Restaurant = () => {
    const [login, setLogin] = useState(true);

    return (
        <div className={styles.pageWrapper}>
            <RestaurantHeader setLogin={setLogin} login={login} />

            <main className={styles.mainContent}>
                <div className={styles.authCard}>
                    <div className={styles.titleSection}>
                        <h1>{login ? "Welcome Back" : "Join FoodZilla"}</h1>
                        <p>{login ? "Manage your restaurant menu and orders." : "Sign up your restaurant and reach more customers."}</p>
                    </div>

                    {login ? <Login /> : <Signup setLogin={setLogin} />}

                    <button className={styles.toggleBtn} onClick={() => setLogin(!login)}>
                        {login ? "New here? Create your restaurant account" : "Already registered? Sign in here"}
                    </button>
                </div>
            </main>

            <RestaurantFooter />
        </div>
    )
}

export default Restaurant;