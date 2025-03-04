import { useParams } from "react-router-dom";
import iceCreams from "../data/iceCreams";

function ProductDetail() {
  const { id } = useParams();
  const iceCream = iceCreams.find((ice) => ice.id === parseInt(id));

  if (!iceCream) return <div>Товар не найден</div>;

  return (
    <div className="container mx-auto p-4">
      <img src={iceCream.image} alt={iceCream.name} className="w-full h-64 object-cover rounded-lg" />
      <h1 className="text-3xl font-bold mt-4">{iceCream.name}</h1>
      <p className="text-gray-700">{iceCream.description}</p>
      <p className="text-xl font-semibold mt-2">{iceCream.price} ₸</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Добавить в корзину</button>
    </div>
  );
}

export default ProductDetail;
