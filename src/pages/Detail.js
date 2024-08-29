import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";

import useFetchDetail from "../Hooks/UseFetchDetail";
import Divider from "../components/Divider";
import HorizontalScrollCard from "../components/HorizontalScrollCard";
import useFetch from "../Hooks/UseFetch";
import VideoPlay from "../components/VideoPlay";

const Detail = () => {
  const params = useParams();
  const imageUrl = useSelector((state) => state.movieData.imageUrl);
  const { data } = useFetchDetail(`${params?.explore}/${params?.id}`);
  const { data: castData } = useFetchDetail(
    `/${params?.explore}/${params?.id}/credits`
  );
  const { data: similarData } = useFetch(
    `/${params?.explore}/${params?.id}/similar`
  );
  const { data: recommendedData } = useFetch(
    `/${params?.explore}/${params?.id}/recommendations`
  );

  const [playVideo, setPlayVideo] = useState(false);
  const [playVideoId, setPlayVideoId] = useState("");

  const handlePlayVideo = (data) => {
    setPlayVideoId(data);
    setPlayVideo(true);
  };

  const duration = (Number(data?.runtime) / 60).toFixed(1).split(".");

  const writer = castData?.crew
    ?.filter((el) => el?.job === "Writer")
    .map((el) => el?.name)
    .join(", ");

  return (
    <div>
      <div className="w-full h-[280px] relative hidden lg:block">
        <div className="w-full h-full">
          <img
            src={imageUrl + data?.backdrop_path}
            className="h-full w-full object-cover top-0"
            alt="banner"
          />
        </div>
        <div className="absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900/90 to-transparent"></div>
      </div>
      <div className="container mx-auto px-3 py-16 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10">
        <div className="lg:-mt-28 relative mx-auto w-fit lg:ml-5 lg:mx-0">
          <img
            src={imageUrl + data?.poster_path}
            className="h-80 w-60 object-cover top-0 rounded min-w-60"
            alt="banner"
          />
          <button
            onClick={() => handlePlayVideo(data)}
            className="mt-3 w-full py-2 px-4 text-center bg-white text-black rounded text-lg font-bold hover:bg-gradient-to-l from-red-500 to-orange-500 hover:scale-105 transition-all"
          >
            Play Now
          </button>
        </div>
        <div>
          <h2 className="font-bold text-2xl lg:text-4xl text-white">
            {" "}
            {data?.title || data?.name}
          </h2>
          <p className="text-neutral-400">{data?.tagline}</p>
          <Divider />
          <div className="flex items-center  gap-2 lg:gap-3">
            <p>Rating : {Number(data?.vote_average).toFixed(1)}+</p>
            <span>|</span>
            <p>View : {Number(data?.vote_count)}</p>
            <span>|</span>
            <p>
              Duration : {duration[0]}hr {duration[1]}min{" "}
            </p>
          </div>
          <Divider />
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Overview</h3>
            <p>{data?.overview}</p>
            <Divider />
            <div className="flex items-center gap-4 my-3 text-center">
              <p>Status : {data?.status}</p>
              <span>|</span>
              <p>
                Release Date :
                {moment(data?.release_date).format("MMMM Do YYYY")}
              </p>
              <span>|</span>
              <p> Revenue : {Number(data?.revenue)}</p>
            </div>
            <Divider />
          </div>

          <div>
            <p>
              {" "}
              <span className="text-white">Director </span> :{" "}
              {castData?.crew[0]?.name}
            </p>
            <Divider />

            <div>
              <p className="text-white">
                {" "}
                <span className="text-white">Writer </span> : {writer}
              </p>
            </div>
            <Divider />
            <h2 className="text-lg lg:text-2xl font-bold my-3">Cast :</h2>
            <div className="grid grid-cols-[repeat(auto-fit,96px)] gap-5">
              {castData?.cast
                .filter((el) => el?.profile_path)
                .map((cast, index) => {
                  return (
                    <div>
                      <div>
                        <img
                          src={imageUrl + cast?.profile_path}
                          alt="profile"
                          className="w-24 h-24 object-cover rounded-full"
                        />
                      </div>
                      <p className="font-bold text-center text-sm text-neutral-400">
                        {" "}
                        {cast?.name || cast?.original_name}{" "}
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <div>
        <HorizontalScrollCard
          data={similarData}
          heading={"Similar  " + params?.explore}
          media_type={params?.explore}
        />
        <HorizontalScrollCard
          data={recommendedData}
          heading={"Recommended  " + params?.explore}
          media_type={params?.explore}
        />
      </div>

      {playVideo && (
        <VideoPlay
          data={playVideoId}
          close={() => setPlayVideo(false)}
          media_type={params?.explore}
        />
      )}
    </div>
  );
};

export default Detail;
