"use client"
import RestaurantFooter from "@/components/RestaurantFooter";
import RestaurantHeader from "@/components/RestaurantHeader";
import { SkeletonCard } from "@/components/Skeleton";
import style from "./page.module.css";

import { useEffect, useState } from "react";

export default function Home() {
  const [searchDish, setSearchDish] = useState("");
  const [gotDishes, setGotDishes] = useState([]);
  const [debounceSearch, setDebounceSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timedSearch = setTimeout(() => {
      setDebounceSearch(searchDish);
      if (searchDish !== debounceSearch) setIsLoading(true);
    }, 700);
    return () => clearTimeout(timedSearch);
  }, [searchDish, debounceSearch]);

  useEffect(() => {
    async function fetchDishes() {
      try {
        const res = await fetch(`/api/crud/public?dish=${encodeURIComponent(debounceSearch)}`);
        if (!res.ok) {
          console.log("Failed to fetch dishes");
          throw new Error("Failed to fetch dishes");
        }
        const json = await res.json();
        const dishes = json?.dishes || [];
        setGotDishes(dishes);
      } catch (err) {
        console.error('fetch dishes error', err);
        setGotDishes([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDishes();
  }, [debounceSearch]);

  return (
    <div className={style.publicPage}>
      <RestaurantHeader  />

      <main className={style.hero}>
        <div>
          <h1>Your favourite place for delicious food</h1>
          <p className={style.lead}>Discover restaurants and dishes near you — fast delivery, great taste.</p>
        </div>

        <div className={style.searchWrap}>
          <input
            id="search-bar"
            className={style.searchInput}
            placeholder="Search dishes or restaurants..."
            value={searchDish}
            type="text"
            onChange={(e) => setSearchDish(e.target.value)}
            aria-label="Search dishes"
          />
        </div>
      </main>

      <section className={style.resultsSection} aria-live="polite">
        <h2 className={style.resultsTitle}>
          {isLoading ? "Searching..." : "Search Results"}
        </h2>

        {isLoading ? (
          <div className={style.grid}>
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : gotDishes && gotDishes.length > 0 ? (
          <div className={style.grid}>
            {gotDishes.map((dish) => (
              <article className={style.card} key={dish._id}>
                <div className={style.imagePlaceholder}>
                  {dish.image ? (
                    <img src={dish.image} alt={dish.name} className={style.cardImg} />
                  ) : (
                    <div className={style.noImg}>
                      <span>🍱</span>
                    </div>
                  )}
                </div>
                <div className={style.cardBody}>
                  <h3>{dish.name}</h3>
                  <p>{dish.description}</p>
                  <div className={style.cardFooter}>
                    <span className={style.tag}>Fresh</span>
                    {/* <button className={style.orderBtn}>View Details</button> */}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className={style.empty}>No results — try a different search.</p>
        )}
      </section>

      <RestaurantFooter />
    </div>
  );
}
