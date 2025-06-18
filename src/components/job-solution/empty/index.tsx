import EmptyIcon from "@/assets/job-solution/icons/empty";
import LockedIcon from "@/assets/job-solution/icons/locked";
import React, { ReactNode } from "react";

const Empty = ({
  type = "empty",
  title,
  description,
  children,
  className,
}: {
  type?: "empty" | "locked";
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`w-full flex flex-col justify-center items-center gap-[16px] ${
        type === "empty" ? "min-h-[532px]" : "min-h-fit py-[24px]"
      } ${className}`}
    >
      {type === "empty" ? <EmptyIcon /> : <LockedIcon />}

      <div className="flex flex-col gap-[8px]">
        <div
          className="font-h9 whitespace-break-spaces text-center"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        {description && (
          <div
            className="font-body5 text-[var(--text-secondary)] whitespace-break-spaces text-center"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}
        {children}
      </div>
    </div>
  );
};

export default Empty;
