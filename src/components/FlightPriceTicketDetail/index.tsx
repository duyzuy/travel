"use client";

import React, { memo } from "react";
import Button from "../Button";

const FlightPriceTicketDetail: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  if (!isOpen) {
    return null;
  }
  return (
    <div className="flight-ticket-prices px-4 py-6 border-t">
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
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      id="Capa_1"
                      x="0px"
                      y="0px"
                      viewBox="0 0 512 512"
                      width="20"
                      height="20"
                      className="mr-1"
                    >
                      <g id="Luggage">
                        <path
                          style={{ fill: "#CEE1F2" }}
                          d="M156,372V260c0-44.183,35.817-80,80-80h-60c-44.183,0-80,35.817-80,80v112c0,44.183,35.817,80,80,80&#10;&#9;&#9;h60C191.817,452,156,416.183,156,372z"
                        />
                        <path
                          style={{
                            fill: "none",
                            stroke: "#0023C4",
                            strokeWidth: 40,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeMiterlimit: 10,
                          }}
                          d="&#10;&#9;&#9;M336,452H176c-44.183,0-80-35.817-80-80V260c0-44.183,35.817-80,80-80h160c44.183,0,80,35.817,80,80v112&#10;&#9;&#9;C416,416.183,380.183,452,336,452z"
                        />

                        <line
                          style={{
                            fill: "none",
                            stroke: "#0023C4",
                            strokeWidth: 40,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeMiterlimit: 10,
                          }}
                          x1="336"
                          y1="20"
                          x2="336"
                          y2="100"
                        />

                        <line
                          style={{
                            fill: "none",
                            stroke: "#0023C4",
                            strokeWidth: 40,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeMiterlimit: 10,
                          }}
                          x1="176"
                          y1="100"
                          x2="176"
                          y2="20"
                        />

                        <line
                          style={{
                            fill: "none",
                            stroke: "#0023C4",
                            strokeWidth: 40,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeMiterlimit: 10,
                          }}
                          x1="136"
                          y1="492"
                          x2="136"
                          y2="441.297"
                        />

                        <line
                          style={{
                            fill: "none",
                            stroke: "#0023C4",
                            strokeWidth: 40,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeMiterlimit: 10,
                          }}
                          x1="376"
                          y1="441.297"
                          x2="376"
                          y2="492"
                        />

                        <line
                          style={{
                            fill: "none",
                            stroke: "#0023C4",
                            strokeWidth: 40,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeMiterlimit: 10,
                          }}
                          x1="136"
                          y1="20"
                          x2="376"
                          y2="20"
                        />

                        <line
                          style={{
                            fill: "none",
                            stroke: "#FF5CF4",
                            strokeWidth: 40,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeMiterlimit: 10,
                          }}
                          x1="176"
                          y1="260"
                          x2="336"
                          y2="260"
                        />
                      </g>
                    </svg>
                    <span>Hành lý xách tay 7kg.</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      id="Icon"
                      viewBox="0 0 24 24"
                      width={20}
                      height={20}
                      className="mr-1"
                    >
                      <path
                        d="m16 6.25h-1.25v-2.5h.25c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-6c-.414 0-.75.336-.75.75s.336.75.75.75h.25v2.5h-1.25c-1.517 0-2.75 1.233-2.75 2.75v10c0 1.517 1.233 2.75 2.75 2.75h8c1.517 0 2.75-1.233 2.75-2.75v-10c0-1.517-1.233-2.75-2.75-2.75zm-5.25-2.5h2.5v2.5h-2.5zm6.5 15.25c0 .689-.561 1.25-1.25 1.25h-8c-.689 0-1.25-.561-1.25-1.25v-10c0-.689.561-1.25 1.25-1.25h8c.689 0 1.25.561 1.25 1.25z"
                        fill="#112d55"
                      />
                      <path
                        d="m10 16.75c-.414 0-.75-.336-.75-.75v-4c0-.414.336-.75.75-.75s.75.336.75.75v4c0 .414-.336.75-.75.75zm4.75-.75v-4c0-.414-.336-.75-.75-.75s-.75.336-.75.75v4c0 .414.336.75.75.75s.75-.336.75-.75z"
                        fill="#549bff"
                      />
                    </svg>
                    <span>Không bao gồm hành lý ký gửi</span>
                  </li>
                  <li className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 32 32"
                      width={20}
                      height={20}
                      className="mr-1"
                    >
                      <g id="Layer_2" data-name="Layer 2">
                        <path d="M27.67,5h-4a3.27,3.27,0,0,0-1.82.55L20.05,6.77,18.68,5.7a3.28,3.28,0,0,0-2-.7H4.33A3.33,3.33,0,0,0,1,8.33V23.67A3.33,3.33,0,0,0,4.33,27H16.66a3.33,3.33,0,0,0,2-.7l1.36-1.07,1.82,1.22a3.27,3.27,0,0,0,1.82.55h4A3.33,3.33,0,0,0,31,23.67V8.33A3.33,3.33,0,0,0,27.67,5ZM29,23.67A1.34,1.34,0,0,1,27.67,25h-4a1.29,1.29,0,0,1-.71-.22l-1.9-1.26a1.87,1.87,0,0,0-1-.32,1.92,1.92,0,0,0-1.16.4l-1.43,1.13a1.3,1.3,0,0,1-.79.27H4.33A1.34,1.34,0,0,1,3,23.67V8.33A1.34,1.34,0,0,1,4.33,7H16.66a1.32,1.32,0,0,1,.79.27L18.88,8.4a1.88,1.88,0,0,0,2.2.08L23,7.22A1.22,1.22,0,0,1,23.69,7h4A1.34,1.34,0,0,1,29,8.33Z" />
                        <circle cx="19.99" cy="16" r="1" />
                        <circle cx="19.99" cy="11.3" r="1" />
                        <circle cx="19.99" cy="20.7" r="1" />
                      </g>
                    </svg>
                    <span className="flex-1">
                      Phí đổi vé 378.000 VND và thu chênh lệch tiền vé (nếu có),
                      thời hạn 3h so với giờ khởi hành.
                    </span>
                  </li>
                  <li className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 32 32"
                      width={20}
                      height={20}
                      className="mr-1"
                    >
                      <g id="Layer_2" data-name="Layer 2">
                        <path d="M27.67,5h-4a3.27,3.27,0,0,0-1.82.55L20.05,6.77,18.68,5.7a3.28,3.28,0,0,0-2-.7H4.33A3.33,3.33,0,0,0,1,8.33V23.67A3.33,3.33,0,0,0,4.33,27H16.66a3.33,3.33,0,0,0,2-.7l1.36-1.07,1.82,1.22a3.27,3.27,0,0,0,1.82.55h4A3.33,3.33,0,0,0,31,23.67V8.33A3.33,3.33,0,0,0,27.67,5ZM29,23.67A1.34,1.34,0,0,1,27.67,25h-4a1.29,1.29,0,0,1-.71-.22l-1.9-1.26a1.87,1.87,0,0,0-1-.32,1.92,1.92,0,0,0-1.16.4l-1.43,1.13a1.3,1.3,0,0,1-.79.27H4.33A1.34,1.34,0,0,1,3,23.67V8.33A1.34,1.34,0,0,1,4.33,7H16.66a1.32,1.32,0,0,1,.79.27L18.88,8.4a1.88,1.88,0,0,0,2.2.08L23,7.22A1.22,1.22,0,0,1,23.69,7h4A1.34,1.34,0,0,1,29,8.33Z" />
                        <circle cx="19.99" cy="16" r="1" />
                        <circle cx="19.99" cy="11.3" r="1" />
                        <circle cx="19.99" cy="20.7" r="1" />
                      </g>
                    </svg>
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
                  size="xs"
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
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      id="Capa_1"
                      x="0px"
                      y="0px"
                      viewBox="0 0 512 512"
                      width="20"
                      height="20"
                      className="mr-1"
                    >
                      <g id="Luggage">
                        <path
                          style={{ fill: "#CEE1F2" }}
                          d="M156,372V260c0-44.183,35.817-80,80-80h-60c-44.183,0-80,35.817-80,80v112c0,44.183,35.817,80,80,80&#10;&#9;&#9;h60C191.817,452,156,416.183,156,372z"
                        />
                        <path
                          style={{
                            fill: "none",
                            stroke: "#0023C4",
                            strokeWidth: 40,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeMiterlimit: 10,
                          }}
                          d="&#10;&#9;&#9;M336,452H176c-44.183,0-80-35.817-80-80V260c0-44.183,35.817-80,80-80h160c44.183,0,80,35.817,80,80v112&#10;&#9;&#9;C416,416.183,380.183,452,336,452z"
                        />

                        <line
                          style={{
                            fill: "none",
                            stroke: "#0023C4",
                            strokeWidth: 40,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeMiterlimit: 10,
                          }}
                          x1="336"
                          y1="20"
                          x2="336"
                          y2="100"
                        />

                        <line
                          style={{
                            fill: "none",
                            stroke: "#0023C4",
                            strokeWidth: 40,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeMiterlimit: 10,
                          }}
                          x1="176"
                          y1="100"
                          x2="176"
                          y2="20"
                        />

                        <line
                          style={{
                            fill: "none",
                            stroke: "#0023C4",
                            strokeWidth: 40,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeMiterlimit: 10,
                          }}
                          x1="136"
                          y1="492"
                          x2="136"
                          y2="441.297"
                        />

                        <line
                          style={{
                            fill: "none",
                            stroke: "#0023C4",
                            strokeWidth: 40,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeMiterlimit: 10,
                          }}
                          x1="376"
                          y1="441.297"
                          x2="376"
                          y2="492"
                        />

                        <line
                          style={{
                            fill: "none",
                            stroke: "#0023C4",
                            strokeWidth: 40,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeMiterlimit: 10,
                          }}
                          x1="136"
                          y1="20"
                          x2="376"
                          y2="20"
                        />

                        <line
                          style={{
                            fill: "none",
                            stroke: "#FF5CF4",
                            strokeWidth: 40,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeMiterlimit: 10,
                          }}
                          x1="176"
                          y1="260"
                          x2="336"
                          y2="260"
                        />
                      </g>
                    </svg>
                    <span>Hành lý xách tay 7kg.</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      id="Icon"
                      viewBox="0 0 24 24"
                      width={20}
                      height={20}
                      className="mr-1"
                    >
                      <path
                        d="m16 6.25h-1.25v-2.5h.25c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-6c-.414 0-.75.336-.75.75s.336.75.75.75h.25v2.5h-1.25c-1.517 0-2.75 1.233-2.75 2.75v10c0 1.517 1.233 2.75 2.75 2.75h8c1.517 0 2.75-1.233 2.75-2.75v-10c0-1.517-1.233-2.75-2.75-2.75zm-5.25-2.5h2.5v2.5h-2.5zm6.5 15.25c0 .689-.561 1.25-1.25 1.25h-8c-.689 0-1.25-.561-1.25-1.25v-10c0-.689.561-1.25 1.25-1.25h8c.689 0 1.25.561 1.25 1.25z"
                        fill="#112d55"
                      />
                      <path
                        d="m10 16.75c-.414 0-.75-.336-.75-.75v-4c0-.414.336-.75.75-.75s.75.336.75.75v4c0 .414-.336.75-.75.75zm4.75-.75v-4c0-.414-.336-.75-.75-.75s-.75.336-.75.75v4c0 .414.336.75.75.75s.75-.336.75-.75z"
                        fill="#549bff"
                      />
                    </svg>
                    <span>Hành lý ký gửi 20kg</span>
                  </li>
                  <li className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      id="Layer_1"
                      height={20}
                      viewBox="0 0 100 100"
                      width={20}
                      className="mr-1"
                    >
                      <path d="m73.333 53.333c-1.807 0-3.528.365-5.101 1.016l-18.649 7.725c-.234-.914-.586-1.773-1.025-2.584l31.442-31.443-4.714-4.714-31.441 31.442c-1.306-.703-2.744-1.155-4.287-1.318l-6.42-38.525c-.455-2.712-3.073-4.932-5.824-4.932h-7.314c-3.682 0-6.667 2.981-6.667 6.667v66.666c0 3.682 2.982 6.667 6.667 6.667h60c3.682 0 6.667-2.981 6.667-6.667v-16.666c0-7.363-5.971-13.334-13.334-13.334zm-35 6.667c2.764 0 5 2.236 5 5s-2.236 5-5 5-5-2.236-5-5 2.236-5 5-5zm41.667 23.333h-60v-66.666h6.667l6.334 38.011c-3.746 1.94-6.334 5.811-6.334 10.322 0 6.445 5.221 11.667 11.666 11.667 4.854 0 9.008-2.963 10.769-7.175l21.683-8.984c.814-.335 1.669-.508 2.548-.508 3.676 0 6.667 2.991 6.667 6.667z" />
                      <circle cx="70" cy="73.333" r="3.333" />
                    </svg>
                    <span> Ưu tiên chọn chỗ ngồi yêu thích</span>
                  </li>
                  <li className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 32 32"
                      width={20}
                      height={20}
                      className="mr-1"
                    >
                      <g id="Layer_2" data-name="Layer 2">
                        <path d="M27.67,5h-4a3.27,3.27,0,0,0-1.82.55L20.05,6.77,18.68,5.7a3.28,3.28,0,0,0-2-.7H4.33A3.33,3.33,0,0,0,1,8.33V23.67A3.33,3.33,0,0,0,4.33,27H16.66a3.33,3.33,0,0,0,2-.7l1.36-1.07,1.82,1.22a3.27,3.27,0,0,0,1.82.55h4A3.33,3.33,0,0,0,31,23.67V8.33A3.33,3.33,0,0,0,27.67,5ZM29,23.67A1.34,1.34,0,0,1,27.67,25h-4a1.29,1.29,0,0,1-.71-.22l-1.9-1.26a1.87,1.87,0,0,0-1-.32,1.92,1.92,0,0,0-1.16.4l-1.43,1.13a1.3,1.3,0,0,1-.79.27H4.33A1.34,1.34,0,0,1,3,23.67V8.33A1.34,1.34,0,0,1,4.33,7H16.66a1.32,1.32,0,0,1,.79.27L18.88,8.4a1.88,1.88,0,0,0,2.2.08L23,7.22A1.22,1.22,0,0,1,23.69,7h4A1.34,1.34,0,0,1,29,8.33Z" />
                        <circle cx="19.99" cy="16" r="1" />
                        <circle cx="19.99" cy="11.3" r="1" />
                        <circle cx="19.99" cy="20.7" r="1" />
                      </g>
                    </svg>
                    <span className="flex-1">
                      Miễn phí đổi vé (thu chênh lệch tiền vé nếu có), thời hạn
                      3h so với giờ khởi hành.
                    </span>
                  </li>
                  <li className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height={20}
                      viewBox="0 0 24 24"
                      width={20}
                      className="mr-1"
                    >
                      <g id="Layer_2" data-name="Layer 2">
                        <path
                          d="m11.5 14.25a.74606.74606 0 0 1 -.498-.18945l-2.25-2a.74985.74985 0 0 1 .9961-1.1211l1.7041 1.51465 3.251-3.4668a.74962.74962 0 0 1 1.09375 1.0254l-3.75 4a.74778.74778 0 0 1 -.54695.2373z"
                          fill="#7fbde7"
                        />
                        <path
                          d="m12 22.6084a1.74555 1.74555 0 0 1 -.85059-.22266l-3.37011-1.87304a10.75556 10.75556 0 0 1 -5.5293-9.39649v-5.19531a1.74735 1.74735 0 0 1 1.56934-1.73926 17.37551 17.37551 0 0 0 3.93066-.88864 17.31439 17.31439 0 0 0 3.335-1.59668 1.75276 1.75276 0 0 1 1.83008 0 17.30647 17.30647 0 0 0 3.33392 1.59668 17.392 17.392 0 0 0 3.93262.88867 1.74728 1.74728 0 0 1 1.56838 1.73923v5.19531a10.75556 10.75556 0 0 1 -5.5293 9.39649l-3.37109 1.873a1.73913 1.73913 0 0 1 -.84961.2227zm0-19.67188a.23143.23143 0 0 0 -.124.03516h-.001a18.84065 18.84065 0 0 1 -3.626 1.73532 18.86157 18.86157 0 0 1 -4.27246.9668.24612.24612 0 0 0 -.22654.2471v5.19531a9.25555 9.25555 0 0 0 4.75781 8.08594l3.3711 1.873a.2545.2545 0 0 0 .24121 0l3.37207-1.873a9.25555 9.25555 0 0 0 4.75781-8.08594v-5.19531a.246.246 0 0 0 -.22559-.24707 18.87806 18.87806 0 0 1 -4.27441-.96683 18.86012 18.86012 0 0 1 -3.625-1.73535.23724.23724 0 0 0 -.125-.03513z"
                          fill="#232323"
                        />
                      </g>
                    </svg>
                    <p className="flex-1">
                      Bảo hiểm Deluxe Flight Care (chưa áp dụng cho các chuyến
                      bay do Thai Vietjet khai thác)
                    </p>
                  </li>
                  <li className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 32 32"
                      width={20}
                      height={20}
                      className="mr-1"
                    >
                      <g id="Layer_2" data-name="Layer 2">
                        <path d="M27.67,5h-4a3.27,3.27,0,0,0-1.82.55L20.05,6.77,18.68,5.7a3.28,3.28,0,0,0-2-.7H4.33A3.33,3.33,0,0,0,1,8.33V23.67A3.33,3.33,0,0,0,4.33,27H16.66a3.33,3.33,0,0,0,2-.7l1.36-1.07,1.82,1.22a3.27,3.27,0,0,0,1.82.55h4A3.33,3.33,0,0,0,31,23.67V8.33A3.33,3.33,0,0,0,27.67,5ZM29,23.67A1.34,1.34,0,0,1,27.67,25h-4a1.29,1.29,0,0,1-.71-.22l-1.9-1.26a1.87,1.87,0,0,0-1-.32,1.92,1.92,0,0,0-1.16.4l-1.43,1.13a1.3,1.3,0,0,1-.79.27H4.33A1.34,1.34,0,0,1,3,23.67V8.33A1.34,1.34,0,0,1,4.33,7H16.66a1.32,1.32,0,0,1,.79.27L18.88,8.4a1.88,1.88,0,0,0,2.2.08L23,7.22A1.22,1.22,0,0,1,23.69,7h4A1.34,1.34,0,0,1,29,8.33Z" />
                        <circle cx="19.99" cy="16" r="1" />
                        <circle cx="19.99" cy="11.3" r="1" />
                        <circle cx="19.99" cy="20.7" r="1" />
                      </g>
                    </svg>
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
                  size="xs"
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
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      id="Capa_1"
                      x="0px"
                      y="0px"
                      viewBox="0 0 512 512"
                      width="20"
                      height="20"
                      className="mr-1"
                    >
                      <g id="Luggage">
                        <path
                          style={{ fill: "#CEE1F2" }}
                          d="M156,372V260c0-44.183,35.817-80,80-80h-60c-44.183,0-80,35.817-80,80v112c0,44.183,35.817,80,80,80&#10;&#9;&#9;h60C191.817,452,156,416.183,156,372z"
                        />
                        <path
                          style={{
                            fill: "none",
                            stroke: "#0023C4",
                            strokeWidth: 40,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeMiterlimit: 10,
                          }}
                          d="&#10;&#9;&#9;M336,452H176c-44.183,0-80-35.817-80-80V260c0-44.183,35.817-80,80-80h160c44.183,0,80,35.817,80,80v112&#10;&#9;&#9;C416,416.183,380.183,452,336,452z"
                        />

                        <line
                          style={{
                            fill: "none",
                            stroke: "#0023C4",
                            strokeWidth: 40,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeMiterlimit: 10,
                          }}
                          x1="336"
                          y1="20"
                          x2="336"
                          y2="100"
                        />

                        <line
                          style={{
                            fill: "none",
                            stroke: "#0023C4",
                            strokeWidth: 40,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeMiterlimit: 10,
                          }}
                          x1="176"
                          y1="100"
                          x2="176"
                          y2="20"
                        />

                        <line
                          style={{
                            fill: "none",
                            stroke: "#0023C4",
                            strokeWidth: 40,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeMiterlimit: 10,
                          }}
                          x1="136"
                          y1="492"
                          x2="136"
                          y2="441.297"
                        />

                        <line
                          style={{
                            fill: "none",
                            stroke: "#0023C4",
                            strokeWidth: 40,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeMiterlimit: 10,
                          }}
                          x1="376"
                          y1="441.297"
                          x2="376"
                          y2="492"
                        />

                        <line
                          style={{
                            fill: "none",
                            stroke: "#0023C4",
                            strokeWidth: 40,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeMiterlimit: 10,
                          }}
                          x1="136"
                          y1="20"
                          x2="376"
                          y2="20"
                        />

                        <line
                          style={{
                            fill: "none",
                            stroke: "#FF5CF4",
                            strokeWidth: 40,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeMiterlimit: 10,
                          }}
                          x1="176"
                          y1="260"
                          x2="336"
                          y2="260"
                        />
                      </g>
                    </svg>
                    <span>Hành lý xách tay: 7kg.</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      id="Icon"
                      viewBox="0 0 24 24"
                      width={20}
                      height={20}
                      className="mr-1"
                    >
                      <path
                        d="m16 6.25h-1.25v-2.5h.25c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-6c-.414 0-.75.336-.75.75s.336.75.75.75h.25v2.5h-1.25c-1.517 0-2.75 1.233-2.75 2.75v10c0 1.517 1.233 2.75 2.75 2.75h8c1.517 0 2.75-1.233 2.75-2.75v-10c0-1.517-1.233-2.75-2.75-2.75zm-5.25-2.5h2.5v2.5h-2.5zm6.5 15.25c0 .689-.561 1.25-1.25 1.25h-8c-.689 0-1.25-.561-1.25-1.25v-10c0-.689.561-1.25 1.25-1.25h8c.689 0 1.25.561 1.25 1.25z"
                        fill="#112d55"
                      />
                      <path
                        d="m10 16.75c-.414 0-.75-.336-.75-.75v-4c0-.414.336-.75.75-.75s.75.336.75.75v4c0 .414-.336.75-.75.75zm4.75-.75v-4c0-.414-.336-.75-.75-.75s-.75.336-.75.75v4c0 .414.336.75.75.75s.75-.336.75-.75z"
                        fill="#549bff"
                      />
                    </svg>
                    <span>Hành lý ký gửi: 20kg</span>
                  </li>
                  <li className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      id="Layer_1"
                      height={20}
                      viewBox="0 0 100 100"
                      width={20}
                      className="mr-1"
                    >
                      <path d="m73.333 53.333c-1.807 0-3.528.365-5.101 1.016l-18.649 7.725c-.234-.914-.586-1.773-1.025-2.584l31.442-31.443-4.714-4.714-31.441 31.442c-1.306-.703-2.744-1.155-4.287-1.318l-6.42-38.525c-.455-2.712-3.073-4.932-5.824-4.932h-7.314c-3.682 0-6.667 2.981-6.667 6.667v66.666c0 3.682 2.982 6.667 6.667 6.667h60c3.682 0 6.667-2.981 6.667-6.667v-16.666c0-7.363-5.971-13.334-13.334-13.334zm-35 6.667c2.764 0 5 2.236 5 5s-2.236 5-5 5-5-2.236-5-5 2.236-5 5-5zm41.667 23.333h-60v-66.666h6.667l6.334 38.011c-3.746 1.94-6.334 5.811-6.334 10.322 0 6.445 5.221 11.667 11.666 11.667 4.854 0 9.008-2.963 10.769-7.175l21.683-8.984c.814-.335 1.669-.508 2.548-.508 3.676 0 6.667 2.991 6.667 6.667z" />
                      <circle cx="70" cy="73.333" r="3.333" />
                    </svg>
                    <span>Chỗ ngồi: Ưu tiên chọn chỗ</span>
                  </li>
                  <li className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 32 32"
                      width={20}
                      height={20}
                      className="mr-1"
                    >
                      <g id="Layer_2" data-name="Layer 2">
                        <path d="M27.67,5h-4a3.27,3.27,0,0,0-1.82.55L20.05,6.77,18.68,5.7a3.28,3.28,0,0,0-2-.7H4.33A3.33,3.33,0,0,0,1,8.33V23.67A3.33,3.33,0,0,0,4.33,27H16.66a3.33,3.33,0,0,0,2-.7l1.36-1.07,1.82,1.22a3.27,3.27,0,0,0,1.82.55h4A3.33,3.33,0,0,0,31,23.67V8.33A3.33,3.33,0,0,0,27.67,5ZM29,23.67A1.34,1.34,0,0,1,27.67,25h-4a1.29,1.29,0,0,1-.71-.22l-1.9-1.26a1.87,1.87,0,0,0-1-.32,1.92,1.92,0,0,0-1.16.4l-1.43,1.13a1.3,1.3,0,0,1-.79.27H4.33A1.34,1.34,0,0,1,3,23.67V8.33A1.34,1.34,0,0,1,4.33,7H16.66a1.32,1.32,0,0,1,.79.27L18.88,8.4a1.88,1.88,0,0,0,2.2.08L23,7.22A1.22,1.22,0,0,1,23.69,7h4A1.34,1.34,0,0,1,29,8.33Z" />
                        <circle cx="19.99" cy="16" r="1" />
                        <circle cx="19.99" cy="11.3" r="1" />
                        <circle cx="19.99" cy="20.7" r="1" />
                      </g>
                    </svg>
                    <span className="flex-1">Đổi vé: Miến phí đổi</span>
                  </li>
                  <li className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height={20}
                      viewBox="0 0 24 24"
                      width={20}
                      className="mr-1"
                    >
                      <g id="Layer_2" data-name="Layer 2">
                        <path
                          d="m11.5 14.25a.74606.74606 0 0 1 -.498-.18945l-2.25-2a.74985.74985 0 0 1 .9961-1.1211l1.7041 1.51465 3.251-3.4668a.74962.74962 0 0 1 1.09375 1.0254l-3.75 4a.74778.74778 0 0 1 -.54695.2373z"
                          fill="#7fbde7"
                        />
                        <path
                          d="m12 22.6084a1.74555 1.74555 0 0 1 -.85059-.22266l-3.37011-1.87304a10.75556 10.75556 0 0 1 -5.5293-9.39649v-5.19531a1.74735 1.74735 0 0 1 1.56934-1.73926 17.37551 17.37551 0 0 0 3.93066-.88864 17.31439 17.31439 0 0 0 3.335-1.59668 1.75276 1.75276 0 0 1 1.83008 0 17.30647 17.30647 0 0 0 3.33392 1.59668 17.392 17.392 0 0 0 3.93262.88867 1.74728 1.74728 0 0 1 1.56838 1.73923v5.19531a10.75556 10.75556 0 0 1 -5.5293 9.39649l-3.37109 1.873a1.73913 1.73913 0 0 1 -.84961.2227zm0-19.67188a.23143.23143 0 0 0 -.124.03516h-.001a18.84065 18.84065 0 0 1 -3.626 1.73532 18.86157 18.86157 0 0 1 -4.27246.9668.24612.24612 0 0 0 -.22654.2471v5.19531a9.25555 9.25555 0 0 0 4.75781 8.08594l3.3711 1.873a.2545.2545 0 0 0 .24121 0l3.37207-1.873a9.25555 9.25555 0 0 0 4.75781-8.08594v-5.19531a.246.246 0 0 0 -.22559-.24707 18.87806 18.87806 0 0 1 -4.27441-.96683 18.86012 18.86012 0 0 1 -3.625-1.73535.23724.23724 0 0 0 -.125-.03513z"
                          fill="#232323"
                        />
                      </g>
                    </svg>
                    <p className="flex-1">Bảo hiểm: Deluxe Flight Care</p>
                  </li>
                  <li className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 32 32"
                      width={20}
                      height={20}
                      className="mr-1"
                    >
                      <g id="Layer_2" data-name="Layer 2">
                        <path d="M27.67,5h-4a3.27,3.27,0,0,0-1.82.55L20.05,6.77,18.68,5.7a3.28,3.28,0,0,0-2-.7H4.33A3.33,3.33,0,0,0,1,8.33V23.67A3.33,3.33,0,0,0,4.33,27H16.66a3.33,3.33,0,0,0,2-.7l1.36-1.07,1.82,1.22a3.27,3.27,0,0,0,1.82.55h4A3.33,3.33,0,0,0,31,23.67V8.33A3.33,3.33,0,0,0,27.67,5ZM29,23.67A1.34,1.34,0,0,1,27.67,25h-4a1.29,1.29,0,0,1-.71-.22l-1.9-1.26a1.87,1.87,0,0,0-1-.32,1.92,1.92,0,0,0-1.16.4l-1.43,1.13a1.3,1.3,0,0,1-.79.27H4.33A1.34,1.34,0,0,1,3,23.67V8.33A1.34,1.34,0,0,1,4.33,7H16.66a1.32,1.32,0,0,1,.79.27L18.88,8.4a1.88,1.88,0,0,0,2.2.08L23,7.22A1.22,1.22,0,0,1,23.69,7h4A1.34,1.34,0,0,1,29,8.33Z" />
                        <circle cx="19.99" cy="16" r="1" />
                        <circle cx="19.99" cy="11.3" r="1" />
                        <circle cx="19.99" cy="20.7" r="1" />
                      </g>
                    </svg>
                    <span className="flex-1">
                      Hoàn vé: Hoàn bảo lưu tiền vé tối đa 180 ngày
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
                  size="xs"
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
export default memo(FlightPriceTicketDetail);
