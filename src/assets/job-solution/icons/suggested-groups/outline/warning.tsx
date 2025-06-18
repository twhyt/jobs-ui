const WarningIcon = ({
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
}) => {
  return (
    <svg
      width={size ?? width}
      height={size ?? height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M8 3.29193L12.7401 11.7065H3.25986L8 3.29193ZM2.17083 11.0597C1.68611 11.9199 2.29043 13 3.25986 13H12.7401C13.7096 13 14.3139 11.9199 13.8292 11.0597L9.08904 2.64516C8.60432 1.78495 7.39568 1.78495 6.91096 2.64516L2.17083 11.0597ZM7.3705 6.53227V7.82581C7.3705 8.18154 7.65378 8.47259 8 8.47259C8.34623 8.47259 8.6295 8.18154 8.6295 7.82581V6.53227C8.6295 6.17654 8.34623 5.88549 8 5.88549C7.65378 5.88549 7.3705 6.17654 7.3705 6.53227ZM7.3705 9.76613H8.6295V11.0597H7.3705V9.76613Z"
        fill={fill}
      />
    </svg>
  );
};
export default WarningIcon;
