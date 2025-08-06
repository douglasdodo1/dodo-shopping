"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import Image from "next/image";
import { productType } from "../types/product-type";
import { DotToComma } from "@/lib/dot-to-comma";

interface ProductDialogProps {
  product: productType;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  addToCart: () => React.Dispatch<React.SetStateAction<productType[]>> | void;
}

export function ProductDialog({ product, open, onOpenChange, addToCart }: ProductDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-2xl max-h-200 overflow-auto">
        <DialogHeader className="text-center">
          <DialogTitle>{product.title}</DialogTitle>
          <DialogDescription>{product.category}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-start p-4 max-h-140 space-y-4">
          <div className="relative w-full max-h-100 bg-gray-200  aspect-[3/4] overflow-hidden rounded-lg">
            <Image src={product.image || "/placeholder.svg"} alt={product.title} fill className="object-contain" />
          </div>
          <h2>Descrição do material</h2>
          <div className="w-full h-1/4 bg-gray-100 rounded-sm p-2 overflow-auto">
            <p className="text-sm text-gray-800 text-justify break-words hyphens-auto">{product.description}</p>
          </div>
        </div>

        <DialogFooter className="flex justify-center mt-2">
          <div className="flex items-center justify-center space-x-4">
            <p className="text-lg text-wrap text-center font-semibold">
              Valor do produto: R$ {DotToComma(product.price)}
            </p>
            <Button
              onClick={() => {
                onOpenChange(false);
                addToCart();
              }}
            >
              Adicionar ao carrinho
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
