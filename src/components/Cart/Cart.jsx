import React from "react";
import { Trash2, Plus, Minus } from "lucide-react"; // Lucide ikonlarını kullanmak için

const Cart = () => {
  const cartItems = [
    {
      id: 1,
      name: "Ürün 1",
      price: 299.99,
      quantity: 1,
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    },
    {
      id: 2,
      name: "Ürün 2",
      price: 149.99,
      quantity: 2,
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    },
  ];

  return (
    <div className="mx-auto p-4 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Sepetim</h2>
      <ul className="divide-y divide-gray-200">
        {cartItems.map((item) => (
          <li key={item.id} className="flex py-4 items-center gap-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded-md"
            />
            <div className="flex-1">
              <h3 className="text-lg font-medium">{item.name}</h3>
              <p className="text-gray-500 text-sm">
                {item.price.toFixed(2)}₺
              </p>
              <div className="flex items-center mt-2 space-x-2">
                <button className="p-1 bg-gray-200 rounded hover:bg-gray-300">
                  <Minus size={16} />
                </button>
                <span className="px-2 text-sm">{item.quantity}</span>
                <button className="p-1 bg-gray-200 rounded hover:bg-gray-300">
                  <Plus size={16} />
                </button>
              </div>
            </div>
            <div className="text-right flex flex-col items-end justify-between h-full">
              <span className="text-gray-700 font-semibold">
                {(item.quantity * item.price).toFixed(2)}₺
              </span>
              <button className="mt-2 text-red-500 hover:text-red-700">
                <Trash2 size={18} />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex justify-between items-center">
        <span className="text-lg font-bold">Toplam:</span>
        <span className="text-xl font-bold text-green-600">
          {cartItems
            .reduce((total, item) => total + item.quantity * item.price, 0)
            .toFixed(2)}
          ₺
        </span>
      </div>
      <button className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-xl transition">
        Satın Al
      </button>
    </div>
  );
};

export default Cart;
