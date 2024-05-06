import React, { memo, useEffect, useState } from "react";
import "./ProductPage.scss";
import { useParams } from "react-router-dom";
import { getProductCategory } from "../../api/product";
import Logo from "../../styles/image/Logo.png";
import CardProductCbn from "../../componets/card/cardProduct/CardProductCbn";
import { useSelector } from "react-redux";
import LoadingItem from "../../componets/Loading/LoadingItem";
function ProductPage() {
  const [dataProduct, setDataProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataArrange, setDataArrange] = useState([]);
  let { category } = useParams();
  const { data } = useSelector((state) => state.category);
  const fetchdataProduct = async () => {
    try {
      setLoading(true);
      const res = await getProductCategory(category);
      setLoading(false);
      setDataProduct(res.products);
    } catch (e) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchdataProduct();
    setDataArrange([]);
  }, [category]);
  const nameCategory = data?.filter((el) => el?._id === category);
  const handleSelect = (e) => {
    const value = e.target.value;
    let sortedData;
    switch (value) {
      case "new":
        sortedData = dataProduct;
        break;
      case "asc":
        sortedData = [...dataProduct].sort(
          (a, b) => Number(a.price) - Number(b.price)
        );
        break;
      case "dec":
        sortedData = [...dataProduct].sort(
          (a, b) => Number(b.price) - Number(a.price)
        );
        break;
      default:
        sortedData = dataProduct;
        break;
    }
    setDataArrange(sortedData);
  };

  return (
    <LoadingItem isLoading={loading}>
      <div className="product">
        <div className="content">
          <div className="product--name">
            <img src={Logo} className="right--image" alt="" />
            <h1>{nameCategory ? nameCategory[0]?.name : null}</h1>
          </div>
          <div className="product--arrange">
            <select onChange={(e) => handleSelect(e)}>
              <option value="new">Mới nhất</option>
              <option value="dec">Giá cao đến thấp</option>
              <option value="asc">Giá thấp đến cao</option>
            </select>
          </div>
          {dataProduct?.length > 0 ? (
            <div className="product--list">
              {dataArrange.length > 0
                ? dataArrange?.map((el) => (
                    <CardProductCbn key={el.id} data={el} />
                  ))
                : dataProduct?.map((el) => (
                    <CardProductCbn key={el.id} data={el} />
                  ))}
            </div>
          ) : (
            <div className="product--null">
              <h1>Xin lỗi, tạm thời chưa có sản phẩm!</h1>
            </div>
          )}
        </div>
      </div>
    </LoadingItem>
  );
}

export default memo(ProductPage);
