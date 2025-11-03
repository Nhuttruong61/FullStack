import React, { memo, useState } from "react";
import { useSelector } from "react-redux";
import OptimizedTable from "../../common/OptimizedTable/OptimizedTable";
import { FaPencilAlt } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import * as categoryApi from "../../../api/category";
import "./AdminCategory.scss";
import { CiCirclePlus } from "react-icons/ci";
import Modal from "../../common/Modal/Modal";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import withBase from "../../../hocs/withBase";
import { fetchCategory } from "../../../redux/slice/categorySlice";
import LoadingItem from "../../Loading/LoadingItem";
function AdminCategory({ dispatch }) {
  const { data } = useSelector((state) => state.category);
  const [isOpen, setisOpen] = useState(false);
  const [isOpenUpdate, setisOpenUpdate] = useState(false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [valueUpdated, setValueUpdated] = useState(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm();
  const columns = [
    {
      Header: "ID",
      accessor: "_id",
      width: 15,
    },
    {
      Header: "Tên",
      accessor: "name",
      width: 25,
    },
    {
      Header: "Slug",
      accessor: "slug",
      width: 25,
      Cell: ({ value }) => (
        <div className="slug-cell">
          <code>{value || "—"}</code>
        </div>
      ),
    },
    {
      Header: "Ảnh",
      accessor: "image",
      width: 15,
      Cell: ({ value }) => (
        <div className="table-avatar">
          <img src={value?.url} alt="Category" />
        </div>
      ),
    },
    {
      Header: "Hành động",
      width: 20,
      Cell: ({ row }) => (
        <div className="table-actions">
          <button
            onClick={() => handleDelete(row)}
            className="btn-action btn-delete"
            title="Xóa danh mục"
          >
            <AiOutlineDelete size={16} />
          </button>
          <button
            onClick={() => handleOpenEdit(row)}
            className="btn-action btn-edit"
            title="Chỉnh sửa danh mục"
          >
            <FaPencilAlt size={14} />
          </button>
        </div>
      ),
    },
  ];

  const handleDelete = async (data) => {
    try {
      const { _id } = data?.values;
      Swal.fire({
        title: "Bạn có muốn xóa danh mục này?",
        text: "Hành động này không thể hoàn tác",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Xóa",
        cancelButtonText: "Hủy",
        confirmButtonColor: "#ff9921",
        cancelButtonColor: "#888",
        background: "#2A2A2B",
        color: "#ffffff",
        customClass: {
          title: "swal-title",
          htmlContainer: "swal-text",
          confirmButton: "swal-btn-confirm",
          cancelButton: "swal-btn-cancel",
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          setLoading(true);
          const res = await categoryApi.deleteCategory(_id);
          setLoading(false);
          if (res?.success) {
            toast.success(res?.mes);
            dispatch(fetchCategory());
            Swal.fire({
              title: "Đã xóa!",
              text: "Danh mục đã được xóa thành công",
              icon: "success",
              confirmButtonColor: "#ff9921",
              background: "#2A2A2B",
              color: "#ffffff",
            });
          }
        }
      });
    } catch (err) {
      setLoading(false);
      Swal.fire({
        title: "Lỗi!",
        text: "Có lỗi xảy ra khi xóa danh mục",
        icon: "error",
        confirmButtonColor: "#ff9921",
        background: "#2A2A2B",
        color: "#ffffff",
      });
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
  const onCreate = async (res) => {
    try {
      if (!image) return toast.warning("Ảnh không được để trống");
      const data = { name: res?.name, image: image };
      setLoading(true);

      const response = await categoryApi.createCategory(data);
      setLoading(false);

      if (response?.success) {
        setImage(null);
        reset();
        dispatch(fetchCategory());
        setisOpen(false);
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };
  const handleOpenEdit = (data) => {
    setImage(null);
    setValueUpdated(data);
    setValue("name", data?.name);
    setisOpenUpdate(true);
  };
  
  const handleCloseCreate = () => {
    setisOpen(false);
    setImage(null);
    reset();
  };

  const handleCloseUpdate = () => {
    setisOpenUpdate(false);
    setImage(null);
    reset();
  };
  const handleUpdate = async (res) => {
    try {
      const data = {
        name: res?.name,
        image: image ? image : valueUpdated?.image?.url,
      };
      const id = valueUpdated?._id;
      setLoading(true);
      const response = await categoryApi.updateCategory(id, data);
      setLoading(false);
      if (response.success) {
        toast.success("Cập nhật danh mục thành công");
        dispatch(fetchCategory());
        reset();
        setisOpenUpdate(false);
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };
  return (
    <LoadingItem isLoading={loading}>
      <div className="category">
        <div className="category--create">
          <div className="category--create--btn" onClick={() => setisOpen(true)}>
            <CiCirclePlus size={24} />
            <p>Tạo mới</p>
          </div>
        </div>
        <OptimizedTable title="Danh mục sản phẩm" data={data || []} columns={columns} />
        <Modal isOpen={isOpen} setisOpen={handleCloseCreate} title="Tạo Danh Mục Mới">
          <div className="modal-form">
            <form onSubmit={handleSubmit(onCreate)}>
              <div className="form-group">
                <label htmlFor="">Tên danh mục</label>
                <input
                  placeholder="Nhập tên danh mục"
                  type="text"
                  id="name"
                  {...register("name", { required: true })}
                />
                {errors?.name && <p className="error-message">Tên danh mục không được bỏ trống</p>}
              </div>
              <div className="form-group form-group--image">
                <label htmlFor="image">Ảnh</label>
                <label htmlFor="image" className="image-upload">
                  <span>Chọn ảnh</span>
                </label>
                <input id="image" type="file" hidden onChange={(e) => handleImg(e)} />
                {image && (
                  <img
                    className="image-preview"
                    src={image}
                    alt="preview"
                  />
                )}
              </div>
              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={handleCloseCreate}>Hủy</button>
                <button type="submit" className="btn-submit">Tạo mới</button>
              </div>
            </form>
          </div>
        </Modal>
        <Modal isOpen={isOpenUpdate} setisOpen={handleCloseUpdate} title="Cập Nhật Danh Mục">
          <div className="modal-form">
            <form onSubmit={handleSubmit(handleUpdate)}>
              <div className="form-group">
                <label htmlFor="">Tên danh mục</label>
                <input
                  placeholder="Nhập tên danh mục"
                  type="text"
                  id="name"
                  {...register("name", { required: true })}
                />
                {errors?.name && <p className="error-message">Tên danh mục không được bỏ trống</p>}
              </div>
              <div className="form-group form-group--image">
                <label htmlFor="image">Ảnh</label>
                <label htmlFor="image" className="image-upload">
                  <span>Chọn ảnh</span>
                </label>
                <input id="image" type="file" hidden onChange={(e) => handleImg(e)} />
                {image ? (
                  <img
                    className="image-preview"
                    src={image}
                    alt="preview"
                  />
                ) : (
                  <img
                    className="image-preview"
                    src={valueUpdated?.image?.url}
                    alt="current"
                  />
                )}
              </div>
              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={handleCloseUpdate}>Hủy</button>
                <button type="submit" className="btn-submit">Cập nhật</button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </LoadingItem>
  );
}

export default withBase(memo(AdminCategory));
