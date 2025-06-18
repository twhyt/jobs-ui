// import useTranslation from "@/hooks/useTranslation";
import { Input } from "antd";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import styled from "styled-components";
const { TextArea } = Input;

interface Props {
  disabledInput: boolean;
}

const JobOverviewContainer: FC<Props> = ({ disabledInput }): JSX.Element => {
  // const { t } = useTranslation("jdGen");
  const form = useFormContext<{ jobOverview: string }>();
  return (
    <div className="flex flex-col w-full gap-3 px-4">
      <h1 className="font-h10">{"jd_gen_step2_header"}</h1>
      <Controller
        name="jobOverview"
        control={form.control}
        render={({ field }) => {
          return (
            <StyledTextArea
              {...field}
              placeholder={"jd_gen_step2_placeholder"}
              style={{ height: 51, resize: "none" }}
              autoSize
              disabled={disabledInput}
            />
          );
        }}
      />
    </div>
  );
};

const StyledTextArea = styled(TextArea)`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0;
  padding: 12px 13.5px;

  border: 1px solid var(--gray-7);
  border-radius: 5px;
  transition: border-color 0.2s, box-shadow 0.2s;
  background-color: var(--white-100);

  &:hover {
    border-color: var(--blue-6);
  }

  &:focus-within {
    border-color: var(--blue-6);
    box-shadow: none;
  }

  /* --- Styling the actual antd TextArea inside --- */
  .ant-input {
    border: none !important;
    outline: none !important;
    box-shadow: none !important;

    resize: none !important;

    padding: 16px !important;

    height: 100% !important;
    width: 100% !important;
    height: 51px !important;

    background-color: transparent !important;
  }

  /* --- Disabled Styles --- */
  &.ant-input-disabled {
    background-color: #ffffff !important;
    border-color: var(--gray-6) !important;
    cursor: not-allowed !important;
    color: var(--black-25) !important;
    -webkit-text-fill-color: var(--black-25);

    &:hover {
      border-color: var(--gray-6) !important;
    }

    &:focus {
      border-color: var(--gray-6) !important;
      box-shadow: none !important;
    }
  }

  &.ant-input-disabled::placeholder {
    color: var(--gray-7) !important;
  }
`;

export default JobOverviewContainer;
