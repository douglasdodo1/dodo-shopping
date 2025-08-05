"use client";
import { fakeStoreApi } from "@/services/fake-store-api";
import { useQuery } from "@tanstack/react-query";
import { productType } from "../types/product-type";
import { ProductCard } from "./product-card";
import { CardSkeleton } from "./card-skeleton";
import { useCallback } from "react";

export const HomeComponent = () => {
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

  const { data, error, isLoading } = useQuery<productType[]>({
    queryKey: ["products"],
    queryFn: fakeStoreApi,
  });

  return (
    <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {isLoading && [...Array(10)].map((key, index) => <CardSkeleton key={index} />)}

      {!isLoading &&
        !error &&
        data &&
        data.map((product: productType) => (
          <ProductCard key={product.id} product={product} onClick={() => handleAddToCart(product)} />
        ))}
    </div>
  );
};
