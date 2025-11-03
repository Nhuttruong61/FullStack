import React, { useEffect, useState } from "react";
import OptimizedTable from "../../common/OptimizedTable/OptimizedTable";
import * as UserApi from "../../../api/user.js";
import { AiOutlineDelete } from "react-icons/ai";
import { FaPencilAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import "./User.scss";

function User() {
  const [dataTable, setDataTable] = useState([]);
  const getUsers = async () => {
    try {
      const res = await UserApi.getUsser();
      if (res.success) {
        const data = res?.users?.map((el, index) => {
          return {
            id: el?._id,
            "STT": index + 1,
            "Tên": el?.name,
            "Email": el?.email,
            "Điện thoại": el?.phone,
            "Vai trò": el?.role,
          };
        });

        setDataTable(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    {
      Header: "STT",
      accessor: "STT",
      width: 8,
    },
    {
      Header: "ID",
      accessor: "id",
      width: 20,
    },
    {
      Header: "Tên",
      accessor: "Tên",
      width: 15,
    },
    {
      Header: "Email",
      accessor: "Email",
      width: 25,
    },
    {
      Header: "Điện thoại",
      accessor: "Điện thoại",
      width: 15,
    },
    {
      Header: "Vai trò",
      accessor: "Vai trò",
      width: 12,
    },
    {
      Header: "Hành động",
      width: 5,
      Cell: ({ row }) => (
        <div className="user-actions">
          {row?.values?.["Vai trò"] !== "Admin" && (
            <button
              onClick={() => handleDelete(row)}
              className="user-actions__btn user-actions__btn--delete"
              title="Xóa người dùng"
            >
              <AiOutlineDelete size={18} />
            </button>
          )}
        </div>
      ),
    },
  ];

  const handleDelete = async (data) => {
    try {
      const { id } = data?.values;
      Swal.fire({
        title: "Bạn có muốn xóa người dùng này?",
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
          const res = await UserApi.deleteUser(id);
          if (res.success) {
            Swal.fire({
              title: "Đã xóa!",
              text: "Người dùng đã được xóa thành công",
              icon: "success",
              confirmButtonColor: "#ff9921",
              background: "#2A2A2B",
              color: "#ffffff",
            });
            getUsers();
          }
        }
      });
    } catch (err) {
      Swal.fire({
        title: "Lỗi!",
        text: "Có lỗi xảy ra khi xóa người dùng",
        icon: "error",
        confirmButtonColor: "#ff9921",
        background: "#2A2A2B",
        color: "#ffffff",
      });
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="user">
      <OptimizedTable title="Tất cả người dùng" data={dataTable} columns={columns} />
    </div>
  );
}

export default User;
