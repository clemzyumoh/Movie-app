import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../components/card";

const SearchPage = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const navigate = useNavigate();
  const query = location?.search?.slice(3);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`/search/multi`, {
        params: {
          query: location?.search?.slice(3),
          page: page,
        },
      });
      setData((previous) => {
        return [...previous, ...response.data.results];
      });
      // console.log("response", response.data.results);
    } catch (error) {
      console.log("error", error);
    }
  }, [location.search, page]);

  useEffect(() => {
    if (query) {
      setPage(1);
      setData([]);
      fetchData();
    }
  }, [fetchData,query]);
  
  const handleScroll = useCallback(() => {
    if (window.innerHeight + window.screenY >= document.body.offsetHeight) {
      setPage((previous) => previous + 1);
    }
  }, []);

  useEffect(() => {
    if (query) {
      fetchData();
    }
  }, [fetchData, query]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, [handleScroll]);



  return (
    <div className="py-16">
      <div className="lg:hidden my-2 mx-3 sticky top-[70px] z-30">
        <input
          type="text"
          placeholder="Search here..."
          onChange={(e) => navigate(`/search?Q=${e.target.value}`)}
          value={query?.split("%20")?.join(" ")}
          className="px-4 py-1 text-lg w-full bg-white rounded-full text-neutral-900 "
         // onChange={(e) => setSearchInput(e.target.value)}
         // value={searchInput}
        />
      </div>
      <div className="container mx-auto">
        <h3 className="capitalize text-lg lg:text-xl font-semibold my-3 ml-7">
          Search Results
        </h3>
        <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-4 justify-center lg:justify-start ml-7">
          {data.map((searchData, index) => {
            return [
              <Card
                data={searchData}
                key={searchData.id + "searchData"}
                media_type={searchData.media_type}
              />,
            ];
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
