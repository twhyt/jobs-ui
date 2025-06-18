import { IconProps } from "@/types/job-solution/global";

export default function FlagIcon({
  width = 24,
  height = 24,
  fill = "#008A20",
  active,
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_7069_77101"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <rect width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_7069_77101)">
        <path
          d="M7 13V21C7 21.2833 6.90417 21.5208 6.7125 21.7125C6.52083 21.9042 6.28333 22 6 22C5.71667 22 5.47917 21.9042 5.2875 21.7125C5.09583 21.5208 5 21.2833 5 21V4C5 3.71667 5.09583 3.47917 5.2875 3.2875C5.47917 3.09583 5.71667 3 6 3H19.525C19.7083 3 19.8708 3.04167 20.0125 3.125C20.1542 3.20833 20.2667 3.31667 20.35 3.45C20.4333 3.58333 20.4875 3.72917 20.5125 3.8875C20.5375 4.04583 20.5167 4.20833 20.45 4.375L19 8L20.45 11.625C20.5167 11.7917 20.5375 11.9542 20.5125 12.1125C20.4875 12.2708 20.4333 12.4167 20.35 12.55C20.2667 12.6833 20.1542 12.7917 20.0125 12.875C19.8708 12.9583 19.7083 13 19.525 13H7Z"
          fill={active ?? fill}
        />
      </g>
    </svg>
  );
}
