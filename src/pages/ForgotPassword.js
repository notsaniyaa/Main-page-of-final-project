import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent!");
      setEmail("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Password reset</h2>
      {message && <p style={styles.success}>{message}</p>}
      {error && <p style={styles.error}>{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleReset} style={styles.button}>
        Sent
      </button>
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
  success: { color: "green", margin: "10px 0" },
  error: { color: "red", margin: "10px 0" },
};

export default ForgotPassword;