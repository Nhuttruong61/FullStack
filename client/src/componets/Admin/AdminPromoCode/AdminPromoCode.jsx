import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  getAllPromoCodes,
  createPromoCode,
  updatePromoCode,
  deletePromoCode,
} from "../../../api/adminPromoCode";
import "./AdminPromoCode.scss";

function AdminPromoCode() {
  const [promoCodes, setPromoCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCode, setEditingCode] = useState(null);
  const [formData, setFormData] = useState({
    code: "",
    discountType: "percentage",
    discountValue: 0,
    minOrderValue: 0,
    maxDiscount: 0,
    usageLimit: 1,
    perUserLimit: 1,
    expiryDate: "",
    description: "",
    pointsCost: "",
    redemptionCooldown: 24,
    isActive: true,
  });

  useEffect(() => {
    fetchPromoCodes();
  }, []);

  const fetchPromoCodes = async () => {
    setLoading(true);
    try {
      const data = await getAllPromoCodes();
      if (data.success) {
        setPromoCodes(data.data || []);
      } else {
        toast.error(data.message || "Không thể tải danh sách mã giảm giá");
      }
    } catch (error) {
      console.error("Error fetching promo codes:", error);
      toast.error("Không thể tải danh sách mã giảm giá");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = editingCode
        ? await updatePromoCode(editingCode._id, formData)
        : await createPromoCode(formData);

      if (data.success) {
        toast.success(
          editingCode ? "Cập nhật thành công" : "Tạo mã thành công"
        );
        setShowModal(false);
        resetForm();
        fetchPromoCodes();
      } else {
        toast.error(data.message || "Có lỗi xảy ra");
      }
    } catch (error) {
      toast.error("Không thể lưu mã giảm giá");
    }
  };

  const handleEdit = (code) => {
    setEditingCode(code);
    setFormData({
      code: code.code,
      discountType: code.discountType,
      discountValue: code.discountValue,
      minOrderValue: code.minOrderValue || 0,
      maxDiscount: code.maxDiscount || 0,
      usageLimit: code.usageLimit,
      perUserLimit: code.perUserLimit,
      expiryDate: code.expiryDate ? code.expiryDate.split("T")[0] : "",
      description: code.description || "",
      pointsCost: code.pointsCost || "",
      redemptionCooldown: code.redemptionCooldown || 24,
      isActive: code.isActive,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa mã này?")) return;

    try {
      const data = await deletePromoCode(id);

      if (data.success) {
        toast.success("Xóa thành công");
        fetchPromoCodes();
      } else {
        toast.error(data.message || "Không thể xóa");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra");
    }
  };

  const resetForm = () => {
    setFormData({
      code: "",
      discountType: "percentage",
      discountValue: 0,
      minOrderValue: 0,
      maxDiscount: 0,
      usageLimit: 1,
      perUserLimit: 1,
      expiryDate: "",
      description: "",
      pointsCost: "",
      redemptionCooldown: 24,
      isActive: true,
    });
    setEditingCode(null);
  };

  return (
    <div className="admin-promo-code">
      <div className="admin-promo-header">
        <h1>Quản lý Mã Giảm Giá</h1>
        <button
          className="btn-create"
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
        >
          + Tạo mã mới
        </button>
      </div>

      {loading ? (
        <div className="loading">Đang tải...</div>
      ) : (
        <div className="promo-table-container">
          <table className="promo-table">
            <thead>
              <tr>
                <th>Mã</th>
                <th>Loại</th>
                <th>Giá trị</th>
                <th>Đơn tối thiểu</th>
                <th>Hết hạn</th>
                <th>Cooldown (h)</th>
                <th>Trạng thái</th>
                <th>Đã dùng</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {promoCodes.length > 0 ? (
                promoCodes.map((code) => (
                  <tr key={code._id}>
                    <td className="code-cell">{code.code}</td>
                    <td>
                      {code.discountType === "percentage"
                        ? "Phần trăm"
                        : "Cố định"}
                    </td>
                    <td>
                      {code.discountType === "percentage"
                        ? `${code.discountValue}%`
                        : `${code.discountValue.toLocaleString()}đ`}
                    </td>
                    <td>{code.minOrderValue?.toLocaleString()}đ</td>
                    <td>
                      {code.expiryDate
                        ? new Date(code.expiryDate).toLocaleDateString("vi-VN")
                        : "Vô thời hạn"}
                    </td>
                    <td>{code.redemptionCooldown || 24}</td>
                    <td>
                      <span
                        className={`status-badge ${
                          code.isActive ? "active" : "inactive"
                        }`}
                      >
                        {code.isActive ? "Hoạt động" : "Tắt"}
                      </span>
                    </td>
                    <td>
                      {code.usedBy?.length || 0}/{code.usageLimit}
                    </td>
                    <td className="action-cell">
                      <button
                        className="btn-edit"
                        onClick={() => handleEdit(code)}
                      >
                        Sửa
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(code._id)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="no-data">
                    Chưa có mã giảm giá nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{editingCode ? "Chỉnh sửa mã" : "Tạo mã mới"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Mã giảm giá *</label>
                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    required
                    placeholder="VD: SUMMER2024"
                  />
                </div>

                <div className="form-group">
                  <label>Loại giảm giá *</label>
                  <select
                    name="discountType"
                    value={formData.discountType}
                    onChange={handleInputChange}
                  >
                    <option value="percentage">Phần trăm (%)</option>
                    <option value="fixed">Cố định (VNĐ)</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Giá trị giảm *</label>
                  <input
                    type="number"
                    name="discountValue"
                    value={formData.discountValue}
                    onChange={handleInputChange}
                    required
                    min="0"
                  />
                </div>

                <div className="form-group">
                  <label>Giá trị đơn tối thiểu</label>
                  <input
                    type="number"
                    name="minOrderValue"
                    value={formData.minOrderValue}
                    onChange={handleInputChange}
                    min="0"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Giảm tối đa (nếu %)</label>
                  <input
                    type="number"
                    name="maxDiscount"
                    value={formData.maxDiscount}
                    onChange={handleInputChange}
                    min="0"
                  />
                </div>

                <div className="form-group">
                  <label>Ngày hết hạn</label>
                  <input
                    type="date"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Số lần sử dụng tối đa</label>
                  <input
                    type="number"
                    name="usageLimit"
                    value={formData.usageLimit}
                    onChange={handleInputChange}
                    min="1"
                  />
                </div>

                <div className="form-group">
                  <label>Giới hạn mỗi người</label>
                  <input
                    type="number"
                    name="perUserLimit"
                    value={formData.perUserLimit}
                    onChange={handleInputChange}
                    min="1"
                  />
                </div>
              </div>

              <div className="form-group full-width">
                <label>Mô tả</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Mô tả về mã giảm giá"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Điểm cần thiết để đổi</label>
                  <input
                    type="number"
                    name="pointsCost"
                    value={formData.pointsCost}
                    onChange={handleInputChange}
                    min="0"
                    placeholder="Để trống nếu không dùng làm phần thưởng"
                  />
                </div>

                <div className="form-group">
                  <label>Thời gian chờ giữa các lần đổi (giờ)</label>
                  <input
                    type="number"
                    name="redemptionCooldown"
                    value={formData.redemptionCooldown}
                    onChange={handleInputChange}
                    min="1"
                    placeholder="24"
                  />
                </div>
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                  />
                  Kích hoạt mã
                </label>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                >
                  Hủy
                </button>
                <button type="submit" className="btn-submit">
                  {editingCode ? "Cập nhật" : "Tạo mã"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPromoCode;
