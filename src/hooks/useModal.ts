import { ReactiveVar } from "@apollo/client";

export const useModal = (showModalVar: ReactiveVar<boolean>) => {
  const body = document.getElementsByTagName("body");
  const onShowModal = () => {
    const isShow = showModalVar();
    body[0].classList.add("should-fixed");
    if (!isShow) showModalVar(true);
  };

  const onCloseModal = () => {
    const isShow = showModalVar();
    if (body[0].classList.contains("should-fixed")) {
      body[0].classList.remove("should-fixed");
    }
    if (isShow) showModalVar(false);
  };
  return {
    onCloseModal,
    onShowModal,
  };
};
