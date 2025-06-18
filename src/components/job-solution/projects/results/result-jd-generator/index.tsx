import { FC, useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import DetailProjectNameContainer from "@/components/job-solution/jd-generator/DetailProjectNameContainer";
import { Divider, Row } from "antd";
import AddJobTitleContainer from "@/components/job-solution/jd-generator/AddJobTitleContainer";
import JobOverviewContainer from "@/components/job-solution/jd-generator/JobOverviewContainer";
import SelectLanguageContainer from "@/components/job-solution/jd-generator/SelectLanguageContainer";
import TreeCheckbox from "@/components/job-solution/tree-checkbox";
import SelectJdGenForm from "@/components/job-solution/jd-generator/SelectJdGenForm";
import { AddCircleIcon } from "@/assets/job-solution/icons/suggested-groups/outline";
// import useTranslation from "@/hooks/useTranslation";
import Button from "@/components/job-solution/custom-antd/Button";
import FooterContainer from "@/components/job-solution/jd-generator/FooterContainer";
// import { useMutation } from "@tanstack/react-query";
// import useJdGen, { CreateJdPayload } from "@/hooks/useJdGen";
// import useTemporaryRender from "@/hooks/useTemporaryRender";
// import { useAppDispatch, useAppSelector } from "@/store/redux-hook";
// import { getRemainCredit } from "@/store/slices/userSlice";
// import { LanguagePayload } from "@/components/job-solution/drawer/jd-smart-generator/DrawerPreviewJdSmartGen";
// import {
//   collectAllKeyValueFromTree,
//   filterTreeBySelectedNotPreserveParent,
// } from "@/utils/checkbox";
import Meta from "@/components/job-solution/meta";
import { FormValues, Step } from "@/types/job-solution/global";

interface Props {
  inResult: any;
  projectName?: string;
  projectId?: string;
  isShare?: boolean;
  handleClickEdit?: () => void;
  handleClickNew?: () => void;
}

const ResultJdGenerator: FC<Props> = ({
  inResult,
  projectName,
  projectId,
  handleClickEdit,
  handleClickNew,
  isShare,
}): JSX.Element => {
  // const [isVisible, showAgain] = useTemporaryRender();
  // const { t: tJdGen } = useTranslation("jdGen");
  // const { t: commonT } = useTranslation("common");
  // const { t } = useTranslation("jdGen");
  // const dispatch = useAppDispatch();
  const [result] = useState<any>(inResult);

  const [savedJobDescriptionId, setSavedJobDescriptionId] = useState<string[]>(
    []
  );
  const [savedJobTitleId, setSavedJobTitleId] = useState<string[]>([]);

  const buildSelectionsFromResult = (input: any): string[] => {
    const selections: string[] = [];

    if (input?.count_output?.job_title === 3) selections.push("1");

    if (input?.has_output_job_scope) selections.push("2-1");
    if (input?.has_output_duties_and_responsibilities) selections.push("2-2");

    const qualificationMap = {
      "2-3-1": input?.has_output_education,
      "2-3-2": input?.has_output_work_experience,
      "2-3-3": input?.has_output_skills,
      "2-3-4": input?.has_output_behavior,
      "2-3-5": input?.has_output_knowledge,
      "2-3-6": input?.has_output_other_qualifications,
    };

    for (const [key, value] of Object.entries(qualificationMap)) {
      if (value) selections.push(key);
    }

    const hasAllQualifications = Object.values(qualificationMap).every(Boolean);
    if (hasAllQualifications) {
      selections.push("2-3");
    }

    const hasJobOverview = input?.has_output_job_scope;
    const hasDuties = input?.has_output_duties_and_responsibilities;

    if (hasJobOverview && hasDuties && hasAllQualifications) {
      selections.push("2");
    }

    return selections;
  };

  const FULL_SELECTIONS = [
    "1",
    "2",
    "2-1",
    "2-2",
    "2-3",
    "2-3-1",
    "2-3-2",
    "2-3-3",
    "2-3-4",
    "2-3-5",
    "2-3-6",
  ];

  const selection = buildSelectionsFromResult(result?.input);
  const selectAll =
    FULL_SELECTIONS.every((item) => selection.includes(item)) &&
    selection.length === FULL_SELECTIONS.length;

  const form = useForm<FormValues>({
    mode: "all",
    defaultValues: {
      projectName: projectName,
      selections: selection,
      selectAll: selectAll,
      selectedLanguage:
        inResult?.input?.output_language === "en" ? "English" : "Thai",
      jobTitle: {
        title: inResult?.input?.job_title,
        include: inResult?.input?.job_title_keywords_include,
        exclude: inResult?.input?.job_title_keywords_exclude,
      },
      jobOverview: inResult?.input?.job_overview,
    },
  });
  const { trigger } = form;

  // const selectedLanguage = form.watch("selectedLanguage");
  const selections = form.watch("selections");
  // const jobTitle = form.watch("jobTitle");
  // const jobOverview = form.watch("jobOverview");
  const [openAdditional, setOpenAdditional] = useState(false);
  const [openSelectLang, setOpenSelectLang] = useState(false);
  // const [openPreview, setOpenPreview] = useState(false);
  // const { credit } = useAppSelector((state) => state.user);
  const [step, setStep] = useState<Step>("jd_generated");

  const disabledNextButton = useMemo(() => {
    const startWith2 = selections.filter((item) => {
      return item.startsWith("2");
    });

    if (!selections.includes("1") || startWith2.length === 0) {
      return true;
    }

    return false;
  }, [selections]);

  const treeData = useMemo(() => {
    return [
      {
        id: "1",
        label: "jd_gen_step4_checkbox_1",
        keyValue: "job_title",
      },
      {
        id: "2",
        label: "jd_gen_step4_checkbox_2",
        keyValue: "job_description",
        children: [
          {
            id: "2-1",
            label: "jd_gen_step4_checkbox_2_1",
            keyValue: "job_overview",
          },
          {
            id: "2-2",
            label: "jd_gen_step4_checkbox_2_2",
            keyValue: "duties_and_responsibilities",
          },
          {
            id: "2-3",
            label: "jd_gen_step4_checkbox_2_3",
            keyValue: "qualifications",
            children: [
              {
                id: "2-3-1",
                label: "jd_gen_step4_checkbox_2_3_1",
                keyValue: "education",
              },
              {
                id: "2-3-2",
                label: "jd_gen_step4_checkbox_2_3_2",
                keyValue: "work_experience",
              },
              {
                id: "2-3-3",
                label: "jd_gen_step4_checkbox_2_3_3",
                keyValue: "skills",
              },
              {
                id: "2-3-4",
                label: "jd_gen_step4_checkbox_2_3_4",
                keyValue: "behaviors",
              },
              {
                id: "2-3-5",
                label: "jd_gen_step4_checkbox_2_3_5",
                keyValue: "knowledge_tools",
              },
              {
                id: "2-3-6",
                label: "jd_gen_step4_checkbox_2_3_6",
                keyValue: "other_qualifications",
              },
            ],
          },
        ],
      },
    ];
  }, []);

  const handleOpenAdditional = (open: boolean) => {
    setOpenAdditional(open);
  };

  const onChangeSelectLanguage = (lang: string) => {
    form.setValue("selectedLanguage", lang);
  };

  const onChangeOpenSelectLang = () => {
    // if (disabledInput) return;
    setOpenSelectLang(!openSelectLang);
  };

  const handleStep = (step: Step) => {
    setStep(step);
  };

  // const getRegeneratePayload = (
  //   regenerateSection?: "job_title" | "job_description"
  // ) => {
  //   const formData = form.getValues();
  //   // const checkedValue = filterTreeBySelectedNotPreserveParent(
  //   //   treeData,
  //   //   new Set(formData.selections)
  //   // );
  //   // const checkedKeyValue = collectAllKeyValueFromTree(checkedValue);
  //   const checkedValue = ["2"];
  //   const checkedKeyValue = "job_title";
  //   // Check start with 2
  //   const startWith2 = checkedValue.filter((item: any) => {
  //     return item.id.startsWith("2");
  //   }).length;

  //   let count_output = {
  //     job_title: checkedKeyValue.includes("job_title") ? 3 : 0,
  //     job_description: startWith2 > 0 ? 2 : 0,
  //   };

  //   if (regenerateSection === "job_title") {
  //     count_output = {
  //       job_title: checkedKeyValue.includes("job_title") ? 3 : 0,
  //       job_description: 0,
  //     };
  //   }

  //   if (regenerateSection === "job_description") {
  //     count_output = {
  //       job_title: 0,
  //       job_description: startWith2 > 0 ? 2 : 0,
  //     };
  //   }

  //   const language = formData.selectedLanguage.toLowerCase().trim();
  //   const payload: any = {
  //     jd_gen_id: result.output[0]
  //       ? result.output?.[0]?.jd_generate_id
  //       : result.jd_generate_id,
  //     job_title: formData.jobTitle.title || undefined,
  //     job_title_keywords_include: formData.jobTitle.include || [],
  //     job_title_keywords_exclude: formData.jobTitle.exclude || [],
  //     pocket_owner_type: "account",
  //     project_name: formData.projectName?.trim() || "untitled",
  //     output_language:
  //       LanguagePayload[language as keyof typeof LanguagePayload],
  //     job_overview: formData.jobOverview || undefined,
  //     count_output,
  //     has_output_behavior: checkedKeyValue.includes("behaviors"),
  //     has_output_duties_and_responsibilities: checkedKeyValue.includes(
  //       "duties_and_responsibilities"
  //     ),
  //     has_output_education: checkedKeyValue.includes("education"),
  //     has_output_job_scope: checkedKeyValue.includes("job_overview"),
  //     has_output_knowledge: checkedKeyValue.includes("knowledge_tools"),
  //     has_output_other_qualifications: checkedKeyValue.includes(
  //       "other_qualifications"
  //     ),
  //     has_output_skills: checkedKeyValue.includes("skills"),
  //     has_output_work_experience: checkedKeyValue.includes("work_experience"),
  //   };

  //   return payload;
  // };

  const onRegenerate = () => {
    // const payload = getRegeneratePayload();
    // regenerateJdMutate(payload);
  };

  const onRegenerateWithSection = (
    section: "job_description" | "job_title"
  ) => {
    setRegeneratedSection(section);
    // const payload = getRegeneratePayload(section);
    // regenerateJdMutate(payload);
  };

  // const { createJd, saveJd } = useJdGen();

  // const { mutateAsync: saveJdMutate, isPending: isSaving } = useMutation({
  //   mutationFn: saveJd,
  //   onSuccess: (_, variables) => {
  //     setSavedJobTitleId((prev) => {
  //       if (variables.job_title_id) {
  //         prev.push(variables.job_title_id);
  //       }
  //       return prev;
  //     });

  //     setSavedJobDescriptionId((prev) => {
  //       if (variables.job_description_id) {
  //         prev.push(variables.job_description_id);
  //       }
  //       return prev;
  //     });

  //     form.setValue("selectedJobTitleId", "");
  //     form.setValue("selectedJobDescriptionId", "");

  //     handleStep("jd_generated");
  //     showAgain();
  //   },
  // });

  const [regeneratedSection, setRegeneratedSection] = useState<
    "job_title" | "job_description" | null
  >(null);
  // const { mutate: regenerateJdMutate, isPending: isRegenerating } = useMutation(
  //   {
  //     mutationFn: createJd,
  //     onSuccess: (data) => {
  //       console.log(data, "data");
  //       setResult((prev: any) => {
  //         return { ...prev, output: [{ ...data }] };
  //       });

  //       dispatch(getRemainCredit());

  //       if (regeneratedSection) {
  //         setRegeneratedSection(null);
  //       }
  //     },
  //   }
  // );

  const onSaveJd = async () => {
    if (result && projectId) {
      // const job_description_id =
      //   form.getValues("selectedJobDescriptionId") || undefined;
      // const job_title_id = form.getValues("selectedJobTitleId") || undefined;
      // const payload = {
      //   project_id: projectId,
      //   jd_generate_id: result.output[0]
      //     ? result.output?.[0].jd_generate_id
      //     : result.jd_generate_id,
      //   job_description_id,
      //   job_title_id,
      // };
      // await saveJdMutate(payload);
    }
  };

  // Trigger validation in first time
  useEffect(() => {
    trigger();
  }, [trigger]);

  useEffect(() => {
    const savedJobDescriptionId: string[] = [];
    const savedJobTitleId: string[] = [];
    const outputJobTitles = inResult?.output?.job_titles;
    const outputJobDescriptions = inResult?.output?.job_descriptions;

    if (Array.isArray(outputJobDescriptions)) {
      const filteredJobDescriptions = outputJobDescriptions.filter((item) => {
        return item.is_saved;
      });

      if (Array.isArray(filteredJobDescriptions)) {
        filteredJobDescriptions.forEach((item) => {
          savedJobDescriptionId.push(item.job_description_id as string);
        });
      }
    }

    if (Array.isArray(outputJobTitles)) {
      const filterJobTitles = outputJobTitles.filter((item) => {
        return item.is_saved;
      });

      if (Array.isArray(filterJobTitles)) {
        filterJobTitles.forEach((item) => {
          savedJobTitleId.push(item.job_title_id as string);
        });
      }
    }

    setSavedJobDescriptionId(savedJobDescriptionId);
    setSavedJobTitleId(savedJobTitleId);

    // only get saved id
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      <Meta title={"metadata_smart_jd_generator"} />

      <FormProvider {...form}>
        <form className="flex flex-col w-full px-4 py-4 gap-4">
          <DetailProjectNameContainer disabled={isShare} />

          <Divider className="!m-0 !bg-[var(--gray-5)]" />

          {/* STEP 1 Container */}
          <AddJobTitleContainer
            openAdditional={openAdditional}
            disabledInput={true}
            handleOpenAdditional={handleOpenAdditional}
          />

          <Divider className="!m-0 !bg-[var(--gray-5)]" />

          {/* STEP 2 Container */}
          <JobOverviewContainer disabledInput={true} />

          <Divider className="!m-0 !bg-[var(--gray-5)]" />

          {/* STEP 3 Container */}
          <SelectLanguageContainer
            disabled={true}
            onChangeOpenSelectLang={onChangeOpenSelectLang}
            onChangeSelectLanguage={onChangeSelectLanguage}
            openSelectLang={openSelectLang}
          />

          <Divider className="!m-0 !bg-[var(--gray-5)]" />

          {/* STEP 4 Container */}
          <div className="flex flex-col w-full gap-3">
            <h1 className="font-h10">{"jd_gen_step4_header"}</h1>
            <TreeCheckbox treeData={treeData} disabledInput={true} />
          </div>

          {/* Select Options */}
          {/* {false && ( */}
          <SelectJdGenForm
            result={result?.output?.[0]}
            step={step}
            isLoading={false}
            isSaved={false}
            credit={0}
            isRegenerating={false}
            onRegenerateWithSection={onRegenerateWithSection}
            regeneratedSection={regeneratedSection}
            savedJobDescriptionId={savedJobDescriptionId}
            savedJobTitleId={savedJobTitleId}
            projectId={projectId ?? ""}
            isShare={isShare}
          />
          {/* )} */}

          {/* Footer Container */}
          {!isShare && (
            <FooterContainer
              disabledNextButton={disabledNextButton}
              handleStep={handleStep}
              isGenerated={!!result}
              step={step}
              onChangeOpenPreview={() => {}}
              onSaveJd={onSaveJd}
              isSaving={false}
              isRegenerating={false}
              onRegenerate={onRegenerate}
            />
          )}

          {isShare && (
            <div>
              <Divider className="m-0 bg-[var(--gray-5)]" />
              <Row wrap={false} align={"middle"} className="py-[8px] gap-[8px]">
                <button
                  type="button"
                  className="flex items-center gap-[10px] px-[15px] py-[6.5px]"
                  onClick={handleClickNew}
                >
                  <AddCircleIcon width={14} height={14} fill="var(--blue-6)" />
                  <span className="font-button2 text-[var(--blue-6)]">
                    {"new"}
                  </span>
                </button>
                <Button
                  variants="primary"
                  size="large"
                  className="w-full"
                  onClick={handleClickEdit}
                >
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 17 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.83333 13.0671H4.78333L11.3 6.55039L10.35 5.60039L3.83333 12.1171V13.0671ZM3.16667 14.4004C2.97778 14.4004 2.81944 14.3365 2.69167 14.2087C2.56389 14.0809 2.5 13.9226 2.5 13.7337V12.1171C2.5 11.9393 2.53333 11.7698 2.6 11.6087C2.66667 11.4476 2.76111 11.3059 2.88333 11.1837L11.3 2.78372C11.4333 2.6615 11.5806 2.56706 11.7417 2.50039C11.9028 2.43372 12.0722 2.40039 12.25 2.40039C12.4278 2.40039 12.6 2.43372 12.7667 2.50039C12.9333 2.56706 13.0778 2.66706 13.2 2.80039L14.1167 3.73372C14.25 3.85595 14.3472 4.00039 14.4083 4.16706C14.4694 4.33372 14.5 4.50039 14.5 4.66706C14.5 4.84484 14.4694 5.01428 14.4083 5.17539C14.3472 5.3365 14.25 5.48372 14.1167 5.61706L5.71667 14.0171C5.59444 14.1393 5.45278 14.2337 5.29167 14.3004C5.13056 14.3671 4.96111 14.4004 4.78333 14.4004H3.16667ZM10.8167 6.08372L10.35 5.60039L11.3 6.55039L10.8167 6.08372Z"
                      fill="white"
                    />
                  </svg>

                  <span className="whitespace-nowrap">{"edit"}</span>
                </Button>
              </Row>
            </div>
          )}
        </form>
      </FormProvider>

      {/* <DrawerPreviewJdSmartGen
        open={openPreview}
        onClose={onChangeOpenPreview}
        selections={selections}
        treeData={treeData}
        selectedLanguage={selectedLanguage}
        jobOverview={jobOverview}
        jobTitle={jobTitle}
        onGenerate={onGenerate}
        loading={false}
      /> */}
    </section>
  );
};

export default ResultJdGenerator;
