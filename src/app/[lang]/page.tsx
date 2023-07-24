import Image from "next/image";
import SlideImage from "../../assets/images/top-main-banner.jpeg";
import styles from "../styles/home.module.scss";
import PromotedFlights from "./components/PromotedFlights";
import SectionArticles from "./components/SectionArticles";
import BookingMultipleForm from "@/components/BookingMultipleForm";
import classNames from "classnames";
import { Suspense } from "react";
export default function Page({
  params: { lang },
}: {
  params: { lang: string };
}) {
  return (
    <main className={styles.homeWrapper}>
      <section className="slider">
        <div className="slide-wrapper">
          <Image
            src={SlideImage}
            alt="slider"
            className={classNames({
              vi: lang === "vi-VN",
              en: lang === "en-US",
            })}
          />
        </div>
      </section>
      <section>
        <BookingMultipleForm />
      </section>
      <div className="gap md:py-8 py-4"></div>
      <Suspense fallback="loading promote flight...">
        <PromotedFlights />
      </Suspense>
      <Suspense fallback="loading article...">
        <SectionArticles />
      </Suspense>
    </main>
  );
}
