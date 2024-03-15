import React, { memo, useEffect, useState } from "react";
import "./ProductInfor.scss";
import { useParams } from "react-router-dom";
import { getProductId } from "../../../api/product";
import { formatNumber } from "../../../helper/format";
import withBase from "../../../hocs/withBase.js";
import { getCartUser } from "../../../redux/slice/cartSlice.js";
import { useSelector } from "react-redux";
import CardProductCbn from "../../../componets/card/cardProduct/CardProductCbn.jsx";
import { addCart } from "../../../api/user.js";
import { toast } from "react-toastify";
function ProductInfor({ dispatch }) {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [activequanity, setActiveQuanity] = useState(null);
  const { data: listData } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.user);
  const fetchData = async () => {
    try {
      const res = await getProductId(id);
      if (res.success) {
        setData(res?.product);
      }
    } catch (err) {
      console.log(err.reponse);
    }
  };

  let price = data?.price - (data?.price * data?.discount) / 100;
  const handleSeleteColor = (item) => {
    setActiveQuanity(item);
  };
  const handleAddCard = async () => {
    try {
      const dataFm = {
        idProduct: data._id,
        color: activequanity?.color
          ? activequanity?.color
          : data?.color[0]?.color,
      };
      const res = await addCart(user._id, dataFm);
      dispatch(getCartUser(res?.user.cart));
    } catch (err) {
      toast.warning(err?.response?.data?.mes);
    }
  };
  const listSuggest = listData
    ?.filter((el) => el?.category._id == data?.category._id)
    .filter((el) => el._id !== id);

  useEffect(() => {
    fetchData();
  }, [id]);
  return (
    <div className="">
      <div className="productInfor">
        <div className="content">
          <div className="productInfor--box">
            <div className="productInfor--box--left">
              <img src={activeImage || data?.image[0]?.url} alt="" />
              <div className="productInfor--box--left--listImg">
                {data?.image?.slice(0, 4)?.map((item) => {
                  return (
                    <div
                      className="productInfor--box--left--listImg--card"
                      onClick={() => {
                        setActiveImage(item?.url);
                      }}
                    >
                      <img key={item?._id} src={item.url} alt="" />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="productInfor--box--right">
              <h1>{data?.name}</h1>
              <div className="productInfor--box--right--price">
                <p className="productInfor--box--right--price--price">
                  {formatNumber(data?.price)}
                </p>
                <p className="productInfor--box--right--price--sale">
                  {formatNumber(price)}
                </p>
              </div>
              <div className="productInfor--box--right--color">
                <span>
                  <p>Màu</p>
                  <p>{activequanity?.color || data?.color[0]?.color}</p>
                </span>
                <div style={{ display: "flex" }}>
                  {data?.color.map((item) => (
                    <div
                      key={item?._id}
                      onClick={() => handleSeleteColor(item)}
                    >
                      <div
                        style={{
                          height: "50px",
                          width: "50px",
                          borderRadius: "100%",
                          backgroundColor: `${item?.color}`,
                          cursor: "pointer",
                          marginRight: "8px",
                        }}
                      ></div>
                    </div>
                  ))}
                </div>
                <span>
                  <p>Số lượng: </p>
                  <p>{activeImage?.quantity || data?.color[0]?.quantity}</p>
                </span>
              </div>
              <div className="productInfor--box--right--des">
                <div dangerouslySetInnerHTML={{ __html: data?.des }} />
              </div>
              <div
                style={{ backgroundColor: "transparent", padding: "8px 0" }}
                className="btn"
              >
                <button
                  disabled={activequanity?.quantity == 0}
                  onClick={handleAddCard}
                >
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {listSuggest && listSuggest.length > 0 && (
        <div className="suggest">
          <div className="content">
            <h2>Sản phẩm tương tự</h2>
            <div className="suggest--list">
              {listSuggest?.map((el) => {
                return <CardProductCbn data={el} />;
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default withBase(memo(ProductInfor));
