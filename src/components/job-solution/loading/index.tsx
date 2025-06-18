import clsx from "clsx";

const ThreeDotColorLoading = ({
  color = "bg-[var(--white-100)]",
}: {
  color?: string;
}) => {
  return (
    <div className="flex items-center space-x-2">
      <span
        className={clsx(
          "w-2 h-2 rounded-full animate-[opacity-pulse_1.5s_ease-in-out_infinite] [animation-delay:-0.3s]",
          color
        )}
      />
      <span
        className={clsx(
          "w-2 h-2 rounded-full animate-[opacity-pulse_1.5s_ease-in-out_infinite] [animation-delay:-0.15s]",
          color
        )}
      />
      <span
        className={clsx(
          "w-2 h-2 rounded-full animate-[opacity-pulse_1.5s_ease-in-out_infinite]",
          color
        )}
      />
    </div>
  );
};

export default ThreeDotColorLoading;
