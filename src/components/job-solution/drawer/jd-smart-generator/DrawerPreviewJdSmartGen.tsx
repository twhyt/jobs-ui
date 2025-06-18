import { FC, useCallback, useMemo } from "react";
import DrawerDrag from "../DrawerDrag";
import { Divider } from "antd";
import Button from "@/components/job-solution/custom-antd/Button";
import CreditRemain from "@/components/job-solution/credit/CreditRemain";
import { EFeatureName } from "@/types/job-solution/package";
import { TreeItem } from "@/components/job-solution/tree-checkbox";
import styled from "styled-components";
import { JobTitle } from "@/types/job-solution/global";

// import {
//   collectAllIdsFromTree,
//   filterTreeByNotSelected,
//   filterTreeBySelected,
// } from "@/utils/checkbox";
import ThreeDotColorLoading from "@/components/job-solution/loading";
// import useDisabledScreenScroll from "@/hooks/useDisabledScreenScroll";
// import useTranslation from "@/hooks/useTranslation";

interface Props {
  open: boolean;
  onClose: () => void;
  selections: string[];
  treeData: TreeItem[];
  selectedLanguage: string;
  jobTitle: JobTitle;
  jobOverview: string;
  onGenerate: () => void;
  loading: boolean;
}

interface PreviewItemProps {
  label: string;
  checked?: boolean;
}

enum Language {
  english = "English",
  thai = "Thai",
}

export enum LanguagePayload {
  english = "en",
  thai = "th",
}

const PreviewItem = ({ label, checked = true }: PreviewItemProps) => {
  return (
    <div className="flex gap-2 items-center">
      {checked ? (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.06536 9.1987L5.63203 7.76536C5.50981 7.64314 5.35425 7.58203 5.16536 7.58203C4.97648 7.58203 4.82092 7.64314 4.6987 7.76536C4.57648 7.88759 4.51536 8.04314 4.51536 8.23203C4.51536 8.42092 4.57648 8.57648 4.6987 8.6987L6.5987 10.5987C6.73203 10.732 6.88759 10.7987 7.06536 10.7987C7.24314 10.7987 7.3987 10.732 7.53203 10.5987L11.2987 6.83203C11.4209 6.70981 11.482 6.55425 11.482 6.36536C11.482 6.17648 11.4209 6.02092 11.2987 5.8987C11.1765 5.77648 11.0209 5.71536 10.832 5.71536C10.6431 5.71536 10.4876 5.77648 10.3654 5.8987L7.06536 9.1987ZM7.9987 14.6654C7.07648 14.6654 6.20981 14.4904 5.3987 14.1404C4.58759 13.7904 3.88203 13.3154 3.28203 12.7154C2.68203 12.1154 2.20703 11.4098 1.85703 10.5987C1.50703 9.78759 1.33203 8.92092 1.33203 7.9987C1.33203 7.07648 1.50703 6.20981 1.85703 5.3987C2.20703 4.58759 2.68203 3.88203 3.28203 3.28203C3.88203 2.68203 4.58759 2.20703 5.3987 1.85703C6.20981 1.50703 7.07648 1.33203 7.9987 1.33203C8.92092 1.33203 9.78759 1.50703 10.5987 1.85703C11.4098 2.20703 12.1154 2.68203 12.7154 3.28203C13.3154 3.88203 13.7904 4.58759 14.1404 5.3987C14.4904 6.20981 14.6654 7.07648 14.6654 7.9987C14.6654 8.92092 14.4904 9.78759 14.1404 10.5987C13.7904 11.4098 13.3154 12.1154 12.7154 12.7154C12.1154 13.3154 11.4098 13.7904 10.5987 14.1404C9.78759 14.4904 8.92092 14.6654 7.9987 14.6654Z"
            fill="#008A20"
          />
        </svg>
      ) : (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.9987 8.93594L9.93203 10.8693C10.0543 10.9915 10.2098 11.0526 10.3987 11.0526C10.5876 11.0526 10.7431 10.9915 10.8654 10.8693C10.9876 10.747 11.0487 10.5915 11.0487 10.4026C11.0487 10.2137 10.9876 10.0582 10.8654 9.93594L8.93203 8.0026L10.8654 6.06927C10.9876 5.94705 11.0487 5.79149 11.0487 5.6026C11.0487 5.41371 10.9876 5.25816 10.8654 5.13594C10.7431 5.01372 10.5876 4.9526 10.3987 4.9526C10.2098 4.9526 10.0543 5.01372 9.93203 5.13594L7.9987 7.06927L6.06536 5.13594C5.94314 5.01372 5.78759 4.9526 5.5987 4.9526C5.40981 4.9526 5.25425 5.01372 5.13203 5.13594C5.00981 5.25816 4.9487 5.41371 4.9487 5.6026C4.9487 5.79149 5.00981 5.94705 5.13203 6.06927L7.06536 8.0026L5.13203 9.93594C5.00981 10.0582 4.9487 10.2137 4.9487 10.4026C4.9487 10.5915 5.00981 10.747 5.13203 10.8693C5.25425 10.9915 5.40981 11.0526 5.5987 11.0526C5.78759 11.0526 5.94314 10.9915 6.06536 10.8693L7.9987 8.93594ZM7.9987 14.6693C7.07648 14.6693 6.20981 14.4943 5.3987 14.1443C4.58759 13.7943 3.88203 13.3193 3.28203 12.7193C2.68203 12.1193 2.20703 11.4137 1.85703 10.6026C1.50703 9.79149 1.33203 8.92483 1.33203 8.0026C1.33203 7.08038 1.50703 6.21372 1.85703 5.4026C2.20703 4.59149 2.68203 3.88594 3.28203 3.28594C3.88203 2.68594 4.58759 2.21094 5.3987 1.86094C6.20981 1.51094 7.07648 1.33594 7.9987 1.33594C8.92092 1.33594 9.78759 1.51094 10.5987 1.86094C11.4098 2.21094 12.1154 2.68594 12.7154 3.28594C13.3154 3.88594 13.7904 4.59149 14.1404 5.4026C14.4904 6.21372 14.6654 7.08038 14.6654 8.0026C14.6654 8.92483 14.4904 9.79149 14.1404 10.6026C13.7904 11.4137 13.3154 12.1193 12.7154 12.7193C12.1154 13.3193 11.4098 13.7943 10.5987 14.1443C9.78759 14.4943 8.92092 14.6693 7.9987 14.6693Z"
            fill="#FF4D4F"
          />
        </svg>
      )}
      <p className="font-body5">{label}</p>
    </div>
  );
};

const ContainerItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const DrawerPreviewJdSmartGen: FC<Props> = ({
  onClose,
  open,
  // selections,
  // treeData,
  selectedLanguage,
  jobOverview,
  jobTitle,
  onGenerate,
  loading,
}): JSX.Element => {
  // Handle screen scroll
  // useDisabledScreenScroll(open);
  // const { t } = useTranslation("drawer");

  const includeOutputFormat = useMemo(() => {
    // const selectionSet = new Set(selections);
    // const flatMap = filterTreeBySelected(treeData, selectionSet);
    let flatMap;
    return flatMap;
  }, []);

  // const excludeOutputFormat = useMemo(() => {
  //   const selectionSet = new Set(selections);
  //   // const flatMap = filterTreeByNotSelected(treeData, selectionSet);
  //   let flatMap;
  //   return flatMap;
  // }, [treeData, selections]);

  const isIncludedInput = useMemo(() => {
    if (jobTitle.title.trim()) {
      return true;
    }

    if (jobTitle.include && jobTitle.include.length > 0) {
      return true;
    }

    if (jobTitle.exclude && jobTitle.exclude.length > 0) {
      return true;
    }

    if (jobOverview.trim()) {
      return true;
    }
    return false;
  }, [jobTitle.title, jobOverview, jobTitle.include, jobTitle.exclude]);

  // Exclude
  const displayNotIncludedInput = useMemo(() => {
    if (!jobTitle.title.trim()) {
      return true;
    }

    if (!jobTitle.include || jobTitle.include.length === 0) {
      return true;
    }

    if (!jobTitle.exclude || jobTitle.exclude.length === 0) {
      return true;
    }

    if (!jobOverview.trim()) {
      return true;
    }

    return false;
  }, [jobTitle.title, jobTitle.exclude, jobTitle.include, jobOverview]);

  const displayAllNotIncludedInput = useMemo(() => {
    let isNotIncluded = false;

    // const allIds = collectAllIdsFromTree(treeData);

    // if (allIds.length !== selections.length) {
    //   isNotIncluded = true;
    // }

    if (!jobTitle.title) {
      isNotIncluded = true;
    }

    if (jobTitle.exclude && jobTitle?.exclude.length > 0) {
      isNotIncluded = true;
    }

    if (!jobOverview.trim()) {
      return true;
    }

    return isNotIncluded;
  }, [jobTitle.exclude, jobTitle.title, jobOverview]);

  const renderTree = useCallback(
    (tree: typeof includeOutputFormat, parentMap?: Record<string, string>) => {
      return (
        <ul
          style={{
            listStyleType: "none",
            paddingLeft: !parentMap ? 0 : 16,
            paddingRight: !parentMap ? 0 : 16,
            display: "flex",
            flexDirection: "column",
            rowGap: "4px",
            margin: 0,
          }}
        >
          {/* {tree.map((node) => {
            return ( */}
          <li
            // key={node.id}
            className="flex flex-col gap-1"
          >
            <div className="flex items-center justify-between gap-3">
              <PreviewItem label={"node.label"} />
            </div>

            {/* {node.children &&
                  renderTree(node.children, {
                    ...parentMap,
                    ...Object.fromEntries(
                      node.children.map((child) => [child.id, node.id])
                    ),
                  })} */}
          </li>
          {/* );
          })} */}
        </ul>
      );
    },
    []
  );

  return (
    <DrawerDrag
      open={open}
      onClose={() => {
        if (loading) return;
        onClose();
      }}
      disabledDrag={loading}
    >
      <div className="p-[16px] pt-[8px] gap-[8px] flex">
        <button title="back" onClick={onClose}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16.2071 5.29289C16.5976 5.68342 16.5976 6.31658 16.2071 6.70711L10.9142 12L16.2071 17.2929C16.5976 17.6834 16.5976 18.3166 16.2071 18.7071C15.8166 19.0976 15.1834 19.0976 14.7929 18.7071L8.79289 12.7071C8.40237 12.3166 8.40237 11.6834 8.79289 11.2929L14.7929 5.29289C15.1834 4.90237 15.8166 4.90237 16.2071 5.29289Z"
              fill="#141414"
            />
          </svg>
        </button>
        <h3
          className="font-h7 text-[var(--text-title)]"
          style={{ fontSize: 20 }}
        >
          {"drawer_jd_gen_preview_title"}
        </h3>
      </div>

      <Divider className="!m-0 !bg-[var(--gray-5)]" />

      {/* Header Container */}
      <div className="py-4">
        <div className="max-h-[50vh] overflow-auto flex flex-col gap-3 ">
          <div className="px-4">
            <h1 className="font-h10 text-[var(--green-6)]">
              {"drawer_jd_gen_preview_include_header"}
            </h1>
            <p className="font-body2 text-[var(--black-45)]">
              {"drawer_jd_gen_preview_include_description"}
            </p>
          </div>

          {/* Input Container */}
          {isIncludedInput && (
            <div className="flex flex-col gap-1 px-4">
              <ContainerItem>
                <h1 className="font-h10">{"drawer_jd_gen_preview_input"}</h1>
                <ContainerItem>
                  {jobTitle.title.trim() && (
                    <PreviewItem
                      label={"drawer_jd_gen_preview_input_job_title"}
                    />
                  )}
                  <div className="pl-4">
                    {jobTitle.include && jobTitle.include.length > 0 && (
                      <PreviewItem
                        label={"drawer_jd_gen_preview_input_job_title_include"}
                      />
                    )}
                  </div>
                  <div className="pl-4">
                    {jobTitle.exclude && jobTitle.exclude.length > 0 && (
                      <PreviewItem
                        label={"drawer_jd_gen_preview_input_job_title_exclude"}
                      />
                    )}
                  </div>
                </ContainerItem>
                {jobOverview.trim() && (
                  <PreviewItem
                    label={"drawer_jd_gen_preview_input_job_overview"}
                  />
                )}
              </ContainerItem>
            </div>
          )}

          {/* Output Container */}
          <div className="px-2">
            <div className="flex flex-col gap-3 p-2 bg-[var(--gray-2)] rounded">
              {/* Output language */}
              <ContainerItem>
                <h1 className="font-h10">
                  {"drawer_jd_gen_preview_output_language"}
                </h1>
                <PreviewItem
                  label={
                    Language[
                      selectedLanguage
                        .toLowerCase()
                        .trim() as keyof typeof Language
                    ] === "English"
                      ? "drawer_jd_gen_preview_output_language_en"
                      : "drawer_jd_gen_preview_output_language_th"
                  }
                />
              </ContainerItem>

              {/* Output format */}
              {/* {includeOutputFormat && includeOutputFormat.length > 0 && ( */}
              <ContainerItem>
                <h1 className="font-h10">
                  {"drawer_jd_gen_preview_output_format"}
                </h1>
                {renderTree(includeOutputFormat)}
              </ContainerItem>
              {/* )} */}
            </div>
          </div>

          {displayAllNotIncludedInput && (
            <>
              <div className="px-2">
                <Divider className="!m-0 !bg-[var(--gray-5)] " />
              </div>

              <div className="px-4">
                <h1 className="font-h10 text-[var(--error)]">
                  {"drawer_jd_gen_preview_exclude_header"}
                </h1>
                <p className="font-body2 text-[var(--black-45)]">
                  {"drawer_jd_gen_preview_exclude_description"}
                </p>
              </div>

              {/* Input Container */}
              {displayNotIncludedInput && (
                <div className="flex flex-col gap-1 px-4">
                  <h1 className="font-h10">{"drawer_jd_gen_preview_input"}</h1>

                  {!jobTitle.title.trim() && (
                    <PreviewItem
                      label={"drawer_jd_gen_preview_input_job_title"}
                      checked={false}
                    />
                  )}

                  {(!jobTitle.include || jobTitle.include.length === 0) && (
                    <PreviewItem
                      label={"drawer_jd_gen_preview_input_job_title_include"}
                      checked={false}
                    />
                  )}

                  {(!jobTitle.exclude || jobTitle.exclude.length === 0) && (
                    <PreviewItem
                      label={"drawer_jd_gen_preview_input_job_title_exclude"}
                      checked={false}
                    />
                  )}

                  {!jobOverview && (
                    <PreviewItem
                      label={"drawer_jd_gen_preview_input_job_overview"}
                      checked={false}
                    />
                  )}
                </div>
              )}

              {/* Output Container */}
              {/* {excludeOutputFormat.length > 0 && ( */}
              <div className="px-2">
                <div className="flex flex-col gap-3 p-2 bg-[var(--gray-2)] rounded">
                  {/* Output format */}
                  <ContainerItem>
                    <h1 className="font-h10">
                      {"drawer_jd_gen_preview_output_format"}
                    </h1>
                    {/* {excludeOutputFormat.map((item) => { */}
                    {/* return ( */}
                    <PreviewItem
                      // key={item.id}
                      label={"item.label"}
                      checked={false}
                    />
                    {/* );
                      })} */}
                  </ContainerItem>
                </div>
              </div>
              {/* )} */}
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col p-[16px] gap-[8px]">
        <Button
          variants={loading ? "secondary" : "primary"}
          size="large"
          className="flex items-center justify-center"
          onClick={onGenerate}
          loading={
            loading && {
              icon: <ThreeDotColorLoading color="bg-[var(--blue-6)]" />,
            }
          }
        >
          {!loading && (
            <div className="flex items-center gap-2">
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.52805 4.41213C6.56443 4.31062 6.7035 4.31062 6.73988 4.41213L6.89753 4.85199C7.44657 6.38386 8.61642 7.59165 10.1002 8.1585L10.5262 8.32126C10.6245 8.35882 10.6245 8.50239 10.5262 8.53995L10.1002 8.70271C8.61642 9.26956 7.44657 10.4773 6.89753 12.0092L6.73988 12.4491C6.7035 12.5506 6.56443 12.5506 6.52805 12.4491L6.3704 12.0092C5.82136 10.4773 4.65151 9.26956 3.16775 8.70271L2.74171 8.53995C2.64339 8.50239 2.64339 8.35882 2.74171 8.32126L3.16775 8.1585C4.65151 7.59165 5.82136 6.38386 6.3704 4.85199L6.52805 4.41213Z"
                  fill="white"
                />
                <path
                  d="M11.2178 1.77395C11.2367 1.72118 11.309 1.72118 11.3279 1.77395L11.4099 2.00261C11.6953 2.79897 12.3035 3.42684 13.0748 3.72152L13.2963 3.80613C13.3474 3.82566 13.3474 3.9003 13.2963 3.91982L13.0748 4.00444C12.3035 4.29911 11.6953 4.92699 11.4099 5.72334L11.3279 5.952C11.309 6.00477 11.2367 6.00477 11.2178 5.952L11.1359 5.72334C10.8505 4.92699 10.2423 4.29911 9.47096 4.00444L9.24948 3.91982C9.19837 3.9003 9.19837 3.82566 9.24948 3.80613L9.47096 3.72152C10.2423 3.42684 10.8505 2.79897 11.1359 2.00261L11.2178 1.77395Z"
                  fill="white"
                />
                <path
                  d="M11.2178 10.8501C11.2367 10.7973 11.309 10.7973 11.3279 10.8501L11.4099 11.0787C11.6953 11.8751 12.3035 12.503 13.0748 12.7976L13.2963 12.8823C13.3474 12.9018 13.3474 12.9764 13.2963 12.996L13.0748 13.0806C12.3035 13.3752 11.6953 14.0031 11.4099 14.7995L11.3279 15.0281C11.309 15.0809 11.2367 15.0809 11.2178 15.0281L11.1359 14.7995C10.8505 14.0031 10.2423 13.3752 9.47096 13.0806L9.24948 12.996C9.19837 12.9764 9.19837 12.9018 9.24948 12.8823L9.47096 12.7976C10.2423 12.503 10.8505 11.8751 11.1359 11.0787L11.2178 10.8501Z"
                  fill="white"
                />
              </svg>
              <p className="font-button2">
                {"drawer_jd_gen_preview_button_generate"}
              </p>{" "}
            </div>
          )}
        </Button>

        <CreditRemain feature={EFeatureName.JC_GENERETOR_GENERATE} />
      </div>
    </DrawerDrag>
  );
};

export default DrawerPreviewJdSmartGen;
