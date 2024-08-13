import { TiHome } from "react-icons/ti";
import { PiTelevisionSimpleBold } from "react-icons/pi";
import { BiSolidMoviePlay } from "react-icons/bi";
import { IoSearchOutline } from "react-icons/io5";


export const navigation = [
  {
    label: "TV SHOW",
    href: "tv",
    icon: <PiTelevisionSimpleBold />,
  },

  {
    label: "MOVIES",
    href: "movie",
    icon: <BiSolidMoviePlay />,
  },
];

export const mobNav = [
  {
    label: "HOME",
    href: "/",
    icon: <TiHome />,
  },
  ...navigation,
  {
    label: "search",
    href: "/search",
    icon: <IoSearchOutline />,
  },
];
