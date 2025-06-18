import {
  AddCircleIcon,
  CloseIcon,
} from "@/assets/job-solution/icons/suggested-groups/outline";
import DetailInput from "@/components/job-solution/detail/DetailInput";
import DetailProjectName from "@/components/job-solution/detail/DetailProjectName";
import Button from "@/components/job-solution/custom-antd/Button";
// import useTranslation from "@/hooks/useTranslation";
import { Divider, Row, Spin } from "antd";
import clsx from "clsx";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
// import useProject from "@/hooks/useProject";
// import { useParams } from "next/navigation";
// import {
//   InfiniteData,
//   useInfiniteQuery,
//   useMutation,
//   useQueryClient,
// } from "@tanstack/react-query";
import { LoadingOutlined } from "@ant-design/icons";
import PageContainer from "@/layouts/job-solution/PageContainer";
import { CandidateCheckerItem } from "@/types/job-solution/project";
import { RepeatIcon } from "@/assets/job-solution/icons/directional-groups";
import { useRouter } from "next/router";
import ResultList from "./ResultList";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import {
  CandidateCheckerFormType,
  FileResumeType,
} from "@/types/job-solution/candidate-checker";
import DrawerAddJobDetail from "../../drawer/DrawerAddJobDetail";
import Assignment from "@/assets/job-solution/icons/suggested-groups/outline/assignment";
import DrawerDutiesResponsibilities from "../../drawer/DrawerDutiesResponsibilities";
import DrawerQualifications from "../../drawer/DrawerQualifications";
import DrawerCriteria from "../../drawer/DrawerCriteria";
import DrawerAddResume from "../../drawer/DrawerAddResume";
import UploadMultipleResume from "@/components/job-solution/candidate-checker/UploadMultipleResume";
import { v4 } from "uuid";
import DrawerConfirmInput from "../../drawer/DrawerConfirmInput";
// import useCandidateChecker from "@/hooks/useCandidateChecker";
import Meta from "@/components/job-solution/meta";
// import { useAppSelector } from "@/store/redux-hook";

interface Props {
  isShare?: boolean;
  projectName?: string;
  publicId?: string;
  handleClickEdit?: () => void;
  handleClickNew?: () => void;
}

interface FormValues extends CandidateCheckerFormType {
  projectName: string;
}

