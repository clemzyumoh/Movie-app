import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
//import App from './App';
import reportWebVitals from "./reportWebVitals";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import axios from "axios";
import { store } from "./store/store";
import {Provider} from "react-redux";

// setting up axios

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common["Authorization"] =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZjU1ZjI5NDc4NWY2MmZjN2Y5ZTExYjQ2Y2YyNmE0OSIsIm5iZiI6MTcyMzE2MTY1MC43NTEwNCwic3ViIjoiNjZiNTU5Yzk5MWQ0M2RiOWYwOThlZjUyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.Zf77ijVg30apy2OAebh06QZmIwYcIVg2dA9m4uU4oN8 ";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>

  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
