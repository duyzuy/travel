import type { Metadata } from "next";
import localFont from "next/font/local";
import dynamic from "next/dynamic";
import "../styles/global.scss";
import { ApolloWrapper } from "../ApolloWrapper";
import Loading from "./loading";
import { Suspense } from "react";
import RegisterModal from "./components/RegisterModal";
const productSans = localFont({
  src: [
    {
      path: "../../assets/fonts/productSans/Product-Sans-Bold-Italic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../assets/fonts/productSans/Product-Sans-Bold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../assets/fonts/productSans/Product-Sans-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../assets/fonts/productSans/Product-Sans-Regular.ttf",
      weight: "300",
      style: "regular",
    },
    {
      path: "../../assets/fonts/productSans/Product-Sans-Regular.otf",
      weight: "300",
      style: "regular",
    },
  ],
});

const DynamicMainHeader = dynamic(
  () => import("@/app/[lang]/components/common/MainHeader"),
  {
    loading: () => <p>Loading...</p>,
  }
);
const DynamicFooter = dynamic(() => import("@/components/common/Footer"), {
  loading: () => <p>Loading...</p>,
});
export const metadata: Metadata = {
  title: "Next Booking",
  description: "travel Booking site",
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={params.lang}>
      <body className={productSans.className} suppressHydrationWarning={true}>
        <ApolloWrapper>
          <DynamicMainHeader />
          <Suspense fallback={<Loading />}>{children}</Suspense>
          {/* <RegisterModal /> */}
          <DynamicFooter />
        </ApolloWrapper>
      </body>
    </html>
  );
}
