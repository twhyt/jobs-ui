import TextField from "@/components/job-solution/input/TextField";
import { FormValues } from "@/types/job-solution/global";
// import useTranslation from "@/hooks/useTranslation";
import { Select } from "antd";
// import { AnimatePresence, motion } from "framer-motion";
import { FC, useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import styled from "styled-components";

interface Props {
  openAdditional: boolean;
  disabledInput: boolean;
  handleOpenAdditional: (open: boolean) => void;
}

const SelectInput = ({
  name,
  disabledInput,
}: {
  name: "jobTitle.include" | "jobTitle.exclude";
  disabledInput: boolean;
}) => {
  // const { t } = useTranslation("jdGen");
  const [searchValue, setSearchValue] = useState("");
  const form = useFormContext<FormValues>();
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => {
        return (
          <StyledSelect
            {...field}
            onChange={(value: unknown) => {
              const stringArrayValue = value as string[];

              // Check duplicate value
              if (field?.value?.includes(searchValue)) {
                setSearchValue("");
                return;
              }

              // Check empty value
              const filtered = stringArrayValue.filter((item) => {
                return item.trim();
              });

              // Clear search value
              setSearchValue("");

              // Set value to form
              form.setValue(name, filtered);
            }}
            onBlur={() => {
              field.onBlur();
              setSearchValue("");
            }}
            mode="tags"
            onSearch={(value) => {
              setSearchValue(value);
            }}
            placeholder={
              name === "jobTitle.include"
                ? "jd_gen_step1_include_placeholder"
                : "jd_gen_step1_exclude_placeholder"
            }
            defaultValue={[]}
            options={[]}
            showSearch={false}
            dropdownStyle={{ display: "none" }}
            dropdownRender={(menu) => (
              <div style={{ display: "none" }}>{menu}</div>
            )}
            suffixIcon={<></>}
            disabled={disabledInput}
            onInputKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();

                // Prevent remove item when it empty value
                if (!e.currentTarget.value.trim()) {
                  return e.stopPropagation();
                }
              }
            }}
          />
        );
      }}
    />
  );
};

