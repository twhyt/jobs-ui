import { ChevronDownIcon } from "@/assets/job-solution/icons/directional-groups";
import { CopyIcon } from "@/assets/job-solution/icons/editor-groups/outlined";
import { CheckedIcon } from "@/assets/job-solution/icons/suggested-groups/outline";
// import { copyTextByRef } from "@/utils/job-solution/copyTextByRef";
// import { translateObject } from "@/utils/job-solution/translateObject";
import { Divider, Row, Segmented, Spin } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/th";
import { useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { EProjectType } from "@/types/job-solution/project";
// import useTemporaryRender from "@/hooks/job-solution/useTemporaryRender";
import { JdCdCdAllSummary } from "@/types/job-solution/candidate-checker";
import { useRouter } from "next/router";
import { LoadingOutlined } from "@ant-design/icons";
// import { useAppDispatch } from "@/store/redux-hook";
// import { setHasFullSummary } from "@/store/slices/projectSlice";
import clsx from "clsx";
// import useTranslation from "@/hooks/job-solution/useTranslation";
import SummaryJdCdCdItem from "../SummaryItem/SummaryJdCdCdItem";

interface Props {
  resultId: string;
  result: JdCdCdAllSummary;
  toggleOpenResults: (id: string) => void;
  isOpen: boolean;
  type?: EProjectType;
}

function ResultJdCdCdItem({
  result,
  toggleOpenResults,
  isOpen,
  resultId,
}: Readonly<Props>) {
  // const { t } = useTranslation("candidateChecker");
  const jd_cdcd = useMemo(() => {
    const jd_cdcd: JdCdCdAllSummary = {
      project_id: result.project_id,
      project_name: result.project_name,
      jd_gen_id: result.jd_gen_id,
      created_at: result.created_at,
      updated_at: result.updated_at,
      resume_file_names: result.resume_file_names,
      summary: result.summary,
      candidates: result.candidates,
    };

    return jd_cdcd;
  }, [result]);

  const [loading, setLoading] = useState(false);
  const copyRef = useRef<HTMLDivElement>(null);
  const [jdCdCdTh] = useState<JdCdCdAllSummary | null>(null);
  const [jdCdCdEn] = useState<JdCdCdAllSummary | null>(null);
  const [lang, setLang] = useState<"OG" | "TH" | "EN">("OG");
  // const [isVisible, showAgain] = useTemporaryRender();

  function onCopyText() {
    if (!copyRef.current) return;
    const idsToRemove = [
      "flag-container",
      "alert-container",
      "header-container",
    ];
    const clone = copyRef.current.cloneNode(true) as HTMLDivElement;

    idsToRemove.forEach((id) => {
      const elementToRemove = clone.querySelectorAll(`#${id}`);
      elementToRemove.forEach((el) => el.remove());
    });
    // copyTextByRef({ current: clone }, () => {
    //   showAgain();
    // });
  }

  // const dispatch = useAppDispatch();

  // function onUpdateHasFullSummary(candidateId: string) {
  //   dispatch(setHasFullSummary(candidateId));
  // }

  // async function translateObjectEn(obj: unknown): Promise<unknown> {
  //   return translateObject(obj, "EN");
  // }

  // async function translateObjectTh(obj: unknown): Promise<unknown> {
  //   return translateObject(obj, "TH");
  // }

  const jdCdCdWithTranslate = useMemo(() => {
    if (lang === "EN") {
      return jdCdCdEn;
    }
    if (lang === "TH") {
      return jdCdCdTh;
    }
    return jd_cdcd;
  }, [jdCdCdEn, jdCdCdTh, jd_cdcd, lang]);

  const onChangeTab = async (e: unknown) => {
    setLang(e as "OG" | "TH" | "EN");

    if (e === "EN" && !jdCdCdEn) {
      setLoading(true);
      // try {
      //   const data = (await translateObjectEn(jd_cdcd)) as JdCdCdAllSummary;
      //   setjdCdCdEn(data);
      // } catch (error) {
      //   console.log(error);
      // } finally {
      setLoading(false);
      // }
    }
    if (e === "TH" && !jdCdCdTh) {
      setLoading(true);
      // try {
      //   const data = (await translateObjectTh(jd_cdcd)) as JdCdCdAllSummary;
      //   setjdCdCdTh(data);
      // } catch (error) {
      //   console.log(error);
      // } finally {
      setLoading(false);
      // }
    }
  };

  const router = useRouter();
  dayjs.locale(router.locale);
  return (
    <div>
      <ResultjdCdCdCard
        className={clsx("w-full flex relative")}
        data-expand={isOpen}
      >
        <Row className="px-[16px] py-[8px]">
          <div className="flex-auto">
            <h1 className="font-h10">header_text__19</h1>
            <p className="font-body2 text-[var(--text-secondary)]">
              {dayjs(jd_cdcd.updated_at).format("DD MMM YYYY")}
              {", "}
              {dayjs(jd_cdcd.updated_at).format("HH:mm")}
            </p>
          </div>
          <button
            title="expand-button"
            onClick={() => toggleOpenResults(resultId)}
          >
            <ChevronDownIcon
              style={{
                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </button>
        </Row>
        <div className="box-content w-full flex-col">
          <div className="flex flex-col gap-[16px] w-full">
            <Row
              className="px-[16px]"
              justify={"space-between"}
              align={"middle"}
            >
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
          {/* Summary Container */}
          <div className="p-[16px] flex flex-col gap-[12px]" ref={copyRef}>
            <div className="flex flex-col gap-1">
              <h1 className="font-h10 text-[var(--black-85)]">
                {/* {t("header_text__32")} */}
                header_text__32
              </h1>
              <p className="font-body5 text-[var(--text-title)] whitespace-pre-line">
                {jdCdCdWithTranslate?.summary}
              </p>
            </div>
            {jd_cdcd?.candidates.map((data) => {
              const currentCandidate = jdCdCdWithTranslate?.candidates.find(
                (candidate) => {
                  return candidate.candidate_id === data.candidate_id;
                }
              );

              const suitabilityLevel = data.suitability_level ?? 0;

              return (
                <SummaryJdCdCdItem
                  hasFullSummary={data.has_full_summary}
                  onUpdateHasFullSummary={() => console.log("")}
                  candidateId={data.candidate_id}
                  lang={lang}
                  projectId={jd_cdcd.project_id}
                  key={data.jd_cd_id}
                  jd_cd_id={data.jd_cd_id}
                  name={data.name}
                  suitabilityLevel={suitabilityLevel}
                  short_summary={
                    lang !== "OG"
                      ? currentCandidate?.short_summary ?? ""
                      : data.short_summary
                  }
                  flag={
                    data.flag as {
                      green: {
                        count: number;
                        keywords: string[];
                      };
                      red: {
                        count: number;
                        keywords: string[];
                      };
                    }
                  }
                  matchScore={data.match_score}
                  thumb={
                    data.thumb as {
                      up: {
                        count: number;
                        keywords: string[];
                      };
                      down: {
                        count: number;
                        keywords: string[];
                      };
                    }
                  }
                  alert={data.alert}
                />
              );
            })}
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
      </ResultjdCdCdCard>
    </div>
  );
}

const ResultjdCdCdCard = styled.div`
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

export default ResultJdCdCdItem;
