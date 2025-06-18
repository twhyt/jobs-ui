import { DescriptionIcon } from "@/assets/job-solution/icons/suggested-groups/outline";
import { Progress } from "antd";
import { FC } from "react";

interface Props {
  progress: number;
  helperText: string;
}

const ResumeUploadProgress: FC<Props> = ({
  progress,
  helperText,
}): JSX.Element => {
  if (progress === 0) return <></>;
  return (
    <div className="flex gap-[10px] px-[16px] py-[12px] w-full">
      <DescriptionIcon fill="var(--blue-6)" />
      <div className="flex flex-col gap-[2px] w-full">
        <span className="flex-auto text-start pr-[5px] overflow-hidden whitespace-nowrap text-ellipsis font-body5 text-[var(--text-primary)]">
          {helperText}
        </span>
        <Progress percent={progress} showInfo={false} strokeColor="#1A34FF" />
      </div>

      <div className="w-[16px]"></div>
    </div>
  );
};

export default ResumeUploadProgress;
