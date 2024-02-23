"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { Suspense, useState } from "react";
import Image from "next/image";
import Logo from "./TrailerVisionLogo.png";
import axios from "axios";

const genres = ["Horreur", "Comedie", "Action", "Drame"];

const Navbar = () => {
  const [input, setInput] = useState("");
  const router = useRouter();

  const searchMovie = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`?movie=${input}`);
    setInput("");
  };

  const filterByGenre = async (genre: string) => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/discover/movie",
        {
          params: {
            api_key: process.env.NEXT_PUBLIC_API_KEY,
            with_genres: getGenreId(genre),
          },
        }
      );

      console.log(`Filtered Movies for ${genre}:`, response.data.results);
      // Handle the API response, set state with filtered movies, etc.
    } catch (error) {
      console.error("Error fetching movies:", error);
      // Optionally set some state to show an error message or handle the error
    }
  };

  const getGenreId = (genre: string): number => {
    const genreMapping: Record<string, number> = {
      Horreur: 27,
      Comedie: 35,
      Action: 28,
      Drame: 18,
    };

    return genreMapping[genre] || 0;
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="bg-black py-5 px-4 md:px-0">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/">
            <Image
              src={Logo}
              alt="Trailer Vision Logo"
              width={40}
              height={20}
            />
          </Link>
          <div className="space-x-4">
            {genres.map((genre) => (
              <button
                key={genre}
                className="bg-blue-500 text-gray-100 py-2 px-4 rounded-md"
                onClick={() => filterByGenre(genre)}
              >
                {genre}
              </button>
            ))}
          </div>
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
                className="bg-blue-500 text-gray-100 py-2 px-4 color: #00a400 rounded-md"
              >
                Rechercher
              </button>
            </div>
          </form>
        </div>
      </div>
    </Suspense>
  );
};

export default Navbar;
