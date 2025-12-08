import React, { memo, useState, useEffect } from "react";
import OptimizedTable from "../../common/OptimizedTable/OptimizedTable";
import { FaPencilAlt } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import * as eventApi from "../../../api/event";
import * as productApi from "../../../api/product";
import "./AdminEvent.scss";
import { CiCirclePlus } from "react-icons/ci";
import Modal from "../../common/Modal/Modal";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import withBase from "../../../hocs/withBase";
import LoadingItem from "../../Loading/LoadingItem";
import moment from "moment";

function AdminEvent() {
  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [valueUpdated, setValueUpdated] = useState(null);
  const [banner, setBanner] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const { register, handleSubmit, reset, watch } = useForm();
  const startDate = watch("startDate");
  const endDate = watch("endDate");

  useEffect(() => {
    fetchEvents();
  }, [currentPage]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await productApi.getProduct({ page: 1, limit: 1000 });
      console.log("Products response:", res);
      if (res?.success) {
        console.log("Setting products:", res.products);
        setProducts(res.products || []);
      } else {
        console.error("API response not successful:", res);
      }
    } catch (e) {
      console.error("Error fetching products:", e);
      toast.error("Lỗi tải sản phẩm");
    }
  };

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await eventApi.getAllEvents(currentPage, 10, undefined);
      if (res?.success) {
        setEvents(res.events || []);
        setTotalPages(res.totalPages || 1);
      }
    } catch (e) {
      toast.error("Lỗi tải sự kiện");
    } finally {
      setLoading(false);
    }
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBanner(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectProduct = (productId) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const onSubmit = async (formData) => {
    try {
      if (!selectedProducts.length) {
        toast.warning("Vui lòng chọn ít nhất 1 sản phẩm");
        return;
      }

      const data = {
        name: formData.name,
        description: formData.description,
        startDate: new Date(formData.startDate),
        endDate: new Date(formData.endDate),
        discountPercent: parseFloat(formData.discountPercent),
        products: selectedProducts,
        banner: banner,
      };

      setLoading(true);
      const res = await eventApi.createEvent(data);
      setLoading(false);

      if (res?.success) {
        toast.success("Tạo sự kiện thành công");
        setBanner(null);
        setSelectedProducts([]);
        reset();
        setIsOpen(false);
        fetchEvents();
      }
    } catch (e) {
      setLoading(false);
      toast.error(e?.response?.data?.mes || "Có lỗi xảy ra");
    }
  };

  const onUpdate = async (formData) => {
    try {
      if (!selectedProducts.length) {
        toast.warning("Vui lòng chọn ít nhất 1 sản phẩm");
        return;
      }

      const data = {
        name: formData.name,
        description: formData.description,
        startDate: new Date(formData.startDate),
        endDate: new Date(formData.endDate),
        discountPercent: parseFloat(formData.discountPercent),
        products: selectedProducts,
        banner: banner,
        isActive: formData.isActive || true,
      };

      setLoading(true);
      const res = await eventApi.updateEvent(valueUpdated._id, data);
      setLoading(false);

      if (res?.success) {
        toast.success("Cập nhật sự kiện thành công");
        setBanner(null);
        setSelectedProducts([]);
        reset();
        setIsOpenUpdate(false);
        fetchEvents();
      }
    } catch (e) {
      setLoading(false);
      toast.error(e?.response?.data?.mes || "Có lỗi xảy ra");
    }
  };

  const handleDelete = async (event) => {
    Swal.fire({
      title: "Bạn có muốn xóa sự kiện này?",
      text: "Hành động này không thể hoàn tác",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          const res = await eventApi.deleteEvent(event._id);
          setLoading(false);

          if (res?.success) {
            toast.success("Xóa sự kiện thành công");
            fetchEvents();
          }
        } catch (e) {
          setLoading(false);
          toast.error("Lỗi xóa sự kiện");
        }
      }
    });
  };

  const handleOpenEdit = (event) => {
    setValueUpdated(event);
    setSelectedProducts(event.products?.map((p) => p._id) || []);
    setBanner(null);
    setIsOpenUpdate(true);
  };

  const handleOpenCreate = () => {
    reset();
    setSelectedProducts([]);
    setBanner(null);
    setIsOpen(true);
  };

  const columns = [
    {
      Header: "Tên Sự Kiện",
      accessor: "name",
      width: 15,
    },
    {
      Header: "Giảm Giá",
      accessor: "discountPercent",
      width: 8,
      Cell: ({ value }) => <span>{value}%</span>,
    },
    {
      Header: "Ngày Bắt Đầu",
      accessor: "startDate",
      width: 12,
      Cell: ({ value }) => <span>{moment(value).format("DD/MM/YYYY HH:mm")}</span>,
    },
    {
      Header: "Ngày Kết Thúc",
      accessor: "endDate",
      width: 12,
      Cell: ({ value }) => <span>{moment(value).format("DD/MM/YYYY HH:mm")}</span>,
    },
    {
      Header: "Sản Phẩm",
      accessor: "products",
      width: 12,
      Cell: ({ value }) => <span>{value?.length || 0} sản phẩm</span>,
    },
    {
      Header: "Trạng Thái",
      accessor: "isActive",
      width: 8,
      Cell: ({ value }) => (
        <span style={{ color: value ? "#28a745" : "#ff6b6b" }}>
          {value ? "Kích hoạt" : "Tắt"}
        </span>
      ),
    },
    {
      Header: "Hành Động",
      width: 10,
      Cell: ({ row }) => (
        <div style={{ display: "flex", gap: "8px" }}>
        
          <button
            onClick={() => handleOpenEdit(row)}
            className="btn-action btn-edit"
            title="Chỉnh sửa"
          >
            
            <FaPencilAlt size={14} />
          </button>
          <button
            onClick={() => handleDelete(row.original)}
            className="btn-action btn-delete"
            title="Xóa"
          >
            <AiOutlineDelete size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <LoadingItem isLoading={loading}>
      <div className="event-admin">
        <div className="event-admin--create">
          <div className="event-admin--create--btn" onClick={handleOpenCreate}>
            <CiCirclePlus size={24} />
            <p>Tạo Sự Kiện</p>
          </div>
        </div>

        <div style={{ height: "calc(90vh - 120px)", overflowY: "scroll" }}>
          <OptimizedTable title="Quản Lý Sự Kiện" data={events || []} columns={columns} />
        </div>

        {/* Modal Create */}
        <Modal isOpen={isOpen} setisOpen={setIsOpen}>
          <div className="modal-content">
            <h2>Tạo Sự Kiện Giảm Giá</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label>Tên Sự Kiện *</label>
                <input type="text" {...register("name", { required: true })} placeholder="VD: Flash Sale 11/11" />
              </div>

              <div className="form-group">
                <label>Mô Tả *</label>
                <textarea {...register("description", { required: true })} placeholder="Mô tả sự kiện" rows={3} />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Ngày Bắt Đầu *</label>
                  <input type="datetime-local" {...register("startDate", { required: true })} />
                </div>
                <div className="form-group">
                  <label>Ngày Kết Thúc *</label>
                  <input type="datetime-local" {...register("endDate", { required: true })} />
                </div>
              </div>

              <div className="form-group">
                <label>Phần Trăm Giảm Giá (%) *</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  {...register("discountPercent", { required: true })}
                  placeholder="VD: 20"
                />
              </div>

              <div className="form-group">
                <label>Banner</label>
                <input type="file" accept="image/*" onChange={handleBannerChange} />
              </div>

              <div className="form-group">
                <label>Chọn Sản Phẩm * ({products?.length || 0} sản phẩm)</label>
                <div className="products-list">
                  {products && products.length > 0 ? (
                    products.map((product) => (
                      <label key={product._id} className="product-item">
                        <img src={product.image?.[0]?.url} alt={product.name} className="product-item-image" />
                        <div className="product-item-info">
                          <p className="product-item-name">{product.name}</p>
                          <p className="product-item-price">{product.price?.toLocaleString("vi-VN")}đ</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={selectedProducts.includes(product._id)}
                          onChange={() => handleSelectProduct(product._id)}
                        />
                      </label>
                    ))
                  ) : (
                    <div style={{ padding: "20px", color: "#999" }}>
                      Đang tải sản phẩm...
                    </div>
                  )}
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-submit">
                  Tạo Sự Kiện
                </button>
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setIsOpen(false)}
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </Modal>

        {/* Modal Update */}
        <Modal isOpen={isOpenUpdate} setisOpen={setIsOpenUpdate}>
          <div className="modal-content">
            <h2>Cập Nhật Sự Kiện</h2>
            {valueUpdated && (
              <form onSubmit={handleSubmit(onUpdate)}>
                <div className="form-group">
                  <label>Tên Sự Kiện *</label>
                  <input
                    type="text"
                    defaultValue={valueUpdated.name}
                    {...register("name", { required: true })}
                  />
                </div>

                <div className="form-group">
                  <label>Mô Tả *</label>
                  <textarea
                    defaultValue={valueUpdated.description}
                    {...register("description", { required: true })}
                    rows={3}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Ngày Bắt Đầu *</label>
                    <input
                      type="datetime-local"
                      defaultValue={moment(valueUpdated.startDate).format("YYYY-MM-DDTHH:mm")}
                      {...register("startDate", { required: true })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Ngày Kết Thúc *</label>
                    <input
                      type="datetime-local"
                      defaultValue={moment(valueUpdated.endDate).format("YYYY-MM-DDTHH:mm")}
                      {...register("endDate", { required: true })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Phần Trăm Giảm Giá (%) *</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    defaultValue={valueUpdated.discountPercent}
                    {...register("discountPercent", { required: true })}
                  />
                </div>

                <div className="form-group">
                  <label>Chọn Sản Phẩm * ({products?.length || 0} sản phẩm)</label>
                  <div className="products-list">
                    {products && products.length > 0 ? (
                      products.map((product) => (
                        <label key={product._id} className="product-item">
                          <img src={product.image?.[0]?.url} alt={product.name} className="product-item-image" />
                          <div className="product-item-info">
                            <p className="product-item-name">{product.name}</p>
                            <p className="product-item-price">{product.price?.toLocaleString("vi-VN")}đ</p>
                          </div>
                          <input
                            type="checkbox"
                            checked={selectedProducts.includes(product._id)}
                            onChange={() => handleSelectProduct(product._id)}
                          />
                        </label>
                      ))
                    ) : (
                      <div style={{ padding: "20px", color: "#999" }}>
                        Đang tải sản phẩm...
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Cập Nhật
                  </button>
                  <button
                    type="button"
                    className="btn-cancel"
                    onClick={() => setIsOpenUpdate(false)}
                  >
                    Hủy
                  </button>
                </div>
              </form>
            )}
          </div>
        </Modal>
      </div>
    </LoadingItem>
  );
}

export default withBase(memo(AdminEvent));
