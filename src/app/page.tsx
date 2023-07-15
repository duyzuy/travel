"use client";
import Image from "next/image";
import SlideImage from "../assets/images/top-main-banner.jpeg";
import BookingMultipleForm from "@/components/BookingMultipleForm";
import styles from "./styles/home.module.scss";
import BookingFormSearch from "./components/BookingFormSearch";

export default function Home() {
  return (
    <main className={styles.homeWrapper}>
      <section className="slider">
        <div className="slide-wrapper">
          <Image src={SlideImage} alt="slider" className="mx-auto" />
        </div>
      </section>
      <section>
        <BookingFormSearch />
      </section>
    </main>
  );
}
