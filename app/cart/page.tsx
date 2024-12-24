/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import withAuth from "../components/withAuth";
import api from "../utils/api";
import Header from "../components/Header";
import { useRouter } from "next/navigation";

interface CartItem {
  productId: {
    _id: string;
    name?: string;
    description?: string;
    price: number;
    stock: number;
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
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isApiLoading, setIsApiLoading] = useState(false);
  const [apiLoadingMessage, setApiLoadingMessage] = useState("");
  const router = useRouter();
  useEffect(() => {
    const fetchCart = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/cart");
        if (response) {
          setCart(response?.data?.cart);
          setIsLoading(false);
        }
      } catch (exception) {
        console.log("Exception Fetching Cart: ", exception);
        setIsLoading(false);
      }
    };
    fetchCart();
  }, []);

  const updateQuantity = async (productId: string, quantity: number) => {
    try {
      setIsApiLoading(true);
      setApiLoadingMessage("Updating Product Quantity into the Cart...");
      const response = await api.put("/cart/items", {
        productId,
        quantity,
      });
      if (response) {
        setCart(response?.data?.cart);
        setIsApiLoading(false);
        setApiLoadingMessage("");
      }
    } catch (exception: any) {
      console.log(
        "Exception Update Product Quantity into the Cart: ",
        exception
      );
      setIsApiLoading(false);
      setApiLoadingMessage("");
      setError(
        exception?.message || "Exception Update Product Quantity into the Cart"
      );
    }
  };

  const removeItem = async (productId: string) => {
    try {
      setIsApiLoading(true);
      setApiLoadingMessage("Removing Item From Cart...");
      const response = await api.post("/cart/remove", {
        productId,
      });
      if (response) {
        setCart(response?.data?.cart);
        setIsApiLoading(false);
        setApiLoadingMessage("");
      }
    } catch (exception: any) {
      console.log("Exception Removing Item From Cart: ", exception);
      setIsApiLoading(false);
      setApiLoadingMessage("");
      setError(exception?.message || "Exception Removing Item From Cart");
    }
  };

  const checkoutCart = async () => {
    try {
      setIsApiLoading(true);
      setApiLoadingMessage("Checkout in Progress...");
      const response = await api.post("/cart/checkout");
      if (response) {
        setCart(null);
        setIsApiLoading(false);
        setApiLoadingMessage("");
        alert("Checkout successful!");
        router.push("/"); // Redirect to home or orders page
      }
    } catch (exception: any) {
      console.log("Exception Clearing Cart: ", exception);
      setIsApiLoading(false);
      setApiLoadingMessage("");
      setError(exception?.message || "Exception Clearing Cart");
    }
  };

  const calculateSubTotal = (item: CartItem[]) => {
    return item.reduce(
      (total, item) => total + item?.productId?.price * item?.quantity,
      0
    );
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="font-2xl font-bold mb-4">Shopping Cart</h1>
        {error && <p className="text-red-500">{error}</p>}
        {isLoading ? (
          <p className="font-2xl font-bold text-yellow-700 text-center p-4 border rounded shadow">
            Cart is Loading, Please Wait...
          </p>
        ) : cart?.items?.length ? (
          <>
            {isApiLoading && (
              <p className="mb-2 font-2xl font-bold text-yellow-700 text-center p-4 border rounded shadow">
                {apiLoadingMessage || "Processing"}, Please Wait...
              </p>
            )}
            <div className="flex flex-col lg:flex-row justify-between">
              <div className="lg:w-2/3 ">
                {cart.items.map((item) => (
                  <div
                    key={item?._id}
                    className="relative border p-4 rounded shadow mb-2"
                  >
                    <button
                      className="absolute top-2 right-2 px-2 py-1 bg-yellow-500 text-white rounded"
                      onClick={() => {
                        removeItem(item?.productId?._id);
                      }}
                    >
                      Remove
                    </button>
                    <h2 className="text-xl font-semibold">
                      {item?.productId?.name}
                    </h2>
                    <h6 className="mt-2 text-md text-gray-500">
                      {item?.productId?.description}
                    </h6>
                    <div className="mt-2 flex items-center">
                      <span className=" font-bold">Quantity:</span>
                      <button
                        className="ml-4 px-3 py-1 bg-red-500 text-white border rounded disabled:bg-red-300"
                        onClick={() => {
                          updateQuantity(
                            item?.productId?._id,
                            item?.quantity - 1
                          );
                        }}
                        disabled={item?.quantity === 1}
                      >
                        -
                      </button>
                      <span className="px-4 py-1 border ">
                        {item?.quantity}
                      </span>
                      <button
                        className=" px-3 py-1 bg-green-500 text-white border rounded disabled:bg-green-300"
                        onClick={() => {
                          updateQuantity(
                            item?.productId?._id,
                            item?.quantity + 1
                          );
                        }}
                        disabled={item?.productId?.stock === 0}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="w-full lg:w-1/3 mt-4 lg:mt-0 px-2 border rounded shadow">
                <h2 className="text-xl font-bold mb-4">Summary</h2>
                {cart?.items?.map((item) => (
                  <div key={item?._id} className="flex justify-between my-1">
                    <span>{item?.productId?.name}</span>
                    <span>
                      {`${item?.productId?.price} X ${item?.quantity} = ${
                        item?.quantity * item?.productId?.price
                      }/-`}
                    </span>
                  </div>
                ))}
                <hr />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{calculateSubTotal(cart?.items)}/-</span>
                </div>
                <hr />
                <div className="flex justify-end mx-1 my-2">
                  <button
                    className="p-2 border rounded bg-blue-500 text-white hover:bg-blue-700 disabled:bg-blue-400"
                    disabled={!cart?.items?.length || isLoading || isApiLoading}
                    onClick={checkoutCart}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p className="font-2xl font-bold text-red-500 text-center p-4 border rounded shadow">
            Your Cart is Empty
            <Link
              href="/"
              className="block border rounded font-semibold my-2 mx-auto px-4 py-2 bg-red-500 text-white hover:bg-red-700 hover:shadow w-[200px]"
            >
              Shop Now
            </Link>
          </p>
        )}
      </div>
    </>
  );
};
export default withAuth(Cart);
