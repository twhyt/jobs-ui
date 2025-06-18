import { ChevronDownIcon } from "@/assets/job-solution/icons/directional-groups";
import { CopyIcon } from "@/assets/job-solution/icons/editor-groups/outlined";
import { CheckedIcon } from "@/assets/job-solution/icons/suggested-groups/outline";
// import useTranslation from "@/hooks/useTranslation";
import {
  ResponseResumeExtraction,
  WorkExperiencesType,
} from "@/types/job-solution/resume-extraction/resume-extraction";
// import { copyTextByRef } from "@/utils/copyTextByRef";
// import { findLastAndLatestExperience } from "@/utils/date";
// import { translateObject } from "@/utils/translateObject";

import { LoadingOutlined } from "@ant-design/icons";
import { Row, Segmented, Spin } from "antd";
import dayjs from "dayjs";
import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
// import { useDebounce } from "react-use";
import styled from "styled-components";

const FullResult = ({
  data_extrac,
  show,
  update_at,
}: {
  data_extrac: ResponseResumeExtraction | undefined;
  show: boolean;
  update_at: string | undefined;
}) => {
  const [expand, setExpand] = useState(false);
  const [copied, setCopied] = useState(false);
  const [lang, setLang] = useState<"OG" | "TH" | "EN">("OG");
  const [extractTh] = useState<{ [key: string]: unknown }[]>([]);
  const [extractEn] = useState<{ [key: string]: unknown }[]>([]);
  const [loading, setLoading] = useState(false);
  // const { t: resumeExtractionT } = useTranslation("resumeExtraction");

  const Data: {
    key: string;
    data: string | string[] | number | WorkExperiencesType[] | null;
    label: string;
  }[] = [
    {
      key: "first_name",
      data: null,
      label: "body_text__11",
    },
    { key: "last_name", data: null, label: "body_text__12" },
    { key: "nickname", data: null, label: "body_text__13" },
    { key: "age", data: null, label: "body_text__14" },
    { key: "district", data: null, label: "body_text__15" },
    { key: "province", data: null, label: "body_text__16" },
    {
      key: "education_level",
      data: null,
      label: "body_text__17",
    },
    {
      key: "education_major",
      data: null,
      label: "body_text__18",
    },
    {
      key: "total_experience_duration",
      data: null,
      label: "body_text__19",
    },
    {
      key: "overall_expertises",
      data: [],
      label: "body_text__20",
    },
    {
      key: "latest_job_title",
      data: null,
      label: "body_text__21",
    },
    {
      key: "latest_company",
      data: null,
      label: "body_text__22",
    },
    {
      key: "latest_experience_duration",
      data: null,
      label: "body_text__23",
    },
    {
      key: "latest_expertises",
      data: [],
      label: "body_text__24",
    },
    {
      key: "work_experiences",
      data: [],
      label: "body_text__25",
    },
    { key: "tools", data: [], label: "body_text__26" },
    {
      key: "phone_number",
      data: null,
      label: "body_text__27",
    },
    { key: "email", data: null, label: "body_text__28" },
  ];

  const contentRef = useRef<HTMLDivElement>(null);

  function onToggleExpand() {
    setExpand(!expand);
  }

  // function onCopyText() {
  //   copyTextByRef(contentRef, () => {
  //     setCopied(true);
  //   });
  // }

  // async function translateObjectEn(obj: unknown): Promise<unknown> {
  //   return translateObject(obj, "EN");
  // }

  // async function translateObjectTh(obj: unknown): Promise<unknown> {
  //   return translateObject(obj, "TH");
  // }

  const extractDataByLang = useCallback(
    (data_extrac: ResponseResumeExtraction) => {
      if (lang === "EN") {
        return extractEn;
      }
      if (lang === "TH") {
        return extractTh;
      }
      const extractEnArray: { [key: string]: unknown }[] = [];
      Object.keys(data_extrac).forEach((key) => {
        const item = {
          [key]: data_extrac[key as keyof ResponseResumeExtraction],
        };
        extractEnArray.push(item);
      });
      return extractEnArray;
    },
    [lang, extractEn, extractTh]
  );

  const RenderItem = useMemo(() => {
    if (data_extrac) {
      const extractData = extractDataByLang(data_extrac);
      const arr = Data.map((item) => {
        const finedItem = extractData.find((data) => item.key in data);
        return { ...item, data: finedItem ? finedItem[item.key] : null };
      });

      return arr;
    } else return Data;
  }, [data_extrac, extractDataByLang]);

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
    if (show) {
      setExpand(true);
    }
  }, [show]);

  // console.log("data_extrac", data_extrac);

  return (
    <Fragment>
      <div className="py-[8px] bg-[var(--gray-2)] rounded-[8px]">
        <div className="px-[16px] py-[8px] flex items-center justify-between">
          <div className="flex-auto">
            <h1 className="font-h10">{"header_text__15"}</h1>
            {show && (
              <p className="font-body2 text-[var(--text-secondary)]">
                {dayjs(update_at).format("DD MMM YYYY")}
                {", "}
                {dayjs(update_at).format("HH:mm")}
              </p>
            )}
          </div>
          <button
            className="flex items-center gap-[10px] font-button4 !text-[var(--blue-6)]"
            onClick={onToggleExpand}
          >
            {data_extrac && show ? (
              <ChevronDownIcon
                style={{
                  transform: expand ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            ) : (
              <Fragment>
                <span>{expand ? "button__28" : "button__20"}</span>
                <ChevronDownIcon
                  width={16}
                  height={16}
                  fill="var(--blue-6)"
                  style={{
                    transform: expand ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </Fragment>
            )}
          </button>
        </div>
        {expand && show && (
          <div className="px-[16px] flex items-center justify-between">
            <Tabs
              value={lang}
              options={["OG", "TH", "EN"]}
              onChange={async (e) => {
                setCopied(false);

                setLang(e as "OG" | "TH" | "EN");

                if (e === "EN" && extractEn.length === 0) {
                  setLoading(true);
                  // try {
                  //   const data = (await translateObjectEn(data_extrac)) as {
                  //     [key: string]: unknown;
                  //   };

                  //   const extractEnArray: { [key: string]: unknown }[] = [];
                  //   Object.keys(data).forEach((key) => {
                  //     const item = { [key]: data[key] };
                  //     extractEnArray.push(item);
                  //   });

                  //   setExtractEn(extractEnArray);
                  // } catch (error) {
                  //   console.log(error);
                  // } finally {
                  setLoading(false);
                  // }
                }

                if (e === "TH" && extractTh.length === 0) {
                  setLoading(true);
                  // try {
                  //   const data = (await translateObjectTh(data_extrac)) as {
                  //     [key: string]: unknown;
                  //   };

                  //   const extractThArray: { [key: string]: unknown }[] = [];
                  //   Object.keys(data).forEach((key) => {
                  //     const item = { [key]: data[key] };
                  //     extractThArray.push(item);
                  //   });

                  //   setExtractTh(extractThArray);
                  // } catch (error) {
                  //   console.log(error);
                  // } finally {
                  setLoading(false);
                  // }
                }
              }}
            />
            {copied ? (
              <Row align={"middle"}>
                <CheckedIcon fill="var(--blue-6)" />
                <p className="font-button4 text-[var(--blue-6)]">Copied!</p>
              </Row>
            ) : (
              <button title="copy-text-button" onClick={() => {}}>
                <CopyIcon width={24} height={24} />
              </button>
            )}
          </div>
        )}

        {expand && !show && (
          <div className="px-[16px] py-[8px]">
            <div className="py-[12px] px-[16px] bg-[var(--white-100)]">
              {RenderItem.map((item) => (
                <div
                  key={item.key}
                  className="flex gap-[12px] w-full items-center flex-nowrap"
                >
                  <span className="font-body4 whitespace-nowrap">
                    {item.label}
                  </span>
                  <div className="flex-auto bg-[var(--blue-1)] h-[16px] rounded-[4px] w-full"></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {expand && show && (
          <Spin
            spinning={loading}
            indicator={
              <LoadingOutlined
                style={{ fontSize: 24, color: "var(--blue-6)" }}
                spin={loading}
              />
            }
          >
            <div ref={contentRef}>
              {RenderItem.map((item) => {
                if (
                  ["overall_expertises", "latest_expertises", "tools"].includes(
                    item.key
                  )
                ) {
                  if (
                    item.data === null ||
                    (item.data as string[])?.length === 0
                  ) {
                    return (
                      <div
                        key={item.key}
                        className="p-[16px] flex flex-col gap-[12px]"
                      >
                        <h5 className="font-h10">{item.label}</h5>
                        <ul className="bg-white whitespace-break-spaces !m-0 rounded-[8px] min-h-[51px] py-[13.5px] px-[16px] border border-[var(--gray-7)]">
                          <li className="font-body5 text-[var(--text-disable)]">
                            {"body_text__29"}
                          </li>
                        </ul>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={item.key}
                      className="p-[16px] flex flex-col gap-[12px]"
                    >
                      <h5 className="font-h10">{item.label}</h5>
                      <ul className="bg-white whitespace-break-spaces !m-0 rounded-[8px] min-h-[51px] py-[13.5px] px-[16px] border border-[var(--gray-7)] list-disc">
                        {(item.data as string[])?.map(
                          (sub: string, index: number) => (
                            <li
                              key={index}
                              className="font-body5 text-[var(--text-title)] !ml-[8px]"
                            >
                              {sub}
                              {index === (item.data as string[])?.length
                                ? ""
                                : ","}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  );
                } else if (item.key === "work_experiences") {
                  const arr: WorkExperiencesType[] =
                    item.data as WorkExperiencesType[];

                  if (!arr || arr?.length === 0) {
                    return (
                      <div
                        key={item.key}
                        className="p-[16px] flex flex-col gap-[12px]"
                      >
                        <h5 className="font-h10">{item.label}</h5>
                        <div className="bg-white rounded-[8px] min-h-[51px] py-[13.5px] px-[16px] border border-[var(--gray-7)] font-body5 text-[var(--text-disable)]">
                          {"body_text__29"}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={item.key}
                      className="p-[16px] flex flex-col gap-[12px]"
                    >
                      <h5 className="font-h10">{item.label}</h5>
                      {arr.map((sub_item, sub_index) => {
                        const company = [];
                        if (sub_item.company) {
                          company.push(sub_item.company);
                        }
                        if (sub_item.duration) {
                          let text = "";
                          if (sub_item.duration >= 12) {
                            const years = Math.floor(sub_item.duration / 12);
                            const remainingMonths = sub_item.duration % 12;
                            text = `${years} ปี`;
                            if (remainingMonths > 0) {
                              text = text + ` ${remainingMonths} เดือน`;
                            }
                          } else {
                            text = `${sub_item.duration} เดือน`;
                          }

                          if (sub_item.start && sub_item.end) {
                            text =
                              text +
                              ` (${dayjs(sub_item.start)?.format(
                                "MMM YYYY"
                              )} - ${dayjs(sub_item.end)?.format("MMM YYYY")})`;
                          }

                          company.push(text);
                        }
                        if (sub_item.job_title) {
                          company.push(sub_item.job_title);
                        }
                        return (
                          <div key={sub_index}>
                            <h5>
                              {sub_index + 1 < 10
                                ? `0${sub_index + 1}.`
                                : `${sub_index + 1}.`}
                            </h5>
                            <ul className="bg-white rounded-[8px] min-h-[51px] py-[13.5px] px-[16px] border border-[var(--gray-7)] list-disc">
                              {company.map((compa_item, compa_index) => (
                                <li key={compa_index} className="!ml-[8px]">
                                  {compa_item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                  );
                } else if (
                  [
                    "total_experience_duration",
                    "latest_experience_duration",
                  ].includes(item.key)
                ) {
                  let text = "";
                  const duration = "";

                  // const { lastExperience, latestExperience } =
                  //   findLastAndLatestExperience(data_extrac?.work_experiences);

                  // if (item.data) {
                  //   duration = `(${dayjs(lastExperience?.start).format(
                  //     "MMM YYYY"
                  //   )} - ${dayjs(latestExperience?.end).format("MMM YYYY")})`;
                  // }

                  if ((item.data as number) >= 12) {
                    const years = Math.floor((item.data as number) / 12);
                    const remainingMonths = (item.data as number) % 12;
                    text = `${years} ปี`;
                    if (remainingMonths > 0) {
                      text = text + ` ${remainingMonths} เดือน`;
                    }
                    text = text + ` ${duration}`;
                  } else {
                    text = `${item.data} เดือน ${duration}`;
                  }

                  return (
                    <div
                      key={item.key}
                      className="p-[16px] flex flex-col gap-[12px]"
                    >
                      <h5 className="font-h10">{item.label}</h5>
                      <div className="bg-white rounded-[8px] min-h-[51px] py-[13.5px] px-[16px] border border-[var(--gray-7)]">
                        {item.data ? (
                          <span className="font-body5 text-[var(--text-title)]">
                            {text}
                          </span>
                        ) : (
                          <span className="font-body5 text-[var(--text-disable)]">
                            {"body_text__29"}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={item.key}
                    className="p-[16px] flex flex-col gap-[12px]"
                  >
                    <h5 className="font-h10">{item.label}</h5>
                    <div className="bg-white rounded-[8px] min-h-[51px] py-[13.5px] px-[16px] border border-[var(--gray-7)]">
                      {item.data ? (
                        <span className="font-body5 text-[var(--text-title)]">
                          {item.data as string}
                        </span>
                      ) : (
                        <span className="font-body5 text-[var(--text-disable)]">
                          {"body_text__29"}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Spin>
        )}
      </div>
      {show && expand && (
        <Row justify={"center"}>
          <button
            className="flex items-center gap-[10px] font-button2 !text-[var(--blue-6)]"
            onClick={onToggleExpand}
          >
            <span> {expand ? "button__28" : "button__20"}</span>
            <ChevronDownIcon
              width={16}
              height={16}
              fill="var(--blue-6)"
              style={{ transform: expand ? "rotate(180deg)" : "rotate(0deg)" }}
            />
          </button>
        </Row>
      )}
    </Fragment>
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

export default FullResult;
