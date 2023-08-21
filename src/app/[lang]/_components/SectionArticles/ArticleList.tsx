"use client";
import React, { memo } from "react";
import Image from "next/image";
import { useQuery } from "@apollo/client";
import { QUERY_ARTICLES_POST } from "@/operations/queries/article";
import { ArticleListType, ArticleType } from "@/Models/article";
import Link from "next/link";
import Article from "./Article";
const ArticleList: React.FC = () => {
  const { data } = useQuery(QUERY_ARTICLES_POST);

  return (
    <>
      <div className="articles flex flex-wrap md:-mx-3">
        {data &&
          data.articles.map((item: ArticleType) => (
            <Article data={item} key={item.id} />
          ))}
      </div>
    </>
  );
};
export default memo(ArticleList);
6;
