import React, { memo } from "react";
const IconGoogle: React.FC<{
  className?: string;
  width?: number;
  height?: number;
}> = ({ className = "", width = 22, height = 22 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={className}
      viewBox="0 0 32 32"
    >
      <path
        d="m23.75 16a7.7446 7.7446 0 0 1 -15.0323 2.6259l-4.4328 3.5462a13.244 13.244 0 0 0 24.9651-6.1721"
        fill="#00ac47"
      />
      <path
        d="m23.75 16a7.7387 7.7387 0 0 1 -3.2516 6.2987l4.3824 3.5059a13.2042 13.2042 0 0 0 4.3692-9.8046"
        fill="#4285f4"
      />
      <path
        d="m8.25 16a7.698 7.698 0 0 1 .4677-2.6259l-4.4328-3.5462a13.177 13.177 0 0 0 0 12.3442l4.4328-3.5462a7.698 7.698 0 0 1 -.4677-2.6259z"
        fill="#ffba00"
      />
      <path d="" fill="#2ab2db" />
      <path
        d="m16 8.25a7.699 7.699 0 0 1 4.558 1.4958l4.06-3.7893a13.2152 13.2152 0 0 0 -20.3331 3.8714l4.4328 3.5462a7.756 7.756 0 0 1 7.2823-5.1241z"
        fill="#ea4435"
      />
      <path d="" fill="#2ab2db" />
      <path
        d="m29.25 15v1l-2.25 3.5h-10.5v-5.5h11.75a1 1 0 0 1 1 1z"
        fill="#4285f4"
      />
    </svg>
  );
};
export default memo(IconGoogle);
