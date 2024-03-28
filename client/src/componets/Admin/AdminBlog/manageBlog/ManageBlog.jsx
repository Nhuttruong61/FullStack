import React, { memo, useEffect, useState } from "react";
import "./ManageBlog.scss";
import LoadingItem from "../../../Loading/LoadingItem";
import { CiCirclePlus } from "react-icons/ci";
import Tabble from "../../../common/Tabble/Tabble";
import { FaPencilAlt } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import withBase from "../../../../hocs/withBase";
import { getBlogs } from "../../../../api/blog";
function ManageBlog({ setActive }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const columns = [
    {
      Header: "ID",
      accessor: "_id",
    },
    {
      Header: "Title",
      accessor: "title",
    },
    {
      Header: "Avatar",
      accessor: "avatar",
      Cell: ({ value }) => (
        <img src={value.url} alt="" style={{ width: "50px", height: "50px" }} />
      ),
    },

    {
      Header: "Actions",
      Cell: ({ row }) => (
        <div style={{ display: "flex" }}>
          <span
            // onClick={() => handleDelete(row)}
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
            // onClick={() => handleOpenEdit(row)}
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

  const fetchData = async () => {
    try {
      const res = await getBlogs();
      console.log(res);
      if (res.success) {
        setData(res?.blog);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <LoadingItem isLoading={loading}>
      <div className="blog">
        <div className="blog--create">
          <div className="blog--create--btn" onClick={() => setActive(8)}>
            <CiCirclePlus size={24} />
            <p>Tạo mới</p>
          </div>
        </div>
        <Tabble title="Danh mục sản phẩm" data={data || []} columns={columns} />
      </div>
    </LoadingItem>
  );
}

export default withBase(memo(ManageBlog));
