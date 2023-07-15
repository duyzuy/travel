import "./styles/global.scss";
import type { Metadata } from "next";
import localFont from "next/font/local";
import dynamic from "next/dynamic";
import { ApolloWrapper } from "@/libs/apollo/ApolloWrapper";
const productSans = localFont({
  src: [
    {
      path: "../assets/fonts/productSans/Product-Sans-Bold-Italic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../assets/fonts/productSans/Product-Sans-Bold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/fonts/productSans/Product-Sans-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../assets/fonts/productSans/Product-Sans-Regular.ttf",
      weight: "300",
      style: "normal",
    },
  ],
});

const DynamicNavbar = dynamic(() => import("@/components/common/Navbar"), {
  loading: () => <p>Loading...</p>,
});
const DynamicFooter = dynamic(() => import("@/components/common/Footer"), {
  loading: () => <p>Loading...</p>,
});
export const metadata: Metadata = {
  title: "Next Booking",
  description: "travel Booking site",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={productSans.className}>
        <ApolloWrapper>
          <DynamicNavbar />
          {children}
          <DynamicFooter />
        </ApolloWrapper>
      </body>
    </html>
  );
}
