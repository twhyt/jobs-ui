import { WarningIcon } from "@/assets/job-solution/icons/suggested-groups/outline";
import React, { useMemo } from "react";

const HelpingText = ({
  color,
  size,
  text = "Helping text",
  iconType = "warning",
}: {
  color?: string;
  size?: "12" | "14" | "16";
  text?: string;
  iconType?: "warning" | "info";
}) => {
  const fontSize = useMemo(() => {
    switch (size) {
      case "12":
        return "font-footnote-description1";
      case "14":
        return "font-body2";
      case "16":
        return "font-body5";
      default:
        return "font-footnote-description1";
    }
  }, [size]);

  return (
    <div className="flex gap-[4px] items-start">
      {iconType === "warning" ? (
        <WarningIcon fill={color} className="mt-[1px] min-w-[16px]" />
      ) : (
        <InformationIcon fill={color} className="mt-[3px] min-w-[16px] " />
      )}

      <span className={`${fontSize} text-[${color}]`}>{text}</span>
    </div>
  );
};

export default HelpingText;

const InformationIcon = ({
  width = "16",
  height = "16",
  size,
  className,
  fill = "#8C8C8C",
}: {
  width?: string;
  height?: string;
  size?: string;
  className?: string;
  fill?: string;
}) => (
  <svg
    width={size ?? width}
    height={size ?? height}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M7.33331 11.3335H8.66665V7.3335H7.33331V11.3335ZM7.99998 6.00016C8.18887 6.00016 8.3472 5.93627 8.47498 5.8085C8.60276 5.68072 8.66665 5.52238 8.66665 5.3335C8.66665 5.14461 8.60276 4.98627 8.47498 4.8585C8.3472 4.73072 8.18887 4.66683 7.99998 4.66683C7.81109 4.66683 7.65276 4.73072 7.52498 4.8585C7.3972 4.98627 7.33331 5.14461 7.33331 5.3335C7.33331 5.52238 7.3972 5.68072 7.52498 5.8085C7.65276 5.93627 7.81109 6.00016 7.99998 6.00016ZM7.99998 14.6668C7.07776 14.6668 6.21109 14.4918 5.39998 14.1418C4.58887 13.7918 3.88331 13.3168 3.28331 12.7168C2.68331 12.1168 2.20831 11.4113 1.85831 10.6002C1.50831 9.78905 1.33331 8.92238 1.33331 8.00016C1.33331 7.07794 1.50831 6.21127 1.85831 5.40016C2.20831 4.58905 2.68331 3.8835 3.28331 3.2835C3.88331 2.6835 4.58887 2.2085 5.39998 1.8585C6.21109 1.5085 7.07776 1.3335 7.99998 1.3335C8.9222 1.3335 9.78887 1.5085 10.6 1.8585C11.4111 2.2085 12.1166 2.6835 12.7166 3.2835C13.3166 3.8835 13.7916 4.58905 14.1416 5.40016C14.4916 6.21127 14.6666 7.07794 14.6666 8.00016C14.6666 8.92238 14.4916 9.78905 14.1416 10.6002C13.7916 11.4113 13.3166 12.1168 12.7166 12.7168C12.1166 13.3168 11.4111 13.7918 10.6 14.1418C9.78887 14.4918 8.9222 14.6668 7.99998 14.6668ZM7.99998 13.3335C9.48887 13.3335 10.75 12.8168 11.7833 11.7835C12.8166 10.7502 13.3333 9.48905 13.3333 8.00016C13.3333 6.51127 12.8166 5.25016 11.7833 4.21683C10.75 3.1835 9.48887 2.66683 7.99998 2.66683C6.51109 2.66683 5.24998 3.1835 4.21665 4.21683C3.18331 5.25016 2.66665 6.51127 2.66665 8.00016C2.66665 9.48905 3.18331 10.7502 4.21665 11.7835C5.24998 12.8168 6.51109 13.3335 7.99998 13.3335Z"
      fill={fill}
    />
  </svg>
);
