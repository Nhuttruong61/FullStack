import React, { useEffect, useState } from "react";
import "./Dashbord.scss";
import { getOrderDasboard } from "../../../api/order";
import PeiChard from "./Chart/PeiChard";
import BarChartNoPadding from "./Chart/BarChartNoPadding";
import { formatNumber, totalPrice } from "../../../helper/format";

function Dashboard() {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const res = await getOrderDasboard();
      console.log(res);
      if (res?.success) {
        const processedData =
          res?.orders?.map((item) => ({
            id: item._id,
            price: item.totalPrice ?? 0,
            payments: item.payments ?? [],
            status: item.status ?? "Unknown",
            product: item.products ?? [],
          })) ?? [];

        setData(processedData);
      }
    } catch (e) {}
  };
  const total = totalPrice(data);

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="dashbord">
      <div className="dashbord--first">
        <div className="dashbord--first--total">
          <h3>Tổng danh thu</h3>
          <h3>{formatNumber(total)}</h3>
        </div>
      </div>
      <div style={{ width: "400px", height: "400px" }}>
        <PeiChard name="Biểu đồ trạng thái đơn hàng" data={data} />
      </div>
      <div style={{ width: "400px", height: "400px" }}>
        <BarChartNoPadding name="Biểu đồ thống kê danh thu các tuần trong tháng" data={data} />
      </div>
    </div>
  );
}

export default Dashboard;
