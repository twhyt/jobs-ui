import styled from "styled-components";
import Button from "@/components/job-solution/custom-antd/Button";
// import { useAppDispatch, useAppSelector } from "@/store/redux-hook";
import { useEffect, useMemo, useRef, useState } from "react";
import TextField from "../input/TextField";
// import {
//   changeResumeExtractorName,
//   changeCandidateCheckerName,
//   changeSmartJdGeneratorName,
// } from "@/store/slices/projectSlice";
import { SuccessFillIcon } from "@/assets/job-solution/icons/suggested-groups/filled";
// import useTemporaryRender from "@/hooks/useTemporaryRender";
// import useTranslation from "@/hooks/useTranslation";

// import { motion, AnimatePresence } from "framer-motion";
// import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/router";

interface Props {
  variants: "candidate-checker" | "resume-extractor" | "smart-gd-generator";
  projectName?: string | null;
  onChangeProjectName(name: string | null): void;
  error?: boolean;
  helperText?: React.ReactNode;
  viewOnly?: boolean;
  disabled?: boolean;
  projectId?: string | null;
  resetInvalidProjectName?: () => void;
  isProject?: boolean;
}
export default function DetailProjectName({
  variants,
  onChangeProjectName,
  resetInvalidProjectName,
  projectName,
  error = false,
  helperText,
  viewOnly = false,
  disabled,
  projectId,
  isProject = false,
}: Readonly<Props>) {
  // const { t: commonT } = useTranslation("common");
  // const { t: resumeExtractionT } = useTranslation("resumeExtraction");
  const router = useRouter();

  const [edit, setEdit] = useState(false);
  const [editedName, setEditedName] = useState<string>("");
  const [containerMaxWidth, setContainerMaxWidth] = useState<number | null>(
    null
  );
  const containerRef = useRef<HTMLDivElement>(null);

  // const [isVisible, showAgain] = useTemporaryRender();

  // const dispatch = useAppDispatch();
  // const { resume_extractor_name, candidate_checker_name, smart_jd_generator } =
  //   useAppSelector((state) => state.project);

  const renderProjectId = router.query.project_id ?? projectId;

  const displayProjectName = useMemo(
    () => {
      // if (variants === "resume-extractor") {
      //   return resume_extractor_name;
      // }

      // if (variants === "smart-gd-generator") {
      //   return smart_jd_generator?.project_name;
      // }

      // return candidate_checker_name;
      return "displayName";
    },
    [
      // resume_extractor_name,
      // candidate_checker_name,
      // variants,
      // smart_jd_generator?.project_name,
    ]
  );

  const renderProjectName = useMemo(() => {
    let displayName;
    if (variants === "candidate-checker") {
      displayName = !displayProjectName ? "untitled" : displayProjectName;
    } else {
      displayName = !displayProjectName ? "untitled" : displayProjectName;
    }
    return displayName;
  }, [displayProjectName, variants]);

  function onEdit() {
    resetInvalidProjectName?.();
    setEdit(true);
    if (!renderProjectId) {
      if (variants === "resume-extractor") {
        // onChangeProjectName(resume_extractor_name || commonT("untitled"));
        onChangeProjectName("untitled");
      } else if (variants === "smart-gd-generator") {
        onChangeProjectName(
          "untitled"
          // smart_jd_generator?.project_name || commonT("untitled")
        );
      } else {
        onChangeProjectName("untitled");
        // onChangeProjectName(candidate_checker_name || commonT("untitled"));
      }
    } else {
      const initialName = "Name";
      // variants === "resume-extractor"
      //   ? resume_extractor_name
      //   : variants === "smart-gd-generator"
      //   ? smart_jd_generator?.project_name
      //   : candidate_checker_name;

      setEditedName(initialName || "untitled");
    }
  }

  function closeEdit() {
    setEdit(false);
    onChangeProjectName(null);
  }

  async function onChangeName() {
    if (!renderProjectId) {
      // if (variants === "resume-extractor") {
      //   dispatch(changeResumeExtractorName(projectName));
      // } else if (variants === "smart-gd-generator") {
      //   dispatch(changeSmartJdGeneratorName(projectName));
      // } else {
      //   dispatch(changeCandidateCheckerName(projectName));
      // }

      // showAgain();
      setEdit(false);
    } else {
      // if (variants === "resume-extractor") {
      //   dispatch(changeResumeExtractorName(editedName));
      // } else if (variants === "smart-gd-generator") {
      //   dispatch(changeSmartJdGeneratorName(editedName));
      // } else {
      //   dispatch(changeCandidateCheckerName(editedName));
      // }

      if (renderProjectId) {
        // try {
        //   await axiosInstance.patch(`/v1/project/${renderProjectId}/name`, {
        //     project_name: editedName,
        //   });
        // } catch (err) {
        //   console.log("error", err);
        // }
      }

      // showAgain();
      setEdit(false);
    }
  }
  useEffect(() => {
    if (projectName) {
      // if (variants === "resume-extractor") {
      //   dispatch(changeResumeExtractorName(projectName));
      // } else if (variants === "smart-gd-generator") {
      //   dispatch(changeSmartJdGeneratorName(projectName));
      // } else {
      //   dispatch(changeCandidateCheckerName(projectName));
      // }
    }
  }, []);

  useEffect(() => {
    if (variants === "resume-extractor") {
      onChangeProjectName(null);
    } else if (variants === "smart-gd-generator") {
      onChangeProjectName(null);
    } else {
      onChangeProjectName(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isProject) return;

    return () => {
      // if (variants === "resume-extractor") {
      //   dispatch(changeResumeExtractorName(""));
      // } else {
      //   dispatch(changeCandidateCheckerName(null));
      // }
    };
  }, [isProject, variants]);

  // Resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerMaxWidth(containerRef.current.offsetWidth - 90);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [projectName]);

  if (edit) {
    return (
      <ProjectNameBox>
        <div className="flex items-center">
          <div className="flex-auto">
            <h1 className="font-h10 text-[var(--text-title)]">{"project"}</h1>
          </div>
        </div>
        <div className="">
          <TextField
            label={"field_label__1"}
            // label="Enter Project Name"
            value={!renderProjectId ? projectName || "" : editedName}
            onChange={(e) => {
              if (!renderProjectId) {
                onChangeProjectName(e.target.value);
              } else {
                setEditedName(e.target.value);
              }
            }}
            error={error}
            helperText={helperText}
            labelOnTop
            labelType="projectName"
            // labelType="default"
          />
        </div>
        <div className="flex justify-end gap-[4px] items-center">
          <Button
            className="!w-fit"
            variants="cancel"
            size="medium"
            onClick={closeEdit}
          >
            {"cancel"}
          </Button>
          <Button
            className="!w-fit"
            variants="primary"
            size="medium"
            disabled={error}
            onClick={onChangeName}
          >
            {"save"}
          </Button>
        </div>
      </ProjectNameBox>
    );
  }

  if (viewOnly) {
    return (
      <ProjectNameBox>
        <div className="flex justify-between gap-[4px] items-center">
          <div className="flex-auto max-w-[100%] w-full" ref={containerRef}>
            <div className="flex gap-[4px]">
              <h1 className="font-h10 text-[var(--text-title)]">{"project"}</h1>
            </div>
            {containerMaxWidth !== null && (
              <p
                className="flex-auto font-body5 text-[var(--text-title)] overflow-hidden whitespace-nowrap text-ellipsis"
                style={{
                  maxWidth: containerMaxWidth ?? "100%",
                }}
              >
                {projectName}
              </p>
            )}
          </div>
          <Button className="!w-fit" variants="secondary" disabled>
            {"change"}
          </Button>
        </div>
      </ProjectNameBox>
    );
  }

  return (
    <ProjectNameBox>
      <div className="flex justify-between gap-[4px] items-center">
        <div className="flex-auto max-w-[100%] w-full" ref={containerRef}>
          <div className="flex gap-[4px]">
            <h1 className="font-h10 text-[var(--text-title)]">{"project"}</h1>
            {/* <AnimatePresence> */}
            {/* {displayProjectName && isVisible && ( */}
            {displayProjectName && (
              // <motion.div
              //   initial={{ opacity: 0 }}
              //   animate={{ opacity: 1 }}
              //   exit={{ opacity: 0 }}
              //   transition={{ duration: 0.3 }}
              // >
              <div className="flex items-center gap-[4px] ">
                <SuccessFillIcon width={16} height={16} fill="var(--green-6)" />
                <span className="font-body5 text-[var(--green-6)]">
                  {"saved"}
                </span>
              </div>
              // </motion.div>
            )}
            {/* </AnimatePresence> */}
          </div>
          {containerMaxWidth !== null && (
            <p
              className="flex-auto font-body5 text-[var(--text-title)] overflow-hidden whitespace-nowrap text-ellipsis"
              style={{
                maxWidth: containerMaxWidth ?? "100%",
              }}
            >
              {renderProjectName}
            </p>
          )}
        </div>
        <Button
          className="!w-fit"
          variants="secondary"
          size="medium"
          onClick={onEdit}
          disabled={disabled}
        >
          {"change"}
        </Button>
      </div>
    </ProjectNameBox>
  );
}

const ProjectNameBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  padding: 16px;
`;
// function changeResumeExtractorName(editedName: string): any {
//   throw new Error("Function not implemented.");
// }
