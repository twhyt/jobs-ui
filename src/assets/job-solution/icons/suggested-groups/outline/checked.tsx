import { IconProps } from "@/types/job-solution/global";

export default function CheckedIcon({
  width = 24,
  height = 24,
  fill = "#8C8C8C",
  minWidth = 24,
  active,
}: IconProps) {
  return (
    <div style={{ width: width, height: height, minWidth: minWidth }}>
      <svg
        width={"100%"}
        height={"100%"}
        viewBox={`0 0 24 24`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.60433 15.7264L6.16376 12.3865C5.78038 12.0143 5.17091 12.0143 4.78753 12.3865C4.40416 12.7586 4.40416 13.3503 4.78753 13.7225L8.90639 17.7209C9.28977 18.093 9.90907 18.093 10.2924 17.7209L20.7125 7.61511C21.0958 7.24294 21.0958 6.65129 20.7125 6.27913C20.3291 5.90696 19.7196 5.90696 19.3362 6.27913L9.60433 15.7264Z"
          fill={active ?? fill}
        />
      </svg>
    </div>
  );
}
