import { ChevronDownIcon } from "@/assets/job-solution/icons/directional-groups";

import { CopyIcon } from "@/assets/job-solution/icons/editor-groups/outlined";
import { CheckedIcon } from "@/assets/job-solution/icons/suggested-groups/outline";

import { Divider, Row, Segmented, Spin } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/th";
import { useMemo, useRef, useState } from "react";
import styled from "styled-components";
import {
  CandidateCheckerItem,
  EProjectType,
  JdCdItem,
} from "@/types/job-solution/project";

import { ResponseJdCdType } from "@/types/job-solution/candidate-checker";
import { v4 } from "uuid";

import { useRouter } from "next/router";
import { SummaryJdCdItem } from "../SummaryItem";
import { LoadingOutlined } from "@ant-design/icons";

interface Props {
  resultId: string;
  isOpen: boolean;
  result: CandidateCheckerItem | ResponseJdCdType;
  toggleOpenResults: (id: string) => void;
  type?: EProjectType;
  from?: "create";
}

function ResultJdCdItem({
  isOpen,
  from,
  result,
  toggleOpenResults,
  resultId,
}: Readonly<Props>) {
  const router = useRouter();
  const candidateName = useMemo(() => {
    if (from === "create") {
      const data = result as ResponseJdCdType;
      return data.name ?? data.resume_file_name;
    }

    const data = result as CandidateCheckerItem;
    return data.output.name ?? data.input.resume_file_name;
  }, [result, from]);

  const jd_cd = useMemo(() => {
    if (from === "create") {
      const data = result as ResponseJdCdType;
      const jd_cd: JdCdItem = {
        comparative_analysis: {
          competency: data.comparative_analysis.competency,
          education: data.comparative_analysis.education,
          language: data.comparative_analysis.language ?? "",
          experience: data.comparative_analysis.experience,
          skill: data.comparative_analysis.skill,
          tools: data.comparative_analysis.tools,
        },
        summary_suggestions: {
          alternative_role: data.summary_suggestions.alternative_role,
          alternative_role_reason:
            data.summary_suggestions.alternative_role_reason,
          recommendation: data.summary_suggestions.recommendation,
          suggestion_for_interview:
            data.summary_suggestions.suggestion_for_interview,
        },
        missing_points: data.missing_points,
        match_score: data.match_score,
        suitability_level: data.suitability_level,
        strengths: data.strengths,
        updated_at: data.updated_at,
        alert: data.alert,
        flag: data.flag,
        thumb: data.thumb,
        short_summary: data.short_summay,
      };
      return jd_cd;
    } else {
      const data = result as CandidateCheckerItem;
      const jd_cd: JdCdItem = {
        comparative_analysis: {
          competency: data.output.comparative_analysis.competency,
          education: data.output.comparative_analysis.education,
          language: data.output.comparative_analysis.language,
          experience: data.output.comparative_analysis.experience,
          skill: data.output.comparative_analysis.skill,
          tools: data.output.comparative_analysis.tools ?? "",
        },
        summary_suggestions: {
          alternative_role: data.output.summary_suggestions.alternative_role,
          alternative_role_reason:
            data.output.summary_suggestions.alternative_role_reason,
          recommendation: data.output.summary_suggestions.recommendation,
          suggestion_for_interview:
            data.output.summary_suggestions.suggestion_for_interview,
        },
        missing_points: data.output.missing_points,
        match_score: data.output.match_score,
        suitability_level: data.output.suitability_level,
        strengths: data.output.strengths,
        updated_at: data.output.updated_at ?? "",
        alert: data.output.alert,
        flag: data.output.flag,
        thumb: data.output.thumb,
        short_summary: data.output.short_summary,
      };
      return jd_cd;
    }
  }, [result, from]);

  const [loading, setLoading] = useState(false);
  const copyRef = useRef<HTMLDivElement>(null);
  const [jdCdTh] = useState<JdCdItem | null>(null);
  const [jdCdEn] = useState<JdCdItem | null>(null);
  const [expand2, setExpand2] = useState(true);
  const [lang, setLang] = useState<"OG" | "TH" | "EN">("OG");

  function onCopyText() {
    if (!copyRef.current) return;
    const idsToRemove = ["flag-container", "detailed-container"];
    const clone = copyRef.current.cloneNode(true) as HTMLDivElement;

    idsToRemove.forEach((id) => {
      const elementToRemove = clone.querySelectorAll(`#${id}`);
      elementToRemove.forEach((el) => el.remove());
    });
  }

  const jdCdWithTranslate = useMemo(() => {
    if (lang === "EN") {
      return jdCdEn;
    }
    if (lang === "TH") {
      return jdCdTh;
    }
    return jd_cd;
  }, [jdCdEn, jdCdTh, jd_cd, lang]);

  const onChangeTab = async (e: unknown) => {
    setLang(e as "OG" | "TH" | "EN");

    if (e === "EN" && !jdCdEn) {
      setLoading(true);
      setLoading(false);
    }
    if (e === "TH" && !jdCdTh) {
      setLoading(true);
      setLoading(false);
    }
  };

  const suggestion = useMemo(() => {
    if (lang === "EN" && jdCdEn) {
      return Object.keys(jdCdEn.summary_suggestions).map((item) => {
        const uuid = v4();
        return {
          id: uuid,
          content:
            jdCdEn.summary_suggestions[
              item as keyof typeof jd_cd.summary_suggestions
            ],
          title: item,
        };
      });
    }

    if (lang === "TH" && jdCdTh) {
      return Object.keys(jdCdTh.summary_suggestions).map((item) => {
        const uuid = v4();
        return {
          id: uuid,
          content:
            jdCdTh.summary_suggestions[
              item as keyof typeof jd_cd.summary_suggestions
            ],
          title: item,
        };
      });
    }

    const suggestion: {
      id: string;
      title: string;
      content: string;
    }[] = Object.keys(jd_cd.summary_suggestions).map((item) => {
      const uuid = v4();
      return {
        id: uuid,
        content:
          jd_cd.summary_suggestions[
            item as keyof typeof jd_cd.summary_suggestions
          ],
        title: item,
      };
    });
    return suggestion;
  }, [jdCdEn, jdCdTh, lang, jd_cd]);

  const candidateProfile = useMemo(() => {
    const candidateProfile: {
      id: string;
      title: string;
      content: string[];
    }[] = Object.keys(jd_cd.comparative_analysis).map((item) => {
      const uuid = v4();

      const content = jd_cd.comparative_analysis[
        item as keyof typeof jd_cd.comparative_analysis
      ]
        ?.split("\n")
        .filter((item) => item !== "");

      return {
        id: uuid,
        title: item,
        content,
      };
    });

    if (lang === "EN" && jdCdEn) {
      return Object.keys(jdCdEn.comparative_analysis).map((item) => {
        const uuid = v4();
        const content = jdCdEn.comparative_analysis[
          item as keyof typeof jdCdEn.comparative_analysis
        ]
          ?.split("\n")
          .filter((item) => item !== "");
        return {
          id: uuid,
          title: item,
          content,
        };
      });
    }

    if (lang === "TH" && jdCdTh) {
      return Object.keys(jdCdTh.comparative_analysis).map((item) => {
        const uuid = v4();
        const content = jdCdTh.comparative_analysis[
          item as keyof typeof jdCdTh.comparative_analysis
        ]
          ?.split("\n")
          .filter((item) => item !== "");
        return {
          id: uuid,
          title: item,
          content,
        };
      });
    }

    return candidateProfile;
  }, [jdCdEn, jdCdTh, lang, jd_cd]);

  const strengths = useMemo(() => {
    if (Array.isArray(jdCdWithTranslate?.strengths)) {
      return jdCdWithTranslate?.strengths ?? [];
    }

    return (
      jdCdWithTranslate?.strengths?.split("\n").filter((item) => item !== "") ??
      []
    );
  }, [jdCdWithTranslate?.strengths]);

  const missingPoints = useMemo(() => {
    if (Array.isArray(jdCdWithTranslate?.missing_points)) {
      return jdCdWithTranslate?.missing_points ?? [];
    }

    return (
      jdCdWithTranslate?.missing_points
        ?.split("\n")
        .filter((item) => item !== "") ?? []
    );
  }, [jdCdWithTranslate?.missing_points]);

  const shortSummary = useMemo(() => {
    return jdCdWithTranslate?.short_summary ?? jd_cd.short_summary;
  }, [jdCdWithTranslate?.short_summary, jd_cd.short_summary]);

  dayjs.locale(router.locale);

  return (
    <ResultJdCdCard className="w-full flex relative" data-expand={isOpen}>
      <Row className="px-[16px] py-[8px]">
        <div className="flex-auto">
          <h1 className="font-h10">{"header_text__19"}</h1>
          <p className="font-body2 text-[var(--text-secondary)]">
            {dayjs(jd_cd.updated_at).format("DD MMM YYYY")}
            {", "}
            {dayjs(jd_cd.updated_at).format("HH:mm")}
          </p>
        </div>
        <button
          title="expand-button"
          onClick={() => toggleOpenResults(resultId)}
        >
          <ChevronDownIcon
            style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        </button>
      </Row>
      <div className="box-content w-full flex-col">
        <div className="flex flex-col gap-[16px] w-full">
          <Row className="px-[16px]" justify={"space-between"} align={"middle"}>
            <Tabs
              value={lang}
              options={["OG", "TH", "EN"]}
              onChange={onChangeTab}
            />
            {/* {isVisible ? ( */}
            <Row align={"middle"}>
              <CheckedIcon fill="var(--blue-6)" />
              <p className="font-button4 text-[var(--blue-6)]">
                {/* {t("confirm_message__5")} */}
                confirm_message__5
              </p>
            </Row>
            {/* ) : ( */}
            <button title="copy-text-button" onClick={onCopyText}>
              <CopyIcon width={24} height={24} />
            </button>
            {/* )} */}
          </Row>
          <Divider className="!m-0 !bg-[var(--gray-5)]" />
        </div>
        <div className="p-[16px] flex flex-col gap-[12px]" ref={copyRef}>
          <SummaryJdCdItem
            alert={jd_cd.alert}
            flag={jd_cd.flag}
            candidateProfile={candidateProfile}
            strengths={strengths}
            missingPoints={missingPoints}
            expands={expand2}
            matchScore={jd_cd.match_score}
            suitabilityLevel={jd_cd.suitability_level}
            suggestion={suggestion}
            name={candidateName}
            onClickExpands={() => {
              setExpand2((prev) => !prev);
            }}
            thumb={jd_cd.thumb}
            shortSummary={shortSummary ?? ""}
          />
        </div>
      </div>

      {loading && (
        <div
          className="absolute inset-0 flex items-center justify-center z-10 rounded-[8px]"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
        >
          <Spin
            spinning={loading}
            indicator={
              <LoadingOutlined
                style={{ fontSize: 24, color: "var(--blue-6)" }}
                spin={loading}
              />
            }
          />
        </div>
      )}
    </ResultJdCdCard>
  );
}

const ResultJdCdCard = styled.div`
  background-color: var(--gray-2);
  border-radius: 8px;
  display: flex;
  flex-direction: column;

  .box-content {
    display: none;
  }

  &[data-expand="true"] {
    .box-content {
      display: flex;
    }
  }
`;

const Tabs = styled(Segmented)`
  background-color: var(--gray-4);
  border-radius: 8px;
  padding: 4px;

  .ant-segmented-item-label {
    padding: 4px 8px;
    border-radius: 4px;
    color: var(--text-title);
    font-weight: var(--weight-regular);
    font-size: 14px;
  }

  .ant-segmented-item-selected .ant-segmented-item-label {
    background-color: var(--white-100);
    font-weight: var(--weight-bold);
    box-shadow: 0px 2px 3.3 var(--black-15);
  }
`;

export default ResultJdCdItem;
