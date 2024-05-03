import React, { useEffect, useState } from "react";
import "./Banner.scss";
import { createBaner, deleteBanner, getBanner } from "../../../api/banner";
import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import DrawerCpn from "../../common/Drawer/Drawer";
import LoadingItem from "../../../componets/Loading/LoadingItem";
function Banner() {
  const [dataBanner, setDataBanner] = useState([]);
  const [isOpen, setisOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchbanner = async () => {
    const res = await getBanner();
    setDataBanner(res?.response);
  };
  useEffect(() => {
    fetchbanner();
  }, []);
  const handleDelete = async (data) => {
    try {
      const id = data._id;
      Swal.fire({
        title: "Bạn có muốn xóa danh mục này?",
        showCancelButton: true,
        confirmButtonText: "Xóa",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setLoading(true);
          const res = await deleteBanner(id);
          setLoading(false);
          if (res?.response?.success) {
            toast.success(res?.response?.mes);
            Swal.fire("Đã xóa!", "", "Thành công");
            fetchbanner();
          }
        }
      });
    } catch (e) {
      setLoading(false);
    }
  };
  const handleImg = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const render = new FileReader();
    render.onloadend = () => {
      const result = render.result;
      setImage(result);
    };

    render.readAsDataURL(file);
  };
  const handleCreate = async () => {
    try {
      if (!image) {
        toast.warning("Bạn phải chọn ảnh");
      }
      setLoading(true);
      setisOpen(false);
      const res = await createBaner({ image: image });
      setLoading(false);
      if (res.success) {
        fetchbanner();

        toast.success("Tạo thành công");
      }
    } catch (e) {
      setLoading(false);
    }
  };
  return (
    <LoadingItem isLoading={loading}>
      <div>
        <button
          onClick={() => setisOpen(true)}
          style={{
            margin: "2%",
          }}
          className="btn"
        >
          Tạo mới
        </button>
        <div className="banner">
          <div className="content">
            {dataBanner?.map((banner) => (
              <div className="banner--box">
                <div className="banner--box--left">
                  <img src={banner?.image?.url} alt="" />
                </div>
                <div className="banner--box--right">
                  <span onClick={() => handleDelete(banner)}>
                    <AiOutlineDelete size={16} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <DrawerCpn isOpen={isOpen} setisOpen={setisOpen}>
          <div className="drawer-bn">
            <div className="drawer-bn--image">
              <label htmlFor="image" className="drawer-bn--image--img">
                Ảnh
              </label>
              <input
                id="image"
                type="file"
                hidden
                onChange={(e) => handleImg(e)}
              />
              {image && (
                <img
                  style={{
                    width: "100px",
                    height: "100px",
                    paddingLeft: "20px",
                  }}
                  src={image}
                  alt=""
                />
              )}
            </div>
            <div className="drawer-bn--btn">
              <button onClick={handleCreate} className="btn" type="submit">
                Tạo mới
              </button>
            </div>
          </div>
        </DrawerCpn>
      </div>
    </LoadingItem>
  );
}

export default Banner;
