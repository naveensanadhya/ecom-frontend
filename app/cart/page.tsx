"use client";
import { useEffect, useState } from "react";
import withAuth from "../components/withAuth";
import api from "../utils/api";

interface CartItem {
  productId: {
    _id: string;
    name?: string;
  };
  quantity: number;
  _id: string;
}

interface Cart {
  _id: string;
  userId: string;
  items: CartItem[];
  __v: number;
}

const Cart = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await api.get("/cart");

        console.log("Response Fetching Cart: ", response);
        if (response) {
          setCart(response?.data?.cart);
        }
      } catch (exception) {
        console.log("Exception Fetching Cart: ", exception);
      }
    };
    fetchCart();
  }, []);

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="font-2xl font-bold mb-4">Cart</h1>
        <div className="space-y-4">
          {cart?.items?.length ? ( // Safely handle cases where `cart.items` might be undefined
            cart.items.map((item) => (
              <div
                key={item.productId._id}
                className="flex items-center justify-between border"
              >
                {item.productId.name || "Unknown Product"} - Quantity:{" "}
                {item.quantity}
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
      </div>
    </>
  );
};
export default withAuth(Cart);
