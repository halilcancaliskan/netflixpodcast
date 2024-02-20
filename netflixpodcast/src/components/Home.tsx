"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { IoMdClose } from "react-icons/io";
import dynamic from "next/dynamic";
import LandingPage from "./LandingPage";

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

  if (!searchParams.get("movie")) {
    return <LandingPage />;
  }

  return (
    <div
      className="relative px-4 md:px-0"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie?.poster_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay for Blur Effect */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-2xl"></div>

      {/* Content Container */}
      <div className="container mx-auto min-h-[calc(100vh-77px)] flex items-center relative z-10">
        <div className="flex-col lg:flex-row flex gap-10 lg:mx-10 py-20">
          {/* Movie Poster */}
          <div
            className="mx-auto flex-none relative rounded-md"
            style={{ boxShadow: "1px 1px 20px 1px rgba(255, 255, 255, 0.2)" }}
          >
            {movie?.poster_path && (
              <Image
                src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
                width={700}
                height={700}
                className="w-[300px] object-cover rounded-md"
                alt="movie poster"
                priority
                unoptimized
              />
            )}
          </div>

          {/* Movie Details */}
          <div className="space-y-6">
            <div className="uppercase -translate-y-3 text-[26px] md:text-[34px] font-medium pr-4 text-white">
              {movie?.title}
            </div>
            <div className="flex flex-col md:flex-row gap-2 md:gap-6">
              <div>Date de sortie : {movie?.release_date}</div>
              <div>Durée : {movie?.runtime} Minutes</div>
              <div>Note global : {movie?.vote_average}/10</div>
            </div>

            <div className="pt-14 space-y-2 pr-4">
              <div>Synopsis :</div>
              <div className="lg:line-clamp-4">{movie?.overview}</div>
            </div>

            {/* Trailer Button */}
            <div
              className="inline-block pt-6 cursor-pointer"
              onClick={() => setShowPlayer(true)}
            >
              <div className="flex gap-2 items-center bg-red-500 text-white px-4 py-2 mb-6 rounded-md cursor-pointer">
                Regarder la bande-annonce
              </div>
            </div>
          </div>
        </div>

        {/* React Player for Trailer */}
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