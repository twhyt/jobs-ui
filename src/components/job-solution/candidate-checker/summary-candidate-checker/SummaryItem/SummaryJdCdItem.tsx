import { FC, useState } from "react";
import FlagAlert from "./FlagAlert";
import DetailedAnalysisContainer from "./DetailedAnalysisContainer";
import Tag from "./Tag";
import { ChevronDownIcon } from "@/assets/job-solution/icons/directional-groups";
// import { AnimatePresence, motion } from "framer-motion";

interface Props {
  suitabilityLevel: number;
  name: string;
  matchScore: number;
  onClickExpands: () => void;
  expands: boolean;
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
  missingPoints: string[];
  strengths: string[];
  candidateProfile: {
    id: string;
    title: string;
    content: string[];
  }[];
  suggestion: {
    id: string;
    content: string;
    title: string;
  }[];
  shortSummary?: string;
}

const SummaryJdCdItem: FC<Props> = ({
  suitabilityLevel,
  name,
  matchScore,
  expands,
  onClickExpands,
  alert,
  flag,
  thumb,
  missingPoints,
  strengths,
  candidateProfile,
  suggestion,
  shortSummary,
}): JSX.Element => {
  const [expands2, setExpands2] = useState(true);

  const onClickExpand = () => {
    setExpands2((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-4">
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
            <button title="expand-button" onClick={onClickExpands}>
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
        <div className="flex flex-col gap-4">
          <FlagAlert flag={flag} thumb={thumb} alert={alert} />
          <p className="font-body5 whitespace-pre-line">{shortSummary}</p>
          <DetailedAnalysisContainer
            expand={expands2}
            onClickExpand={onClickExpand}
            candidateProfile={candidateProfile ?? []}
            suggestion={suggestion ?? []}
            missingPoints={missingPoints}
            strengths={strengths}
          />
        </div>
        // </motion.div>
      )}
      {/* </AnimatePresence> */}
    </div>
  );
};

export default SummaryJdCdItem;
