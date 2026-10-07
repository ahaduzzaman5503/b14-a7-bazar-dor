import Image from "next/image";
import React from "react";
import logo from "../../../assets/logo-icon.png";
import Categorylinks from "./Categorylinks";
import Link from "next/link";
import BanglaDate from "../date/BanglaDate";
import PriceTicker from "./PriceTicker";

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

        <div className="flex gap-2">
          <button className="btn btn-soft">সাইন ইন</button>
          <button className="btn btn-success">সাইন আপ</button>
        </div>
      </div>
      <Categorylinks />
      <PriceTicker />
    </div>
  );
};

export default Navber;
