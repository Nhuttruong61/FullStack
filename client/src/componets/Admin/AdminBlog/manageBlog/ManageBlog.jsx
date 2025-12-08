import React, { memo, useEffect, useState } from "react";
import "./ManageBlog.scss";
import LoadingItem from "../../../Loading/LoadingItem";
import { CiCirclePlus } from "react-icons/ci";
import OptimizedTable from "../../../common/OptimizedTable/OptimizedTable";
import { FaPencilAlt } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import withBase from "../../../../hocs/withBase";
import { deleteBlog, getBlogs, updateBlog } from "../../../../api/blog";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import ModalCpn from "../../../common/Modal/ModalCpn";
import { IoMdClose } from "react-icons/io";
import Edittor from "../../../common/inputComponet/Edittor";
import { useQuery, useQueryClient } from "@tanstack/react-query";
function ManageBlog({ setActive }) {
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState(null);
  const [image, setImage] = useState(null);
  const queryClient = useQueryClient();
  const columns = [
    {
      Header: "ID",
      accessor: "id",
      width: 10,
    },
    {
      Header: "Tiêu đề",
      accessor: "title",
      width: 20,
    },
    {
      Header: "Slug",
      accessor: "slug",
      width: 20,
      Cell: ({ value }) => (
        <div className="slug-cell">
          <code>{value || "—"}</code>
        </div>
      ),
    },
    {
      Header: "Nội dung",
      accessor: "content",
      width: 28,
      Cell: ({ value }) => {
        const text = value?.slice(0, 80);
        return <div className="table-content-preview" dangerouslySetInnerHTML={{ __html: text }} />;
      },
    },
    {
      Header: "Ảnh",
      accessor: "avatar",
      width: 12,
      Cell: ({ value }) => (
        <div className="table-avatar">
          <img src={value?.url} alt="Avatar" />
        </div>
      ),
    },
    {
      Header: "Hành động",
      width: 10,
      Cell: ({ row }) => (
        <div className="table-actions">
          <button
            className="btn-action btn-delete"
            onClick={() => handleDelete(row)}
            title="Xóa"
          >
            <AiOutlineDelete size={16} />
          </button>
          <button
            className="btn-action btn-edit"
            onClick={() => handleOpenEdit(row)}
            title="Chỉnh sửa"
          >
            <FaPencilAlt size={14} />
          </button>
        </div>
      ),
    },
  ];

  const fetchData = async () => {
    try {
      const res = await getBlogs();
      if (res.success) {
        return res?.blog;
      }
    } catch (e) {
      console.log(e);
    }
  };
  const { data: dataBlog } = useQuery({
    queryKey: ["blog"],
    queryFn: fetchData,
    retry: 1,
    retryDelay: 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    cacheTime: 50000,
    staleTime: 1000 * 600,
  });
  const handleDelete = async (data) => {
    try {
      const { id } = data?.values;
      Swal.fire({
        title: "Bạn có muốn xóa tin tức này?",
        showCancelButton: true,
        confirmButtonText: "Xóa",
      })
        .then(async (result) => {
          if (result.isConfirmed) {
            setLoading(true);
            const res = await deleteBlog(id);
            setLoading(false);
            if (res?.success) {
              fetchData();
              toast.success(res?.mes);
              queryClient.invalidateQueries("blog");
              Swal.fire("Đã xóa!", "", "Thành công");
            }
          }
        })
        .catch((e) => {
          setLoading(false);
          console.log(e);
        });
    } catch (err) {
      setLoading(false);
      console.error("An error occurred:", err);
    }
  };
  const handleOpenEdit = (data) => {
    setDataEdit(data?.values);
    setImage(data?.values?.avatar?.url);
    setIsEdit(true);
  };

  useEffect(() => {
    fetchData();
  }, []);
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        title: dataEdit?.title,
        avatar: image,
        content: dataEdit?.content,
      };

      setLoading(true);
      const res = await updateBlog(dataEdit.id, data);
      setLoading(false);

      if (res.success) {
        toast.success("Cập nhật thành công");
        setIsEdit(false);
        queryClient.invalidateQueries("blog");
      }
    } catch (e) {
      setLoading(false);
      toast.warning(e?.response?.data?.mes);
    }
  };
  return (
    <LoadingItem isLoading={loading}>
      <div className="blog-container">
        <div className="blog-header">
          <h2 className="blog-title">Quản lý bài viết</h2>
          <button className="btn-create" onClick={() => setActive(11)}>
            <CiCirclePlus size={20} />
            <span>Tạo mới</span>
          </button>
        </div>
        <div className="blog-table-wrapper">
          <OptimizedTable title="Danh sách bài viết" data={dataBlog || []} columns={columns} />
        </div>
      </div>

      <ModalCpn isOpen={isEdit}>
        <div className="modal-edit">
          <div className="modal-header">
            <h3 className="modal-title">Chỉnh sửa bài viết</h3>
            <button 
              className="modal-close" 
              onClick={() => setIsEdit(false)}
              aria-label="Đóng"
            >
              <IoMdClose size={24} />
            </button>
          </div>

          <form className="modal-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Tiêu đề</label>
              <input
                className="form-input"
                placeholder="Nhập tiêu đề bài viết"
                required
                type="text"
                id="title"
                value={dataEdit?.title || ""}
                onChange={(e) => setDataEdit({ ...dataEdit, title: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Nội dung</label>
              <div className="editor-wrapper">
                <Edittor
                  value={dataEdit?.content || ""}
                  setValue={(value) =>
                    setDataEdit({
                      ...dataEdit,
                      content: value,
                    })
                  }
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Ảnh bìa</label>
              <div className="image-upload">
                <label htmlFor="image" className="image-upload-label">
                  Chọn ảnh
                </label>
                <input 
                  id="image" 
                  type="file" 
                  hidden 
                  onChange={(e) => handleImg(e)}
                  accept="image/*"
                />
                {image && (
                  <div className="image-preview-wrapper">
                    <img src={image} alt="Preview" className="image-preview" />
                    <button
                      type="button"
                      className="btn-clear-image"
                      onClick={() => setImage(null)}
                    >
                      Xóa ảnh
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="form-actions">
              <button 
                type="button"
                className="btn-cancel"
                onClick={() => setIsEdit(false)}
              >
                Hủy
              </button>
              <button 
                type="submit"
                className="btn-submit"
                disabled={!dataEdit?.title || !image}
              >
                Cập nhật
              </button>
            </div>
          </form>
        </div>
      </ModalCpn>
    </LoadingItem>
  );
}

export default withBase(memo(ManageBlog));
