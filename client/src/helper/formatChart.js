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
      el.status === "Đã giao" &&
      paidDate >= monthStart &&
      paidDate <= monthEnd
    ) {
      const weekStart = startOfWeek(paidDate);
      const weekEnd = endOfWeek(paidDate);
      const weekKey = `${weekStart}-${weekEnd}`;
      if (!object[weekKey]) {
        object[weekKey] = {
          name: `${format(weekStart, "dd/MM")} - ${format(weekEnd, "dd/MM")}`,
          revenue: +el.price,
          weekNumber: weekNumber,
        };
        weekNumber++;
      } else {
        object[weekKey].revenue += Number(el.price);
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
