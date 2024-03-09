import { FaRegUser } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { CiCircleList } from "react-icons/ci";
import { BsBox2 } from "react-icons/bs";
import { CiViewList } from "react-icons/ci";
export const sidebar = [
  {
    id: 1,
    name: "Dashboard",
    icon: BiCategory,
  },
  {
    id: 2,
    name: "User",
    icon: FaRegUser,
  },
  {
    id: 3,
    name: "Category",
    icon: CiCircleList,
  },
  {
    id: 4,
    name: "Product",
    icon: BsBox2,
  },
  {
    id: 5,
    name: "Order",
    icon: CiViewList,
  },
];