import Link from "next/link";
import React from "react";
import CompanyLogo from "../public/images/logo.png";
import Image from "next/image";

const Header = () => {
  return (
    <header className="flex justify-between px-5 max-w-7xl mx-auto">
      {" "}
      <div className="flex items-center space-x-5">
        <div className="flex items-center mr-5 cursor-pointer">
          <Link href="/">
            <Image
              src={CompanyLogo}
              width={64}
              height={64}
              alt="comapny logo"
              className="cursor-pointer object-contain"
            />
          </Link>
          <h2 className="text-2xl font-serif">Crown</h2>
        </div>
        <ul className="hidden items-center space-x-5 md:inline-flex">
          <li className="cursor-pointer">
            <h3>About</h3>
          </li>
          <li className="cursor-pointer">
            <h3>Contact</h3>
          </li>
          <li className="cursor-pointer">
            <h3 className="text-white bg-green-400 px-4 py-2 rounded-full">
              Follow
            </h3>
          </li>
        </ul>
      </div>
      <ul className="flex items-center space-x-5 text-green-600">
        <li className="cursor-pointer">
          <h3>Sign In</h3>
        </li>
        <li className="cursor-pointer">
          <h3 className="border px-4 py-1 rounded-full transition-all delay-150 border-green-600 hover:text-white hover:bg-green-600">
            Get Started
          </h3>
        </li>
      </ul>
    </header>
  );
};

export default Header;
