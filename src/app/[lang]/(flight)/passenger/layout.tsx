import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Thong tin hanh khach",
};
const SelectFlightLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="main">{children}</div>;
};
export default SelectFlightLayout;
