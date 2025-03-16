import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const OrderForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log("Заявка отправлена:", data);
    alert("Ваш заказ оформлен! Мы свяжемся с вами.");
    navigate("/"); // Перенаправляем на главную страницу после отправки
  };

  return (
    <div style={styles.container}>
      <h2>Заполните форму для подтверждения заказа</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
        <label>Имя:</label>
        <input {...register("name", { required: "Введите ваше имя" })} />
        {errors.name && <p style={styles.error}>{errors.name.message}</p>}

        <label>Email:</label>
        <input type="email" {...register("email", { required: "Введите email" })} />
        {errors.email && <p style={styles.error}>{errors.email.message}</p>}

        <label>Адрес доставки:</label>
        <input {...register("address", { required: "Введите адрес" })} />
        {errors.address && <p style={styles.error}>{errors.address.message}</p>}

        <button type="submit" style={styles.button}>Отправить заявку</button>
      </form>
    </div>
  );
};

const styles = {
  container: { maxWidth: "400px", margin: "auto", padding: "20px" },
  form: { display: "flex", flexDirection: "column", gap: "10px" },
  error: { color: "red", fontSize: "12px" },
  button: { background: "blue", color: "white", padding: "10px", cursor: "pointer" }
};

export default OrderForm;
