function Checkout() {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold">Оформление заказа</h1>
        <form className="mt-4">
          <input type="text" placeholder="Имя" className="border p-2 w-full mb-2" />
          <input type="text" placeholder="Адрес" className="border p-2 w-full mb-2" />
          <input type="text" placeholder="Телефон" className="border p-2 w-full mb-2" />
          <button className="bg-blue-500 text-white px-4 py-2">Заказать</button>
        </form>
      </div>
    );
  }
  
  export default Checkout;
  