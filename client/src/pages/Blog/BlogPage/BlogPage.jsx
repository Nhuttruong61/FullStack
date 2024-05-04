import React, { memo } from "react";
import "./BlogPage.scss";
import { getBlogs } from "../../../api/blog";
import moment from "moment";
import withBase from "../../../hocs/withBase";
import { useQuery } from "@tanstack/react-query";
import LoadingItem from "../../../componets/Loading/LoadingItem";

function BlogPage({ navigate }) {
  const fetchData = async () => {
    try {
      const res = await getBlogs();
      if (res.success) {
        return res?.blog;
      }
    } catch (e) {
      console.log(e);
    }
  };
  const { isLoading, data: listData } = useQuery({
    queryKey: ["blog"],
    queryFn: fetchData,
    retry: 1,
    retryDelay: 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    cacheTime: 50000,
    staleTime: 1000 * 600,
  });

  return (
    <LoadingItem isLoading={isLoading}>
      <div className="blogPage">
        <div className="content">
          <div className="blogPage--new">
            <h3>Mới nhất</h3>
          </div>
          {listData?.map((item) => {
            return (
              <div
                className="blogPage--box"
                onClick={() => navigate(`/blog/${item.id}`)}
              >
                <div className="blogPage--box--left">
                  <img src={item?.avatar?.url} alt="" />
                </div>
                <div className="blogPage--box--right">
                  <p className="blogPage--box--right--title">{item?.title}</p>
                  <p className="blogPage--box--right--time">
                    {moment(item?.updatedAt).fromNow()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </LoadingItem>
  );
}

export default withBase(memo(BlogPage));
