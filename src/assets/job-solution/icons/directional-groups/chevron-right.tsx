import { IconProps } from "@/types/job-solution/global";

export default function ChevronRightIcon({
  width = 16,
  height = 16,
  fill = "#8C8C8C",
  active,
}: IconProps) {
  return (
    <div style={{ width: width, height: height }}>
      <svg
        width={"100%"}
        height={"100%"}
        viewBox={`0 0 ${16} ${16}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.86225 3.52864C5.6019 3.78899 5.6019 4.2111 5.86225 4.47145L9.39085 8.00004L5.86225 11.5286C5.60191 11.789 5.60191 12.2111 5.86225 12.4714C6.1226 12.7318 6.54471 12.7318 6.80506 12.4714L10.8051 8.47144C11.0654 8.2111 11.0654 7.78899 10.8051 7.52864L6.80506 3.52864C6.54471 3.26829 6.1226 3.26829 5.86225 3.52864Z"
          fill={active ?? fill}
        />
      </svg>
    </div>
  );
}
