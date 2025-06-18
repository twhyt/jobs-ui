import { Row, Segmented } from "antd";
import styled from "styled-components";
import dayjs from "dayjs";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { CopyIcon } from "@/assets/job-solution/icons/editor-groups/outlined";
import { CheckedIcon } from "@/assets/job-solution/icons/suggested-groups/outline";
import { ResponseResumeExtraction } from "@/types/job-solution/resume-extraction/resume-extraction";
// import { useDebounce } from "react-use";
import { ChevronDownIcon } from "@/assets/job-solution/icons/directional-groups";
// import useTranslation from "@/hooks/useTranslation";

const TextMockup =
  "กรรณิการ์ ใจสุข อาศัยอยู่จังหวัดนนทบุรี กำลังศึกษาระดับปริญญาตรี สาขาบริหารธุรกิจ (การจัดการ) มีประสบการณ์ทำงานรวม 1 ปี 6 เดือน ในด้านการประสานงานโครงการ, การจัดการเวิร์กช็อป, และการบริหารธุรกิจ";

const ShortResult = ({
  data_extrac,
  update_at,
}: {
  data_extrac: ResponseResumeExtraction;
  update_at: string | undefined;
}) => {
  const [expand, setExpand] = useState(true);
  const [copied, setCopied] = useState(false);
  const [lang, setLang] = useState<"OG" | "TH" | "EN">("OG");
  const [data, setData] = useState([{ key: "OG", text: TextMockup }]);
  // const { t: resumeExtractionT } = useTranslation("resumeExtraction");

  const Content = useMemo(() => {
    const data_n = data.find(({ key }) => key === lang);
    return data_n?.text;
  }, [data, lang]);

  function onToggleExpand() {
    setExpand(!expand);
  }

  function onCopyText() {
    if (Content) navigator.clipboard.writeText(Content);
    setCopied(true);
  }

  const ChangeLanguageContent = useCallback(
    async (lang: "OG" | "TH" | "EN") => {
      const text = data;
      const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;
      const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
      const old = text.find(({ key }) => key === lang)?.text;
      if (old) return;
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            q: text.find(({ key }) => key === "OG")?.text,
            target: lang.toLowerCase(), // ภาษาเป้าหมาย เช่น 'th' สำหรับภาษาไทย
            source: lang === "TH" ? "en" : "th",
            format: "text",
          }),
        });

        const { data } = await response.json();
        return data;
      } catch (error) {
        console.log({ error: error });
      }
    },
    [data]
  );

  // useDebounce(
  //   () => {
  //     if (copied) {
  //       setCopied(false);
  //     }
  //   },
  //   1500,
  //   [copied]
  // );

  useEffect(() => {
    let text = "";
    if (data_extrac) {
      if (data_extrac.short_summary) {
        text = data_extrac.short_summary;
      }
      // if (data_extrac.first_name && data_extrac.last_name) {
      //   text = `${data_extrac.first_name} ${data_extrac.last_name}`;
      // }
      // if (data_extrac.nickname) {
      //   text = text + ` หรือ ${data_extrac.nickname}`;
      // }
      // if (data_extrac.age) {
      //   text = text + ` อายุ ${data_extrac.age}`;
      // }
      // if (data_extrac.district && data_extrac.province) {
      //   text = text + ` อาศัยอยู่จังหวัด ${data_extrac.province}`;
      // }
      // if (data_extrac.education_level) {
      //   text = text + ` จบการศึกษาระดับ ${data_extrac.education_level}`;
      // }
      // if (data_extrac.education_major) {
      //   text = text + ` สาขา ${data_extrac.education_major}`;
      // }
      // if (data_extrac.total_experience_duration) {
      //   text = text + ` มีประสบการณ์การทำงานรวม `;
      //   if (data_extrac.total_experience_duration >= 12) {
      //     const years = Math.floor(data_extrac.total_experience_duration / 12);
      //     const remainingMonths = data_extrac.total_experience_duration % 12;
      //     text = text + `${years} ปี`;
      //     if (remainingMonths > 0) {
      //       text = text + ` ${remainingMonths} เดือน`;
      //     }
      //   } else {
      //     text = text + `${data_extrac.total_experience_duration} เดือน`;
      //   }

      //   if (data_extrac.overall_expertises?.length > 0) {
      //     text = text + "ในด้าน:";
      //     data_extrac.overall_expertises.forEach((item, index) => {
      //       if (index === 0) {
      //         text = text + ` ${item}`;
      //       } else if (index === data_extrac.overall_expertises.length) {
      //         text = text + `และ ${item}`;
      //       } else {
      //         text = text + `, ${item}`;
      //       }
      //     });
      //   }
      // }

      // if (data_extrac?.work_experiences?.length > 0) {
      //   data_extrac.work_experiences.forEach((data, index) => {
      //     if (data.job_title) {
      //       const initText =
      //         index > 0 ? `เคยมีประสบการณ์เกี่ยวกับ` : `ปัจจุบันทำงานในตำแหน่ง`;
      //       text = text + ` ${initText} ${data.job_title}`;
      //     }
      //     if (data.expertises && data.expertises?.length > 0) {
      //       text = text + ` โดยมีความเชี่ยวชาญด้าน`;
      //       data.expertises.forEach((item, index) => {
      //         if (index === 0) {
      //           text = text + ` ${item}`;
      //         } else {
      //           text = text + `, ${item}`;
      //         }
      //       });
      //     }
      //     if (data.company) {
      //       if (data.job_title === null) {
      //         text = text + `, ${data.company}`;
      //       } else {
      //         text = text + ` ที่ ${data.company}`;
      //       }
      //     }
      //     if (data.duration) {
      //       text = text + ` จำนวน`;
      //       if (data.duration >= 12) {
      //         const years = Math.floor(data.duration / 12);
      //         const remainingMonths = data.duration % 12;
      //         text = text + ` ${years} ปี`;
      //         if (remainingMonths > 0) {
      //           text = text + ` ${remainingMonths} เดือน`;
      //         }
      //       } else {
      //         text = text + ` ${data.duration} เดือน`;
      //       }
      //     }
      //   });
      // }

      // if (data_extrac.phone_number || data_extrac.email) {
      //   text = text + "\n\n";
      //   text = text + "ข้อมูลติดต่อ";
      //   if (data_extrac.phone_number && data_extrac.email) {
      //     text =
      //       text + ` ${data_extrac.phone_number} และอีเมล ${data_extrac.email}`;
      //   } else if (data_extrac.phone_number) {
      //     text = text + ` ${data_extrac.phone_number}`;
      //   } else if (data_extrac.email) {
      //     text = text + ` ${data_extrac.email}`;
      //   }
      // }

      const obj = data.find(({ key }) => key === "OG");
      if (obj) setData([{ ...obj, text: text }]);
    }
  }, [data_extrac]);

  // console.log("my data", data)

  return (
    <div className="py-[8px] bg-[var(--gray-2)] rounded-[8px]">
      <div className="px-[16px] py-[8px] w-full flex">
        <div className="flex-auto">
          <h1 className="font-h10">{"header_text__13"}</h1>
          {update_at && (
            <p className="font-body2 text-[var(--text-secondary)]">
              {dayjs(update_at).format("DD MMM YYYY")}
              {", "}
              {dayjs(update_at).format("HH:mm")}
            </p>
          )}
        </div>
        <button title="expand-button" onClick={onToggleExpand}>
          <ChevronDownIcon
            style={{ transform: expand ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        </button>
      </div>

      {expand && (
        <Fragment>
          <div className="px-[16px] flex items-center justify-between">
            <Tabs
              value={lang}
              options={["OG", "TH", "EN"]}
              onChange={async (e) => {
                setCopied(false);
                const data_n = data.find(({ key }) => key === e);
                if (!data_n && e !== "OG") {
                  const res = await ChangeLanguageContent(
                    e as "OG" | "TH" | "EN"
                  );
                  setData([
                    ...data,
                    {
                      key: e as "TH" | "EN",
                      text: res?.translations?.[0]?.translatedText,
                    },
                  ]);
                }
                setLang(e as "OG" | "TH" | "EN");
              }}
            />
            {copied ? (
              <Row align={"middle"}>
                <CheckedIcon fill="var(--blue-6)" />
                <p className="font-button4 text-[var(--blue-6)]">
                  {"confirm_message"}
                </p>
              </Row>
            ) : (
              <button title="copy-text-button" onClick={onCopyText}>
                <CopyIcon width={24} height={24} />
              </button>
            )}
          </div>
          <div className="px-[16px] py-[8px]">
            <label>
              <div className="p-[16px] rounded-[8px] border-[1px] border-[var(--gray-7)] w-full">
                {/* <textarea 
                                        title="short-result" 
                                        readOnly 
                                        rows={7}
                                        className="w-full flex outline-none font-body5 !text-[var(--text-title)]"
                                        value={Content ?? ''}
                                    /> */}
                <div className="w-full max-h-[195px] overflow-auto pr-[4px] whitespace-break-spaces flex outline-none font-body5 !text-[var(--text-title)]">
                  {Content ?? ""}
                </div>
              </div>
            </label>
          </div>
        </Fragment>
      )}
    </div>
  );
};

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

export default ShortResult;
