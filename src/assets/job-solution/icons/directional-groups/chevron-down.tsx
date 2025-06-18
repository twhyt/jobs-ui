import { IconProps } from "@/types/job-solution/global";

export default function ChevronDownIcon({
  width = 24,
  height = 24,
  fill = "#8C8C8C",
  active,
  ...rest
}: IconProps) {
  return (
    <div style={{ width: width, height: height }}>
      <svg
        viewBox={`0 0 24 24`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...rest}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.79289 8.29283C6.18342 7.90231 6.81658 7.90231 7.20711 8.29283L12.5 13.5857L17.7929 8.29283C18.1834 7.90231 18.8166 7.90231 19.2071 8.29283C19.5976 8.68336 19.5976 9.31652 19.2071 9.70705L13.2071 15.707C12.8166 16.0976 12.1834 16.0976 11.7929 15.707L5.79289 9.70705C5.40237 9.31652 5.40237 8.68336 5.79289 8.29283Z"
          fill={active ?? fill}
        />
      </svg>
    </div>
  );
}
