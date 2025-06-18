import DrawerDrag from "./DrawerDrag";
import { useCallback, useMemo, useState } from "react";
// import { useAppDispatch, useAppSelector } from "@/store/redux-hook";
// import { onCloseDrawerConfirmInput } from "@/store/slices/drawerSlice";
import { Col, Divider, Row } from "antd";
import { ChevronLeftIcon } from "@/assets/job-solution/icons/directional-groups";
import TextAnalysis, { TextAnalysisProps } from "../data-display/TextAnalysis";
// import {
//   AdjustCriteriaResponseJdCd,
//   AdjustCriteriaResponseJdCdCd,
//   CandidateCheckerFormType,
//   CriteriaItemType,
// } from "@/types/job-solution/candidate-checker";
import ButtonCustom from "@/components/job-solution/custom-antd/Button";
import CreditRemain from "../credit/CreditRemain";
// import axiosInstance from "@/utils/axiosInstance";
// import { getRemainCredit } from "@/store/slices/userSlice";
// import {
//   AdjustCriteriaResponseJdCdCdWithType,
//   AdjustCriteriaResponseJdCdWithType,
//   ECandidateChecker,
//   setJdCd,
//   setJdCdCdAll,
//   setResults,
// } from "@/store/slices/projectSlice";
import ThreeDotLoading from "../loading";
import { EFeatureName } from "@/types/job-solution/package";
// import useTranslation from "@/hooks/useTranslation";
// import { v4 } from "uuid";

interface DrawerConfirmInputProps {
  projectId?: string;
  onAnalyze: (e: any) => void;
  resume_id: string[];
}

