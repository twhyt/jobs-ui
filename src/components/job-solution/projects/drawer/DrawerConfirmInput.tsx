import { useMemo } from "react";
import { Col, Divider, Row } from "antd";
import { ChevronLeftIcon } from "@/assets/job-solution/icons/directional-groups";
import {
  CandidateCheckerFormType,
  CriteriaItemType,
} from "@/types/job-solution/candidate-checker";
import ButtonCustom from "@/components/job-solution/custom-antd/Button";
import { EFeatureName } from "@/types/job-solution/package";
// import useTranslation from "@/hooks/useTranslation";
import TextAnalysis, {
  TextAnalysisProps,
} from "@/components/job-solution/data-display/TextAnalysis";
import DrawerDrag from "@/components/job-solution/drawer/DrawerDrag";
import ThreeDotColorLoading from "@/components/job-solution/loading";
import CreditRemain from "@/components/job-solution/credit/CreditRemain";

interface FormValues extends CandidateCheckerFormType {
  projectName: string;
}

interface DrawerConfirmInputProps {
  isOpen: boolean;
  result: FormValues;
  isLoading: boolean;
  onSubmit: () => void;
  handleDrawerConfirmInput: (open: boolean) => void;
}

export default function DrawerConfirmInput({
  isOpen,
  handleDrawerConfirmInput,
  onSubmit,
  result,
  isLoading,
}: Readonly<DrawerConfirmInputProps>) {
  // const { t } = useTranslation("drawer");

  const closeDrawer = () => {
    handleDrawerConfirmInput(false);
  };

  const ItemName = useMemo(() => {
    return [
      {
        key: "job_scope",
        name: "drawer_candidate_checker_preview_text_job_overview",
      },
      {
        key: "duties_and_responsibilities",
        name: "drawer_candidate_checker_preview_text_duty",
      },
      {
        key: "education",
        name: "drawer_candidate_checker_preview_text_education",
      },
      {
        key: "work_experience",
        name: "drawer_candidate_checker_preview_text_work_exp",
      },
      {
        key: "skills",
        name: "drawer_candidate_checker_preview_text_skills",
      },
      {
        key: "behavior_competencies",
        name: "drawer_candidate_checker_preview_text_behavior",
      },
      {
        key: "tool",
        name: "drawer_candidate_checker_preview_text_knowledge",
      },
      {
        key: "highlighted_criteria",
        name: "drawer_candidate_checker_preview_text_preferred",
      },
      {
        key: "excluded_criteria",
        name: "drawer_candidate_checker_preview_text_disqualify",
      },
      {
        key: "language",
        name: "drawer_candidate_checker_preview_text_language",
      },
      {
        key: "other_characteristics",
        name: "drawer_candidate_checker_preview_text_other",
      },
    ];
  }, []);

  const Item = useMemo(() => {
    const arr: TextAnalysisProps[] = [];
    if (result) {
      const data = { ...result, projectName: undefined };
      delete data.projectName;

      Object.keys(data).forEach((keys) => {
        if (!["excluded_criteria", "highlighted_criteria"].includes(keys)) {
          arr.push({
            id: keys,
            title: ItemName.find(({ key }) => key === keys)?.name ?? keys,
            type:
              (data[keys as keyof CandidateCheckerFormType] as string) !== ""
                ? "success"
                : "warnning",
          });
        } else {
          arr.push({
            id: keys,
            title: ItemName.find(({ key }) => key === keys)?.name ?? keys,
            type:
              (
                data[
                  keys as keyof CandidateCheckerFormType
                ] as CriteriaItemType[]
              )?.length > 0
                ? "success"
                : "warnning",
          });
        }
      });
    }

    const sortOrder = [
      "job_scope",
      "duties_and_responsibilities",
      "education",
      "work_experience",
      "skills",
      "behavior_competencies",
      "tool",
      "highlighted_criteria",
      "excluded_criteria",
      "language",
      "other_characteristics",
    ];

    const sorted = arr
      .toSorted((a, b) => sortOrder.indexOf(a.id) - sortOrder.indexOf(b.id))
      .filter((item) => {
        return item.id !== "files";
      });

    return sorted;
  }, [result, ItemName]);

  return (
    <DrawerDrag open={isOpen} onClose={closeDrawer}>
      <Row align={"middle"} className="p-[16px] pt-[8px] gap-[8px]">
        <button title="back" onClick={closeDrawer}>
          <ChevronLeftIcon />
        </button>
        <h3 className="font-h7 text-[var(--text-title)]">
          {"drawer_candidate_checker_preview_title"}
        </h3>
      </Row>
      <Divider className="!m-0 !bg-[var(--gray-5)]" />
      <Col span={24} className="max-h-[75vh] overflow-auto">
        <div className="flex flex-col p-[16px] gap-[8px]">
          <div>
            <h3 className="font-h10 text-[var(--success)]">
              {"drawer_candidate_checker_preview_include_header"}
            </h3>
            <span className="font-body2 text-[var(--text-secondary)]">
              {"drawer_candidate_checker_preview_include_description"}
            </span>
          </div>
          <div className="flex flex-col gap-[4px]">
            {Item.filter(({ type }) => type === "success").map(
              (item, index) => (
                <TextAnalysis key={index} {...item} />
              )
            )}
          </div>
        </div>
        <div className="w-full px-[16px]">
          <Divider className="!m-0 !bg-[var(--gray-5)]" />
        </div>
        <div className="flex flex-col p-[16px] gap-[8px]">
          <div>
            <h3 className="font-h10 text-[var(--error)]">
              {"drawer_candidate_checker_preview_exclude_header"}
            </h3>
            <span className="font-body2 text-[var(--text-secondary)]">
              {"drawer_candidate_checker_preview_exclude_description"}
            </span>
          </div>
          <div className="flex flex-col gap-[4px]">
            {Item.filter(({ type }) => type === "warnning").map(
              (item, index) => (
                <TextAnalysis key={index} {...item} />
              )
            )}
          </div>
        </div>
        <div className="w-full px-[16px]">
          <Divider className="!m-0 !bg-[var(--gray-5)]" />
        </div>
        <div className="flex flex-col p-[16px] gap-[8px]">
          <ButtonCustom
            onClick={onSubmit}
            loading={isLoading && { icon: <ThreeDotColorLoading /> }}
            variants="primary"
            size="large"
          >
            {!isLoading && "drawer_candidate_checker_preview_button_analyze"}
          </ButtonCustom>
          <CreditRemain feature={EFeatureName.JD_CDCD_SHORT} />
        </div>
      </Col>
    </DrawerDrag>
  );
}
