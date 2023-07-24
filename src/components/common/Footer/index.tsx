"use client";

import React, { memo } from "react";
import Image from "next/image";
import { BoCTInformIcon, BoCTRegisterIcon } from "@/assets/icons";
import Link from "next/link";

const FOOTER_CONTENT = [
  {
    id: 1,
    name: "Điều khoản và điều kiện",
    path: "#",
  },
  {
    id: 2,
    name: "Quy định về thanh toán",
    path: "#",
  },
  {
    id: 3,
    name: "Chính sách bảo mật thông tin",
    path: "#",
  },
  {
    id: 4,
    name: "Quy chế hoạt động",
    path: "#",
  },
  {
    id: 5,
    name: "Chương trình khách hàng thân thiết",
    path: "#",
  },
];
const Footer: React.FC = () => {
  return (
    <section className="main-footer pt-16 pb-6 bg-gray-50">
      <div className="footer-one">
        <div className="container mx-auto">
          <div className="logo block mb-5">
            <h1 className="text-3xl">My Logo</h1>
          </div>
          <div className="footer-columns">
            <div className="flex flex-wrap md:-mx-2">
              <div className="footer-column px-3 md:w-1/3 w-1">
                <div className="column-head">
                  <h5 className="font-bold py-3">
                    Công ty cổ phần du lịch Việt Nam VNTravel
                  </h5>
                </div>
                <div className="column-body text-sm leading-normal text-gray-600">
                  <p>Tổng đài chăm sóc: 1900 2083</p>
                  <p>Email: hotro@mytour.vn</p>
                  <p>
                    Văn phòng Hà Nội: Tầng 11, Tòa Peakview, 36 Hoàng Cầu, Đống
                    Đa Văn phòng HCM: Tầng 3, Tòa nhà ACM, 96 Cao Thắng, Quận 3
                  </p>
                </div>
              </div>
              <div className="footer-column px-3 md:w-1/3 w-1">
                <div className="column-head">
                  <h5 className="font-bold py-3">Chính sách & Quy định</h5>
                </div>
                <div className="column-body text-sm leading-normal text-gray-600">
                  {FOOTER_CONTENT.map((item) => (
                    <p key={item.id}>
                      <Link
                        href={item.path}
                        className="nav-link hover:text-emerald-600"
                      >
                        {item.name}
                      </Link>
                    </p>
                  ))}
                </div>
              </div>
              <div className="footer-column px-3 md:w-1/3 w-1 leading-normal">
                <div className="column-head">
                  <h5 className="font-bold py-3">Khách hàng và đối tác</h5>
                </div>
                <div className="column-body text-sm text-gray-600">
                  <p>Đăng nhập HMS</p>
                  <p>Tuyển dụng</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-second">
        <div className="container mx-auto ">
          <div className="content text-center gap-y-4 border-t pt-8 mt-8 leading-relaxed text-xs">
            <p className="text-gray-400">
              Mytour là thành viên của VNTravel Group - Một trong những tập đoàn
              đứng đầu Đông Nam Á về du lịch trực tuyến và các dịch vụ liên
              quan.
            </p>
            <p className="text-gray-400">
              Copyright © 2023- CÔNG TY CỔ PHẦN DU LỊCH VIỆT NAM VNTRAVEL -
              Đăng ký kinh doanh số 0108886908 - do Sở Kế hoạch và Đầu tư thành
              phố Hà Nội cấp lần đầu ngày 04 tháng 09 năm 2019
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default memo(Footer);
