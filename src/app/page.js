import HeroBanner from "./components/homePage/HeroBanner";
import IncreasingPrices from "./components/homePage/IncreasingPrices";

export default function Home() {
  return (
    <div className="container mx-auto">
      <HeroBanner></HeroBanner>
      <IncreasingPrices></IncreasingPrices>
      <h1>This is Home page</h1>
    </div>
  );
}
