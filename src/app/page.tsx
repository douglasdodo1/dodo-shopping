import { HomeComponent } from "@/components/home-component";

export default function Home() {
  return (
    <div className="flex flex-col w-full gap-6">
      <div className="container mx-auto px-4 py-8">
        <HomeComponent />
      </div>
    </div>
  );
}
