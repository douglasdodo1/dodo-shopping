import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import Image from "next/image";
import { useState } from "react";
import { productType } from "../types/product-type";
import { ShoppingCart } from "lucide-react";
import { ProductDialog } from "./product-dialog";
import { DotToComma } from "@/lib/dot-to-comma";

interface productCardProps {
  product: productType;
  handleAddToCart: () => React.Dispatch<React.SetStateAction<productType[]>> | void;
}

export function ProductCard({ product, handleAddToCart }: productCardProps) {
  const coverUrl = product.image;

  const [isOpenShowProduct, setIsOpenShowProduct] = useState<boolean>(false);

  const onAddToCartClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    handleAddToCart();
  };

  return (
    <Card className="rounded-2xl group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50/50 border-0 shadow-lg overflow-hidden">
      <CardContent onClick={() => setIsOpenShowProduct(true)} className="p-0">
        <div className="aspect-[3/4] relative overflow-hidden rounded-t-2xl ">
          {coverUrl ? (
            <div className="absolute inset-0">
              <Image
                src={coverUrl || "/placeholder.svg"}
                alt={product.title}
                fill
                className="object-contain transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 group-hover:from-blue-200 group-hover:to-purple-200 transition-colors duration-300">
              <ShoppingCart className="w-16 h-16 text-blue-400 group-hover:text-blue-500 transition-colors duration-300" />
            </div>
          )}

          <Button
            variant="outline"
            size="icon"
            onClick={onAddToCartClick}
            className="absolute top-2 right-2 bg-white  rounded-full shadow-md hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="flex items-center justify-center w-full h-full rounded-full bg-blue-600 hover:bg-blue-700 transition-colors duration-200">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
          </Button>
        </div>
        <div className="p-4 space-y-3">
          <h3 className="font-bold text-sm leading-tight line-clamp-2 min-h-[3.5rem] text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
            {product.title}
          </h3>

          <div className="flex flex-col md:flex-row space-y-2 lg:space-y-0 items-center justify-between">
            <Badge className="bg-blue-100 text-blue-800 font-medium text-xs px-2 py-1 rounded-full">
              {product.category}
            </Badge>
            <span className="text-gray-600 font-semibold text-sm">R$: {DotToComma(product.price)}</span>
          </div>
        </div>
      </CardContent>

      <ProductDialog product={product} open={isOpenShowProduct} onOpenChange={setIsOpenShowProduct} addToCart={handleAddToCart} />
    </Card>
  );
}
