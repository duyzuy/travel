"use client";
import React, { memo } from "react";
import { useApolloClient } from "@apollo/client";
import { ARTICLE_LISTS } from "@/app/articles";
import { WRITE_ARTICLES } from "@/cache/wtire/article";
import ArticleList from "./ArticleList";
const SectionArticles: React.FC = () => {
  const client = useApolloClient();

  client.writeQuery({
    query: WRITE_ARTICLES,
    data: {
      articles: [...ARTICLE_LISTS],
    },
  });

  return (
    <section className="section mb-5">
      <div className="container mx-auto">
        <div className="section-head pt-5 pb-5 mb-5">
          <h3 className="section-title text-xl lg:text-3xl md:text-left text-center lg:pt-6">
            Tìm kiếm niềm vui của bạn tại?
          </h3>
        </div>
        <div className="section-body">
          <ArticleList />
        </div>
      </div>
    </section>
  );
};
export default memo(SectionArticles);
