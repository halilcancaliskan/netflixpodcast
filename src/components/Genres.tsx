import React from "react";

interface IGenres {
  index: number;
  name: string;
  length: number | undefined;
}

const Genres: React.FC<IGenres> = ({ index, name, length }) => {
  return (
    <div className="flex gap-4 text-textColor hover:text-white cursor-pointer">
      <div>{name}</div>
      <div className="text-textColor">{index + 1 !== length ? "/" : ""}</div>
    </div>
  );
};

export default Genres;
