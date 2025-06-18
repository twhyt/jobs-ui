// import {
//   CreateJdJobDescriptionResponse,
//   CreateJdJobTitleResponse,
// } from "@/hooks/useJdGen";
// import useTemporaryRender from "@/hooks/useTemporaryRender";
// import { copyTextByRef } from "@/utils/copyTextByRef";
import clsx from "clsx";
import { FC, useRef, useState } from "react";
import styled from "styled-components";
import SlideActions from "./SlideActions";
import JobDescriptionItem from "./JobDescriptionItem";
// import axiosInstance from "@/utils/axiosInstance";

interface Props {
  item: any;
  itemIndex: number;
  type: "title" | "description";
  activeIndex: number;
  variants: "read" | "select";
  selectedId: string;
  onChangeSelectedId: (id: string) => void;
  savedJobDescriptionId: string[];
  savedJobTitleId: string[];
  jdGenId: string;
  projectId: string;
  isShare?: boolean;
}

const RadioButton = ({
  checked,
  onChangeSelectedId,
  itemId,
}: {
  checked: boolean;
  onChangeSelectedId: (id: string) => void;
  itemId: string;
}) => {
  return (
    <label className="relative flex items-center cursor-pointer select-none pl-8">
      <input
        checked={checked}
        type="checkbox"
        name="option"
        className="peer hidden"
        onChange={(e) => {
          if (e.target.checked) {
            onChangeSelectedId(itemId);
          }
          if (!e.target.checked) {
            onChangeSelectedId("");
          }
        }}
      />
      <span className="absolute right-0 top-1/2 -translate-y-1/2 h-5 w-5 rounded-full border-2 border-[var(--gray-7)] flex items-center justify-center peer-checked:border-[var(--blue-6)] peer-checked:bg-[var(--blue-6)]">
        {checked && (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.40289 10.4843L4.10917 8.25765C3.85359 8.00954 3.44727 8.00954 3.19169 8.25765C2.9361 8.50576 2.9361 8.9002 3.19169 9.14831L5.93759 11.8139C6.19318 12.062 6.60605 12.062 6.86163 11.8139L13.8083 5.07674C14.0639 4.82863 14.0639 4.43419 13.8083 4.18608C13.5527 3.93797 13.1464 3.93797 12.8908 4.18608L6.40289 10.4843Z"
              fill="#ffffff"
            />
          </svg>
        )}
      </span>
      <span className="text-gray-700"></span>
    </label>
  );
};

