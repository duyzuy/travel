"use client";

import React, { useEffect } from "react";

import { usePathname } from "next/navigation";
import BookingHeader from "./Bookingheader";
import MainHeader from "./MainHeader";

const DynamicHeader = () => {
  const pathname = usePathname();

  const pathArr = ["select-flight", "passenger", "seats", "addons"];

  const isExistsPath = isPathnameHasPathString(pathname, pathArr, 2);

  if (isExistsPath) {
    return <BookingHeader />;
  }

  return <MainHeader />;
};
export default DynamicHeader;

const isPathnameHasPathString = (
  pathname: string,
  pathstr: string[],
  depth = 1
) => {
  const pathnameArr = pathname.split("/");
  if (pathnameArr.length && pathstr.includes(pathnameArr[depth])) {
    return true;
  }

  return false;
};
