import React, { memo } from "react";
const IconShipping: React.FC<{
  className?: string;
  width?: number;
  height?: number;
}> = ({ className = "", width = 22, height = 22 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Layer_1"
      height={height}
      viewBox="0 0 512 512"
      width={width}
      className={className}
    >
      <path
        d="m497.92 306.07h-89.02v-42.01h66.99c4.45 0 8.06-3.61 8.06-8.06s-3.61-8.06-8.06-8.06h-66.99v-42.01h44.96c4.45 0 8.06-3.61 8.06-8.06s-3.61-8.06-8.06-8.06h-44.96v-45.46c0-2.88-1.53-5.54-4.03-6.98l-193.38-111.65c-2.49-1.44-5.56-1.44-8.05 0l-193.39 111.65c-2.49 1.44-4.03 4.1-4.03 6.98v223.3c0 2.88 1.54 5.54 4.03 6.97l193.39 111.66c1.24.72 2.63 1.08 4.03 1.08 1.39 0 2.78-.36 4.02-1.08l193.38-111.66c2.5-1.43 4.03-4.09 4.03-6.97v-45.46h89.02c4.45 0 8.06-3.61 8.06-8.06s-3.61-8.06-8.06-8.06zm-178.09-199.19-181.3 104.67c-2.49 1.44-4.03 4.1-4.03 6.98v39.19l-47.79-27.59v-43.85l185.32-107zm72.96 82.93h-83.73c-4.45 0-8.05 3.61-8.05 8.06s3.6 8.06 8.05 8.06h83.73v42.01h-61.7c-4.45 0-8.06 3.61-8.06 8.06s3.61 8.06 8.06 8.06h61.7v42.01h-39.67c-4.45 0-8.06 3.61-8.06 8.06s3.61 8.06 8.06 8.06h39.67v40.81l-185.32 107-185.33-107v-214l185.33-107 48.45 27.98-181.29 104.67c-2.5 1.44-4.04 4.1-4.04 6.98v53.15c0 2.88 1.54 5.54 4.04 6.98l63.9 36.9c1.25.72 2.64 1.08 4.03 1.08 1.4 0 2.79-.36 4.03-1.08 2.5-1.44 4.03-4.1 4.03-6.98v-48.5l185.32-107 56.85 32.82z"
        fill="#003673"
      />
      <path
        d="m301.01 197.87c0 4.45 3.6 8.06 8.05 8.06h83.73v42.01h-61.7c-4.45 0-8.06 3.61-8.06 8.06s3.61 8.06 8.06 8.06h61.7v42.01h-39.67c-4.45 0-8.06 3.61-8.06 8.06s3.61 8.06 8.06 8.06h39.67v40.81l-185.32 107-185.33-107v-214l185.33-107 48.45 27.98-181.29 104.67c-2.5 1.44-4.04 4.1-4.04 6.98v53.15c0 2.88 1.54 5.54 4.04 6.98l63.9 36.9c1.25.72 2.64 1.08 4.03 1.08 1.4 0 2.79-.36 4.03-1.08 2.5-1.44 4.03-4.1 4.03-6.98v-48.5l185.32-107 56.85 32.82v40.81h-83.73c-4.45 0-8.05 3.61-8.05 8.06z"
        fill="#73d8ff"
      />
    </svg>
  );
};
export default memo(IconShipping);