const SlideItem: FC<Props> = ({
  item,
  itemIndex,
  type,
  activeIndex,
  variants,
  selectedId,
  onChangeSelectedId,
  savedJobDescriptionId,
  savedJobTitleId,
  // jdGenId,
  // projectId,
  isShare,
}): JSX.Element => {
  const copyRef = useRef<HTMLDivElement>(null);
  // const [isVisible, showAgain] = useTemporaryRender();
  const [isLike] = useState(item.is_thumped_up || false);

  // async function onCopyText(job_sth_id: string) {
  //   copyTextByRef(copyRef, () => {
  //     showAgain();
  //   });

  //   try {
  //     const payload = {
  //       project_id: projectId,
  //       jd_generate_id: jdGenId,
  //       job_title_id: type === "title" ? job_sth_id : undefined,
  //       job_description_id: type === "description" ? job_sth_id : undefined,
  //       action: "copied",
  //     };
  //     await axiosInstance.post(
  //       "/v1/generation/job-description/interact",
  //       payload
  //     );
  //     // console.log("payload", payload);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // async function onLike(job_sth_id: string, isLike: boolean) {
  //   try {
  //     const payload = {
  //       project_id: projectId,
  //       jd_generate_id: jdGenId,
  //       job_title_id: type === "title" ? job_sth_id : undefined,
  //       job_description_id: type === "description" ? job_sth_id : undefined,
  //       action: "thumped_up",
  //     };
  //     await axiosInstance.post(
  //       "/v1/generation/job-description/interact",
  //       payload
  //     );

  //     setIsLike(!isLike);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // console.log("isLike", isLike);

  // Job title
  if (type === "title") {
    const jobTitles = item as any;
    const isChecked = savedJobTitleId.includes(jobTitles.job_title_id);
    return (
      <div
        className={clsx(
          "p-3 flex min-h-12 border rounded-[8px] border-[var(--gray-5)]  bg-[var(--white-100)]"
        )}
      >
        {activeIndex === itemIndex && (
          <div className={clsx("flex flex-col gap-4 w-full")}>
            <div className="flex gap-2 w-full justify-between items-center">
              <div className="flex gap-2">
                <ButtonNumber>{itemIndex + 1}</ButtonNumber>
                <p ref={copyRef} className="font-body5">
                  {jobTitles.title?.split(" - ")[0]}
                </p>
              </div>
              {!isShare && (
                <div className="flex gap-2">
                  {variants === "read" && (
                    <SlideActions
                      isVisible={true}
                      onCopyText={() => console.log("")}
                      checked={isChecked}
                      isLike={isLike}
                      onLike={() => console.log()}
                    />
                  )}

                  {variants === "select" && !isChecked && (
                    <RadioButton
                      checked={selectedId === jobTitles.job_title_id}
                      onChangeSelectedId={onChangeSelectedId}
                      itemId={jobTitles.job_title_id}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Job description
  if (type === "description") {
    const jodDescriptions = item as any;
    const checkQualification = [
      jodDescriptions.education,
      jodDescriptions.work_experience,
      jodDescriptions.skills,
      jodDescriptions.behavior_competencies,
      jodDescriptions.knowledges,
      jodDescriptions.preferred_qualifications,
    ];
    const passValue = [];
    checkQualification.forEach((item, index) => {
      if (typeof item === "string") {
        if (item.trim() !== "") {
          passValue.push(index);
        }
      }
      if (Array.isArray(item)) {
        if (item.length > 0) {
          passValue.push(index);
        }
      }
    });

    const mapJobDescription = [
      {
        key: "job_overview",
        label: "Job overview",
        value: jodDescriptions.job_scope || null,
      },
      {
        key: "duties_and_responsibilities",
        label: "Duties and Responsibilities",
        value: jodDescriptions.duties_and_responsibilities || null,
      },
      {
        key: "qualifications",
        label: "Qualifications",
        value: passValue.length > 0 ? "pass" : null,
        children: [
          {
            key: "education",
            label: "Education",
            value: jodDescriptions.education || null,
          },
          {
            key: "work_experience",
            label: "Work Experience",
            value: jodDescriptions.work_experience || null,
          },
          {
            key: "skills",
            label: "Skills",
            value: jodDescriptions.skills || null,
          },
          {
            key: "behaviors_competencies",
            label: "Behaviors/Competencies",
            value: jodDescriptions.behavior_competencies || null,
          },
          {
            key: "knowledges",
            label: "Knowledge/Tools",
            value: jodDescriptions.knowledges || null,
          },
          {
            key: "preferred_qualifications",
            label: "Other qualifications",
            value: jodDescriptions.preferred_qualifications || null,
          },
        ],
      },
    ].filter((item) => {
      return item.value !== null;
    });

    const isChecked = savedJobDescriptionId.includes(
      jodDescriptions.job_description_id
    );

    return (
      <div
        className={clsx(
          "p-3 flex min-h-12 border rounded-[8px] border-[var(--gray-5)] bg-[var(--white-100)]",
          type === "description" && "overflow-auto h-[330px]"
        )}
      >
        {activeIndex === itemIndex && (
          <div className={clsx("flex flex-col gap-4 w-full")}>
            {type === "description" && (
              <div className="flex flex-col gap-2 overflow-hidden">
                <div className="flex gap-2 w-full justify-between items-center">
                  <div className="flex gap-2">
                    <ButtonNumber>{itemIndex + 1}</ButtonNumber>
                  </div>
                  {!isShare && (
                    <div className="flex gap-2">
                      {variants === "read" && (
                        <SlideActions
                          isVisible={true}
                          onCopyText={() => console.log("")}
                          checked={isChecked}
                          isLike={isLike}
                          onLike={() => console.log()}
                        />
                      )}
                      {variants === "select" && !isChecked && (
                        <RadioButton
                          checked={
                            selectedId === jodDescriptions.job_description_id
                          }
                          onChangeSelectedId={onChangeSelectedId}
                          itemId={jodDescriptions.job_description_id}
                        />
                      )}
                    </div>
                  )}
                </div>

                <div
                  className="flex flex-col gap-3 overflow-auto h-[330px]"
                  ref={copyRef}
                >
                  {mapJobDescription.map((item, index) => {
                    return (
                      <JobDescriptionItem
                        key={item.key}
                        result={item}
                        indexItem={index}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  return <></>;
};

const ButtonNumber = styled.div`
  color: var(--blue-6);
  background: var(--blue-1);
  border-radius: 9999px;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default SlideItem;
