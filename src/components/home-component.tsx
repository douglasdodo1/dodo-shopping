"use client";
import { getAllProducts } from "@/services/get-all-products";
import { useQuery } from "@tanstack/react-query";
import { productType } from "../types/product-type";
import { CardSkeleton } from "./card-skeleton";
import { useCallback, useState } from "react";
import { useSearchContext } from "@/contexts/searchContext";
import { ProductCard } from "./product-card";

export const HomeComponent = () => {
  const { searchedProduct } = useSearchContext();
  const [isOpenShowProduct, setIsOpenShowProduct] = useState<boolean>(false);

  const handleAddToCart = useCallback((product: productType) => {
    const cartProducts = JSON.parse(localStorage.getItem("cart") || "[]");
    console.log("Adding to cart:", cartProducts);

    if (cartProducts) {
      const updatedCartProducts = cartProducts.filter((item: productType) => item.id !== product.id);
      localStorage.setItem("cart", JSON.stringify([...updatedCartProducts, product]));
    } else {
      localStorage.setItem("cart", JSON.stringify([product]));
    }
  }, []);

  const handleShowProduct = () => {
    setIsOpenShowProduct(true);
  };

  const { data, error, isLoading } = useQuery<productType[]>({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  return (
    <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {isLoading && [...Array(10)].map((key, index) => <CardSkeleton key={index} />)}

      {!isLoading &&
        !error &&
        searchedProduct !== "" &&
        data &&
        data
          .filter((product) => product.title.toLowerCase().includes(searchedProduct.toLowerCase()))
          .map((product) => (
            <ProductCard key={product.id} product={product} onClick={() => handleAddToCart(product)} />
          ))}

      {!isLoading &&
        !error &&
        searchedProduct === "" &&
        data &&
        data.map((product: productType) => (
          <ProductCard key={product.id} product={product} onClick={() => handleAddToCart(product)} />
        ))}
    </div>
  );
};
