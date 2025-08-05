import { productType } from "@/app/types/product-type";

export const fakeStoreApi = async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data: productType[] = await response.json();
  console.log(data);

  return data;
};
