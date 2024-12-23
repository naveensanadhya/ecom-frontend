"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { NextComponentType, NextPageContext } from "next";

const withAuth = <P extends object>(
  Component: NextComponentType<NextPageContext, any, P>
) => {
  const ComponentWithAuth = (props: P) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
      }
    }, [router]);
    return <Component {...props} />;
  };
  return ComponentWithAuth;
};
export default withAuth;
