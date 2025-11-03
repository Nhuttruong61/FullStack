import React, { lazy, useEffect, useState } from "react";
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
        return;
      }
      setLoading(true);
      setisOpen(false);
      const res = await createBaner({ image: image });
      setLoading(false);
      if (res.success) {
        setImage(null);
        fetchbanner();
        toast.success("Tạo thành công");
      }
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <LoadingItem isLoading={loading}>
      <div className="banner-container">
        <div className="banner-header">
          <h2 className="banner-title">Quản lý Banner</h2>
          <button
            onClick={() => setisOpen(true)}
            className="btn btn-primary"
          >
            + Tạo mới
          </button>
        </div>

        <div className="banner-grid">
          {dataBanner?.length > 0 ? (
            dataBanner.map((banner) => (
              <div key={banner._id} className="banner-card">
                <div className="banner-card-image">
                  <img src={banner?.image?.url} alt="Banner" />
                </div>
                <div className="banner-card-actions">
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(banner)}
                    title="Xóa banner"
                  >
                    <AiOutlineDelete size={18} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="banner-empty">
              <p>Chưa có banner nào. Hãy tạo mới!</p>
            </div>
          )}
        </div>

        <DrawerCpn isOpen={isOpen} setisOpen={setisOpen}>
          <div className="drawer-content">
            <h3 className="drawer-title">Tạo Banner Mới</h3>
            
            <div className="drawer-image-section">
              <label htmlFor="image" className="image-label">
                Chọn ảnh
              </label>
              <input
                id="image"
                type="file"
                hidden
                onChange={(e) => handleImg(e)}
                accept="image/*"
              />
              
              {image ? (
                <div className="image-preview">
                  <img src={image} alt="Preview" />
                  <button
                    className="btn-clear"
                    onClick={() => setImage(null)}
                  >
                    Xóa ảnh
                  </button>
                </div>
              ) : (
                <div className="image-placeholder">
                  <p>Chưa có ảnh được chọn</p>
                </div>
              )}
            </div>

            <div className="drawer-actions">
              <button
                onClick={handleCreate}
                className="btn btn-primary"
                disabled={!image}
              >
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
