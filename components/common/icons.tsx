"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

export function UploadButton({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <svg
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
      width="18"
      height="19"
      viewBox="0 0 18 19"
      fill="none"
      stroke={isHovered ? "orange" : props.stroke} // Default color or prop
      xmlns="http://www.w3.org/2000/svg"
      className={cn("", className)}
    >
      <path
        d="M9 6L9.6 5.2L9 4.75L8.4 5.2L9 6ZM8 18C8 18.5523 8.44772 19 9 19C9.55228 19 10 18.5523 10 18L8 18ZM13.6 8.2L9.6 5.2L8.4 6.8L12.4 9.8L13.6 8.2ZM8.4 5.2L4.4 8.2L5.6 9.8L9.6 6.8L8.4 5.2ZM8 6L8 18L10 18L10 6L8 6Z"
        fill="#9B9A9F"
      />
      <path
        d="M5 14V14C4.07003 14 3.60504 14 3.22354 13.8978C2.18827 13.6204 1.37962 12.8117 1.10222 11.7765C1 11.395 1 10.93 1 10V7C1 4.17157 1 2.75736 1.87868 1.87868C2.75736 1 4.17157 1 7 1H11C13.8284 1 15.2426 1 16.1213 1.87868C17 2.75736 17 4.17157 17 7V10C17 10.93 17 11.395 16.8978 11.7765C16.6204 12.8117 15.8117 13.6204 14.7765 13.8978C14.395 14 13.93 14 13 14V14"
        stroke="#9B9A9F"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
