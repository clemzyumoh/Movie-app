import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"
import Card from "../components/card"


function Explore() {
  const params = useParams();
  const [pageNo, setPageNo] = useState(1)
  const [data, setData] = useState([]);
const [totalPageNo,setTotalPageNo] = useState(0)

 
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`/discover/${params.explore}`, {
        params: {
          page: pageNo,
        },
      });
      setData((previous) => {
        return[
          ...previous,
          ...response.data.results
        ]
      })
      setTotalPageNo(response.data.total_pages)
     // console.log("response", response.data.results);
    } catch (error) {
      console.log("error", error)
    }
  },[pageNo,params.explore]);


  const handleScroll = useCallback(() => {
    if (
      pageNo < totalPageNo &&
      window.innerHeight + window.screenY >= document.body.offsetHeight
    ) {
      setPageNo((previous) => previous + 1);
    }
  },[pageNo,totalPageNo]);
  useEffect(()=>{
    fetchData()
  },[fetchData])

  useEffect(()=>{
  setTotalPageNo(1)
  setData([])
  fetchData()
  },[params.explore,fetchData])

useEffect(()=>{
  window.addEventListener("scroll", handleScroll)
},[handleScroll])

  return (
    <div className="py-16">
      <div className="container mx-auto">
        <h3 className="capitalize text-lg lg:text-xl ml-7 font-semibold my-3">
          Popular {params.explore} Show
        </h3>
        <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-4 justify-center lg:justify-start ml-7">
          {
            data.map((exploreData,index) => {
              return [
                <Card
                  data={exploreData}
                  key={exploreData.id + "exploreSection"}
                  media_type={params.explore}
                />,
              ];
            })
          }
        </div>
      </div>
    </div>
  );
}

export default Explore;
