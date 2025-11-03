import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  format,
} from "date-fns";
export const formatPie = (data) => {
  const statusCounts = data.reduce((acc, order) => {
    const status = order.status;
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const pieChartData = Object.entries(statusCounts).map(([status, count]) => ({
    name: status,
    value: count,
  }));

  return pieChartData;
};

export const formatBarChartNoPadding = (data) => {
  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const object = {};
  let weekNumber = 1;
  data.forEach((el) => {
    const paidDate = new Date(el.createdAt);
    if (
      paidDate >= monthStart &&
      paidDate <= monthEnd
    ) {
      const weekStart = startOfWeek(paidDate);
      const weekEnd = endOfWeek(paidDate);
      const weekKey = `${weekStart}-${weekEnd}`;
      if (!object[weekKey]) {
        object[weekKey] = {
          name: `${format(weekStart, "dd/MM")} - ${format(weekEnd, "dd/MM")}`,
          revenue: +el.totalPrice,
          weekNumber: weekNumber,
        };
        weekNumber++;
      } else {
        object[weekKey].revenue += Number(el.totalPrice);
      }
    }
  });
  const sortedWeeklyRevenues = Object.values(object).sort((a, b) => {
    const dateA = new Date(a.name.split(" - ")[0]);
    const dateB = new Date(b.name.split(" - ")[0]);
    return dateA - dateB;
  });

  return sortedWeeklyRevenues;
};

export const formatPaymentMethod = (data) => {
  const paymentCounts = data.reduce((acc, order) => {
    const payment = order.payments || "Unknown";
    acc[payment] = (acc[payment] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(paymentCounts).map(([method, count]) => ({
    name: method === "cod" ? "Thanh toán khi nhận hàng" : method,
    value: count,
  }));
};

export const formatOrdersTrend = (data) => {
  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const dailyOrders = {};

  data.forEach((order) => {
    const orderDate = new Date(order.createdAt);
    if (orderDate >= monthStart && orderDate <= monthEnd) {
      const dateKey = format(orderDate, "dd/MM");
      dailyOrders[dateKey] = (dailyOrders[dateKey] || 0) + 1;
    }
  });

  const allDates = [];
  for (let i = 1; i <= monthEnd.getDate(); i++) {
    const dateStr = format(new Date(monthStart.getFullYear(), monthStart.getMonth(), i), "dd/MM");
    allDates.push(dateStr);
  }

  return allDates.map((date) => ({
    name: date,
    orders: dailyOrders[date] || 0,
  }));
};

export const formatRevenueComparison = (data) => {
  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const statusRevenue = {};

  data.forEach((order) => {
    const orderDate = new Date(order.createdAt);
    if (orderDate >= monthStart && orderDate <= monthEnd) {
      const status = order.status;
      statusRevenue[status] = (statusRevenue[status] || 0) + Number(order.totalPrice);
    }
  });

  return Object.entries(statusRevenue).map(([status, revenue]) => ({
    name: status,
    revenue: revenue,
  }));
};
