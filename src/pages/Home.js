import React from "react";
import BannerHome from "../components/bannerHome";
import { useSelector } from "react-redux";
import HorizontalScrollCard from "../components/HorizontalScrollCard";
//import axios from "axios";
import useFetch from "../Hooks/UseFetch";



const Home = () => {

  const trendingData = useSelector((state) => state.movieData.bannerData);
  //const [nowPLaying, setNowPLaying] = useState([]);
  const { data : nowPLaying} = useFetch("/movie/now_playing");
  const { data: topRated} = useFetch("/movie/top_rated");
  const { data: popular } = useFetch("/tv/popular");
  const { data: onAirTvSeries } = useFetch("/tv/on_the_air");

  // const fetchNowPlayingData = async() =>{
  //   try {
  //     const response = await axios.get("/movie/now_playing");
  //     setNowPLaying(response.data.results)
  //   } catch (error) {}
  // };
  // useEffect(() => {
  //   fetchNowPlayingData();
  // }, []);
  return (
    <div>
      <BannerHome />
      <HorizontalScrollCard
        data={trendingData}
        heading={"Trending "}
        trending={true}
      />
      <HorizontalScrollCard
        data={nowPLaying}
        heading={"Now Playing"}
        media_type={"movie"}
      />
      <HorizontalScrollCard
        data={topRated}
        heading={"Top Rated"}
        media_type={"movie"}
      />
      <HorizontalScrollCard
        data={popular}
        heading={"Popular"}
        media_type={"tv"}
      />
      <HorizontalScrollCard
        data={onAirTvSeries}
        heading={"On Air Tv Series"}
        media_type={"tv"}
      />
    </div>
  );
};

export default Home;
