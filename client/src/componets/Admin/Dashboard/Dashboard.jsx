import React, { useEffect, useState } from "react";
import "./Dashbord.scss";
import { getOrders } from "../../../api/order";
import PeiChard from "./Chart/PeiChard";
function Dashboard() {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const res = await getOrders();

      if (res.success) {
        if (res.success) {
          const processedData = res.response.map((item) => ({
            id: item._id,
            name: item.user.name,
            phone: item.user.phone,
            price: item.totalPrice,
            status: item.status,
            product: item.product,
          }));
          setData(processedData);
        }
      }
    } catch (e) {}
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="dashbord">
      <div style={{ width: "400px", height: "400px" }}>
        <PeiChard name="Biểu đồ trạng thái đơn hàng" data={data} />
      </div>
    </div>
  );
}

export default Dashboard;
