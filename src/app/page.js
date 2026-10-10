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
            <div className="flex w-52 flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
                <div className="flex flex-col gap-4">
                  <div className="skeleton h-4 w-20"></div>
                  <div className="skeleton h-4 w-28"></div>
                </div>
              </div>
              <div className="skeleton h-32 w-full"></div>
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
