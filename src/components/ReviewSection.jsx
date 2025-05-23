import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useTheme } from "../context/ThemeContext";

function ReviewSection() {
  const [user, setUser] = useState(null);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [reviews, setReviews] = useState([]);

  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const q = query(collection(db, "reviews_aboutus"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    const reviewsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setReviews(reviewsList);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    await addDoc(collection(db, "reviews_aboutus"), {
      comment,
      rating,
      userId: user.uid,
      userName: user.displayName || user.email,
      createdAt: serverTimestamp(),
    });

    setComment("");
    setRating(5);
    fetchReviews();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "reviews_aboutus", id));
    fetchReviews();
  };

  return (
    <div style={{ marginTop: "40px", maxWidth: "700px", width: "100%" }}>
      <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>Reviews and rating</h2>

      {user ? (
        <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Leave your feedback..."
            rows={3}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              backgroundColor: isDark ? "#2a2a2a" : "#fff",
              color: isDark ? "#eee" : "#000"
            }}
          />
          <div style={{ marginTop: "10px" }}>
            <label>Rating: </label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              style={{ padding: "5px", borderRadius: "5px" }}
            >
              {[5, 4, 3, 2, 1].map((num) => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="button-primary" style={{ marginTop: "10px" }}>
            Send
          </button>
        </form>
      ) : (
        <p>Log in to leave a review.</p>
      )}

      {reviews.map((review) => (
        <div
          key={review.id}
          style={{
            border: "1px solid",
            borderColor: isDark ? "#444" : "#ccc",
            backgroundColor: isDark ? "#2a2a2a" : "#fff",
            color: isDark ? "#eee" : "#000",
            padding: "12px",
            borderRadius: "10px",
            marginBottom: "12px"
          }}
        >
          <p style={{ marginBottom: "4px", fontSize: "14px" }}>
            <strong>{review.userName}</strong> — {review.createdAt?.toDate ? new Date(review.createdAt.toDate()).toLocaleString() : "время неизвестно"}
          </p>
          <div style={{ marginBottom: "6px" }}>
            {Array.from({ length: review.rating }).map((_, i) => (
              <span key={i}>⭐</span>
            ))}
          </div>
          <p>{review.comment}</p>
          {user?.uid === review.userId && (
            <button onClick={() => handleDelete(review.id)} className="button-danger" style={{ marginTop: "6px" }}>
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default ReviewSection;
