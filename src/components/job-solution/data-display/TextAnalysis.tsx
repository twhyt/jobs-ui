import {
  CancelFillIcon,
  SuccessFillIcon,
} from "@/assets/job-solution/icons/suggested-groups/filled";
import { ReactNode } from "react";

export interface TextAnalysisProps {
  type: "success" | "warnning";
  title: string | ReactNode;
  id: string;
}

export default function TextAnalysis({ title, type }: TextAnalysisProps) {
  return (
    <div className="flex items-center gap-[4px]">
      {type === "success" && (
        <SuccessFillIcon width={16} height={16} fill="var(--success)" />
      )}
      {type === "warnning" && (
        <CancelFillIcon width={16} height={16} fill="var(--error)" />
      )}
      <span className="font-body5 text-[var(--text-title)]">{title}</span>
    </div>
  );
}
