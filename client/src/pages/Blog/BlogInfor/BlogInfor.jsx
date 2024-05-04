import React, { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./BlogInfor.scss";
import { getBlog } from "../../../api/blog";
import { useQuery } from "@tanstack/react-query";
function BlogInfor() {
  const { id } = useParams();

  const fetchlog = async () => {
    try {
      const res = await getBlog(id);
      if (res.success) {
        return res?.blog;
      }
    } catch (e) {}
  };

  const { data: dataBlog } = useQuery({
    queryKey: [`blog/${id}`],
    queryFn: fetchlog,
    retry: 1,
    retryDelay: 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    cacheTime: 50000,
    staleTime: 1000 * 600,
  });
  return (
    <div className="blogInfor">
      <div className="content">
        <div className="blogInfor--box">
          <h2>{dataBlog?.title}</h2>
          <div
            className="blogInfor--box--content"
            dangerouslySetInnerHTML={{ __html: dataBlog?.content }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default memo(BlogInfor);
