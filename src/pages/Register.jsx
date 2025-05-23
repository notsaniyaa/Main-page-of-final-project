import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore"; // Добавляем Firestore
import { auth } from "../firebase";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // Новое состояние для username

  const db = getFirestore(); // Инициализация Firestore

  const handleRegister = async () => {
    try {
      // Регистрация пользователя в Firebase Auth
      const { user } = await createUserWithEmailAndPassword(auth, email, password);

      // Сохранение данных пользователя в Firestore
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        email: user.email,
        username: username,
        role: "user",
        createdAt: new Date(),
      });

      alert("Registration successful!");
      setEmail("");
      setPassword("");
      setUsername("");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={styles.input}
      />
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
      <button onClick={handleRegister} style={styles.button}>
        Register
      </button>
      <p style={styles.link}>
        Already have an account? <a href="/login">Sign in →</a>
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

export default Register;