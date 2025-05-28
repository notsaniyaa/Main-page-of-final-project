import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import useUserRole from "../hooks/useUserRole";
import { FaUserCircle } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import NotificationBell from "./NotificationBell";


function Navbar() {
  const [user, setUser] = useState(null);
  const { role} = useUserRole(); 
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      alert(error.message);
    }
  };


  return (
    <nav style={styles.navbar}>
      <div style={styles.leftLinks}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/about" style={styles.link}>About Us</Link>
        <Link to="/cart" style={styles.link}>Cart</Link>
        <a href="#contact" style={styles.link}>Contact Us</a>
      </div>

      <div style={styles.authLinks}>
        <button onClick={toggleTheme} style={styles.toggleButton}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>

        {user ? (
          <>
            <NotificationBell />
            <Link to="/profile" style={styles.iconLink}>
              <FaUserCircle size={28} />
            </Link>
            <button onClick={handleLogout} style={styles.button}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.buttonLink}>Login</Link>
            <Link to="/register" style={styles.buttonLink}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    background: "linear-gradient(90deg, #ff8a8a, #ffcccc)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  leftLinks: {
    display: "flex",
    gap: "25px",
  },
  authLinks: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "18px",
    fontWeight: "600",
    transition: "all 0.3s",
  },
  buttonLink: {
    backgroundColor: "#ffffff",
    color: "#ff6666",
    padding: "8px 16px",
    borderRadius: "8px",
    fontWeight: "600",
    textDecoration: "none",
    transition: "all 0.3s",
    fontSize: "16px",
    border: "2px solid #ff6666",
  },
  button: {
    backgroundColor: "#ffffff",
    color: "#ff6666",
    padding: "8px 16px",
    borderRadius: "8px",
    fontWeight: "600",
    border: "2px solid #ff6666",
    cursor: "pointer",
    transition: "all 0.3s",
    fontSize: "16px",
  },
  toggleButton: {
    backgroundColor: "transparent",
    color: "#fff",
    fontSize: "24px",
    border: "none",
    cursor: "pointer",
  },
  iconLink: {
    color: "#fff",
    textDecoration: "none",
    transition: "all 0.3s",
  },
};

export default Navbar;
