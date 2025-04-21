import React from "react";

function AboutUs() {
  return (
    <div style={styles.container}>
      <div style={styles.textContainer}>
        <h1 style={styles.title}>About Us</h1>
        <p style={styles.text}>
          Welcome to Ice Cream Shop! We offer the most delicious and natural ice cream made from high-quality ingredients. 
          Our goal is to bring joy with every scoop!
        </p>
        <p style={styles.text}>
          Whether you love classic flavors like vanilla and chocolate, or want to try unique options like mango and pistachio, we have something for everyone.
        </p>
      </div>
      <img 
        src={`${process.env.PUBLIC_URL}/images/banner.jpg`} 
        alt="Ice Cream Shop" 
        style={styles.image} 
      />
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "50px",
    background: "#f8f8f8",
    minHeight: "80vh",
  },
  textContainer: {
    maxWidth: "600px",
    textAlign: "left",
    marginRight: "50px",
  },
  title: {
    fontSize: "36px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#ff6666",
  },
  text: {
    fontSize: "18px",
    lineHeight: "1.6",
    color: "#444",
  },
  image: {
    width: "400px",
    borderRadius: "10px",
    boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
  },
};

export default AboutUs;
