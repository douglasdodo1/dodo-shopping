import { productType } from "@/types/product-type";

export const getProduct = async (id: string) => {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data: productType = await response.json();
  return data;
};
