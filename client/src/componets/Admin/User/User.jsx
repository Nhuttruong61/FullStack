import React, { useEffect, useState } from "react";
import Tabble from "../../common/Tabble/Tabble";
import * as UserApi from "../../../api/user.js";
import { AiOutlineDelete } from "react-icons/ai";
import { FaPencilAlt } from "react-icons/fa";
import Swal from "sweetalert2";

function User() {
  const [dataTable, setDataTable] = useState([]);
  const getUsers = async () => {
    try {
      const res = await UserApi.getUsser();
      if (res.success) {
        const data = res?.users?.map((el, index) => {
          return {
            id: el?._id,
            Stt: index + 1,
            name: el?.name,
            email: el?.email,
            phone: el?.phone,
            role: el?.role,
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
      accessor: "Stt",
    },
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Phone",
      accessor: "phone",
    },
    {
      Header: "Role",
      accessor: "role",
    },
    {
      Header: "Actions",
      Cell: ({ row }) => (
        <div style={{ display: "flex" }}>
          <span
            onClick={() => handleDelete(row)}
            style={{
              padding: "8px",
              border: "1px black solid",
              borderRadius: "4px",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              marginRight: "2px",
              color: "red",
              cursor: "pointer",
            }}
          >
            <AiOutlineDelete />
          </span>
          <span
            onClick={() => handleUpdate(row)}
            style={{
              padding: "8px",
              border: "1px black solid",
              borderRadius: "4px",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              color: "green",
              cursor: "pointer",
            }}
          >
            <FaPencilAlt />
          </span>
        </div>
      ),
    },
  ];

  const handleDelete = async (data) => {
    try {
      const { id } = data?.values;
      Swal.fire({
        title: "Bạn có muốn xóa người dùng này?",
        showCancelButton: true,
        confirmButtonText: "Xóa",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await UserApi.deleteUser(id);
          if (res.success) {
            Swal.fire("Đã xóa!", "", "Thành công");
            getUsers();
          }
        }
      });
    } catch (err) {}
  };
  const handleUpdate = async (data) => {
    console.log(data);
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="user">
      <Tabble title="Tất cả người dùng" data={dataTable} columns={columns} />
    </div>
  );
}

export default User;