export default function DrawerConfirmInput({
  projectId,
  resume_id,
}: // onAnalyze,
Readonly<DrawerConfirmInputProps>) {
  // const { t: tCommon } = useTranslation("common");
  // const { t } = useTranslation("drawer");
  // const dispatch = useAppDispatch();

  // const { drawerConfirmInput } = useAppSelector((state) => state.drawer);
  // const { candidate_checker, candidate_checker_name } = useAppSelector(
  //   (state) => state.project
  // );

  const [onFetch, setOnFetch] = useState(false);

  // const ItemName = useMemo(() => {
  //   return [
  //     {
  //       key: "job_scope",
  //       name: "drawer_candidate_checker_preview_text_job_overview",
  //     },
  //     {
  //       key: "duties_and_responsibilities",
  //       name: "drawer_candidate_checker_preview_text_duty",
  //     },
  //     {
  //       key: "education",
  //       name: "drawer_candidate_checker_preview_text_education",
  //     },
  //     {
  //       key: "work_experience",
  //       name: "drawer_candidate_checker_preview_text_work_exp",
  //     },
  //     {
  //       key: "skills",
  //       name: "drawer_candidate_checker_preview_text_skills",
  //     },
  //     {
  //       key: "behavior_competencies",
  //       name: "drawer_candidate_checker_preview_text_behavior",
  //     },
  //     {
  //       key: "tool",
  //       name: "drawer_candidate_checker_preview_text_knowledge",
  //     },
  //     {
  //       key: "highlighted_criteria",
  //       name: "drawer_candidate_checker_preview_text_preferred",
  //     },
  //     {
  //       key: "excluded_criteria",
  //       name: "drawer_candidate_checker_preview_text_disqualify",
  //     },
  //     {
  //       key: "language",
  //       name: "drawer_candidate_checker_preview_text_language",
  //     },
  //     {
  //       key: "other_characteristics",
  //       name: "drawer_candidate_checker_preview_text_other",
  //     },
  //   ];
  // }, []);

  const Item = useMemo(() => {
    const arr: TextAnalysisProps[] = [];
    // if (candidate_checker?.job_detail_status && candidate_checker?.job_detail) {
    //   const data = candidate_checker?.job_detail;

    //   Object.keys(data).forEach((keys) => {
    //     if (!["excluded_criteria", "highlighted_criteria"].includes(keys)) {
    //       arr.push({
    //         id: keys,
    //         title: ItemName.find(({ key }) => key === keys)?.name ?? keys,
    //         type:
    //           (data[keys as keyof CandidateCheckerFormType] as string) !== ""
    //             ? "success"
    //             : "warnning",
    //       });
    //     } else {
    //       arr.push({
    //         id: keys,
    //         title: ItemName.find(({ key }) => key === keys)?.name ?? keys,
    //         type:
    //           (
    //             data[
    //               keys as keyof CandidateCheckerFormType
    //             ] as CriteriaItemType[]
    //           )?.[0]?.value !== ""
    //             ? "success"
    //             : "warnning",
    //       });
    //     }
    //   });
    // }

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
  }, []);

  const CloseDrawer = useCallback(() => {
    // dispatch(onCloseDrawerConfirmInput());
  }, []);

  const onClickAnalyze = useCallback(async () => {
    setOnFetch(true);
    try {
      //   if (!candidate_checker.job_detail) return;

      //   const arr = Object.fromEntries(
      //     Object.entries(candidate_checker?.job_detail).map(([key, value]) => [
      //       key,
      //       value === "" ? "" : value,
      //     ])
      //   );

      //   if (resume_id.length > 1) {
      //     const payload = {
      //       project_id: projectId,
      //       pocket_owner_type: "account",
      //       project_name: candidate_checker_name || tCommon("untitled"),
      //       resume_id: [...resume_id],
      //       ...candidate_checker?.job_detail,
      //       ...arr,
      //       preferred_qualifications:
      //         candidate_checker?.job_detail?.highlighted_criteria
      //           .map(({ value }) => value)
      //           .filter((val) => val?.trim() !== ""),
      //       disqualifications: candidate_checker?.job_detail?.excluded_criteria
      //         .map(({ value }) => value)
      //         .filter((val) => val?.trim() !== ""),
      //       files: undefined,
      //       highlighted_criteria: undefined,
      //       excluded_criteria: undefined,
      //     };

      //     const res = await axiosInstance
      //       .post("/v1/matching/analysis/jd-cdcd/all-summary", payload)
      //       .then(({ data }) => data)
      //       .catch((err) => {
      //         throw err;
      //       });

      //     dispatch(setJdCdCdAll(res));

      //     // Set result to redux
      //     const resultId = v4();
      //     const result = res as AdjustCriteriaResponseJdCdCd;
      //     const resultWithId = {
      //       ...result,
      //       type: ECandidateChecker.JD_CDCD,
      //       resultId,
      //     };
      //     dispatch(setResults(resultWithId));
      //     onAnalyze(resultWithId);
      //   } else {
      //     const payload = {
      //       project_id: projectId,
      //       pocket_owner_type: "account",
      //       project_name: candidate_checker_name || tCommon("untitled"),
      //       resume_id: resume_id[0],
      //       ...candidate_checker?.job_detail,
      //       ...arr,
      //       preferred_qualifications:
      //         candidate_checker?.job_detail?.highlighted_criteria
      //           .map(({ value }) => value)
      //           .filter((val) => val?.trim() !== ""),
      //       disqualifications: candidate_checker?.job_detail?.excluded_criteria
      //         .map(({ value }) => value)
      //         .filter((val) => val?.trim() !== ""),
      //       files: undefined,
      //       highlighted_criteria: undefined,
      //       excluded_criteria: undefined,
      //     };

      //     const res = await axiosInstance
      //       .post("/v1/matching/analysis/jd-cd/short-summary", payload)
      //       .then(({ data }) => data)
      //       .catch((err) => {
      //         throw err;
      //       });

      //     dispatch(setJdCd(res));

      //     // Set result to redux
      //     const resultId = v4();
      //     const result = res as AdjustCriteriaResponseJdCd;
      //     const resultWithId = {
      //       ...result,
      //       type: ECandidateChecker.JD_CD,
      //       resultId,
      //     };
      //     dispatch(setResults(resultWithId));
      //     onAnalyze(resultWithId);
      //   }
      CloseDrawer();
    } catch (err) {
      console.log("err JD-CD", err);
    } finally {
      setTimeout(() => {
        setOnFetch(false);
        // dispatch(getRemainCredit());
      }, 1500);
    }
  }, [
    resume_id,
    // candidate_checker?.job_detail,
    // onAnalyze,
    // dispatch,
    CloseDrawer,
    // candidate_checker_name,
    projectId,
  ]);

  return (
    <DrawerDrag open={true} onClose={CloseDrawer}>
      <Row align={"middle"} className="p-[16px] pt-[8px] gap-[8px]">
        <button title="back" onClick={CloseDrawer}>
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
          {/* <ButtonCustom disabled={onFetch} variants="secondary" size="large">
            {("drawer_candidate_checker_preview_button_save_to_jd")}
          </ButtonCustom> */}
          <ButtonCustom
            onClick={onClickAnalyze}
            loading={onFetch && { icon: <ThreeDotLoading /> }}
            variants="primary"
            size="large"
          >
            {!onFetch && "drawer_candidate_checker_preview_button_analyze"}
          </ButtonCustom>
          <CreditRemain feature={EFeatureName.JD_CDCD_SHORT} />
        </div>
      </Col>
    </DrawerDrag>
  );
}
