"use client";
import React, { useEffect, useState } from "react";
import { productType } from "../types/product-type";
import Image from "next/image";
import { Button } from "./ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export const CartProduct = () => {
  const [products, setProducts] = useState<productType[]>([]);
  const [quantities, setQuantities] = useState<{ [id: string]: number }>({});
  const [total, setTotal] = useState<number>(0);
  const [imgLoading, setImgLoading] = useState<{ [id: string]: boolean }>({});

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    const parsed: productType[] = stored ? JSON.parse(stored) : [];
    setProducts(parsed);

    const initQty: { [id: string]: number } = {};
    const initLoad: { [id: string]: boolean } = {};
    parsed.forEach((p) => {
      initQty[p.id] = 1;
      initLoad[p.id] = true;
    });

    setQuantities(initQty);
    setImgLoading(initLoad);
  }, []);

  useEffect(() => {
    const newTotal = products.reduce((acc, p) => {
      const qty = quantities[p.id] || 1;
      return acc + p.price * qty;
    }, 0);
    setTotal(newTotal);
  }, [products, quantities]);

  const increaseQty = (id: string) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const decreaseQty = (id: string) => {
    if (quantities[id] === 1) {
      handleDelete(id);
    }
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) - 1, 1),
    }));
  };

  const handleConfirm = () => {
    alert(`Compra confirmada! Total: R$ ${total.toFixed(2)}`);
    localStorage.removeItem("cart");
    setProducts([]);
    setQuantities({});
    setTotal(0);
  };

  const handleDelete = (id: string) => {
    const newProducts = products.filter((p) => p.id !== id);
    localStorage.setItem("cart", JSON.stringify(newProducts));
    setProducts(newProducts);
  };

  return (
    <div className="relative min-h-screen bg-gray-50">
      <div className="space-y-4 p-4 pb-32 overflow-auto">
        {products.length === 0 ? (
          <p className="text-gray-500 text-center">Seu carrinho está vazio.</p>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between gap-4 p-4 border rounded-lg shadow-sm bg-white"
            >
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 aspect-[3/4] relative overflow-hidden rounded">
                  {imgLoading[product.id] && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                      <Skeleton className="w-6 h-6" />
                    </div>
                  )}
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain rounded"
                    onLoadingComplete={() => setImgLoading((prev) => ({ ...prev, [product.id]: false }))}
                  />
                </div>
                <div className="w-150">
                  <h2 className="text-xl font-semibold text-wrap">{product.title}</h2>
                </div>
              </div>

              <div className="flex items-center justify-end w-2/5">
                <div className="flex justify-end w-1/3">
                  <p className="text-gray-600 mt-1">R$ {product.price.toFixed(2)} / unidade</p>
                </div>
                <div className="flex items-center justify-center gap-2 w-2/8">
                  <Button variant="outline" size="sm" onClick={() => decreaseQty(product.id)}>
                    –
                  </Button>
                  <span className="w-6 text-center">{quantities[product.id] || 1}</span>
                  <Button variant="outline" size="sm" onClick={() => increaseQty(product.id)}>
                    +
                  </Button>
                </div>
                <div className="flex justify-end w-2/15">
                  <p className="text-gray-700 font-medium">
                    R$ {(product.price * (quantities[product.id] || 1)).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {products.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t p-4 flex flex-col items-center">
          <p className="text-lg font-semibold">Total da compra: R$ {total.toFixed(2)}</p>
          <Button variant="default" className="w-full max-w-md mt-3" onClick={handleConfirm}>
            Confirmar Compra
          </Button>
        </div>
      )}
    </div>
  );
};
