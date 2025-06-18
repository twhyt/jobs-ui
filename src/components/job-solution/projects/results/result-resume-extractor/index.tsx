import { AddCircleIcon } from "@/assets/job-solution/icons/suggested-groups/outline";
import DetailInput from "@/components/job-solution/detail/DetailInput";
import DetailProjectName from "@/components/job-solution/detail/DetailProjectName";
import Meta from "@/components/job-solution/meta";
import FullResult from "@/components/job-solution/ResumeExtraction/LongResult";
import ShortResult from "@/components/job-solution/ResumeExtraction/ShortResult";
import Button from "@/components/job-solution/custom-antd/Button";
// import useTranslation from "@/hooks/useTranslation";
// import { useAppDispatch } from "@/store/redux-hook";
// import {
//   changeCandidateCheckerName,
//   setCandidateCheckerResume,
// } from "@/store/slices/projectSlice";
// import { ResponseFileListItem } from "@/types/job-solution/candidate-checker";
// import axiosInstance from "@/utils/axiosInstance";
// import { ResponseResumeExtraction } from "@/types/resume-extraction/resume-extraction";
import { Divider, Row } from "antd";
import { useRouter } from "next/router";
import { FC, Fragment, useCallback, useState } from "react";
import styled from "styled-components";

interface Props {
  isShare?: boolean;
  result?: any;
  projectName?: string;
  // projectId?: string;
  handleClickEdit?: () => void;
  handleClickNew?: () => void;
}

