import { ChevronDownIcon } from "@/assets/job-solution/icons/directional-groups";
import { FC } from "react";
import { Divider } from "antd";
import Suggestions from "./Suggestions";
import CandidateProfile from "./CandidateProfile";
import { v4 } from "uuid";
// import useTranslation from "@/hooks/useTranslation";

interface Props {
  onClickExpand: () => void;
  expand: boolean;
  suggestion: {
    id: string;
    content: string;
    title: string;
  }[];
  candidateProfile: {
    id: string;
    title: string;
    content: string[];
  }[];
  strengths: string[];
  missingPoints: string[];
}

const DetailedAnalysisContainer: FC<Props> = ({
  expand,
  onClickExpand,
  suggestion,
  candidateProfile,
  strengths,
  missingPoints,
}): JSX.Element => {
  // const { t } = useTranslation("candidateChecker");

  return (
    <div className="rounded-[8px] bg-[var(--gray-1)] py-[8px] px-[12px] flex flex-col">
      <div className="flex justify-between" id="detailed-container">
        <span className="font-h10 text-[var(--text-title)]">
          {/* {t("header_text__20")} */}
          header_text__20
        </span>
        <button className="flex gap-[4px] items-center" onClick={onClickExpand}>
          <span className="text-[var(--blue-6)]">
            {expand ? "button__18" : "button__19"}
          </span>
          <ChevronDownIcon
            width={16}
            height={16}
            style={{
              transform: expand ? "rotate(180deg)" : "rotate(0deg)",
              fill: "var(--blue-6)",
              fontSize: "16px",
            }}
            fill="var(--blue-6)"
          />
        </button>
      </div>

      {/* Expanded Content */}
      <div
        className="flex flex-col w-full"
        style={{
          position: expand ? "relative" : "absolute",
          left: expand ? "0" : "-9999px",
          visibility: expand ? "visible" : "hidden",
          overflow: expand ? "auto" : "hidden",
          height: expand ? "auto" : "0",
          width: expand ? "auto" : "0",
        }}
      >
        <CandidateProfile items={candidateProfile} />

        <Divider className="!m-0 !bg-[var(--gray-5)]" />

        <div className="p-3 pl-0 flex flex-col gap-3">
          <div>
            <h1 className="font-subtitle4 text-[var(--blue-6)]">
              {/* {t("header_text__21")} */} header_text__21
            </h1>
            <ul style={{ listStyle: "outside" }}>
              {strengths?.map((content) => {
                const id = v4();
                return (
                  <li className="ml-8" key={id}>
                    <span className="font-body5">{content}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h1 className="font-subtitle4 text-[var(--blue-6)]">
              {/* {t("header_text__22")} */} header_text__22
            </h1>
            <ul style={{ listStyle: "outside" }}>
              {missingPoints.map((content) => {
                const id = v4();
                return (
                  <li className="ml-8" key={id}>
                    <span className="font-body5">{content}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <Divider className="!m-0 !bg-[var(--gray-5)]" />

        <Suggestions items={suggestion} />
      </div>
    </div>
  );
};

export default DetailedAnalysisContainer;