const AddJobTitleContainer: FC<Props> = ({
  openAdditional,
  disabledInput,
  handleOpenAdditional,
}): JSX.Element => {
  // const { t } = useTranslation("jdGen");
  const form = useFormContext<FormValues>();
  const { setValue, getValues } = form;
  const jobTitle = form.watch("jobTitle");

  // Check job title is deleted
  useEffect(() => {
    if (jobTitle.title?.trim()) return;
    if (openAdditional) return;
    const jobTitleInclude = getValues("jobTitle.include");
    const jobTitleExclude = getValues("jobTitle.exclude");

    // Reset value when job title is empty
    if (
      (jobTitleInclude && jobTitleInclude?.length > 0) ||
      (jobTitleExclude && jobTitleExclude?.length > 0)
    ) {
      setValue("jobTitle.include", []);
      setValue("jobTitle.exclude", []);
    }
  }, [jobTitle.title, setValue, openAdditional, getValues]);

  return (
    <div className="flex flex-col w-full gap-3 px-4">
      <h1 className="font-h10">{"jd_gen_step1_header"}</h1>
      {!openAdditional && (
        <Controller
          rules={{
            validate: {
              required: (value) => {
                if (!value?.trim()) {
                  return "This field is required.";
                }
                return true;
              },
            },
          }}
          name="jobTitle.title"
          control={form.control}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                disabled={disabledInput}
                label={"jd_gen_step1_placeholder"}
                labelOnTop={false}
                suffixIcon={
                  <button
                    disabled={!jobTitle.title?.trim()}
                    type="button"
                    onClick={() => handleOpenAdditional(true)}
                    style={!jobTitle.title?.trim() ? { opacity: 0.5 } : {}}
                  >
                    <svg
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 21.5C11.7167 21.5 11.4792 21.4042 11.2875 21.2125C11.0958 21.0208 11 20.7833 11 20.5V16.5C11 16.2167 11.0958 15.9792 11.2875 15.7875C11.4792 15.5958 11.7167 15.5 12 15.5C12.2833 15.5 12.5208 15.5958 12.7125 15.7875C12.9042 15.9792 13 16.2167 13 16.5V17.5H20C20.2833 17.5 20.5208 17.5958 20.7125 17.7875C20.9042 17.9792 21 18.2167 21 18.5C21 18.7833 20.9042 19.0208 20.7125 19.2125C20.5208 19.4042 20.2833 19.5 20 19.5H13V20.5C13 20.7833 12.9042 21.0208 12.7125 21.2125C12.5208 21.4042 12.2833 21.5 12 21.5ZM4 19.5C3.71667 19.5 3.47917 19.4042 3.2875 19.2125C3.09583 19.0208 3 18.7833 3 18.5C3 18.2167 3.09583 17.9792 3.2875 17.7875C3.47917 17.5958 3.71667 17.5 4 17.5H8C8.28333 17.5 8.52083 17.5958 8.7125 17.7875C8.90417 17.9792 9 18.2167 9 18.5C9 18.7833 8.90417 19.0208 8.7125 19.2125C8.52083 19.4042 8.28333 19.5 8 19.5H4ZM8 15.5C7.71667 15.5 7.47917 15.4042 7.2875 15.2125C7.09583 15.0208 7 14.7833 7 14.5V13.5H4C3.71667 13.5 3.47917 13.4042 3.2875 13.2125C3.09583 13.0208 3 12.7833 3 12.5C3 12.2167 3.09583 11.9792 3.2875 11.7875C3.47917 11.5958 3.71667 11.5 4 11.5H7V10.5C7 10.2167 7.09583 9.97917 7.2875 9.7875C7.47917 9.59583 7.71667 9.5 8 9.5C8.28333 9.5 8.52083 9.59583 8.7125 9.7875C8.90417 9.97917 9 10.2167 9 10.5V14.5C9 14.7833 8.90417 15.0208 8.7125 15.2125C8.52083 15.4042 8.28333 15.5 8 15.5ZM12 13.5C11.7167 13.5 11.4792 13.4042 11.2875 13.2125C11.0958 13.0208 11 12.7833 11 12.5C11 12.2167 11.0958 11.9792 11.2875 11.7875C11.4792 11.5958 11.7167 11.5 12 11.5H20C20.2833 11.5 20.5208 11.5958 20.7125 11.7875C20.9042 11.9792 21 12.2167 21 12.5C21 12.7833 20.9042 13.0208 20.7125 13.2125C20.5208 13.4042 20.2833 13.5 20 13.5H12ZM16 9.5C15.7167 9.5 15.4792 9.40417 15.2875 9.2125C15.0958 9.02083 15 8.78333 15 8.5V4.5C15 4.21667 15.0958 3.97917 15.2875 3.7875C15.4792 3.59583 15.7167 3.5 16 3.5C16.2833 3.5 16.5208 3.59583 16.7125 3.7875C16.9042 3.97917 17 4.21667 17 4.5V5.5H20C20.2833 5.5 20.5208 5.59583 20.7125 5.7875C20.9042 5.97917 21 6.21667 21 6.5C21 6.78333 20.9042 7.02083 20.7125 7.2125C20.5208 7.40417 20.2833 7.5 20 7.5H17V8.5C17 8.78333 16.9042 9.02083 16.7125 9.2125C16.5208 9.40417 16.2833 9.5 16 9.5ZM4 7.5C3.71667 7.5 3.47917 7.40417 3.2875 7.2125C3.09583 7.02083 3 6.78333 3 6.5C3 6.21667 3.09583 5.97917 3.2875 5.7875C3.47917 5.59583 3.71667 5.5 4 5.5H12C12.2833 5.5 12.5208 5.59583 12.7125 5.7875C12.9042 5.97917 13 6.21667 13 6.5C13 6.78333 12.9042 7.02083 12.7125 7.2125C12.5208 7.40417 12.2833 7.5 12 7.5H4Z"
                        fill="#8C8C8C"
                      />
                    </svg>
                  </button>
                }
              />
            );
          }}
        />
      )}

      {/* <AnimatePresence initial={false}> */}
      {openAdditional && (
        // <motion.div
        //   key="content"
        //   initial="collapsed"
        //   animate="open"
        //   exit="collapsed"
        //   variants={{
        //     open: { height: "auto", opacity: 1 },
        //     collapsed: { height: 0, opacity: 0 },
        //   }}
        //   transition={{ duration: 0.3, ease: "easeInOut" }}
        //   style={{ overflow: "hidden" }}
        // >
        <div>
          <div
            className={`min-h-[51px] border-[1px] ${
              disabledInput
                ? "border-[var(--gray-6)]"
                : "border-[var(--gray-7)]"
            } border-[var(--gray-6)] rounded-t-[8px] flex items-center p-4`}
          >
            <p
              className={`font-body5 ${
                disabledInput && "text-[var(--gray-6)]"
              }`}
            >
              {jobTitle.title}
            </p>
          </div>
          <div className="bg-[var(--gray-3)] min-h-[252px] rounded-b-[8px] flex flex-col px-2 gap-4 pt-4">
            <div className=" flex flex-col gap-3">
              <p className="font-h10">{"jd_gen_step1_include_header"}</p>
              <SelectInput
                name="jobTitle.include"
                disabledInput={disabledInput}
              />
            </div>

            <div className=" flex flex-col gap-3">
              <p className="font-h10">{"jd_gen_step1_exclude_header"}</p>
              <SelectInput
                name="jobTitle.exclude"
                disabledInput={disabledInput}
              />
            </div>

            <div className="flex items-center justify-center">
              <button
                className="flex gap-2 items-center"
                type={"button"}
                onClick={() => handleOpenAdditional(false)}
              >
                <p className="font-button4 text-[var(--blue-6)]">
                  {"jd_gen_step1_collapse"}
                </p>

                <svg
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.36128 10.4727C4.62163 10.7331 5.04374 10.7331 5.30409 10.4727L8.83268 6.94411L12.3613 10.4727C12.6216 10.7331 13.0437 10.7331 13.3041 10.4727C13.5644 10.2124 13.5644 9.79025 13.3041 9.5299L9.30409 5.5299C9.04374 5.26955 8.62163 5.26955 8.36128 5.5299L4.36128 9.5299C4.10093 9.79025 4.10093 10.2124 4.36128 10.4727Z"
                    fill="#1A34FF"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        // </motion.div>
      )}
      {/* </AnimatePresence> */}
    </div>
  );
};

