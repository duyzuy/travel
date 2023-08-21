"use client";
import React, { memo } from "react";
import Image from "next/image";
import { ArticleType } from "@/Models/article";
import Link from "next/link";
import styles from "./article.module.scss";
const Article: React.FC<{ data: ArticleType }> = ({ data }) => {
  return (
    <div
      className={`${styles.wrapper} article w-1/2 md:w-1/3 lg:w-1/5 px-3 mb-6`}
    >
      <div className="article-inner relative">
        <div className="article-thumbnail rounded-sm overflow-hidden">
          <Image
            src={data.thumbnail}
            alt={data.name}
            width={500}
            height={350}
          />
        </div>
        <div className="article-content pt-6 pb-3 absolute bottom-0 px-2 text-white left-0 right-0">
          <Link href="#">
            <h4 className="title text-lg">{data.name}</h4>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default memo(Article);
