"use client";
import { getAllProducts } from "@/services/get-all-products";
import { useQuery } from "@tanstack/react-query";
import { productType } from "../types/product-type";
import { CardSkeleton } from "./card-skeleton";
import { useCallback, useState } from "react";
import { useSearchContext } from "@/contexts/searchContext";
import { ProductCard } from "./product-card";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { ShoppingCartIcon } from "lucide-react";

export const HomeComponent = () => {
  const { searchedProduct } = useSearchContext();
  const [confirmation, setConfirmation] = useState<boolean>(false);
  const [productsInCart, setProductsInCart] = useState<boolean>(false);

  const handleAddToCart = useCallback((product: productType) => {
    const cartProducts = JSON.parse(localStorage.getItem("cart") || "[]");

    const alreadyExists = cartProducts.some((item: productType) => item.id === product.id);

    if (!alreadyExists) {
      const updatedCart = [...cartProducts, product];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setConfirmation(true);
      setTimeout(() => setConfirmation(false), 2000);
    } else {
      setProductsInCart(true);
      setTimeout(() => setProductsInCart(false), 2000);
    }
  }, []);

  const { data, error, isLoading } = useQuery<productType[]>({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  return (
    <div className="relative">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {isLoading && [...Array(10)].map((_, index) => <CardSkeleton key={index} />)}

        {!isLoading &&
          !error &&
          searchedProduct !== "" &&
          data &&
          data
            .filter((product) => product.title.toLowerCase().includes(searchedProduct.toLowerCase()))
            .map((product) => (
              <ProductCard key={product.id} product={product} handleAddToCart={() => handleAddToCart(product)} />
            ))}

        {!isLoading &&
          !error &&
          searchedProduct === "" &&
          data &&
          data.map((product: productType) => (
            <ProductCard key={product.id} product={product} handleAddToCart={() => handleAddToCart(product)} />
          ))}
      </div>

      {confirmation && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 ">
          <Alert variant="default" className="bg-green-300">
            <ShoppingCartIcon className="h-4 w-4" />
            <AlertTitle>Produto adicionado!</AlertTitle>
            <AlertDescription>O item foi adicionado ao carrinho com sucesso.</AlertDescription>
          </Alert>
        </div>
      )}

      {productsInCart && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 ">
          <Alert variant="default" className="bg-green-300">
            <ShoppingCartIcon className="h-4 w-4" />
            <AlertTitle>Produto já no carrinho!</AlertTitle>
            <AlertDescription>O item já foi adicionado ao carrinho.</AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
};
