/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import api from "../utils/api";
import io from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL);

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  __v: number;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");
        setProducts(response?.data?.products);
      } catch (exception: any) {
        console.log("Exception: ", exception);
        setError(exception?.message || "Failed to Fetch Products");
      }
    };
    fetchProducts();

    socket.on("connect", () => {
      console.log("Connected to socket server");
    });

    socket.on("connect_error", (err) => {
      console.error("connect_error due to", err.message);
      setError(`connect_error: ${err.message}`);
    });

    socket.on("stockUpdate", (data) => {
      setProducts((prevProducts: any[]) =>
        prevProducts.map((product) =>
          product._id === data.productId
            ? { ...product, stock: data.newStock }
            : product
        )
      );
    });
    return () => {
      socket.off("stockupdate");
    };
  }, []);

  const handleAddToCart = async (productId: string) => {
    try {
      await api.post("/cart/add", {
        productId,
        quantity: 1,
      });
    } catch (exception: any) {
      console.log("Exception: ", exception);
      setError(exception?.message || "Failed to Add Cart");
    }
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Products</h1>
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {products?.length > 0 &&
            products?.map((product) => (
              <div className="border p-4 m-2 rounded shadow" key={product?._id}>
                <h2 className="text-xl font-semibold">{product?.name}</h2>
                <p className="text-gray-600">{product?.description}</p>
                <p className="text-gray-800 font-bold">
                  Price: {product?.price}
                </p>
                <p
                  className={
                    product?.stock > 0 ? "text-green-600" : "text-red-600"
                  }
                >
                  {product?.stock > 0
                    ? `Stock: ${product?.stock}`
                    : " Out of Stock"}
                </p>
                <button
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 hover:shadow disabled:opacity-50"
                  disabled={product?.stock === 0}
                  onClick={() => handleAddToCart(product?._id)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
export default ProductList;
