"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";

export const Navbar = () => {
  const router = useRouter();

  const handleCartClick = () => {
    router.push("/cart");
  };

  const handleLogoClick = () => {
    router.push("/");
  };

  return (
    <header className="border-b bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 sticky top-0 z-40 shadow-sm">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={handleLogoClick} className="hover:bg-transparent hover:shadow-none">
              <div>
                <h1 className="text-3xl font-bold bg-gray-700 bg-clip-text text-transparent">Dodo Shopping</h1>
                <p className="text-sm text-gray-500 font-medium">Vamos as compras!</p>
              </div>
            </Button>
          </div>

          <div className="flex items-center justify-center right-1/8 top-1/2 w-20 h-15 ">
            <Button className="w-15 h-15" variant="ghost" title="carrinho de compras" onClick={handleCartClick}>
              <ShoppingCart className="size-custom  w-16 h-12 " />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
