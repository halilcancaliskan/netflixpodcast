"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { BsPlayFill } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

const Home = () => {
  interface IMovie {
    poster_path: string;
    title: string;
    release_date: string;
    runtime: string;
    vote_average: string;
    overview: string;
    videos: { results: [{ type: string; key: string }] };
  }

  const searchParams = useSearchParams();

  const [showPlayer, setShowPlayer] = useState(false);
  const [trailer, setTrailer] = useState("");
  const [movie, setMovie] = useState<IMovie>();

  useEffect(() => {

    let searchMovie = searchParams.get("movie");

    if (searchMovie === null) {
      searchMovie = "avengers";
    }

    axios
      .get(`https://api.themoviedb.org/3/search/movie`, {
        params: {
          api_key: process.env.NEXT_PUBLIC_API_KEY,
          query: searchMovie,
        },
      })
      .then((res) => {
        axios
          .get(
            `https://api.themoviedb.org/3/movie/${res?.data?.results[0]?.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&append_to_response=videos`
          )
          .then((res) => {
            setMovie(res.data);
            console.log(res.data);
          });
      });
  }, [searchParams]);

  useEffect(() => {
    const trailerIndex = movie?.videos?.results?.findIndex(
      (element) => element.type === "Trailer"
    );

    const trailerURL = `https://www.youtube.com/watch?v=${movie?.videos?.results[trailerIndex || 0]?.key
      }`;
    setTrailer(trailerURL);
  }, [movie]);
  return (
    <div className="bg-secondary relative px-4 md:px-0">

      <div className="container mx-auto min-h-[calc(100vh-77px)] flex items-center relative">
        <div className="flex-col lg:flex-row flex gap-10 lg:mx-10 py-20">
          <div className="mx-auto flex-none relative">
            <Image
              src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
              width={700}
              height={700}
              className="w-[300px] object-cover"
              alt="movie poster"
              priority
              unoptimized  // Utilisez cette propriété pour contrôler le rendu côté serveur
            />
          </div>

          <div className="space-y-6">
            <div className="uppercase -translate-y-3 text-[26px] md:text-[34px] font-medium pr-4 text-white">
              {movie?.title}
            </div>
            <div className="flex flex-col md:flex-row gap-2 md:gap-6">
              <div>Durée : {movie?.runtime} MIN.</div>
              <div>Avis : {movie?.vote_average} ⭐</div>
            </div>

            <div className="pt-14 space-y-2 pr-4">
              <div>RÉSUMÉ :</div>
              <div className="lg:line-clamp-4">{movie?.overview}</div>
            </div>

            <div
              className="inline-block pt-6 cursor-pointer"
              onClick={() => setShowPlayer(true)}
            >
              <div className="flex gap-2 items-center bg-white text-black px-4 py-2 mb-6">
                Regarder la bande-annonce
              </div>
            </div>
          </div>
        </div>

        {/* React Player */}
        <div
          className={`absolute top-3 inset-x-[7%] md:inset-x-[13%] rounded overflow-hidden transition duration-1000 ${showPlayer ? "opacity-100 z-50" : "opacity-0 -z-10"
            }`}
        >
          <div className="flex items-center justify-between bg-black text-[#f9f9f9] p-3.5">
            <span className="font-semibold">Bande annonce</span>
            <div
              className="cursor-pointer w-8 h-8 flex justify-center items-center rounded-lg opacity-50 hover:opacity-75 hover:bg-[#0F0F0F]"
              onClick={() => setShowPlayer(false)}
            >
              <IoMdClose className="h-5" />
            </div>
          </div>
          <div className="relative pt-[56.25%]">
            <ReactPlayer
              url={trailer}
              width="100%"
              height="80%"
              style={{ position: "absolute", top: "0", left: "0" }}
              controls={true}
              playing={showPlayer}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;