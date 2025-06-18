import React from "react";

export interface ProjectTypeProps {
  type: "resume_extractor" | "candidate_check" | "jd_gen" | "caption";
}
const ProjectTypeCard = ({ type }: ProjectTypeProps) => {
  const typeMap: Record<typeof type, string> = {
    resume_extractor: "R",
    candidate_check: "C",
    jd_gen: "JD",
    caption: "Ca",
  };
  return (
    <div className="min-w-[24px] h-[24px] rounded-[96px] bg-[var(--blue-1)] text-center">
      <span className="font-button5 text-[var(--text-title)]">
        {typeMap[type]}
      </span>
    </div>
  );
};

export default ProjectTypeCard;
