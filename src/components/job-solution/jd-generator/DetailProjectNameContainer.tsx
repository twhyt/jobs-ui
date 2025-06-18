import styled from "styled-components";
import Button from "@/components/job-solution/custom-antd/Button";
import { useEffect, useRef, useState } from "react";
import { SuccessFillIcon } from "@/assets/job-solution/icons/suggested-groups/filled";
// import useTemporaryRender from "@/hooks/useTemporaryRender";
// import useTranslation from "@/hooks/useTranslation";

// import { motion, AnimatePresence } from "framer-motion";
import { Controller, useForm, useFormContext } from "react-hook-form";
import TextField from "@/components/job-solution/input/TextField";
import { WarningIcon } from "@/assets/job-solution/icons/suggested-groups/outline";
// import { useRouter } from "next/router";
// import axiosInstance from "@/utils/axiosInstance";

interface Props {
  onChangeProjectName?: (name: string | undefined) => void;
  helperText?: React.ReactNode;
  viewOnly?: boolean;
  disabled?: boolean;
  projectId?: string | null;
}
export default function DetailProjectNameContainer({
  onChangeProjectName,
  viewOnly = false,
  disabled,
}: // projectId,
Readonly<Props>) {
  // const { t: commonT } = useTranslation("common");
  // const { t: resumeExtractionT } = useTranslation("resumeExtraction");
  const tempForm = useForm<{ projectName: string }>({
    defaultValues: { projectName: "" },
    mode: "all",
  });
  const form = useFormContext<{ projectName: string }>();
  const [edit, setEdit] = useState(false);
  const [containerMaxWidth, setContainerMaxWidth] = useState<number | null>(
    null
  );
  const containerRef = useRef<HTMLDivElement>(null);

  // const [isVisible, showAgain] = useTemporaryRender();

  const projectNameValue = form.watch("projectName");

  const renderProjectName = !projectNameValue ? "untitled" : projectNameValue;

  const isError = !!tempForm.formState.errors.projectName;

  // const router = useRouter();
  // const renderProjectId = router.query.project_id ?? projectId;

  function onEdit() {
    setEdit(true);
    tempForm.setValue("projectName", projectNameValue ?? "untitled");
  }

  function closeEdit() {
    setEdit(false);
    tempForm.clearErrors();
  }

  async function onChangeName() {
    // showAgain();
    setEdit(false);
    const projectNameValue = tempForm.getValues("projectName");
    form.setValue("projectName", projectNameValue);
    // if (renderProjectId) {
    //   try {
    //     await axiosInstance.patch(`/v1/project/${renderProjectId}/name`, {
    //       project_name: projectNameValue,
    //     });
    //   } catch (err) {
    //     console.log("error", err);
    //   }
    // }
  }

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
  }, [projectNameValue]);

  if (edit) {
    return (
      <ProjectNameBox>
        <div className="flex items-center">
          <div className="flex-auto">
            <h1 className="font-h10 text-[var(--text-title)]">{"project"}</h1>
          </div>
        </div>
        <div className="">
          <Controller
            rules={{ required: true, maxLength: 200 }}
            name="projectName"
            control={tempForm.control}
            render={({ field, formState }) => {
              const helperText = () => {
                if (formState.errors.projectName?.type === "required") {
                  return (
                    <div className="flex items-center gap-1 text-[var(--error)] pl-[16px] mt-4">
                      <WarningIcon fill="var(--error)" className="mt-[-1px]" />
                      <span>{"error_message_required"}</span>
                    </div>
                  );
                }

                if (formState.errors.projectName?.type === "maxLength") {
                  return (
                    <div className="flex items-center gap-1 text-[var(--error)] pl-[16px] mt-4">
                      <WarningIcon fill="var(--error)" className="mt-[-1px]" />
                      <span>{"error_message_limit_char"}</span>
                    </div>
                  );
                }
              };
              return (
                <TextField
                  {...field}
                  label={"field_label__1"}
                  onChange={(e: { target: { value: string | undefined } }) => {
                    field.onChange(e.target.value);
                    onChangeProjectName?.(e.target.value);
                  }}
                  error={!!formState.errors.projectName}
                  helperText={helperText()}
                  labelOnTop
                  labelType="projectName"
                />
              );
            }}
          />
        </div>
        <div className="flex justify-end gap-[4px] items-center">
          <Button className="!w-fit" variants="cancel" onClick={closeEdit}>
            {"cancel"}
          </Button>
          <Button
            className="!w-fit"
            variants="primary"
            disabled={isError}
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
                {projectNameValue}
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
            {/* {projectNameValue && isVisible && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                > */}
            <div className="flex items-center gap-[4px] ">
              <SuccessFillIcon width={16} height={16} fill="var(--green-6)" />
              <span className="font-body5 text-[var(--green-6)]">
                {"saved"}
              </span>
            </div>
            {/* </motion.div> */}
            {/* )} */}
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
  padding: 0px 16px;
`;
