import { FaRegUser } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { CiCircleList } from "react-icons/ci";
import { BsBox2 } from "react-icons/bs";
import { CiViewList, CiImageOn } from "react-icons/ci";
import { IoNewspaperOutline } from "react-icons/io5";
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
  {
    id: 6,
    name: "Banner",
    icon: CiImageOn,
  },
  {
    id: 7,
    name: "Blog",
    icon: IoNewspaperOutline,
  },
];

export const colors = [
  { name: "Red", hex: "#FF0000", rgb: "255, 0, 0" },
  { name: "Green", hex: "#00FF00", rgb: "0, 255, 0" },
  { name: "Blue", hex: "#0000FF", rgb: "0, 0, 255" },
  { name: "Black", hex: "#000000", rgb: "0, 0, 0" },
  { name: "White", hex: "#FFFFFF", rgb: "255, 255, 255" },
  { name: "Yellow", hex: "#FFFF00", rgb: "255, 255, 0" },
  { name: "Cyan", hex: "#00FFFF", rgb: "0, 255, 255" },
  { name: "Magenta", hex: "#FF00FF", rgb: "255, 0, 255" },
  { name: "Gray", hex: "#808080", rgb: "128, 128, 128" },
  { name: "Purple", hex: "#800080", rgb: "128, 0, 128" },
  { name: "Orange", hex: "#FFA500", rgb: "255, 165, 0" },
  { name: "Brown", hex: "#A52A2A", rgb: "165, 42, 42" },
  { name: "Pink", hex: "#FFC0CB", rgb: "255, 192, 203" },
  { name: "Gold", hex: "#FFD700", rgb: "255, 215, 0" },
  { name: "Silver", hex: "#C0C0C0", rgb: "192, 192, 192" },
];

export const statusOptions = [
  {
    status: "Chờ xử lý",
  },
  {
    status: "Đang vận chuyển",
  },
  {
    status: "Đã giao",
  },
];
