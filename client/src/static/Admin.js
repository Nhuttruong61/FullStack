import { FaRegUser } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { CiCircleList } from "react-icons/ci";
import { BsBox2 } from "react-icons/bs";
import { CiViewList, CiImageOn } from "react-icons/ci";
import { IoNewspaperOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { RiCoupon3Line } from "react-icons/ri";
export const sidebar = [
  {
    id: 1,
    name: "Bảng Điều Khiển",
    icon: BiCategory,
  },
  {
    id: 2,
    name: "Người Dùng",
    icon: FaRegUser,
  },
  {
    id: 3,
    name: "Danh Mục",
    icon: CiCircleList,
  },
  {
    id: 4,
    name: "Sản Phẩm",
    icon: BsBox2,
  },
  {
    id: 5,
    name: "Đơn Hàng",
    icon: CiViewList,
  },
  {
    id: 6,
    name: "Banner",
    icon: CiImageOn,
  },
  {
    id: 7,
    name: "Bài Viết",
    icon: IoNewspaperOutline,
  },
  {
    id: 8,
    name: "Mã Giảm Giá",
    icon: RiCoupon3Line,
  },
  {
    id: 9,
    name: "Cài Đặt",
    icon: IoSettingsOutline,
  },
];

export const colors = [
  { name: "Đỏ", hex: "#FF0000", rgb: "255, 0, 0" },
  { name: "Xanh lá cây", hex: "#00FF00", rgb: "0, 255, 0" },
  { name: "Xanh dương", hex: "#0000FF", rgb: "0, 0, 255" },
  { name: "Đen", hex: "#000000", rgb: "0, 0, 0" },
  { name: "Trắng", hex: "#FFFFFF", rgb: "255, 255, 255" },
  { name: "Vàng", hex: "#FFFF00", rgb: "255, 255, 0" },
  { name: "Xanh lam", hex: "#00FFFF", rgb: "0, 255, 255" },
  { name: "Đỏ tươi", hex: "#FF00FF", rgb: "255, 0, 255" },
  { name: "Xám", hex: "#808080", rgb: "128, 128, 128" },
  { name: "Tím", hex: "#800080", rgb: "128, 0, 128" },
  { name: "Cam", hex: "#FFA500", rgb: "255, 165, 0" },
  { name: "Nâu", hex: "#A52A2A", rgb: "165, 42, 42" },
  { name: "Hồng", hex: "#FFC0CB", rgb: "255, 192, 203" },
  { name: "Vàng đồng", hex: "#FFD700", rgb: "255, 215, 0" },
  { name: "Bạc", hex: "#C0C0C0", rgb: "192, 192, 192" },
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
