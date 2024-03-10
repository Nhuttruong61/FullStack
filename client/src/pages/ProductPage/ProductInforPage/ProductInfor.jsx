import React, { memo, useEffect, useState } from "react";
import "./ProductInfor.scss";
import { useParams } from "react-router-dom";
import { getProductId } from "../../../api/product";
import { formatNumber } from "../../../helper/format";
function ProductInfor() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [activequanity, setActiveQuanity] = useState(null);

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
  useEffect(() => {
    fetchData();
  }, [id]);

  const handleSeleteColor = (item) => {
    setActiveQuanity(item);
  };
  return (
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
                {formatNumber(
                  data?.price - (data?.price * data?.discount) / 100
                )}
              </p>
            </div>
            <div className="productInfor--box--right--color">
              <span>
                <p>Màu</p>
                <p>{activequanity?.color || data?.color[0]?.color}</p>
              </span>
              {data?.color.map((item) => (
                <div key={item?._id} onClick={() => handleSeleteColor(item)}>
                  <div
                    style={{
                      height: "50px",
                      width: "50px",
                      borderRadius: "100%",
                      backgroundColor: `${item?.color}`,
                      cursor: "pointer",
                    }}
                  ></div>
                </div>
              ))}
              <span>
                <p>Số lượng: </p>
                <p>{activeImage?.quality || data?.color[0]?.quality}</p>
              </span>
            </div>
            <div className="productInfor--box--right--des">
              <div dangerouslySetInnerHTML={{ __html: data.des }} />
            </div>
            <div style={{ backgroundColor: "transparent" }} className="btn">
              <button>Mua ngay</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(ProductInfor);
