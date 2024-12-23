import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "../utils/api";
import io from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL);

const Header = () => {
  const [cartCount, setCartCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchCart = async () => {
      const response = await api.get("/cart/count");
      setCartCount(response?.data?.cartCount);
    };
    fetchCart();

    socket.on("cartCount", (data) => {
      setCartCount(data?.cartCount);
    });
    return () => {
      socket.off("cartCount");
    };
  }, []);
  return (
    <>
      <header className="bg-gray-800 text-white p-4 flex justify-end items-center gap-6">
        <div>
          <Link
            href="/cart"
            className="bg-green-400 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Cart{cartCount > 0 && `(${cartCount})`}
          </Link>
        </div>
        <div>
          <div
            onClick={() => {
              localStorage.removeItem("token");
              router.push("/login");
            }}
            className="bg-red-400 hover:bg-red-700 text-white px-4 py-2 rounded cursor-pointer"
          >
            Logout
          </div>
        </div>
      </header>
    </>
  );
};
export default Header;
