import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { useTheme } from "../context/ThemeContext";

function Profile() {
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [language, setLanguage] = useState("en");
  const [photoURL, setPhotoURL] = useState("");
  const [newAvatar, setNewAvatar] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setDisplayName(currentUser.displayName || "");
        setEmail(currentUser.email || "");

        const localPhoto = localStorage.getItem(`avatar_${currentUser.uid}`);
        setPhotoURL(localPhoto || currentUser.photoURL || "");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSave = async () => {
    if (!user) return;
    setLoading(true);

    try {
      if (newAvatar) {
        const toBase64 = (file) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
          });

        const base64 = await toBase64(newAvatar);

        localStorage.setItem(`avatar_${user.uid}`, base64);
        setPhotoURL(base64);
      }

      await updateProfile(auth.currentUser, {
        displayName,
      });

      await auth.currentUser.reload();
      const updatedUser = auth.currentUser;

      setUser(updatedUser);
      setDisplayName(updatedUser.displayName || "");
      setNewAvatar(null);
      setIsEditing(false);
      alert("Профиль обновлён");
    } catch (error) {
      console.error("Ошибка обновления профиля:", error);
      alert("Ошибка при обновлении профиля");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>User Profile</h2>
        <div style={styles.avatarWrapper}>
          <img
            key={photoURL}
            src={photoURL || "https://via.placeholder.com/150"}
            alt="Avatar"
            style={styles.avatar}
          />
          {isEditing && (
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setNewAvatar(e.target.files[0])}
              style={styles.inputFile}
            />
          )}
        </div>

        <label style={styles.label}>Name</label>
        <input
          value={displayName}
          disabled={!isEditing}
          onChange={(e) => setDisplayName(e.target.value)}
          style={isEditing ? styles.input : styles.inputDisabled}
        />

        <label style={styles.label}>Email</label>
        <input value={email} disabled style={styles.inputDisabled} />

        <label style={styles.label}>Language</label>
        <select
          value={language}
          disabled={!isEditing}
          onChange={(e) => setLanguage(e.target.value)}
          style={isEditing ? styles.input : styles.inputDisabled}
        >
          <option value="en">English</option>
          <option value="ru">Russian</option>
        </select>

        <label style={styles.label}>Theme</label>
        <select
          value={theme}
          disabled={!isEditing}
          onChange={(e) => setTheme(e.target.value)}
          style={isEditing ? styles.input : styles.inputDisabled}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>

        {!isEditing ? (
          <button onClick={() => setIsEditing(true)} style={styles.buttonEdit}>
            Edit Profile
          </button>
        ) : (
          <button
            onClick={handleSave}
            style={{
              ...styles.buttonSave,
              backgroundColor: loading ? "#999" : "#4caf50",
              cursor: loading ? "not-allowed" : "pointer",
            }}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    padding: "40px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    maxWidth: "500px",
    width: "100%",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  label: {
    fontSize: "14px",
    marginBottom: "6px",
    marginTop: "12px",
    display: "block",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    width: "100%",
  },
  inputDisabled: {
    padding: "10px",
    borderRadius: "8px",
    backgroundColor: "#f2f2f2",
    width: "100%",
    border: "1px solid #ccc",
  },
  inputFile: {
    marginTop: "10px",
  },
  buttonSave: {
    marginTop: "20px",
    padding: "10px 16px",
    borderRadius: "8px",
    backgroundColor: "#4caf50",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
  },
  buttonEdit: {
    marginTop: "20px",
    padding: "10px 16px",
    borderRadius: "8px",
    backgroundColor: "#2196f3",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    cursor: "pointer",
  },
  avatarWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "20px",
  },
  avatar: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid #ff6666",
  },
};

export default Profile;
