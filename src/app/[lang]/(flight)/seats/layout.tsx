import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Chon ghe ngoi",
};
const SelectFlightLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="main" style={{ background: "#F4F8FA" }}>
      {children}
    </div>
  );
};
export default SelectFlightLayout;
