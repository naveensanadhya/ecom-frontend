"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import withAuth from "../components/withAuth";
import api from "../utils/api";

const Cart = () => {
  const [cart, setCart] = useState();
  const router = useRouter();
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
          {cart?.items?.length > 0 &&
            cart?.items?.map((item: any) => (
              <div
                key={item?.productId}
                className="flex items-center justify-between border"
              ></div>
            ))}
        </div>
      </div>
    </>
  );
};
export default withAuth(Cart);
