import { ChevronDownIcon } from "@/assets/job-solution/icons/directional-groups";
// import { AnimatePresence, motion } from "framer-motion";
import { FC, useEffect, useState } from "react";
// import axiosInstance from "@/utils/job-solution/axiosInstance";
import { CandidateSummary } from "@/types/job-solution/candidate-checker";
// import { translateObject } from "@/utils/translateObject";
import { JdCdItem } from "@/types/job-solution/project";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Tag from "./Tag";
import DetailedJdCdCd from "./DetailedJdCdCd";

type SummaryItemProps = {
  onUpdateHasFullSummary?: (candidateId: string) => void;
  hasFullSummary?: boolean;
  candidateId: string;
  projectId: string;
  jd_cd_id: string;
  name: string;
  lang: "OG" | "TH" | "EN";
  short_summary: string;
  flag: {
    green: {
      count: number;
      keywords: string[];
    };
    red: {
      count: number;
      keywords: string[];
    };
  };
  matchScore: number;
  thumb: {
    up: {
      count: number;
      keywords: string[];
    };
    down: {
      count: number;
      keywords: string[];
    };
  };
  alert: {
    first_jobber: boolean;
    job_hopper: boolean;
    unemployed: boolean;
    word_counting: boolean;
  };
  suitabilityLevel: number;
};

const SummaryJdCdCdItem: FC<SummaryItemProps> = ({
  name,
  flag,
  lang,
  short_summary,
  thumb,
  // jd_cd_id,
  // projectId,
  candidateId,
  onUpdateHasFullSummary,
  hasFullSummary = false,
  alert,
  suitabilityLevel,
  matchScore,
}): JSX.Element => {
  const [expands, setExpands] = useState(false);
  const [expands2, setExpands2] = useState(false);
  const [onFetch, setOnFetch] = useState(false);
  const [layoutLoading, setLayoutLoading] = useState(false);
  const [fullSummary] = useState<CandidateSummary>();

  const [fullSummaryTh] = useState<CandidateSummary | null>(null);
  const [fullSummaryEn] = useState<CandidateSummary | null>(null);

  const [fullSummaryOg] = useState<Partial<JdCdItem>>();

  const onFullSummary = async () => {
    setOnFetch(true);
    try {
      // const res = await axiosInstance.post<CandidateSummary>(
      //   "/v1/matching/analysis/jd-cdcd/jdcd-full-summary",
      //   {
      //     project_id: projectId,
      //     jd_cd_id: jd_cd_id,
      //   }
      // );

      setExpands2(true);
      // setFullSummary(res.data);
      // setFullSummaryOg({
      //   strengths: res.data.strengths,
      //   missing_points: res.data.missing_points,
      //   suitability_level: res.data.suitability_level,
      //   summary_suggestions: res.data.summary_suggestions,
      //   comparative_analysis: res.data.comparative_analysis,
      // });
      onUpdateHasFullSummary?.(candidateId);
    } catch (err) {
      console.log(err);
    } finally {
      setOnFetch(false);
    }
  };

  const onClickFullSummary = async (layoutLoading: boolean) => {
    setLayoutLoading(layoutLoading);
    await onFullSummary();
    setLayoutLoading(false);
  };

  // Translate function
  useEffect(() => {
    if (lang === "OG") return;
    if (lang === "EN" && fullSummaryEn) return;
    if (lang === "TH" && fullSummaryTh) return;

    if (lang === "EN") {
      // const translateObjectEn = async () => {
      //   // try {
      //   //   const res = (await translateObject(obj, "EN")) as CandidateSummary;
      //   //   setFullSummaryEn(res);
      //   // } catch (error) {
      //   //   console.log(error);
      //   // }
      // };
      // translateObjectEn(fullSummaryOg);
    }

    if (lang === "TH") {
      // const translateObjectTh = async () => {
      //   // try {
      //   //   const res = (await translateObject(obj, "TH")) as CandidateSummary;
      //   //   setFullSummaryTh(res);
      //   // } catch (error) {
      //   //   console.log(error);
      //   // }
      // };
      // translateObjectTh(fullSummaryOg);
    }
  }, [lang, fullSummaryTh, fullSummaryEn, fullSummaryOg]);

  return (
    <div className="relative">
      {layoutLoading && (
        <div
          className="absolute inset-0 flex items-center justify-center z-10 rounded-[8px]"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
        >
          <Spin
            spinning={layoutLoading}
            indicator={
              <LoadingOutlined
                style={{ fontSize: 24, color: "var(--blue-6)" }}
                spin={layoutLoading}
              />
            }
          />
        </div>
      )}
      <div className="py-[8px] px-[12px] rounded-[8px] bg-[var(--gray-1)] flex flex-col gap-2">
        <div className="flex items-center w-full">
          <div className="flex items-center justify-between gap-2 w-full">
            <Tag suitabilityLevel={suitabilityLevel} />
            <div className="flex-1 min-w-0">
              <p
                className="font-h10 truncate whitespace-nowrap overflow-hidden"
                title={name}
              >
                {name}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <p className="font-h10 text-[var(--blue-6)]">{`${Math.round(
                Number(matchScore)
              )}/100`}</p>
              <button
                title="expand-button"
                onClick={() => {
                  setExpands((prev) => !prev);
                }}
              >
                <ChevronDownIcon
                  fill="var(--blue-6)"
                  style={{
                    transform: expands ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                  width={16}
                  height={16}
                />
              </button>
            </div>
          </div>
        </div>

        {/* <AnimatePresence initial={false}> */}
        {expands && (
          // <motion.div
          //   key="content"
          //   initial="collapsed"
          //   animate="open"
          //   exit="collapsed"
          //   variants={{
          //     open: { height: "auto", opacity: 1 },
          //     collapsed: { height: 0, opacity: 0 },
          //   }}
          //   transition={{ duration: 0.1, ease: "easeInOut" }}
          //   style={{ overflow: "hidden" }}
          // >
          <DetailedJdCdCd
            alert={alert}
            expands2={expands2}
            onClickExpand={() => {
              setExpands2((prev) => !prev);
            }}
            flag={flag}
            thumb={thumb}
            short_summary={short_summary}
            onClickFullSummary={onClickFullSummary}
            onFetch={onFetch}
            fullSummary={!!fullSummary}
            hasFullSummary={hasFullSummary}
            fullSummaryEn={fullSummaryEn}
            fullSummaryTh={fullSummaryTh}
            fullSummaryOg={fullSummaryOg}
            lang={lang}
          />
          // </motion.div>
        )}
        {/* </AnimatePresence> */}
      </div>
    </div>
  );
};

export default SummaryJdCdCdItem;
