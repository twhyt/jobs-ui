import { IconProps } from "@/types/job-solution/global";

export default function ChevronUpIcon({
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.79289 15.7071C6.18342 16.0976 6.81658 16.0976 7.20711 15.7071L12.5 10.4142L17.7929 15.7071C18.1834 16.0976 18.8166 16.0976 19.2071 15.7071C19.5976 15.3166 19.5976 14.6834 19.2071 14.2929L13.2071 8.29289C12.8166 7.90237 12.1834 7.90237 11.7929 8.29289L5.79289 14.2929C5.40237 14.6834 5.40237 15.3166 5.79289 15.7071Z"
        fill={active ?? fill}
      />
    </svg>
  );
}
