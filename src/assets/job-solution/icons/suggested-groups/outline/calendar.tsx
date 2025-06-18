import { IconProps } from "@/types/job-solution/global";

export default function CalendarIcon({
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
        d="M21.2 4.3H17V2.7C17 2.59 16.91 2.5 16.8 2.5H15.4C15.29 2.5 15.2 2.59 15.2 2.7V4.3H8.8V2.7C8.8 2.59 8.71 2.5 8.6 2.5H7.2C7.09 2.5 7 2.59 7 2.7V4.3H2.8C2.3575 4.3 2 4.6575 2 5.1V21.7C2 22.1425 2.3575 22.5 2.8 22.5H21.2C21.6425 22.5 22 22.1425 22 21.7V5.1C22 4.6575 21.6425 4.3 21.2 4.3ZM20.2 20.7H3.8V11.2H20.2V20.7ZM3.8 9.5V6.1H7V7.3C7 7.41 7.09 7.5 7.2 7.5H8.6C8.71 7.5 8.8 7.41 8.8 7.3V6.1H15.2V7.3C15.2 7.41 15.29 7.5 15.4 7.5H16.8C16.91 7.5 17 7.41 17 7.3V6.1H20.2V9.5H3.8Z"
        fill={active ?? fill}
      />
    </svg>
  );
}
