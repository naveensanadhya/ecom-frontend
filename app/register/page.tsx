/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../utils/api";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/");
    }
  }, []);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const response = await api.post("/auth/register", { username, password });
      if (response) {
        setIsLoading(false);
        setMessage("Registration Successful, Now you can log in");
      }
    } catch (exception: any) {
      setIsLoading(false);
      console.log("Exception: ", exception);
      setMessage(exception?.message);
    }
  };

  return (
    <>
      <div className="container mx-auto mt-4 p-4 w-1/2 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Username</label>
            <input
              required
              type="text"
              className="border p-2 w-full rounded"
              onChange={(event) => {
                setUsername(event?.target?.value);
              }}
              value={username}
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              required
              type="password"
              className="border p-2 w-full rounded"
              onChange={(event) => {
                setPassword(event?.target?.value);
              }}
              value={password}
            />
          </div>
          <button
            className="bg-blue-500 px-4 py-2 text-white hover:bg-blue-700 hover:shadow rounded disabled:opacity-50"
            disabled={isLoading}
          >
            Register
          </button>
          <Link
            href="/login"
            className="block text-blue-400 hover:text-blue-600"
          >
            Click Here to Login
          </Link>
        </form>
        {message && <p className="mt-4">{message}</p>}
      </div>
    </>
  );
};
export default Register;
