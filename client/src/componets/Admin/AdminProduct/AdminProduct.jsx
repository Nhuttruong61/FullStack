import React, { memo, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import OptimizedTable from "../../common/OptimizedTable/OptimizedTable";
import { FaPencilAlt } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import * as productApi from "../../../api/product";
import "./AdminProduct.scss";
import { CiCirclePlus } from "react-icons/ci";
import Modal from "../../common/Modal/Modal";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import withBase from "../../../hocs/withBase";
import LoadingItem from "../../Loading/LoadingItem";
import { colors } from "../../../static/Admin";
import Edittor from "../../common/inputComponet/Edittor";
import { fetchProduct, setFilters, resetFilters } from "../../../redux/slice/productSlice";
import { formatNumber } from "../../../helper/format";

function AdminProduct({ dispatch: outerDispatch }) {
  const reduxDispatch = useDispatch();
  const { data, totalPages, currentPage, filters } = useSelector((state) => state.products);
  const { data: category } = useSelector((state) => state.category);
  const [isOpen, setisOpen] = useState(false);
  const [isOpenUpdate, setisOpenUpdate] = useState(false);
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [valueUpdated, setValueUpdated] = useState(null);
  const [color, setColor] = useState({
    color: "",
    quantity: "",
  });
  const [listColor, setListColor] = useState([]);
  const [des, setDes] = useState("");
  const [searchName, setSearchName] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterMinPrice, setFilterMinPrice] = useState("");
  const [filterMaxPrice, setFilterMaxPrice] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    reduxDispatch(fetchProduct(filters));
  }, [filters, reduxDispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    reduxDispatch(
      setFilters({
        page: 1,
        name: searchName,
        category: filterCategory,
        minPrice: filterMinPrice ? parseFloat(filterMinPrice) : undefined,
        maxPrice: filterMaxPrice ? parseFloat(filterMaxPrice) : undefined,
      })
    );
  };

  const handleResetFilters = () => {
    setSearchName("");
    setFilterCategory("");
    setFilterMinPrice("");
    setFilterMaxPrice("");
    reduxDispatch(resetFilters());
  };

  const handlePageChange = (newPage) => {
    reduxDispatch(
      setFilters({
        ...filters,
        page: newPage,
      })
    );
  };
  const columns = [
    {
      Header: "ID",
      accessor: "_id",
      width: 7,
    },
    {
      Header: "Tên",
      accessor: "name",
      width: 12,
    },
    {
      Header: "Slug",
      accessor: "slug",
      width: 12,
      Cell: ({ value }) => (
        <div className="slug-cell">
          <code>{value || "—"}</code>
        </div>
      ),
    },
    {
      Header: "Danh Mục",
      accessor: "category",
      width: 10,
      Cell: ({ value }) => <p>{value?.name}</p>,
    },
    {
      Header: "Giá",
      accessor: "price",
      width: 10,
      Cell: ({ value }) => <p>{formatNumber(value)}</p>,
    },
    {
      Header: "Giảm Giá",
      accessor: "discount",
      width: 8,
    },
    {
      Header: "Ảnh",
      accessor: "image",
      width: 8,
      Cell: ({ value }) => (
        <div className="table-avatar">
          <img src={value?.[0]?.url} alt="Product" />
        </div>
      ),
    },
    {
      Header: "Số Lượng",
      accessor: "color",
      width: 15,
      Cell: ({ value }) => (
        <div className="color-quantity-cell">
          {value?.map((item, index) => (
            <div key={index} className="color-item-compact">
              <span className="color-label">{item.color}:</span>
              <span className="quantity-label">{item.quantity}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      Header: "Hành động",
      width: 10,
      Cell: ({ row }) => (
        <div className="table-actions">
          <button
            onClick={() => handleDelete(row)}
            className="btn-action btn-delete"
            title="Xóa sản phẩm"
          >
            <AiOutlineDelete size={16} />
          </button>
          <button
            onClick={() => handleOpenEdit(row)}
            className="btn-action btn-edit"
            title="Chỉnh sửa sản phẩm"
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
        title: "Bạn có muốn xóa sản phẩm này?",
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
          const res = await productApi.deleteProduct(_id);
          setLoading(false);
          if (res?.success) {
            toast.success(res?.mes);
            reduxDispatch(fetchProduct(filters));
            Swal.fire({
              title: "Đã xóa!",
              text: "Sản phẩm đã được xóa thành công",
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
        text: "Có lỗi xảy ra khi xóa sản phẩm",
        icon: "error",
        confirmButtonColor: "#ff9921",
        background: "#2A2A2B",
        color: "#ffffff",
      });
    }
  };

  const handleImg = (e) => {
    const file = e.target.files;
    const results = [];
    if (!file) return;
    for (let i = 0; i < file.length; i++) {
      const render = new FileReader();
      render.onloadend = () => {
        results.push(render.result);
        if (results.length === file.length) {
          setImage(results);
        }
      };

      render.readAsDataURL(file[i]);
    }
  };
  const onCreate = async (res) => {
    try {
      if (image.length === 0) return toast.warning("Ảnh không được để trống");
      if (listColor.length === 0) return toast.warning("Bạn phải nhập số lượng và màu sắc");
      const data = {
        name: res?.name,
        category: res.category,
        discount: parseFloat(res.discount) || 0,
        image: image,
        color: listColor.map(c => ({
          color: c.color,
          quantity: parseInt(c.quantity) || 0
        })),
        price: parseFloat(res.price) || 0,
        des: des,
      };
      setLoading(true);
      const response = await productApi.createProduct(data);

      setLoading(false);
      if (response?.success) {
        setImage(null);
        reset();
        setDes("");
        setListColor([]);
        reduxDispatch(fetchProduct(filters));
        setisOpen(false);
        toast.success("Tạo sản phẩm thành công");
      }
    } catch (e) {
      setLoading(false);
      toast.error(e?.response?.data?.mes || "Có lỗi xảy ra");
    }
  };
  const handleOpenEdit = (data) => {
    setImage(null);
    setValueUpdated(data);
    setListColor(data?.color || []);
    setisOpenUpdate(true);
  };

  const handleCloseCreate = () => {
    setisOpen(false);
    setImage([]);
    setListColor([]);
    setDes("");
    setColor({ color: "", quantity: "" });
    reset();
  };

  const handleCloseUpdate = () => {
    setisOpenUpdate(false);
    setImage([]);
    setListColor([]);
    setColor({ color: "", quantity: "" });
  };

  const handOnchageColor = (e) => {
    setColor({ ...color, color: e.target.value });
  };
  const handleAddColor = () => {
    if (!color.color || !color.quantity) {
      toast.warning("Bạn không được bỏ trống");
    } else if (!listColor?.some((item) => item.color === color.color)) {
      setListColor((prevListColor) => [...prevListColor, {
        color: color.color,
        quantity: parseInt(color.quantity) || 0
      }]);
      setColor({ color: "", quantity: "" });
    } else {
      toast.warning("Màu này đã tồn tại");
    }
  };
  const handleDeleteColor = (item) => {
    const filter = listColor?.filter((el) => el.color !== item.color);
    setListColor(filter);
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const colorData = listColor.length > 0 ? listColor : valueUpdated.color;
      const data = {
        name: valueUpdated.name,
        category: typeof valueUpdated.category === "string" ? valueUpdated.category : valueUpdated.category?._id,
        des: valueUpdated.des,
        discount: parseFloat(valueUpdated.discount) || 0,
        price: parseFloat(valueUpdated.price) || 0,
        image: image ? image : valueUpdated.image,
        color: colorData.map(c => ({
          color: c.color,
          quantity: parseInt(c.quantity) || 0
        })),
      };
      setLoading(true);
      const res = await productApi.updateProduct(valueUpdated._id, data);
      setLoading(false);
      if (res.success) {
        toast.success("Cập nhật sản phẩm thành công");
        setImage(null);
        setListColor([]);
        setisOpenUpdate(false);
        reduxDispatch(fetchProduct(filters));
      }
    } catch (e) {
      setLoading(false);
      toast.error(e?.response?.data?.mes || e?.response?.statusText || "Có lỗi xảy ra");
    }
  };
  return (
    <LoadingItem isLoading={loading}>
      <div className="product-admin">
        <div className="product-admin--create">
          <div className="product-admin--create--btn" onClick={() => setisOpen(true)}>
            <CiCirclePlus size={24} />
            <p>Tạo mới</p>
          </div>
        </div>
        
        <div className="product-admin--filters">
          <form onSubmit={handleSearch} className="filter-form">
            <input
              type="text"
              placeholder="Tìm kiếm theo tên sản phẩm..."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="filter-input filter-search"
            />
            
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="filter-select filter-category"
            >
              <option value="">Tất cả danh mục</option>
              {category?.map((cat) => (
                <option value={cat._id} key={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
            
            <input
              type="number"
              placeholder="Giá tối thiểu"
              value={filterMinPrice}
              onChange={(e) => setFilterMinPrice(e.target.value)}
              className="filter-input filter-min-price"
            />
            
            <input
              type="number"
              placeholder="Giá tối đa"
              value={filterMaxPrice}
              onChange={(e) => setFilterMaxPrice(e.target.value)}
              className="filter-input filter-max-price"
            />
            
            <button type="submit" className="btn-search">
              Tìm kiếm
            </button>
            <button
              type="button"
              className="btn-reset"
              onClick={handleResetFilters}
            >
              Xóa bộ lọc
            </button>
          </form>
        </div>

        <div style={{ height: "calc(90vh - 120px)", overflowY: "scroll" }}>
          <OptimizedTable title="Sản phẩm" data={data || []} columns={columns} />
        </div>

        <div className="product-admin--pagination">
          <div className="pagination-info">
            Trang {currentPage} / {totalPages} | Tổng: {data?.length || 0} sản phẩm
          </div>
          <div className="pagination-buttons">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="btn-pagination"
            >
              Trước
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`btn-page ${currentPage === page ? "active" : ""}`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="btn-pagination"
            >
              Sau
            </button>
          </div>
        </div>
        <Modal isOpen={isOpen} setisOpen={handleCloseCreate} title="Tạo Sản Phẩm Mới">
          <div className="modal-form-product">
            <form action="" onSubmit={handleSubmit(onCreate)}>
              <div>
                <label htmlFor="">Tên sản phẩm</label>
                <span>
                  <input
                    placeholder="Nhập tên sản phẩm"
                    type="text"
                    id="name"
                    {...register("name", { required: true })}
                  />
                </span>
                {errors?.name && <p className="error-message">Tên sản phẩm không được bỏ trống</p>}
              </div>
              <div>
                <label htmlFor="category">Loại sản phẩm</label>
                <select
                  id="category"
                  {...register("category", { required: true })}
                >
                  <option value="">--Chọn loại--</option>
                  {category?.map((item) => (
                    <option value={item._id} key={item._id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                {errors.category && <p className="error-message">Vui lòng chọn loại sản phẩm</p>}
              </div>
              <div>
                <label htmlFor="">Giá sản phẩm</label>
                <span>
                  <input
                    placeholder="Nhập giá sản phẩm"
                    type="text"
                    id="price"
                    {...register("price", { required: true })}
                  />
                </span>
                {errors?.name && <p className="error-message">Giá sản phẩm không được bỏ trống</p>}
              </div>
              <div>
                <label htmlFor="">Giảm giá</label>
                <span>
                  <input
                    placeholder="Phần trăm giảm giá"
                    type="text"
                    id="discount"
                    {...register("discount", { required: true })}
                  />
                </span>
                {errors?.discount && <p className="error-message">Giảm giá sản phẩm không được bỏ trống</p>}
              </div>
              <div className="color-section">
                <div style={{display:"flex", alignItems:"center"}}>
                  <label>Màu</label>
                  <select
                    id="category"
                    onChange={handOnchageColor}
                  >
                    <option value="">--Chọn màu--</option>
                    {colors?.map((item, index) => (
                      <option value={item.name} key={index}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    onChange={(e) => setColor({ ...color, quantity: e.target.value })}
                    placeholder="Số lượng"
                  />
                  <p onClick={handleAddColor}>Thêm vào</p>
                </div>
              </div>
              <div className="color-list">
                {listColor?.map((item) => (
                  <div className="color-item" key={item?.color}>
                    <p><strong>Màu:</strong> {item?.color}</p>
                    <p><strong>Số lượng:</strong> {item?.quantity}</p>
                    <button className="btn" onClick={() => handleDeleteColor(item)}>
                      Xóa
                    </button>
                  </div>
                ))}
              </div>
              <div>
                <label>Mô tả</label>
                <Edittor value={des} setValue={setDes} />
              </div>

              <div className="drawer-form-product--image">
                <label htmlFor="image" className="drawer-form-product--image--img">
                  Ảnh
                </label>
                <input id="image" type="file" hidden multiple onChange={(e) => handleImg(e)} />
                {image && (
                  <div>
                    {image.map((el) => (
                      <img src={el} alt="" key={el} />
                    ))}
                  </div>
                )}
              </div>
              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={handleCloseCreate}>Hủy</button>
                <button type="submit" className="btn-submit">Tạo mới</button>
              </div>
            </form>
          </div>
        </Modal>
        <Modal isOpen={isOpenUpdate} setisOpen={handleCloseUpdate} title="Cập Nhật Sản Phẩm">
          <div className="modal-form-product">
            <form action="" onSubmit={handleUpdate}>
              <div>
                <label htmlFor="">Tên sản phẩm</label>
                <span>
                  <input
                    placeholder="Nhập tên sản phẩm"
                    type="text"
                    id="name"
                    defaultValue={valueUpdated?.name}
                    onChange={(e) => setValueUpdated({ ...valueUpdated, name: e.target.value })}
                  />
                </span>
                {!valueUpdated?.name && <p className="error-message">Tên sản phẩm không được bỏ trống</p>}
              </div>
              <div>
                <label htmlFor="category">Loại sản phẩm</label>
                <select
                  id="category"
                  defaultValue={typeof valueUpdated?.category === "string" ? valueUpdated?.category : valueUpdated?.category?._id}
                  onChange={(e) =>
                    setValueUpdated({
                      ...valueUpdated,
                      category: e.target.value,
                    })
                  }
                >
                  <option value="">--Chọn loại--</option>
                  {category?.map((item) => (
                    <option value={item._id} key={item._id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                {!valueUpdated?.category && <p className="error-message">Vui lòng chọn loại sản phẩm</p>}
              </div>
              <div>
                <label htmlFor="">Giá sản phẩm</label>
                <span>
                  <input
                    placeholder="Nhập giá sản phẩm"
                    type="text"
                    id="price"
                    defaultValue={valueUpdated?.price}
                    onChange={(e) =>
                      setValueUpdated({
                        ...valueUpdated,
                        price: e.target.value,
                      })
                    }
                  />
                </span>
                {!valueUpdated?.price && <p className="error-message">Giá sản phẩm không được bỏ trống</p>}
              </div>
              <div>
                <label htmlFor="">Giảm giá</label>
                <span>
                  <input
                    placeholder="Phần trăm giảm giá"
                    type="text"
                    id="discount"
                    defaultValue={valueUpdated?.discount}
                    onChange={(e) =>
                      setValueUpdated({
                        ...valueUpdated,
                        discount: e.target.value,
                      })
                    }
                  />
                </span>
                {!valueUpdated?.discount && <p className="error-message">Giảm giá sản phẩm không được bỏ trống</p>}
              </div>
              <div className="color-section">
                <div style={{display:"flex", alignItems:"center"}}>
                  <label>Màu</label>
                  <select
                    id="category"
                    onChange={handOnchageColor}
                  >
                    <option value="">--Chọn màu--</option>
                    {colors?.map((item, index) => (
                      <option value={item.name} key={index}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    onChange={(e) => setColor({ ...color, quantity: e.target.value })}
                    placeholder="Số lượng"
                  />
                  <p onClick={handleAddColor}>Thêm vào</p>
                </div>
              </div>
              <div className="color-list">
                {listColor?.map((item) => (
                  <div className="color-item" key={item?.color}>
                    <p><strong>Màu:</strong> {item?.color}</p>
                    <p><strong>Số lượng:</strong> {item?.quantity}</p>
                    <button className="btn" onClick={() => handleDeleteColor(item)}>
                      Xóa
                    </button>
                  </div>
                ))}
              </div>
              <div>
                <label>Mô tả</label>
                <Edittor
                  value={valueUpdated?.des}
                  setValue={(value) => setValueUpdated({ ...valueUpdated, des: value })}
                />
              </div>

              <div className="drawer-form-product--image">
                <label htmlFor="image" className="drawer-form-product--image--img">
                  Ảnh
                </label>
                <input id="image" type="file" hidden multiple onChange={(e) => handleImg(e)} />
                {image ? (
                  <div>
                    {image.map((el) => (
                      <img src={el} alt="" key={el} />
                    ))}
                  </div>
                ) : (
                  <div>
                    {valueUpdated?.image?.map((el) => (
                      <img src={el?.url} alt="" key={el?.url} />
                    ))}
                  </div>
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

export default withBase(memo(AdminProduct));
