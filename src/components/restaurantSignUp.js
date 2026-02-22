"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import style from "./restaurant.module.css";
import { toast, ToastContainer } from "react-toastify";
import Cookies from "js-cookie";

const Signup = ({ setLogin }) => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [c_password, setC_password] = useState("");
    const [restaurant, setRestaurant] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [contact, setContact] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    if (Cookies.get("token")) {
        router.replace("/dashboard");
    }

    const validateForm = () => {
        if (name.length < 3) return "Name must be at least 3 characters long.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Invalid email format.";
        if (password.length < 8) return "Password must be at least 8 characters.";
        if (password !== c_password) return "Passwords do not match.";
        if (!/^\d{10}$/.test(contact)) return "Contact must be 10 digits.";
        if (address.length < 6) return "Address is too short.";

        return null;
    };

    async function handleSignup(e) {
        e.preventDefault();
        const errorMessage = validateForm();
        if (errorMessage) {
            setError(errorMessage);
            return;
        }
        setError("");
        setIsLoading(true);
        try {
            let result = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, city, address, contact, restaurant }),
            });
            let response = await result.json();

            if (response.success) {
                toast.success("Account created successfully!");
                setTimeout(() => {
                    setLogin(true);
                }, 2000);
            } else {
                toast.error(response.message || "Registration failed");
            }
        } catch (err) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className={style.signUp}>
            <ToastContainer position="bottom-right" />
            <form onSubmit={handleSignup}>
                <div className={style.authContainer}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div className={style.inputGroup}>
                            <label>Full Name</label>
                            <input
                                className={style.formInput}
                                type="text"
                                placeholder="Owner Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className={style.inputGroup}>
                            <label>Email Address</label>
                            <input
                                className={style.formInput}
                                type="email"
                                placeholder="name@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className={style.inputGroup}>
                            <label>Password</label>
                            <input
                                className={style.formInput}
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className={style.inputGroup}>
                            <label>Confirm Password</label>
                            <input
                                className={style.formInput}
                                type="password"
                                placeholder="••••••••"
                                value={c_password}
                                onChange={(e) => setC_password(e.target.value)}
                                required
                            />
                        </div>
                        <div className={style.inputGroup}>
                            <label>Restaurant Name</label>
                            <input
                                className={style.formInput}
                                type="text"
                                placeholder="e.g. Red Chilli"
                                value={restaurant}
                                onChange={(e) => setRestaurant(e.target.value)}
                                required
                            />
                        </div>
                        <div className={style.inputGroup}>
                            <label>City</label>
                            <input
                                className={style.formInput}
                                type="text"
                                placeholder="e.g. Mumbai"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </div>
                        <div className={style.inputGroup} style={{ gridColumn: 'span 2' }}>
                            <label>Full Address</label>
                            <input
                                className={style.formInput}
                                type="text"
                                placeholder="Complete street address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>
                        <div className={style.inputGroup} style={{ gridColumn: 'span 2' }}>
                            <label>Contact Number</label>
                            <input
                                className={style.formInput}
                                type="text"
                                placeholder="10-digit mobile number"
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                                required
                                maxLength="10"
                            />
                        </div>
                    </div>

                    {error && <p className={style.errorText}>{error}</p>}

                    <button className={style.submitBtn} type="submit" disabled={isLoading}>
                        {isLoading ? "Creating Account..." : "Register Restaurant"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Signup;
