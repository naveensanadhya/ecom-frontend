"use client";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import withAuth from "./components/withAuth";

const Home = () => {
  return (
    <>
      <Header />
      <ProductList />
    </>
  );
};
export default withAuth(Home);