const StyledSelect = styled(Select)`
  .ant-select-selector {
    min-height: 51px !important;
    max-height: 100px !important;
    overflow: auto !important;
    padding: 12px 8px !important;
    display: flex;
    align-items: center;
    border-color: var(--gray-7) !important;
    box-shadow: none !important;
  }

  /* --- Disabled Styles --- */
  &.ant-select-disabled {
    .ant-select-selector {
      background-color: var(--white-100) !important;
      border-color: var(--gray-6) !important;
      cursor: not-allowed !important;
    }

    // Style disabled tags
    .ant-select-selection-item {
      background-color: var(--gray-2);
      color: var(--gray-7);
      border-color: var(--gray-6) !important;
      cursor: not-allowed;
    }

    // Hide remove icon on disabled tags
    .ant-select-selection-item-remove {
      display: none;
    }

    // Style disabled placeholder
    .ant-select-selection-placeholder {
      color: var(--gray-7) !important; // Match disabled text color
      opacity: 0.8;
      cursor: not-allowed;
    }

    // Prevent hover/focus effects when disabled
    &:hover .ant-select-selector {
      border-color: var(--gray-5) !important;
    }
    &.ant-select-focused .ant-select-selector {
      border-color: var(--gray-5) !important;
      box-shadow: none !important;
    }
  }
`;

export default AddJobTitleContainer;
