import Image from "next/image";
import herobannar from "../../../assets/bazar-hero.png";
import Link from "next/link";
import BanglaDate from "../date/BanglaDate";
const HeroBanner = () => {
  return (
    <section className="px-2 py-5 md:px-2">
      <div className="hero min-h-[280px] rounded-3xl border border-[#dce7de] bg-[#f8fbf9]">
        <div className="hero-content flex-col-reverse justify-between gap-4 px-2 py-4 md:w-full md:flex-row md:px-10">
          <div className="max-w-2xl flex-1">
            <span className="inline-block rounded-full bg-[#e0f2e7] px-3 py-1 text-sm font-medium text-[#07843d]">
              <BanglaDate />
            </span>

            <h1 className="mt-3 text-2xl font-bold leading-tight text-[#202a23] md:text-3xl">
              আজকের বাজারের দাম এক নজরে
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-7 text-[#68736b] md:text-base">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
              বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            <Link href="#সব-পণ্য">
              <button className="btn mt-6 min-h-10 border-none bg-[#078b43] px-6 text-sm font-semibold text-white shadow-md transition hover:bg-[#067536]">
                সব পণ্য দেখুন
              </button>
            </Link>
          </div>

          <div className="flex w-full shrink-0 items-center justify-center md:w-[350px]">
            <Image
              src={herobannar}
              alt="তাজা শাকসবজির ঝুড়ি"
              width={700}
              height={700}
              className="h-44 w-56 object-contain md:h-52 md:w-72"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
