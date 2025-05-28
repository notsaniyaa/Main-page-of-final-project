import { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        navigate("/"); 
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      alert(error.message);
    }
  };

  if (user) {
    return (
      <div style={styles.container}>
        <h2>Вход выполнен как: {user.email}</h2>
        <img
          src={user.photoURL || "https://via.placeholder.com/100"}
          alt="Avatar"
          style={{ width: "100px", height: "100px", borderRadius: "50%" }}
        />
        <button onClick={handleLogout} style={styles.button}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleLogin} style={styles.button}>
        Sign in
      </button>
      <p style={styles.link}>
        Forgot password? <a href="/forgot-password">Reset</a>
      </p>
      <p style={styles.link}>
        Don't have an account? <a href="/register">Create an account</a>
      </p>
    </div>
  );
}

const styles = {
  container: {
    margin: "50px auto",
    width: "300px",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    background: "#fff5f5",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "16px",
  },
  button: {
    width: "100%",
    backgroundColor: "#ff6666",
    color: "#fff",
    padding: "10px",
    marginTop: "15px",
    borderRadius: "8px",
    fontWeight: "bold",
    fontSize: "16px",
    border: "none",
    cursor: "pointer",
  },
  link: {
    marginTop: "10px",
    fontSize: "14px",
  },
};

export default Login;
