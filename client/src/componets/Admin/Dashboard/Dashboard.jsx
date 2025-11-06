import React, { useEffect, useState } from "react";
import "./Dashbord.scss";
import { getOrderDasboard } from "../../../api/order";
import PeiChard from "./Chart/PeiChard";
import BarChartNoPadding from "./Chart/BarChartNoPadding";
import LineChartOrders from "./Chart/LineChartOrders";
import PaymentMethodChart from "./Chart/PaymentMethodChart";
import RevenueByStatus from "./Chart/RevenueByStatus";
import { formatNumber, totalPrice } from "../../../helper/format";

function Dashboard() {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const res = await getOrderDasboard();
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
  const totalOrders = data.length;
  const statusCounts = data.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {});

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <h1>Bảng điều khiển</h1>
        <p>Tổng quan về hoạt động bán hàng</p>
      </div>

      {/* Stats Cards */}
      <div className="dashboard-stats">
        <div className="stat-card stat-card--primary">
          <div className="stat-card__icon">💰</div>
          <div className="stat-card__content">
            <p className="stat-card__label">Tổng doanh thu</p>
            <h2 className="stat-card__value">{formatNumber(total)}</h2>
          </div>
        </div>

        <div className="stat-card stat-card--secondary">
          <div className="stat-card__icon">📦</div>
          <div className="stat-card__content">
            <p className="stat-card__label">Tổng đơn hàng</p>
            <h2 className="stat-card__value">{totalOrders}</h2>
          </div>
        </div>

        <div className="stat-card stat-card--success">
          <div className="stat-card__icon">✅</div>
          <div className="stat-card__content">
            <p className="stat-card__label">Đơn hoàn thành</p>
            <h2 className="stat-card__value">{statusCounts["Đã giao"] || statusCounts["Completed"] || 0}</h2>
          </div>
        </div>

        <div className="stat-card stat-card--warning">
          <div className="stat-card__icon">⏳</div>
          <div className="stat-card__content">
            <p className="stat-card__label">Đơn chờ xử lý</p>
            <h2 className="stat-card__value">{statusCounts["Chờ xác nhận"] || statusCounts["Pending"] || 0}</h2>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="dashboard-charts">
        <div className="chart-card chart-card--pie">
          <div className="chart-card__header">
            <h3>Phân bổ trạng thái đơn hàng</h3>
          </div>
          <div className="chart-card__body">
            <PeiChard data={data} />
          </div>
        </div>

        <div className="chart-card chart-card--bar">
          <div className="chart-card__header">
            <h3>Doanh thu theo tuần</h3>
          </div>
          <div className="chart-card__body">
            <BarChartNoPadding data={data} />
          </div>
        </div>

        <div className="chart-card chart-card--line">
          <div className="chart-card__header">
            <h3>Xu hướng đơn hàng theo ngày</h3>
          </div>
          <div className="chart-card__body">
            <LineChartOrders data={data} />
          </div>
        </div>

        <div className="chart-card chart-card--pie">
          <div className="chart-card__header">
            <h3>Phương thức thanh toán</h3>
          </div>
          <div className="chart-card__body">
            <PaymentMethodChart data={data} />
          </div>
        </div>

        <div className="chart-card chart-card--bar chart-card--full">
          <div className="chart-card__header">
            <h3>Doanh thu theo trạng thái đơn hàng</h3>
          </div>
          <div className="chart-card__body">
            <RevenueByStatus data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
