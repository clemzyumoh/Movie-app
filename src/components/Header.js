import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
//import log from "../assets/images/logo.jpeg";
//import { IoLogoAngular } from "react-icons/io";
//import styled from "styled-components"
import { FaUserCircle } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { navigation } from "../Contants/navigation";

const Header = () => {
   const location = useLocation();
   const removeSpace = location?.search?.slice(3)?.split("%20")?.join(" ")
  const [searchInput, setSearchInput] = useState(removeSpace);
  const navigate = useNavigate();
 

  console.log("location" , location.search.slice(3))

  useEffect(() => {
    if (searchInput) {
      navigate(`/search?Q=${searchInput}`);
    }
  }, [searchInput, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <header className="fixed z-40 top-0 w-full h-16 bg-black bg-opacity-50">
      <div className="flex w-full justify-between">
        <Link
          to={"/"}
          className="container mx-auto px-2 flex items-center h-full w-auto ml-0 mr-0"
        >
          <h1 className="font-extrabold text-lg mt-5 ml-5 ">MOVIE-ZONE</h1>
        </Link>
        <div className=" hidden lg:flex justify-between items-center mt-5 ">
          {navigation.map((nav, index) => {
            return [
              <div>
                <NavLink
                  key={nav.label}
                  to={nav.href}
                  className={({ isActive }) =>
                    `px-2 hover:text-neutral-100 ${
                      isActive && "text-neutral-100"
                    } `
                  }
                >
                  {nav.label}
                </NavLink>
              </div>,
            ];
          })}
        </div>
        <div className=" lg:ml-auto mt-3 mr-5 flex items-center gap-5 ">
          <form className="flex items-center gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search here..."
              className="bg-transparent px-4 py-1 outline-none border-none hidden lg:block"
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
            />
            <button className="text-2xl text-white">
              <IoSearchOutline />
            </button>
          </form>

          <div className="cursor-pointer active:scale-50 transition-all">
            <FaUserCircle className="w-10 h-10" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