const ResultResumeExtractor: FC<Props> = ({
  result,
  isShare = false,
  projectName,
  // projectId,
  handleClickEdit,
  handleClickNew,
}): JSX.Element => {
  // const { t: resumeExtractionT } = useTranslation("resumeExtraction");
  // const { t: commonT } = useTranslation("common");
  // const dispatch = useAppDispatch();
  const router = useRouter();
  const [showFull] = useState(true);
  // const [loading, setLoading] = useState(false);
  // const [fullSumData, setFullSumData] = useState<any>();
  const [, setIsRefresh] = useState(true);
  // const [file, setFile] = useState<ResponseFileListItem | undefined>(undefined);

  // const fetchResumeExtactFull = useCallback(async () => {
  //   setLoading(true);
  //   try {
  //     const { data } = await axiosInstance.post<ResponseResumeExtraction>(
  //       "/v1/resumes/extraction/full-summary",
  //       {
  //         project_id: projectId,
  //         candidate_id: result?.candidate_id,
  //         extraction_id: result?.extraction_id,
  //       }
  //     );
  //     if (data) {
  //       setFullSumData(data);
  //       dispatch(getRemainCredit());
  //     }
  //     setShowFull(true);
  //   } catch (err) {
  //     console.error("❌", err);
  //   } finally {
  //     setTimeout(() => {
  //       setLoading(false);
  //     }, 2000);
  //   }
  // }, [dispatch, fullSumData]);

  // useEffect(() => {
  //   if (result?.has_full_summary) {
  //     fetchResumeExtactFull();
  //   }
  // }, [result]);

  const onNewProject = useCallback(
    () => {
      // setFile(undefined);
      // setShowFull(false);
      // setDataExtraction(undefined);
      // dispatch(newProject());
      router.push("/resume-extraction");
    },
    [
      // dispatch
    ]
  );

  // interface ResponseFileList {
  //   count: number;
  //   items: ResponseFileListItem[];
  //   last_page: number;
  //   limit: number;
  //   page: number;
  // }
  // useEffect(() => {
  //   const fetchResumeFile = async () => {
  //     try {
  //       const { data } = await axiosInstance.get<ResponseFileList>(
  //         "/v1/resume"
  //       );
  //       const resFilter = data.items.find(
  //         (data: any) => data.original_name === result.resume_file_name
  //       );
  //       setFile(resFilter);
  //     } catch (error) {
  //       console.error("Failed to fetch resume file", error);
  //     }
  //   };

  //   fetchResumeFile();
  // }, []);

  function sendToCandidateChecker() {
    setIsRefresh(false);
    if (projectName) {
      // dispatch(changeCandidateCheckerName(projectName));
    }
    // dispatch(setCandidateCheckerResume([file]));
    router.push("/candidate-checker");
  }

  // Clear state when router url change
  // useEffect(() => {
  //   // const handleRouteChangeStart = () => {
  //   //   if (isRefresh) {
  //   //     onNewProject();
  //   //   }
  //   // };

  //   router.events.on("routeChangeStart", handleRouteChangeStart);

  //   return () => {
  //     router.events.off("routeChangeStart", handleRouteChangeStart);
  //   };
  // }, [router.events, onNewProject, isRefresh]);
  // console.log("fullSumData", fullSumData);

  return (
    <>
      <PageWrapper className="p-[16px] !pb-[0px]">
        <Meta title={"metadata_resume_extractor"} />

        <DetailProjectName
          variants="resume-extractor"
          onChangeProjectName={() => {}}
          projectName={projectName}
          viewOnly={isShare}
          isProject
        />
        <Divider className="!m-0 !bg-[var(--gray-5)]" />
        <DetailInput
          title={"header_text__10"}
          description={"description__4"}
          input={
            <ButtonResume
              className="px-[16px] flex-nowrap py-[14px] flex gap-[16px] border-[1px] rounded-[8px] border-[var(--gray-7)] text-start"
              disabled
            >
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 18.5H15C15.2833 18.5 15.5208 18.4042 15.7125 18.2125C15.9042 18.0208 16 17.7833 16 17.5C16 17.2167 15.9042 16.9792 15.7125 16.7875C15.5208 16.5958 15.2833 16.5 15 16.5H9C8.71667 16.5 8.47917 16.5958 8.2875 16.7875C8.09583 16.9792 8 17.2167 8 17.5C8 17.7833 8.09583 18.0208 8.2875 18.2125C8.47917 18.4042 8.71667 18.5 9 18.5ZM9 14.5H15C15.2833 14.5 15.5208 14.4042 15.7125 14.2125C15.9042 14.0208 16 13.7833 16 13.5C16 13.2167 15.9042 12.9792 15.7125 12.7875C15.5208 12.5958 15.2833 12.5 15 12.5H9C8.71667 12.5 8.47917 12.5958 8.2875 12.7875C8.09583 12.9792 8 13.2167 8 13.5C8 13.7833 8.09583 14.0208 8.2875 14.2125C8.47917 14.4042 8.71667 14.5 9 14.5ZM6 22.5C5.45 22.5 4.97917 22.3042 4.5875 21.9125C4.19583 21.5208 4 21.05 4 20.5V4.5C4 3.95 4.19583 3.47917 4.5875 3.0875C4.97917 2.69583 5.45 2.5 6 2.5H13.175C13.4417 2.5 13.6958 2.55 13.9375 2.65C14.1792 2.75 14.3917 2.89167 14.575 3.075L19.425 7.925C19.6083 8.10833 19.75 8.32083 19.85 8.5625C19.95 8.80417 20 9.05833 20 9.325V20.5C20 21.05 19.8042 21.5208 19.4125 21.9125C19.0208 22.3042 18.55 22.5 18 22.5H6ZM13 8.5V4.5H6V20.5H18V9.5H14C13.7167 9.5 13.4792 9.40417 13.2875 9.2125C13.0958 9.02083 13 8.78333 13 8.5Z"
                  fill="black"
                  fillOpacity="0.25"
                />
              </svg>

              <span className="flex-auto font-body5 text-[var(--text-disable)] overflow-hidden whitespace-nowrap text-ellipsis">
                {result?.resume_file_name}
              </span>
              <button title="clear-file">
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.0998 18.8008L11.9998 13.9008L16.8998 18.8008C17.0831 18.9841 17.3165 19.0758 17.5998 19.0758C17.8831 19.0758 18.1165 18.9841 18.2998 18.8008C18.4831 18.6174 18.5748 18.3841 18.5748 18.1008C18.5748 17.8174 18.4831 17.5841 18.2998 17.4008L13.3998 12.5008L18.2998 7.60078C18.4831 7.41745 18.5748 7.18411 18.5748 6.90078C18.5748 6.61745 18.4831 6.38411 18.2998 6.20078C18.1165 6.01745 17.8831 5.92578 17.5998 5.92578C17.3165 5.92578 17.0831 6.01745 16.8998 6.20078L11.9998 11.1008L7.0998 6.20078C6.91647 6.01745 6.68314 5.92578 6.3998 5.92578C6.11647 5.92578 5.88314 6.01745 5.6998 6.20078C5.51647 6.38411 5.4248 6.61745 5.4248 6.90078C5.4248 7.18411 5.51647 7.41745 5.6998 7.60078L10.5998 12.5008L5.6998 17.4008C5.51647 17.5841 5.4248 17.8174 5.4248 18.1008C5.4248 18.3841 5.51647 18.6174 5.6998 18.8008C5.88314 18.9841 6.11647 19.0758 6.3998 19.0758C6.68314 19.0758 6.91647 18.9841 7.0998 18.8008Z"
                    fill="black"
                    fillOpacity="0.25"
                  />
                </svg>
              </button>
            </ButtonResume>
          }
        />
        {result && (
          <div className="pt-[16px] px-[0px] w-full flex flex-col gap-[16px]">
            <ShortResult data_extrac={result} update_at={result.created_at} />
            {!isShare && (
              <FullResult
                data_extrac={result}
                show={isShare ? true : showFull}
                update_at={result?.created_at}
              />
            )}

            {isShare && result.has_full_summary && (
              <FullResult
                data_extrac={result}
                show={isShare ? true : showFull}
                update_at={result?.created_at}
              />
            )}
          </div>
        )}
      </PageWrapper>
      <div className="p-[16px]">
        {/* {!showFull && !isShare && (
          <div className="flex flex-col gap-[8px]">
            {result !== undefined ? (
              <Button
                variants="primary"
                size="large"
                className="w-full"
                onClick={() => {
                  fetchResumeExtactFull();
                }}
                loading={loading}
              >
                {resumeExtractionT("button__21")}
              </Button>
            ) : (
              <Button variants="primary" size="large" className="w-full">
                {resumeExtractionT("button__7")}
              </Button>
            )}
            {!result?.has_full_summary && (
              <CreditRemain feature={EFeatureName.RESUME_EXTRACTION_FULL} />
            )}
          </div>
        )} */}

        {/* --- Result --- *Retry* */}
        {/* {result && !isShare && (
          <Row wrap={false} align={"middle"} className="py-[8px] gap-[8px]">
            <Button variants="secondary" size="large" className="w-full">
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.00033 13.7331C6.51144 13.7331 5.25033 13.2164 4.21699 12.1831C3.18366 11.1497 2.66699 9.88863 2.66699 8.39974C2.66699 6.91085 3.18366 5.64974 4.21699 4.61641C5.25033 3.58307 6.51144 3.06641 8.00033 3.06641C8.76699 3.06641 9.50033 3.22474 10.2003 3.54141C10.9003 3.85807 11.5003 4.31085 12.0003 4.89974V3.73307C12.0003 3.54418 12.0642 3.38585 12.192 3.25807C12.3198 3.1303 12.4781 3.06641 12.667 3.06641C12.8559 3.06641 13.0142 3.1303 13.142 3.25807C13.2698 3.38585 13.3337 3.54418 13.3337 3.73307V7.06641C13.3337 7.25529 13.2698 7.41363 13.142 7.54141C13.0142 7.66918 12.8559 7.73307 12.667 7.73307H9.33366C9.14477 7.73307 8.98644 7.66918 8.85866 7.54141C8.73088 7.41363 8.66699 7.25529 8.66699 7.06641C8.66699 6.87752 8.73088 6.71918 8.85866 6.59141C8.98644 6.46363 9.14477 6.39974 9.33366 6.39974H11.467C11.1114 5.77752 10.6253 5.28863 10.0087 4.93307C9.39199 4.57752 8.72255 4.39974 8.00033 4.39974C6.88921 4.39974 5.94477 4.78863 5.16699 5.56641C4.38921 6.34418 4.00033 7.28863 4.00033 8.39974C4.00033 9.51085 4.38921 10.4553 5.16699 11.2331C5.94477 12.0108 6.88921 12.3997 8.00033 12.3997C8.75588 12.3997 9.44755 12.2081 10.0753 11.8247C10.7031 11.4414 11.1892 10.9275 11.5337 10.2831C11.6225 10.1275 11.7475 10.0192 11.9087 9.95807C12.0698 9.89696 12.2337 9.89418 12.4003 9.94974C12.5781 10.0053 12.7059 10.122 12.7837 10.2997C12.8614 10.4775 12.8559 10.6442 12.767 10.7997C12.3114 11.6886 11.6614 12.3997 10.817 12.9331C9.97255 13.4664 9.03366 13.7331 8.00033 13.7331Z"
                  fill="#1A34FF"
                />
              </svg>
              <span className="whitespace-nowrap">Retry</span>
            </Button>
          </Row>
        )} */}

        {result && !isShare && (
          <Fragment>
            <Divider className="m-0 bg-[var(--gray-5)]" />
            <Row wrap={false} align={"middle"} className="py-[8px] gap-[8px]">
              <button
                className="flex items-center gap-[10px] px-[15px] py-[6.5px] cursor-pointer"
                onClick={onNewProject}
              >
                <AddCircleIcon width={14} height={14} fill="var(--blue-6)" />
                <span className="font-button2 text-[var(--blue-6)]">
                  {"button__22"}
                </span>
              </button>
              <Button
                variants="primary"
                size="large"
                className="w-full"
                onClick={sendToCandidateChecker}
              >
                <svg
                  width="14"
                  height="15"
                  viewBox="0 0 14 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.33281 5.30072L4.14115 10.4924C4.0342 10.5993 3.89809 10.6528 3.73281 10.6528C3.56753 10.6528 3.43142 10.5993 3.32448 10.4924C3.21753 10.3854 3.16406 10.2493 3.16406 10.084C3.16406 9.91877 3.21753 9.78266 3.32448 9.67572L8.51615 4.48405H4.08281C3.91753 4.48405 3.77899 4.42815 3.66719 4.31634C3.55538 4.20454 3.49948 4.06599 3.49948 3.90072C3.49948 3.73544 3.55538 3.5969 3.66719 3.48509C3.77899 3.37329 3.91753 3.31738 4.08281 3.31738H9.91615C10.0814 3.31738 10.22 3.37329 10.3318 3.48509C10.4436 3.5969 10.4995 3.73544 10.4995 3.90072V9.73405C10.4995 9.89933 10.4436 10.0379 10.3318 10.1497C10.22 10.2615 10.0814 10.3174 9.91615 10.3174C9.75087 10.3174 9.61233 10.2615 9.50052 10.1497C9.38872 10.0379 9.33281 9.89933 9.33281 9.73405V5.30072Z"
                    fill="white"
                  />
                </svg>
                <span className="whitespace-nowrap">{"button__23"}</span>
              </Button>
            </Row>
          </Fragment>
        )}

        {/* --- Share --- */}
        {isShare && (
          <div>
            <Divider className="m-0 bg-[var(--gray-5)]" />
            <Row wrap={false} align={"middle"} className="py-[8px] gap-[8px]">
              <button
                className="flex items-center gap-[10px] px-[15px] py-[6.5px] cursor-pointer"
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
      </div>
    </>
  );
};

const PageWrapper = styled.div`
  padding: 16px;
  flex: auto;
`;

const ButtonResume = styled.button`
  padding: 13.5px 16px;
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 16px;

  border: 1px solid var(--gray-6);
  border-radius: var(--border-radius-s);
`;

export default ResultResumeExtractor;
