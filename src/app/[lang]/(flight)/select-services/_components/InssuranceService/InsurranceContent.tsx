"use client";

import Link from "next/link";
import { memo } from "react";

const InsurraceContent: React.FC = () => {
  return (
    <div>
      <p>Mỗi hành trình, mỗi chuyến đi, Chubb luôn đồng hành!</p>
      <p>Lên đến 210 triệu đồng cho Quyền lợi Tai nạn Cá nhân.</p>
      <p>Lên đến 1,2 triệu đồng cho Quyền lợi Huỷ, Hoãn chuyến bay.</p>
      <p>Lên đến 1 triệu đồng cho Quyền lợi Hành lý bị chậm trễ.</p>
      <p>
        Với việc lựa chọn Bảo hiểm Chubb Flight, tôi đã hiểu và đồng ý với{" "}
        <Link href="https://docs.atuat.acegroup.com/aceStatic/Doc/VN/ChubbFlight/PolicyWordingTripi.pdf">
          Quyền lợi, Quy tắc bảo hiểm và Nội dung tuyên bố và uỷ quyền
        </Link>
        do Chubb quy định.
      </p>
      <p>
        Lưu ý: Nếu chuyến đi được bảo hiểm theo Hợp đồng có thay đổi, liên hệ
        hotline +84 28 3910 7300 hoặc email travel.vn@chubb.vn để điều chỉnh
        nhằm đảm bảo hợp đồng bảo hiểm có hiệu lực.
      </p>
    </div>
  );
};
export default memo(InsurraceContent);
