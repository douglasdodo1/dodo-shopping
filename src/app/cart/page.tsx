import { CartProduct } from "@/components/cartProduct";

export default function Cart() {
  return (
    <div className="flex flex-col w-full gap-6">
      <div className="container mx-auto px-4 py-8">
        <CartProduct />
      </div>
    </div>
  );
}
