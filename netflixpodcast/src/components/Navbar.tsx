"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";
import Logo from "./TrailerVisionLogo.png";

const Navbar = () => {
  const [input, setInput] = useState("");
  const router = useRouter();

  const searchMovie = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`?movie=${input}`);
    setInput("");
  };

  return (
    <div className="bg-black py-5 px-4 md:px-0">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <Image src={Logo} alt="Trailer Vision Logo" width={40} height={20} />
        </Link>
        <form onSubmit={searchMovie}>
          <div className="space-x-4">
            <input
              className="bg-gray-200 px-4 py-2 outline-none placeholder:text-textColor text-gray-700 rounded-md"
              type="text"
              value={input}
              placeholder="Rechercher un film"
              onChange={(e) => setInput(e.target.value)}
            />

            <button
              type="submit"
              className="bg-red-500 text-gray-100  py-2 px-4 color: #00a400 rounded-md"
            >
              Rechercher
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Navbar;
