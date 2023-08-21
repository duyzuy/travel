"use client";

import React, { memo } from "react";
import Button from "../../base/Button";
import IconHandBaggage from "../../Icons/IconHandBaggage";
import IconLuggage2 from "../../Icons/IconLuggage2";
import IconTicket2 from "../../Icons/IconTicket2";
import IconInsurance from "../../Icons/IconInsurance";
import IconPlaneSeat from "../../Icons/IconPlaneSeat";
import IconBilling from "../../Icons/IconBilling";
import { FlightDetailItemType } from "@/Models/ticket";
const FlighItemTicketDetail: React.FC<{
  isOpen: boolean;
  data: FlightDetailItemType;
}> = ({ isOpen, data }) => {
  console.log(data);
  if (!isOpen) {
    return null;
  }
  return (
    <div className="flight-ticket-prices px-4 py-6 border-t bg-white">
      <div className="inner">
        <div className="ticket-items flex -mx-2 flex-wrap">
          <div className="ticket-item w-1/2 px-2 mb-4">
            <div className="item-inner border h-full rounded-sm px-4 shadow-sm bg-white">
              <div className="ticket-head py-4">
                <p className="flex items-center">
                  Hạng vé phổ thông
                  <span className="text-xs bg-emerald-600 text-white ml-1 px-1 py-1 rounded-sm">
                    Eco
                  </span>
                </p>
              </div>
              <div className="tickket-body text-sm">
                <ul>
                  <li className="flex items-center mb-1">
                    <IconHandBaggage width={24} height={24} className="mr-2" />
                    <span>Hành lý xách tay 7kg.</span>
                  </li>
                  <li className="flex items-center mb-1">
                    <IconLuggage2 width={24} height={24} className="mr-2" />
                    <span>Không bao gồm hành lý ký gửi</span>
                  </li>
                  <li className="flex mb-1">
                    <IconTicket2 width={24} height={24} className="mr-2" />
                    <span className="flex-1">
                      Phí đổi vé 378.000 VND và thu chênh lệch tiền vé (nếu có),
                      thời hạn 3h so với giờ khởi hành.
                    </span>
                  </li>
                  <li className="flex mb-1">
                    <IconTicket2 width={24} height={24} className="mr-2" />
                    <span className="flex-1">Không hoàn vé</span>
                  </li>
                </ul>
              </div>
              <div className="ticket-bottom py-4">
                <div className="price py-2 text-emerald-600 font-bold">
                  <p>600,000 VND</p>
                </div>
                <Button
                  color="secondary"
                  size="sm"
                  className="w-16 text-xs"
                  rounded="sm"
                >
                  Chọn
                </Button>
              </div>
            </div>
          </div>
          <div className="ticket-item w-1/2 px-2  mb-4">
            <div className="item-inner h-full border rounded-sm px-4 shadow-sm bg-white">
              <div className="ticket-head py-4">
                <p className="flex items-center">
                  Hạng vé phổ thông
                  <span className="text-xs bg-emerald-600 text-white ml-1 px-1 py-1 rounded-sm">
                    Eco
                  </span>
                </p>
              </div>
              <div className="tickket-body text-sm">
                <ul>
                  <li className="flex items-center mb-1">
                    <IconHandBaggage width={24} height={24} className="mr-2" />
                    <span>Hành lý xách tay 7kg.</span>
                  </li>
                  <li className="flex items-center mb-1">
                    <IconLuggage2 width={24} height={24} className="mr-2" />
                    <span>Không bao gồm hành lý ký gửi</span>
                  </li>
                  <li className="flex mb-1">
                    <IconTicket2 width={24} height={24} className="mr-2" />
                    <span className="flex-1">
                      Miễn phí đổi vé (thu chênh lệch tiền vé nếu có), thời hạn
                      3h so với giờ khởi hành.
                    </span>
                  </li>
                  <li className="flex mb-1">
                    <IconTicket2 width={24} height={24} className="mr-2" />
                    <span className="flex-1">Không hoàn vé</span>
                  </li>

                  <li className="flex mb-1">
                    <IconPlaneSeat width={24} height={24} className="mr-2" />
                    <span className="flex-1">Ưu tiên chọn chỗ ngồi</span>
                  </li>

                  <li className="flex">
                    <IconInsurance width={24} height={24} className="mr-2" />
                    <p className="flex-1">
                      Bảo hiểm Deluxe Flight Care (chưa áp dụng cho các chuyến
                      bay do Thai Vietjet khai thác)
                    </p>
                  </li>
                  <li className="flex">
                    <IconBilling width={24} height={24} className="mr-2" />
                    <span className="flex-1">
                      Hoàn bảo lưu tiền vé tối đa 180 ngày và tính phí theo
                      chính sách hãng, thời hạn 24h so với giờ khởi hành.
                    </span>
                  </li>
                </ul>
              </div>
              <div className="ticket-bottom py-4">
                <div className="price py-2 text-emerald-600 font-bold">
                  <p>600,000 VND</p>
                </div>
                <Button
                  color="secondary"
                  size="sm"
                  className="w-16 text-xs"
                  rounded="sm"
                >
                  Chọn
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(FlighItemTicketDetail);
