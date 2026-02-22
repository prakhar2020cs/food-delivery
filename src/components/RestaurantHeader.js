import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import style from "./restaurant.module.css"

const RestaurantHeader = ({ setLogin, login }) => {
    const router = useRouter();
    const pathname = usePathname();

    const handleLoginClick = () => {
        if (setLogin) {
            setLogin(!login);
        } else {
            router.push("/restaurant");
        }
    };

    return (
        <>
            <div className={style.header}>
                <div className="logoContainer">
                    <Link href="/" className={style.logo}>
                        <img src="delivery-boy-logo.webp" alt="logo" /><span>FoodZilla</span>
                    </Link>
                </div>
                <div className={style.headerRight}>
                    <Link className={pathname === "/" ? style.active : ""} href="/">Home</Link>
                    <button className={style.authBtn} onClick={handleLoginClick}>
                        {setLogin ? (login ? "SignUp" : "Login") : "Login/SignUp"}
                    </button>
                </div>
            </div>
        </>
    )
}

export default RestaurantHeader;
