import React, { memo, useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import OptimizedTable from "../../common/OptimizedTable/OptimizedTable";
import LoadingItem from "../../Loading/LoadingItem";
import { deleteOrder, getOrders, updateStatusOrder } from "../../../api/order";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { formatNumber } from "../../../helper/format";
import { fetchProduct } from "../../../redux/slice/productSlice";
import withBase from "../../../hocs/withBase";
import socketIOClient from "socket.io-client";
import "./AdminOrder.scss";
import PanigateCpn from "../../common/Panigate/PanigateCpn";
import moment from "moment";
function AdminOrder({ dispatch }) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [panigate, setPanigate] = useState(10);
  const [loading, setLoading] = useState(false);
  const ENDPOINT = process.env.REACT_APP_SOCKET_URL;
  const socketIo = socketIOClient(ENDPOINT, {
    transport: ["websocket"],
    withCredentials: true,
  });
  const fetchData = async () => {
    try {
      const res = await getOrders(page);
      setPanigate(res?.totalPages || 1);
      if (res?.success) {
        const processedData =
          res?.orders?.map((item) => ({
            id: item._id,
            name: item.user?.name ?? "",
            phone: item.user?.phone ?? "",
            address: item.user?.address ?? "",
            price: parseFloat(item.finalPrice || item.totalPrice) ?? 0,
            totalPrice: parseFloat(item.totalPrice) ?? 0,
            discountAmount: parseFloat(item.discountAmount) ?? 0,
            promoCode: item.promoCode ?? null,
            payments: item.payments ?? "",
            status: item.status ?? "Unknown",
            product: item.products ?? [],
            createdAt: item.createdAt,
          })) ?? [];

        setData(processedData);
      }
    } catch (e) {
      console.error("Error fetching orders:", e);
    }
  };
  useEffect(() => {
    fetchData();
  }, [page]);
  const columns = [
    {
      Header: "Mã đơn",
      accessor: "id",
      width: 8,
      Cell: ({ value }) => <div>{value?.slice(0, 8)}</div>,
    },
    {
      Header: "Tên khách",
      accessor: "name",
      width: 10,
    },
    {
      Header: "Điện thoại",
      accessor: "phone",
      width: 10,
    },
    {
      Header: "Địa chỉ",
      accessor: "address",
      width: 12,
    },
    {
      Header: "Sản phẩm",
      accessor: "product",
      width: 25,
      Cell: ({ value }) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {value?.map((product, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
              
                <div>
                  <p style={{ padding: "0", margin: "0" }}>{product?.product?.name}</p>
                  <p style={{ padding: "0", margin: "0" }}>Quantity: {product?.quantity}</p>
                  <p style={{ padding: "0", margin: "0" }}>Color: {product?.color}</p>
                </div>
              </div>
              <br />
            </div>
          ))}
        </div>
      ),
    },

    {
      Header: "Giá",
      accessor: "price",
      width: 12,
      Cell: ({ row }) => (
        <div style={{ fontSize: "13px" }}>
          {row.discountAmount > 0 && (
            <p style={{ margin: "0 0 4px 0", color: "#bbb" }}>
              <strike>{formatNumber(row.totalPrice)}</strike>
            </p>
          )}
          <p style={{ margin: "0 0 4px 0", fontWeight: "700", color: "#ff9921" }}>
            {formatNumber(row.price)}
          </p>
          {row.discountAmount > 0 && (
            <>
              <p style={{ margin: "0 0 2px 0", color: "#28a745", fontSize: "12px" }}>
                Giảm: -{formatNumber(row.discountAmount)}
              </p>
              {row.promoCode && (
                <p style={{ margin: "0", color: "#28a745", fontSize: "11px" }}>
                  Mã: {row.promoCode}
                </p>
              )}
            </>
          )}
        </div>
      ),
    },
    {
      Header: "Thanh toán",
      accessor: "payments",
      width: 8,
    },
    {
      Header: "Trạng thái",
      accessor: "status",
      width: 15,
      Cell: ({ row }) => (
        <div className="status-cell">
          {row.status === "Đã hủy" || row.status === "Đã giao" ? (
            <span className={`status-badge status-${row.status}`}>{row.status}</span>
          ) : (
            <select className="status-select" defaultValue={row?.status} onChange={(e) => handleStatusChange(e, row)}>
              <option>{row.status}</option>
              {row.status === "Chờ xử lý" && <option value="Đã xác nhận">Đã xác nhận</option>}
              {row.status === "Đã xác nhận" && <option value="Đã chuyển hàng">Đã chuyển hàng</option>}
              {row.status === "Đã chuyển hàng" && <option value="Đã giao">Đã giao</option>}
            </select>
          )}
        </div>
      ),
    },
    {
      Header: "Ngày đặt",
      accessor: "createdAt",
      width: 10,
      Cell: ({ value }) => <p>{moment(value).format("DD/MM/YYYY")}</p>,
    },
    {
      Header: "Thao tác",
      width: 7,
      Cell: ({ row }) => (
        <div style={{ display: "flex" }}>
          <span
            onClick={() => handleDelete(row)}
            style={{
              padding: "8px",
              border: "1px solid #ff6b6b",
              borderRadius: "4px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "red",
              cursor: "pointer",
            }}
          >
            <AiOutlineDelete />
          </span>
        </div>
      ),
    },
  ];
  const handleStatusChange = async (e, values) => {
    try {
      const value = e.target.value;
      const { id } = values;
      setLoading(true);
      const res = await updateStatusOrder(id, { status: value });
      setLoading(false);
      if (res?.success) {
        toast.success("Cập nhật trạng thái thành công");
        socketIo.emit("addproduct", id);
        fetchData();
        dispatch(fetchProduct());
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };
  const handleDelete = async (data) => {
    try {
      const { id } = data;
      if (data?.payments === "online" && data?.status === "Chờ xử lý")
        return toast.warning("Bạn không thể xóa đơn hàng này");
      Swal.fire({
        title: "Bạn có muốn xóa đơn hàng này?",
        showCancelButton: true,
        confirmButtonText: "Xóa",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setLoading(true);
          const res = await deleteOrder(id);
          setLoading(false);
          if (res?.success) {
            toast.success(res?.mes);
            fetchData();
            Swal.fire("Đã xóa!", "", "Thành công");
          }
        }
      });
    } catch (e) {}
  };
  return (
    <div>
      <LoadingItem isLoading={loading}>
        <div className="product-admin">
          <div style={{ height: "85vh" }}>
            <OptimizedTable title="Danh sách đơn hàng" data={data || []} columns={columns} />
            <div className="panigate">
              <PanigateCpn setPage={setPage} pageSize={panigate} itemsPerPage={10} />
            </div>
          </div>
        </div>
      </LoadingItem>
    </div>
  );
}

export default withBase(memo(AdminOrder));
