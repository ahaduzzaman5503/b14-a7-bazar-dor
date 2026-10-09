import Image from "next/image";
import React, { Suspense } from "react";
import logo from "../../../assets/logo-icon.png";
import Link from "next/link";
import BanglaDate from "../date/BanglaDate";
import PriceTicker from "./PriceTicker";
import Categorylinks from "./Categorylinks.jsx";
import Userinfo from "../userInfo/Userinfo";

const Navber = () => {
  return (
    <div className="container mx-auto">
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <Link href="/" className="flex gap-2 items-center">
            <Image
              src={logo}
              alt="Logo"
              className="bg-green-500 rounded-md p-1 w-10 h-10"
              width={50}
              height={50}
            ></Image>

            <div className="flex flex-col items-start">
              <h2 className="text-lg font-bold">বাজার দর</h2>
              <BanglaDate />
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Userinfo />
        </div>
      </div>

      <Suspense fallback={<div className="h-8" />}>
        <Categorylinks />
      </Suspense>
      <PriceTicker />
    </div>
  );
};

export default Navber;
