import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    alert("Заказ успешно оформлен!");
    navigate("/order-form"); // Перенаправление на форму заявки
  };

  return (
    <div>
      <h2>Оформление заказа</h2>
      <button onClick={handleCheckout}>Подтвердить заказ</button>
    </div>
  );
};
export default Checkout;