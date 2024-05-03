import CurrencyFormat from "react-currency-format";

export const formatNumber = (value) => {
  return (
    <CurrencyFormat
      value={value}
      displayType={"text"}
      thousandSeparator={true}
      suffix={" đ"}
    />
  );
};

export const totalPrice = (value) => {
  console.log(value);
  let total = 0;
  value.forEach((el) => {
    if (el.status === "Đã giao") {
      total += +el.price;
    }
  });

  return Number(total);
};
