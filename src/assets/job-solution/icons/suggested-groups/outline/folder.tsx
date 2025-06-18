import { IconProps } from "@/types/job-solution/global";

export default function FolderOutlineIcon({
  width = 24,
  height = 24,
  fill = "#8C8C8C",
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
      <path
        d="M4.875 20C4.325 20 3.85417 19.8042 3.4625 19.4125C3.07083 19.0208 2.875 18.55 2.875 18V6C2.875 5.45 3.07083 4.97917 3.4625 4.5875C3.85417 4.19583 4.325 4 4.875 4H10.05C10.3167 4 10.5708 4.05 10.8125 4.15C11.0542 4.25 11.2667 4.39167 11.45 4.575L12.875 6H20.875C21.425 6 21.8958 6.19583 22.2875 6.5875C22.6792 6.97917 22.875 7.45 22.875 8V18C22.875 18.55 22.6792 19.0208 22.2875 19.4125C21.8958 19.8042 21.425 20 20.875 20H4.875ZM4.875 18H20.875V8H12.05L10.05 6H4.875V18Z"
        fill={active ?? fill}
      />
    </svg>
  );
}
