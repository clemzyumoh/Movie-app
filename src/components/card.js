import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";

const Card = ({ data, trending, index, media_type }) => {
  const imageUrl = useSelector((state) => state.movieData.imageUrl);
  const mediaType = data.media_type ?? media_type;
  return (
    <Link
      to={"/" + mediaType + "/" + data.id}
      className="w-full min-w-[230px] max-w-[230px] h-80 overflow-hidden block rounded relative hover:scale-105 transition-all"
    >
      {data?.poster_path ? (
        <img src={imageUrl + data?.poster_path} alt="images" />
      ) : (
        <div className="flex justify-center items-center bg-neutral-800 w-full h-full">No Image Found</div>
      )}
      {/**<img src={imageUrl + data?.poster_path} alt="images" />**/}
      <div className="absolute top-5">
        {trending && (
          <div className="py-1 px-4 bg-black/60 backdrop-blur-3xl rounded-r-full  overflow-hidden">
            #{index} Trending
          </div>
        )}
      </div>
      <div className="absolute bottom-0 h-16 w-full backdrop-blur-3xl bg-black/60 p-2">
        <h2 className="text-ellipsis line-clamp-1 text-lg font-semibold">
          {data.title || data.name}
        </h2>
        <div className="text-sm text-neutral-400 flex justify-between items-center">
          <p>{moment(data.release_date).format("MMMM Do YYYY")}</p>
          <p className="bg-black text-white px-1 rounded-full text-xs">
            {" "}
            Ratine : {Number(data.vote_average).toFixed(1)}{" "}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
