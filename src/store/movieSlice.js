import { createSlice } from "@reduxjs/toolkit";

const initialState ={
  bannerData : [],
  imageUrl : ""
}

export const movieSlice = createSlice({
    name: "Movie_Zone",
    initialState,
    reducers:{
      setBannerData : (state,action) => {
        state.bannerData = action.payload
      },
      setImageUrl : (state,action) => {
        state.imageUrl = action.payload
      }
    }
})

export const {setBannerData, setImageUrl} = movieSlice.actions


export default movieSlice.reducer