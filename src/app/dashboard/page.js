"use client"

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import UploadPage from './Uploadlocal';
import styles from './dashboard.module.css';
import { SkeletonCard, SkeletonProfile } from '@/components/Skeleton';

const Dashboard = () => {
  const router = useRouter();
  const [render, setRender] = useState(false);
  const [dishValidateMessage, setDishValidateMessage] = useState();
  const [loading, setLoading] = useState(true);
  const [editmode, setEditmode] = useState(false);
  const [editDish, setEditDish] = useState(null);
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [restaurant, setRestaurant] = useState('');
  const [updated, setUpdated] = useState(false);
  const [dishes, setDishes] = useState([]);
  const [isNewDish, setIsNewDish] = useState(false);
  const [newDish, setNewDish] = useState({
    email: "",
    name: "",
    description: ""
  });
  const [uploadVisible, setUploadVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const handleSetProfile = (data) => {
    setImageUrl(data);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userToken = Cookies.get("token");
      if (userToken) setToken(userToken);
    }
  }, []);

  useEffect(() => {
    if (!token) return;

    const fetchUser = async () => {
      setLoading(true);
      try {
        let res = await fetch("/api/crud/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });
        res = await res.json();
        const userDetails = res.user;
        setEmail(userDetails.email || "");
        setName(userDetails.name || "");
        setCity(userDetails.city || "");
        setRestaurant(userDetails.restaurant || "");
        setImageUrl(userDetails.profileUrl || null);
        await fetchDishes(userDetails.email);
      } catch (err) {
        console.error("Fetch user error", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchDishes = async (userEmail) => {
      try {
        const response = await fetch("/api/crud/user/dishes", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "email": userEmail
          }
        });
        const data = await response.json();
        setDishes(data);
      } catch (error) {
        console.error("Error fetching dishes:", error);
      }
    };

    fetchUser();
  }, [token, render]);

  const updateUser = async () => {
    setEditmode(false);
    setLoading(true);
    try {
      let res = await fetch("/api/crud/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, name, email, city, restaurant }),
      });
      res = await res.json();
      setLoading(false);
      return res;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const deleteUser = async () => {
    await fetch("/api/crud/user", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    Cookies.remove("token");
    router.push("/restaurant");
  };

  const handleNewDishChange = (e) => {
    const { name, value } = e.target;
    setNewDish((prev) => ({ ...prev, [name]: value }));
  };

  const updateDish = async (dish) => {
    const res = await fetch("/api/crud/user/dishes", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: dish._id, name: dish.name, description: dish.description }),
    });
    const result = await res.json();
    result.success ? toast.success("Dish updated") : toast.error("Error updating dish");
    return result;
  };

  const validateDish = (d) => {
    if (!d.name || !d.description) return false;
    return true;
  };

  const createDish = async (dish) => {
    if (!validateDish(dish)) {
      toast.info("Please provide name and description");
      return;
    }
    const res = await fetch("/api/crud/user/dishes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, name: dish.name, description: dish.description }),
    });
    const result = await res.json();
    if (result.success) {
      toast.success("Dish Created");
      setRender(!render);
      setIsNewDish(false);
      setNewDish({ email: "", name: "", description: "" });
    } else {
      toast.error("Error creating dish");
    }
  };

  const deleteDish = async (dish) => {
    const res = await fetch("/api/crud/user/dishes", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: dish._id }),
    });
    setRender(!render);
    toast.success("Dish Deleted");
  };

  return (
    <div className={styles.dashboardContainer}>
      <ToastContainer position="bottom-right" />

      <section className={styles.welcomeSection}>
        <h2>Restaurant Dashboard</h2>
        <p>Manage your profile and menu items efficiently.</p>
      </section>

      <h3 className={styles.sectionTitle}>Business Profile</h3>
      {loading ? (
        <SkeletonProfile />
      ) : (
        <div className={styles.detailsCard}>
          <div className={styles.profileSection}>
            {imageUrl ? (
              <img className={styles.profilePic} src={imageUrl} alt="Profile" />
            ) : (
              <div className={styles.profilePic} style={{ background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>🥘</div>
            )}
            <button className={styles.uploadBtn} onClick={() => setUploadVisible(!uploadVisible)}>
              {uploadVisible ? "Close Upload" : "Change Photo"}
            </button>
            {uploadVisible && <UploadPage email={email} handleSetProfile={handleSetProfile} />}
          </div>

          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Email Address</span>
              <span className={styles.infoValue}>{email}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Owner Name</span>
              {editmode ? (
                <input className={styles.input} value={name} onChange={(e) => setName(e.target.value)} />
              ) : (
                <span className={styles.infoValue}>{name}</span>
              )}
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>City</span>
              {editmode ? (
                <input className={styles.input} value={city} onChange={(e) => setCity(e.target.value)} />
              ) : (
                <span className={styles.infoValue}>{city}</span>
              )}
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Restaurant Name</span>
              {editmode ? (
                <input className={styles.input} value={restaurant} onChange={(e) => setRestaurant(e.target.value)} />
              ) : (
                <span className={styles.infoValue}>{restaurant}</span>
              )}
            </div>

            <div className={styles.actionButtons}>
              <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => {
                if (editmode) updateUser().then(() => toast.success("Profile Updated"));
                setEditmode(!editmode);
              }}>
                {editmode ? "Save Changes" : "Edit Profile"}
              </button>
              <button className={`${styles.btn} ${styles.btnDanger}`} onClick={() => {
                if (confirm("Permanently delete account?")) deleteUser();
              }}>Delete Account</button>
            </div>
          </div>
        </div>
      )}

      <h3 className={styles.sectionTitle}>Menu Management</h3>
      <div className={styles.dishGrid}>
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : dishes.length === 0 ? (
          <p>No dishes found. Start by adding one!</p>
        ) : (
          dishes.map((dish) => (
            <div className={styles.dishCard} key={dish._id}>
              <div className={styles.dishHeader}>
                {editDish === dish._id ? (
                  <input className={styles.input} style={{ width: '100%' }} value={dish.name} onChange={(e) => setDishes(dishes.map(d => d._id === dish._id ? { ...d, name: e.target.value } : d))} />
                ) : (
                  <h4 className={styles.dishName}>{dish.name}</h4>
                )}
                <span className={styles.dishId}>ID: {dish._id}</span>
              </div>

              {editDish === dish._id ? (
                <textarea className={styles.input} value={dish.description} onChange={(e) => setDishes(dishes.map(d => d._id === dish._id ? { ...d, description: e.target.value } : d))} />
              ) : (
                <p className={styles.dishDesc}>{dish.description}</p>
              )}

              <div className={styles.dishActions}>
                <button className={`${styles.btn} ${styles.btnOutline}`} onClick={() => {
                  if (editDish === dish._id) {
                    updateDish(dish);
                    setEditDish(null);
                  } else {
                    setEditDish(dish._id);
                  }
                }}>
                  {editDish === dish._id ? "Save" : "Edit"}
                </button>
                <button className={`${styles.btn} ${styles.btnDanger}`} onClick={() => deleteDish(dish)}>Delete</button>
                {editDish === dish._id && <button className={`${styles.btn} ${styles.btnOutline}`} onClick={() => setEditDish(null)}>Cancel</button>}
              </div>
            </div>
          ))
        )}
      </div>

      <div style={{ maxWidth: '400px', margin: '40px auto' }}>
        {isNewDish && (
          <div className={styles.dishCard} style={{ marginBottom: '16px' }}>
            <h4 className={styles.dishName}>New Dish Details</h4>
            <input className={styles.input} name="name" placeholder="Dish Name" value={newDish.name} onChange={handleNewDishChange} />
            <textarea className={styles.input} name="description" placeholder="Description" value={newDish.description} onChange={handleNewDishChange} />
          </div>
        )}
        <button className={`${styles.btn} ${styles.addDishBtn}`} onClick={() => {
          if (isNewDish) createDish(newDish);
          else setIsNewDish(true);
        }}>
          {isNewDish ? "Confirm Add" : "+ Add New Menu Item"}
        </button>
        {isNewDish && <button className={`${styles.btn} ${styles.btnOutline}`} style={{ width: '100%', marginTop: '8px' }} onClick={() => setIsNewDish(false)}>Cancel</button>}
      </div>
    </div>
  );
};

export default Dashboard;
