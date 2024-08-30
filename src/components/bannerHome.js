import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";


const BannerHome = () => {
  const bannerData = useSelector((state) => state.movieData.bannerData);
  const imageUrl = useSelector((state) => state.movieData.imageUrl);
  const [currentImage, setCurrentImage] = useState(0);
  
  const handleNext = useCallback(() => {
    if (currentImage < bannerData.length - 1) {
      setCurrentImage((previous) => previous + 1);
    }
  }, [currentImage, bannerData.length]);
  const handlePrevious = () => {
    if (currentImage > 0) {
      setCurrentImage((previous) => previous - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentImage < bannerData.length - 1) {
        handleNext();
      } else {
        setCurrentImage(0);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [bannerData, imageUrl, currentImage, handleNext]);

  return (
    <div className="w-full h-full">
      <div className="flex min-h-full max-h-[95vh] overflow-hidden">
        {bannerData.map((data, index) => {
          return (
            <div
              key={data.id + "bannerHome" + index}
              className="min-w-full min-h-[450px] lg:min-h-full overflow-hidden transition-all relative group"
              style={{ transform: `translateX( -${currentImage * 100}%)` }}
            >
              <div className="w-full h-full">
                <img
                  src={imageUrl + data.backdrop_path}
                  alt="images"
                  className="h-full w-full object-cover"
                />
              </div>
              {/** slider icon */}
              <div className="absolute top-0 w-full h-full hidden  items-center justify-between px-4 group-hover: lg:flex">
                <button
                  onClick={handlePrevious}
                  className=" bg-white p-1 rounded-full text-black text-xl hover:bg-white z-10"
                >
                  <FaAngleLeft />
                </button>
                <button
                  onClick={handleNext}
                  className=" bg-white p-1 rounded-full text-black text-xl hover:bg-white z-10"
                >
                  {" "}
                  <FaAngleRight />{" "}
                </button>
              </div>

              <div className="absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent"></div>

              <div className="container mx-auto ml-2 lg:ml-5">
                <div className="container mx-auto w-full absolute bottom-0 max-w-md px-3">
                  <h2 className="font-bold text-2xl lg:text-4xl text-white drop-shadow-2xl">
                    {" "}
                    {data.title || data.name}
                  </h2>
                  <p className="text-ellipsis line-clamp-3 my-2">
                    {" "}
                    {data.overview}{" "}
                  </p>
                  <div className="flex items-center gap-4">
                    {" "}
                    <p>Rating : {Number(data.vote_average).toFixed(1)}+</p>
                    <span>|</span>
                    <p>View : {Number(data.popularity).toFixed(0)} </p>
                  </div>
                  <Link to={"/" + data?.media_type + "/" + data?.id}>
                    <button className="bg-white px-4 py-2 text-black font-bold rounded mt-4 mb-3 border-none  hover:bg-gradient-to-l from-red-700 to-orange-500 shadow-md transition-all hover:scale-105">
                      Play Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BannerHome;
