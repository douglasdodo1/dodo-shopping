import { CartProduct } from "../components/cartProduct";
import { Navbar } from "../components/navbar";

export default function Cart(){
  return (
      <div className="flex flex-col w-full gap-6">
        <Navbar/>
        <div className="container mx-auto px-4 py-8">
            <CartProduct />
        </div>
    </div>
  );
}