const ResultCandidateChecker: FC<Props> = ({
  isShare,
  projectName,
  // publicId,
  handleClickEdit,
  handleClickNew,
}): JSX.Element => {
  // const { t } = useTranslation("candidateChecker");
  // const { t: commonT } = useTranslation("common");
  // const params = useParams();
  // const { getProjectById, GET_PROJECT_LIMIT, getProjectShareByPublicId } =
  //   useProject();
  const containerRef = useRef<HTMLDivElement>(null);
  const lastItemRef = useRef<HTMLDivElement>(null);
  const initData = useRef(false);
  const router = useRouter();
  const [openResults, setOpenResults] = useState<{ [id: string]: boolean }>({});
  const [isGenerated, setIsGenerated] = useState(true);
  // const { adjustCriteriaJdCd, adjustCriteriaJdCdCd } = useCandidateChecker();
  // const queryClient = useQueryClient();
  // const { candidate_checker_name } = useAppSelector((state) => state.project);

  // const { mutate: mutateAdjustCriteriaJdCd, isPending: isPendingJdCd } =
  //   useMutation({
  //     mutationFn: adjustCriteriaJdCd,
  //     onSuccess: async () => {
  //       await queryClient.invalidateQueries({
  //         queryKey: ["project-candidate-checker", params.project_id],
  //       });
  //       const queryData = queryClient.getQueryData([
  //         "project-candidate-checker",
  //         params.project_id,
  //       ]) as InfiniteData<{
  //         items: CandidateCheckerItem[];
  //         page: number;
  //         last_page: number;
  //       }>;

  //       const items =
  //         queryData?.pages.flatMap((page) => page.items.map((item) => item)) ??
  //         [];
  //       const firstId = items[0].id;

  //       setOpenResults({ [firstId]: true });
  //       setIsGenerated(true);
  //       handleDrawerConfirmInput(false);
  //     },
  //   });

  // const { mutate: mutateAdjustCriteriaJdCdCd, isPending: isPendingJdCdCd } =
  //   useMutation({
  //     mutationFn: adjustCriteriaJdCdCd,
  //     onSuccess: async () => {
  //       await queryClient.invalidateQueries({
  //         queryKey: ["project-candidate-checker", params.project_id],
  //       });
  //       const queryData = queryClient.getQueryData([
  //         "project-candidate-checker",
  //         params.project_id,
  //       ]) as InfiniteData<{
  //         items: CandidateCheckerItem[];
  //         page: number;
  //         last_page: number;
  //       }>;

  //       const items =
  //         queryData?.pages.flatMap((page) => page.items.map((item) => item)) ??
  //         [];
  //       const firstId = items[0].id;
  //       setOpenResults({ [firstId]: true });
  //       setIsGenerated(true);
  //       handleDrawerConfirmInput(false);
  //     },
  //   });

  const [drawers, setDrawers] = useState<{
    drawerAddJobDetail: boolean;
    drawerQualifications: boolean;
    drawerDutiesAndResponsibilities: boolean;
    drawerCriteria: boolean;
    drawerAddResume: boolean;
    drawerConfirmInput: boolean;
  }>({
    drawerAddJobDetail: false,
    drawerCriteria: false,
    drawerDutiesAndResponsibilities: false,
    drawerQualifications: false,
    drawerAddResume: false,
    drawerConfirmInput: false,
  });

  const toggleOpenResults = (id: string) => {
    setOpenResults((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDrawerAddJobDetail = (open: boolean) => {
    setDrawers((prev) => {
      return {
        ...prev,
        drawerAddJobDetail: open,
      };
    });
  };

  const handleDrawerDutiesAndResponsibilities = (open: boolean) => {
    setDrawers((prev) => {
      return {
        ...prev,
        drawerDutiesAndResponsibilities: open,
      };
    });
  };

  const handleDrawerQualifications = (open: boolean) => {
    setDrawers((prev) => {
      return {
        ...prev,
        drawerQualifications: open,
      };
    });
  };

  const handleDrawerCriteria = (open: boolean) => {
    setDrawers((prev) => {
      return {
        ...prev,
        drawerCriteria: open,
      };
    });
  };

  const handleDrawerAddResume = (open: boolean) => {
    setDrawers((prev) => {
      return {
        ...prev,
        drawerAddResume: open,
      };
    });
  };

  function handleDrawerConfirmInput(open: boolean) {
    setDrawers((prev) => {
      return {
        ...prev,
        drawerConfirmInput: open,
      };
    });
  }

  const onSubmit = () => {
    // const form = resultForm.getValues();
    // const payload = {
    //   behavior_competencies: form.behavior_competencies ?? "",
    //   duties_and_responsibilities: form.duties_and_responsibilities ?? "",
    //   education: form.education ?? "",
    //   disqualifications:
    //     form.excluded_criteria
    //       .map((item) => {
    //         return item.value ?? "";
    //       })
    //       .filter((val) => val?.trim() !== "") ?? [],
    //   preferred_qualifications:
    //     form.highlighted_criteria
    //       .map((item) => {
    //         return item.value ?? "";
    //       })
    //       .filter((val) => val?.trim() !== "") ?? [],
    //   job_scope: form.job_scope ?? "",
    //   language: form.language ?? "",
    //   other_characteristics: form.other_characteristics ?? "",
    //   skills: form.skills ?? "",
    //   tool: form.tool ?? "",
    //   work_experience: form.work_experience ?? "",
    //   pocket_owner_type: "account",
    //   project_name: "",
    //   project_id: params?.project_id as string,
    //   resume_id: form.files
    //     .map((item) => {
    //       return item.resume?.file_id ?? "";
    //     })
    //     .filter((item) => item.trim() !== ""),
    // };
    // if (form.files.length > 1) {
    //   mutateAdjustCriteriaJdCdCd(payload);
    // } else {
    //   mutateAdjustCriteriaJdCd({ ...payload, resume_id: payload.resume_id[0] });
    // }
  };

  const onClickAddJobDetail = () => {
    setDrawers({
      drawerAddJobDetail: true,
      drawerQualifications: false,
      drawerDutiesAndResponsibilities: false,
      drawerCriteria: false,
      drawerAddResume: false,
      drawerConfirmInput: false,
    });
  };

  // const { data, hasNextPage, isFetchingNextPage, fetchNextPage, isLoading } =
  //   useInfiniteQuery({
  //     queryKey: isShare
  //       ? ["project-share-candidate-checker", publicId]
  //       : ["project-candidate-checker", params.project_id],

  //     queryFn: ({ pageParam }): Promise<any> =>
  //       isShare
  //         ? getProjectShareByPublicId(publicId as string, {
  //             page: pageParam,
  //             limit: GET_PROJECT_LIMIT,
  //           })
  //         : getProjectById(params.project_id as string, {
  //             page: pageParam,
  //             limit: GET_PROJECT_LIMIT,
  //           }),
  //     getNextPageParam: (res) => {
  //       if (res.page < res.last_page) {
  //         return res.page + 1;
  //       }
  //       return undefined;
  //     },
  //     initialPageParam: 1,
  //     gcTime: 0,
  //     enabled: isShare ? !!publicId : !!params?.project_id,
  //     refetchOnWindowFocus: false,
  //   });

  const resultForm = useForm<FormValues>({
    mode: "onChange",
  });

  const resultData = resultForm.watch();
  const tempForm = useForm<FormValues>({
    mode: "onChange",
  });
  const { reset: resetTempForm } = tempForm;
  const { reset: resetResultForm } = resultForm;

  const { fields, append, update, remove } = useFieldArray({
    control: resultForm.control,
    name: "files",
  });

  const onClickAdjustCriteria = () => {
    setIsGenerated(false);
    setOpenResults({});
    containerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const onSelectFileWithMultiple = (index: number, data: FileResumeType) => {
    update(index, data);
  };

  const onRemoveResume = (index: number) => {
    // Check last file not delete field
    if (fields.length === 1) {
      // Set to null value,
      // for prevent input field is remove
      const currentValue = fields[index];
      update(index, { inputId: currentValue.inputId, resume: null });
    } else {
      remove(index);
    }
  };

  const onSaveJobDetail = () => {
    const values = tempForm.getValues();
    resultForm.setValue("job_scope", values.job_scope);
    resultForm.setValue(
      "duties_and_responsibilities",
      values.duties_and_responsibilities
    );
    resultForm.setValue("behavior_competencies", values.behavior_competencies);
    resultForm.setValue("education", values.education);
    resultForm.setValue("skills", values.skills);
    resultForm.setValue("tool", values.tool);
    resultForm.setValue("work_experience", values.work_experience);
    resultForm.setValue("language", values.language);
    resultForm.setValue("excluded_criteria", values.excluded_criteria);
    resultForm.setValue("highlighted_criteria", values.highlighted_criteria);
    resultForm.setValue("other_characteristics", values.other_characteristics);
    handleDrawerAddJobDetail(false);
  };

  const onClickNew = () => {
    router.push("/candidate-checker");
  };

  const hasJobScope = resultForm.watch("job_scope");

  let data: any;
  const allItems = useMemo(() => {
    return (
      data?.pages.flatMap((page: any) =>
        // page.items as CandidateCheckerItem[]) ?? []
        page.items.map((item: any) => item as unknown as CandidateCheckerItem)
      ) ?? []
    );
  }, [data]);

  const firstDataPage = useMemo(() => {
    return data?.pages[0];
  }, [data?.pages]);

  const firstInput = useMemo(() => {
    return firstDataPage?.items[0] as CandidateCheckerItem;
  }, [firstDataPage]);

  const disabledAddResume = useMemo(() => {
    if (fields.length >= 3) {
      return true;
    }

    const someValueIsNull = fields.some((item) => {
      return item.resume === null;
    });

    if (someValueIsNull) {
      return true;
    }

    if (isGenerated) {
      return true;
    }

    return false;
  }, [fields, isGenerated]);

  const onClearForm = () => {
    const firstResumeId = v4();
    const payload = {
      behavior_competencies: "",
      duties_and_responsibilities: "",
      education: "",
      excluded_criteria: [],
      highlighted_criteria: [],
      job_scope: "",
      language: "",
      other_characteristics: "",
      skills: "",
      tool: "",
      work_experience: "",
      files: [{ inputId: firstResumeId, resume: null }],
    };
    tempForm.reset(payload);
    resultForm.reset(payload);
  };

  const getFiles = useCallback(() => {
    if (
      Array.isArray(firstInput.input.resume_file_name) &&
      Array.isArray(firstInput.input.resume_id)
    ) {
      return firstInput.input.resume_id.map((item, index) => {
        return {
          inputId: item,
          resume: {
            file_id: item,
            original_name: firstInput.input.resume_file_name[index],
          },
        };
      });
    }

    if (
      typeof firstInput.input.resume_file_name === "string" &&
      typeof firstInput.input.resume_id === "string"
    ) {
      return [
        {
          inputId: firstInput.input.resume_id,
          resume: {
            file_id: firstInput.input.resume_id,
            original_name: firstInput.input.resume_file_name,
          },
        },
      ];
    }

    return [];
  }, [firstInput]);

  const getFilesInShare = useCallback(() => {
    if (Array.isArray(firstInput.input.resume_file_name)) {
      const fakeResumeId = firstInput.input.resume_file_name.map(() => {
        return v4();
      });
      return fakeResumeId.map((item, index) => {
        return {
          inputId: item,
          resume: {
            file_id: item,
            original_name: firstInput.input.resume_file_name[index],
          },
        };
      });
    }
  }, [firstInput]);

  // Handle init form data
  useEffect(() => {
    if (firstInput && !initData.current) {
      initData.current = true;
      const { input } = firstInput;
      const isDisqualificationsEmpty = input.disqualifications.length === 0;
      const isPreferredQualificationsEmpty =
        input.preferred_qualifications.length === 0;

      resetTempForm({
        job_scope: input.job_scope,
        behavior_competencies: input.behavior_competencies,
        duties_and_responsibilities: input.duties_and_responsibilities,
        education: input.education,
        excluded_criteria: isDisqualificationsEmpty
          ? [{ value: "" }]
          : input.disqualifications.map((item) => {
              return { value: item };
            }),
        highlighted_criteria: isPreferredQualificationsEmpty
          ? [{ value: "" }]
          : input.preferred_qualifications.map((item) => {
              return { value: item };
            }),
        files: isShare ? getFilesInShare() : getFiles(),
        language: input.language,
        other_characteristics: input.other_characteristics,
        skills: input.skills,
        tool: input.tool,
        work_experience: input.work_experience,
        projectName,
      });

      resetResultForm({
        job_scope: input.job_scope,
        behavior_competencies: input.behavior_competencies,
        duties_and_responsibilities: input.duties_and_responsibilities,
        education: input.education,
        excluded_criteria: input.disqualifications.map((item) => {
          return { value: item };
        }),
        highlighted_criteria: input.preferred_qualifications.map((item) => {
          return { value: item };
        }),
        files: isShare ? getFilesInShare() : getFiles(),
        language: input.language,
        other_characteristics: input.other_characteristics,
        skills: input.skills,
        tool: input.tool,
        work_experience: input.work_experience,
        projectName,
      });
    }

    // Only first time
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstInput]);

  // Handle scroll to load more data
  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       if (entries[0].isIntersecting && hasNextPage) {
  //         fetchNextPage();
  //       }
  //     },
  //     { threshold: 1.0 }
  //   );

  //   const currentRef = lastItemRef.current;
  //   if (currentRef) observer.observe(currentRef);

  //   return () => {
  //     if (currentRef) observer.unobserve(currentRef);
  //   };
  // }, [fetchNextPage, hasNextPage]);

  // if (isLoading) {
  //   return (
  //     <PageContainer navigatorType="none" headerType="menu-logo-credit">
  //       <div></div>
  //     </PageContainer>
  //   );
  // }

  return (
    <PageContainer
      navigatorType="none"
      headerType="back-title-credit"
      pageTitle={"title_text"}
      ref={containerRef}
      back="/projects"
    >
      <Meta title={"metadata_candidate_checker"} />

      <FormProvider {...tempForm}>
        <div className="flex-auto p-4">
          {/* Project Name */}
          <DetailProjectName
            variants="candidate-checker"
            projectName={projectName}
            onChangeProjectName={() => {}}
            viewOnly={isShare}
            isProject
          />
          <Divider className="!m-0 !bg-[var(--gray-5)]" />

          {/* Job Scope */}
          <DetailInput
            title={
              <span>
                {"header_text__1" + " "}
                <span className="text-[var(--error)]">*</span>
              </span>
            }
            description={"description"}
            input={
              !hasJobScope ? (
                <ButtonResume onClick={onClickAddJobDetail}>
                  <AddCircleIcon />
                  <span className="font-body5 text-[var(--text-disable)]">
                    {"field_label__1"}
                  </span>
                </ButtonResume>
              ) : (
                <ButtonResume
                  onClick={onClickAddJobDetail}
                  disabled={isGenerated}
                  className="px-[16px] text-start flex-nowrap py-[14px] flex gap-[16px] border-[1px] rounded-[8px] border-[var(--gray-7)]"
                >
                  <span className="min-w-[24px]">
                    <Assignment
                      fill={isGenerated ? "currentColor" : undefined}
                    />
                  </span>
                  <span
                    className={clsx(
                      "flex-auto font-body5 text-[var(--text-title)] overflow-hidden whitespace-nowrap text-ellipsis",

                      isGenerated && "!text-[var(--text-disable)]"
                    )}
                  >
                    {resultForm.watch("job_scope")}
                  </span>
                  <button
                    title="clear-file"
                    onClick={(e) => {
                      e.stopPropagation();
                      onClearForm();
                    }}
                  >
                    <CloseIcon
                      fill={isGenerated ? "currentColor" : undefined}
                    />
                  </button>
                </ButtonResume>
              )
            }
          />
          <Divider className="!m-0 !bg-[var(--gray-5)]" />

          {/* Resume */}
          <DetailInput
            title={
              <span>
                {"header_text__16"}{" "}
                <span className="text-[var(--error)]">*</span>
              </span>
            }
            description={"description__1"}
            input={
              <div className="flex flex-col gap-4">
                {fields?.map((item, index) => {
                  return (
                    <UploadMultipleResume
                      item={item}
                      jd_cd_status={isGenerated}
                      key={item.id}
                      itemIndex={index}
                      onSelectFileWithMultiple={onSelectFileWithMultiple}
                      onRemoveResume={onRemoveResume}
                    />
                  );
                })}
              </div>
            }
          />
          <Button
            variants="text"
            className={clsx("!w-fit", !isGenerated && "!text-[var(--blue-6)]")}
            disabled={disabledAddResume}
            onClick={() => {
              if (disabledAddResume) return;
              const uuid = v4();
              append({ inputId: uuid, resume: null });
            }}
          >
            <span
              className={clsx(
                "flex items-center gap-2",
                disabledAddResume && "!text-[var(--black-25)]"
              )}
            >
              <AddCircleIcon width={14} height={14} fill="currentColor" />
              {"button__10"}
            </span>
          </Button>
        </div>

        <div className="flex flex-col px-[16px] gap-[24px]">
          <div>
            <ResultList
              allItems={allItems}
              projectName={projectName ?? ""}
              openResults={openResults}
              toggleOpenResults={toggleOpenResults}
            />
            <div ref={lastItemRef} style={{ height: "20px" }} />
          </div>

          {/* {isFetchingNextPage && ( */}
          <div className="w-full flex items-center justify-center">
            <Spin
              indicator={
                <LoadingOutlined
                  style={{ fontSize: 24, color: "var(--blue-6)" }}
                  spin
                />
              }
            />
          </div>
          {/* )} */}

          <Divider className="!m-0 !bg-[var(--gray-5)]" />

          {!isShare &&
            (isGenerated ? (
              <Row
                wrap={false}
                align={"middle"}
                className="gap-[8px] pt-[24px] pb-[24px] sticky bottom-0 bg-white"
              >
                <button
                  className="flex items-center gap-[10px] px-[15px] py-[6.5px]"
                  onClick={onClickNew}
                >
                  <AddCircleIcon width={14} height={14} fill="var(--blue-6)" />
                  <span className="font-button2 text-[var(--blue-6)]">
                    {"button__16"}
                  </span>
                </button>
                <Button
                  variants="primary"
                  className="w-full"
                  size="large"
                  onClick={onClickAdjustCriteria}
                >
                  <div className="flex items-center justify-center gap-[6px]">
                    <RepeatIcon />
                    {"button__17"}
                  </div>
                </Button>
              </Row>
            ) : (
              <Row
                wrap={false}
                align={"middle"}
                className="gap-[8px] pt-[24px] pb-[24px] sticky bottom-0 bg-white"
              >
                <Button
                  onClick={() => {
                    handleDrawerConfirmInput(true);
                  }}
                  disabled={false}
                  className="w-full"
                  size="large"
                  variants="primary"
                >
                  {"button__11"}
                </Button>
              </Row>
            ))}

          {isShare && (
            <Row
              wrap={false}
              align={"middle"}
              className="gap-[8px] pt-[24px] pb-[24px] sticky bottom-0 bg-white"
            >
              <button
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
          )}
        </div>

        <DrawerAddJobDetail
          drawers={drawers}
          handleDrawerAddJobDetail={handleDrawerAddJobDetail}
          handleDrawerDutiesAndResponsibilities={
            handleDrawerDutiesAndResponsibilities
          }
          handleDrawerQualifications={handleDrawerQualifications}
          handleDrawerCriteria={handleDrawerCriteria}
          isOpen={drawers.drawerAddJobDetail}
          onSaveJobDetail={onSaveJobDetail}
        />

        <DrawerDutiesResponsibilities
          isOpen={drawers.drawerDutiesAndResponsibilities}
          handleDrawerDutiesAndResponsibilities={
            handleDrawerDutiesAndResponsibilities
          }
        />
        <DrawerQualifications
          isOpen={drawers.drawerQualifications}
          handleDrawerQualifications={handleDrawerQualifications}
        />

        <DrawerCriteria
          isOpen={drawers.drawerCriteria}
          handleDrawerCriteria={handleDrawerCriteria}
        />

        <DrawerAddResume
          isOpen={drawers.drawerAddResume}
          handleDrawerAddResume={handleDrawerAddResume}
        />

        <DrawerConfirmInput
          isOpen={drawers.drawerConfirmInput}
          result={resultData}
          onSubmit={onSubmit}
          handleDrawerConfirmInput={handleDrawerConfirmInput}
          isLoading={false}
        />
      </FormProvider>
    </PageContainer>
  );
};
const ButtonResume = styled.button`
  padding: 13.5px 16px;
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 16px;

  border: 1px solid var(--gray-7);
  border-radius: var(--border-radius-s);

  &:active {
    border-color: var(--blue-6);
  }

  &:disabled {
    border-color: var(--gray-6);
    color: var(--text-disable);
  }

  @media screen and (hover: hover) {
    &:hover:not(:disabled) {
      cursor: pointer;
      border-color: var(--blue-6);
    }
  }
`;

export default ResultCandidateChecker;
