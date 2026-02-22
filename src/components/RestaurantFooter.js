import React from 'react';
import style from "./restaurant.module.css";

const RestaurantFooter = () => {
    return (
        <footer className={style.footer}>
            <h2>FoodZilla</h2>
            <p>Bringing delicious food to your doorstep. © {new Date().getFullYear()} All Rights Reserved.</p>
        </footer>
    )
}

export default RestaurantFooter;
