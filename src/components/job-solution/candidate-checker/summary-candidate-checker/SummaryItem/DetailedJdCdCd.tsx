import { FC, useMemo } from "react";
import FlagAlert from "./FlagAlert";
import Button from "@/components/job-solution/custom-antd/Button";
import ThreeDotColorLoading from "@/components/job-solution/loading";
import DetailedAnalysisContainer from "./DetailedAnalysisContainer";
import { ChevronDownIcon } from "@/assets/job-solution/icons/directional-groups";
import CreditRemain from "@/components/job-solution/credit/CreditRemain";
import { EFeatureName } from "@/types/job-solution/package";
import { v4 } from "uuid";
import { CandidateSummary } from "@/types/job-solution/candidate-checker";
import { JdCdItem } from "@/types/job-solution/project";
// import useTranslation from "@/hooks/useTranslation";

interface Props {
  hasFullSummary?: boolean;
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
  expands2: boolean;
  onFetch: boolean;
  fullSummary: boolean;
  lang: string;
  fullSummaryTh: CandidateSummary | null;
  fullSummaryEn: CandidateSummary | null;
  fullSummaryOg?: Partial<JdCdItem>;
  onClickExpand: () => void;
  onClickFullSummary: (layoutLoading: boolean) => void;
}

const DetailedJdCdCd: FC<Props> = ({
  flag,
  thumb,
  short_summary,
  alert,
  onFetch,
  expands2,
  hasFullSummary,
  fullSummary,
  onClickExpand,
  onClickFullSummary,
  fullSummaryEn,
  fullSummaryOg,
  fullSummaryTh,
  lang,
}): JSX.Element => {
  // const { t } = useTranslation("candidateChecker");
  const jdCdCdWithTranslate = useMemo(() => {
    if (lang === "EN") {
      return fullSummaryEn;
    }
    if (lang === "TH") {
      return fullSummaryTh;
    }
    return fullSummaryOg;
  }, [fullSummaryEn, fullSummaryTh, fullSummaryOg, lang]);

  const suggestion = useMemo(() => {
    return Object.keys(jdCdCdWithTranslate?.summary_suggestions ?? {}).map(
      (item) => {
        const uuid = v4();
        return {
          id: uuid,
          content:
            jdCdCdWithTranslate?.summary_suggestions?.[
              item as keyof typeof jdCdCdWithTranslate.summary_suggestions
            ] ?? "",
          title: item,
        };
      }
    );
  }, [jdCdCdWithTranslate]);

  const strengths = useMemo(() => {
    if (Array.isArray(jdCdCdWithTranslate?.strengths)) {
      return jdCdCdWithTranslate?.strengths ?? [];
    }

    return (
      jdCdCdWithTranslate?.strengths
        ?.split("\n")
        .filter((item) => item !== "") ?? []
    );
  }, [jdCdCdWithTranslate?.strengths]);

  const missingPoints = useMemo(() => {
    if (Array.isArray(jdCdCdWithTranslate?.missing_points)) {
      return jdCdCdWithTranslate?.missing_points ?? [];
    }

    return (
      jdCdCdWithTranslate?.missing_points
        ?.split("\n")
        .filter((item) => item !== "") ?? []
    );
  }, [jdCdCdWithTranslate?.missing_points]);

  const candidateProfile = useMemo(() => {
    const data = Object.keys(
      jdCdCdWithTranslate?.comparative_analysis ?? {}
    ).map((item) => {
      const uuid = v4();

      const content =
        jdCdCdWithTranslate?.comparative_analysis?.[
          item as keyof typeof jdCdCdWithTranslate.comparative_analysis
        ]
          .split("\n")
          .filter((item) => item !== "") ?? [];

      return {
        id: uuid,
        title: item,
        score: 0,
        content,
      };
    });

    return data;
  }, [jdCdCdWithTranslate]);
  return (
    <div className="flex flex-col gap-4">
      <FlagAlert flag={flag} thumb={thumb} alert={alert} />
      <p className="font-body5 whitespace-pre-line">{short_summary}</p>
      {fullSummary && (
        <DetailedAnalysisContainer
          expand={expands2}
          onClickExpand={onClickExpand}
          candidateProfile={candidateProfile ?? []}
          suggestion={suggestion ?? []}
          missingPoints={missingPoints}
          strengths={strengths}
        />
      )}
      {!fullSummary && hasFullSummary && (
        <div className="flex justify-between" id="header-container">
          <span className="font-h10 text-[var(--text-title)]">
            {/* {t("header_text__20")} */} header_text__20
          </span>
          <button
            className="flex gap-[4px] items-center"
            onClick={async () => onClickFullSummary(true)}
          >
            <span className="text-[var(--blue-6)]">
              Show {expands2 ? "less" : "more"}
            </span>
            <ChevronDownIcon
              width={16}
              height={16}
              style={{
                transform: expands2 ? "rotate(180deg)" : "rotate(0deg)",
                fill: "var(--blue-6)",
                fontSize: "16px",
              }}
              fill="var(--blue-6)"
            />
          </button>
        </div>
      )}
      {!fullSummary && !hasFullSummary && (
        <div className="flex flex-col gap-2">
          <Button
            variants="primary"
            size="large"
            loading={onFetch && { icon: <ThreeDotColorLoading /> }}
            onClick={async () => onClickFullSummary(false)}
          >
            {!onFetch && "button_get_detailed"}
          </Button>

          <CreditRemain feature={EFeatureName.JD_CDCD_FULL} />
        </div>
      )}
    </div>
  );
};

export default DetailedJdCdCd;
