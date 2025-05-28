import React from "react";
import { useTheme } from "../context/ThemeContext";
import ReviewSection from "../components/ReviewSection";

function AboutUs() {
  const { theme } = useTheme(); 
  const isDark = theme === "dark";
  
  const styles = {
    page: {
      background: isDark ? "#1e1e2f" : "#f8f8f8",
      color: isDark ? "#f2f2f2" : "#444",
      minHeight: "100vh",
      paddingBottom: "50px",
    },
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "60px 20px 30px",
      flexWrap: "wrap",
      maxWidth: "1200px",
      margin: "0 auto",
    },
    textContainer: {
      maxWidth: "600px",
      textAlign: "left",
      marginRight: "40px",
      marginBottom: "30px",
    },
    title: {
      fontSize: "40px",
      fontWeight: "bold",
      marginBottom: "20px",
      color: isDark ? "#ff8ca3" : "#ff6666",
    },
    text: {
      fontSize: "18px",
      lineHeight: "1.6",
      color: isDark ? "#dcdcdc" : "#444",
    },
    image: {
      width: "400px",
      borderRadius: "16px",
      boxShadow: isDark
        ? "0px 4px 20px rgba(255, 255, 255, 0.1)"
        : "0px 4px 20px rgba(0, 0, 0, 0.1)",
    },
    reviewsWrapper: {
      display: "flex",
      justifyContent: "center",
      padding: "30px 20px",
      background: isDark ? "#121212" : "#ffffff",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.textContainer}>
          <h1 style={styles.title}>{("About Us")}</h1>
          <p style={styles.text}>
            {("Welcome to Ice Cream Shop! We offer the most delicious and natural ice cream made from high-quality ingredients. Our goal is to bring joy with every scoop!")}
          </p>
          <p style={styles.text}>
            {("Whether you love classic flavors like vanilla and chocolate, or want to try unique options like mango and pistachio, we have something for everyone.")}
          </p>
        </div>
        <img
          src={`${process.env.PUBLIC_URL}/images/banner.jpg`}
          alt={("Ice Cream Shop")}
          style={styles.image}
        />
      </div>

      <div style={styles.reviewsWrapper}>
        <ReviewSection />
      </div>
    </div>
  );
}

export default AboutUs;
