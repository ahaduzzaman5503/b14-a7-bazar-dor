import DecreasingPrices from "./components/homePage/DecreasingPrices";
import HeroBanner from "./components/homePage/HeroBanner";
import IncreasingPrices from "./components/homePage/IncreasingPrices";

export default function Home() {
  return (
    <div className="container mx-auto">
      <HeroBanner></HeroBanner>
      <IncreasingPrices></IncreasingPrices>
      <DecreasingPrices></DecreasingPrices>
      <h1>This is Home page</h1>
    </div>
  );
}
