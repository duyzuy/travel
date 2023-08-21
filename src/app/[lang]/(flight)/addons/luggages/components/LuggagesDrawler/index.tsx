"use client";
import Drawler from "@/components/base/Drawler";
import React, { memo } from "react";
import { showModalLuggageVar } from "@/cache/vars";
import { useModal } from "@/hooks/useModal";
import { useReactiveVar } from "@apollo/client";
import Button from "@/components/base/Button";
import LuggagesBySectors from "./LuggagesBySectors";
import LuggageNavigationBar from "../LuggageNavigationBar";
const LuggagesDrawler: React.FC = () => {
  const isShowLuggage = useReactiveVar(showModalLuggageVar);
  const { onCloseModal } = useModal(showModalLuggageVar);

  return (
    <Drawler isOpen={isShowLuggage} onClose={onCloseModal}>
      <div className="lugggage-container">
        <div className="luggage-items relative z-10 bg-white pb-16">
          <LuggagesBySectors />
        </div>
      </div>
      <LuggageNavigationBar />
    </Drawler>
  );
};
export default memo(LuggagesDrawler);
