import { Metadata } from "next";
import PassengerInformation from "./_components/PassengerInformation";
import PassengerContact from "./_components/PassengerContact";
import Button from "@/components/base/Button";
import { PaxType } from "@/constants/enum";
import OrderSummary from "@/components/OrderSummary";
import Luggages from "../addons/luggages";
import Inssurance from "../addons/Inssurance";

export const metadata: Metadata = {
  title: "Thong tin hanh khach",
};
const PassengerPage = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) => {
  return (
    <div className="container flex items-start mx-auto py-12">
      <div className="passenger-wrapper w-4/6 mr-6">
        <div className="box bg-white rounded-sm mb-6 p-6 shadow-sm">
          <div className="head-passenger mb-4">
            <h3 className="text-xl">
              <span className="line w-3 bg-emerald-400 block h-5 rounded-tr-xl rounded-br-xl -translate-x-6 translate-y-1 absolute"></span>
              Thông tin hành khách
            </h3>
            <p className="py-2 text-sm text-gray-500">
              Nhập tiếng Việt không dấu, họ tên trùng khớp trên giấy tờ tuỳ
              thân.
            </p>
          </div>
          <div className="line border-t py-2"></div>
          <div className="body-passenger">
            <div className="form">
              <PassengerInformation paxType={PaxType.ADULT} />
              <PassengerInformation paxType={PaxType.CHILDREN} />
              <PassengerInformation paxType={PaxType.INFANT} />
            </div>
          </div>
        </div>
        <div className="box pax-contact-infor bg-white rounded-sm p-6 shadow-sm">
          <div className="head-box mb-3">
            <h3 className="text-xl">
              <span className="line w-3 bg-emerald-400 block h-5 rounded-tr-xl rounded-br-xl -translate-x-6 translate-y-1 absolute"></span>
              Thông tin liên hệ
            </h3>
            <p className="py-2 text-sm text-gray-600">
              Mã đặt chỗ sẽ được gửi theo thông tin liên hệ dưới đây
            </p>
          </div>
          <div className="body-box">
            <div className="remind-login mb-6">
              <div className="flex items-center bg-emerald-50 px-3 py-2 rounded-lg">
                <span className="icon w-8 h-8 bg-emerald-400 flex items-center justify-center rounded-full mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="#ffff"
                  >
                    <g>
                      <path d="m12 12.75a5.75 5.75 0 1 1 5.75-5.75 5.757 5.757 0 0 1 -5.75 5.75zm0-10a4.25 4.25 0 1 0 4.25 4.25 4.255 4.255 0 0 0 -4.25-4.25z" />
                      <path d="m16.6 22.75h-9.2a3.75 3.75 0 0 1 -3.721-4.215l.141-1.124a4.757 4.757 0 0 1 4.711-4.161h6.938a4.757 4.757 0 0 1 4.713 4.161l.141 1.124a3.75 3.75 0 0 1 -3.723 4.215zm-8.071-8a3.256 3.256 0 0 0 -3.223 2.85l-.14 1.124a2.249 2.249 0 0 0 2.234 2.526h9.2a2.249 2.249 0 0 0 2.232-2.529l-.14-1.124a3.256 3.256 0 0 0 -3.225-2.847z" />
                    </g>
                  </svg>
                </span>
                <div className="remind-text">
                  <p>
                    <span className="text-emerald-500">Đăng nhập</span> để lưu
                    lịch sử chuyến đi của bạn và tiến hành tích điểm đổi quà
                  </p>
                </div>
              </div>
            </div>
            <div className="contact-form">
              <PassengerContact />
            </div>
          </div>
        </div>
        <div className="add-on-services py-6">
          <Luggages />
          <div className="space py-3"></div>
          <Inssurance />
        </div>
        <div className="bottom-box py-6 text-right">
          <Button color="secondary" className="w-36" rounded="sm">
            Tiếp tục
          </Button>
        </div>
      </div>
      <OrderSummary />
    </div>
  );
};
export default PassengerPage;
