import { Suspense } from "react";
import AllProducts from "./components/homePage/AllProducts";
import DecreasingPrices from "./components/homePage/DecreasingPrices";
import HeroBanner from "./components/homePage/HeroBanner";
import IncreasingPrices from "./components/homePage/IncreasingPrices";

export default function Home() {
  return (
    <div className="bg-[#f0f5f0]">
      <div className="container mx-auto">
        <HeroBanner></HeroBanner>
        <Suspense
          fallback={
            <div className="py-10 text-center text-gray-500">
              Loading product prices...
            </div>
          }
        >
          <IncreasingPrices></IncreasingPrices>
          <DecreasingPrices></DecreasingPrices>
          <AllProducts></AllProducts>
        </Suspense>
      </div>
    </div>
  );
}
