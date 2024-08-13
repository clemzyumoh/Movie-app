import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MobNav from "./components/MobNav";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBannerData , setImageUrl } from "./store/movieSlice";

function App() {
  const dispatch = useDispatch()

  const fetchTrending = async()=>{
    try {
      const response = await axios.get('/trending/all/week?');
      dispatch(setBannerData(response.data.results))
     // console.log("response",response.data.results)
    } catch (error) {
      console.log("error",error)
    }
  }
   const fetchConfiguration = async () => {
     try {
       const response = await axios.get("/configuration");
       dispatch(setImageUrl(response.data.images.secure_base_url + "original"));
       // console.log("configuration data",response)
     } catch (error) {
       console.log("error", error);
     }
   };
  useEffect(() => {
    fetchTrending()
    fetchConfiguration()
  });
  return (
    <main className="pb-14 lg:pb-0">
      <Header />
      <div className="min-h-[90vh]">
        <Outlet />
      </div>
      <Footer />
      <MobNav/>
    </main>
  );
}

export default App;
