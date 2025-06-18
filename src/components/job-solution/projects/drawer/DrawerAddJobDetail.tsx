import { Col, Divider, Input, Row } from "antd";
import { FC, Fragment, useEffect, useMemo } from "react";
import styled from "styled-components";
import { Controller, useFormContext } from "react-hook-form";
import { WarningOutlined } from "@ant-design/icons";
import { CandidateCheckerFormType } from "@/types/job-solution/candidate-checker";
import ButtonCustom from "@/components/job-solution/custom-antd/Button";
import { SuccessFillIcon } from "@/assets/job-solution/icons/suggested-groups/filled";
import { ChevronRightIcon } from "@/assets/job-solution/icons/directional-groups";
import clsx from "clsx";
// import useTranslation from "@/hooks/useTranslation";
import DrawerDrag from "@/components/job-solution/drawer/DrawerDrag";
// import useDisabledScreenScroll from "@/hooks/useDisabledScreenScroll";

const { TextArea } = Input;

interface Props {
  isOpen: boolean;
  handleDrawerAddJobDetail: (open: boolean) => void;
  handleDrawerDutiesAndResponsibilities: (open: boolean) => void;
  handleDrawerQualifications: (open: boolean) => void;
  handleDrawerCriteria: (open: boolean) => void;
  onSaveJobDetail: () => void;
  drawers: {
    drawerAddJobDetail: boolean;
    drawerQualifications: boolean;
    drawerDutiesAndResponsibilities: boolean;
    drawerCriteria: boolean;
  };
}

const DrawerAddJobDetail: FC<Props> = ({
  isOpen,
  handleDrawerAddJobDetail,
  handleDrawerDutiesAndResponsibilities,
  handleDrawerQualifications,
  handleDrawerCriteria,
  onSaveJobDetail,
  drawers,
}) => {
  // const { t } = useTranslation("candidateChecker");
  const {
    control,
    trigger,
    formState: { errors },
    watch,
  } = useFormContext<CandidateCheckerFormType>();

  const isError = Object.keys(errors).length > 0;

  // useDisabledScreenScroll(isOpen);

  const {
    duties_and_responsibilities,
    education,
    work_experience,
    skills,
    behavior_competencies,
    tool,
    language,
    other_characteristics,
    excluded_criteria,
    highlighted_criteria,
  } = watch();

  const activeQualifications = [
    education,
    work_experience,
    skills,
    behavior_competencies,
    tool,
    language,
    other_characteristics,
  ].some((item) => item && item.trim() !== "");

  const activeDuties = !!duties_and_responsibilities;

  const activeHighlightedCriteria = highlighted_criteria?.some((item) => {
    return item.value && item.value.trim() !== "";
  });

  const activeExcludedCriteria = excluded_criteria?.some((item) => {
    return item.value && item.value.trim() !== "";
  });

  const activeCriteria = activeExcludedCriteria || activeHighlightedCriteria;

  const AdditionalInfo = useMemo(() => {
    return [
      {
        name: "body_text__1",
        active: activeDuties,
        onClick: () => {
          handleDrawerDutiesAndResponsibilities(true);
        },
      },
      {
        name: "header_text__4",
        active: activeQualifications,
        onClick: () => {
          handleDrawerQualifications(true);
        },
      },
      {
        name: "header_text__12",
        active: activeCriteria,
        onClick: () => {
          handleDrawerCriteria(true);
        },
      },
    ];
  }, [
    activeDuties,
    activeQualifications,
    activeCriteria,
    handleDrawerDutiesAndResponsibilities,
    handleDrawerQualifications,
    handleDrawerCriteria,
  ]);

  const hidden = useMemo(() => {
    if (
      drawers.drawerQualifications ||
      drawers.drawerDutiesAndResponsibilities ||
      drawers.drawerCriteria
    )
      return true;
    else return false;
  }, [drawers]);

  // ปิด drawer ก่อนออกจากหน้า หรือ Refresh
  useEffect(() => {
    const handleRouteChange = () => {
      handleDrawerAddJobDetail(false);
    };
    window.addEventListener("beforeunload", handleRouteChange);
    return () => {
      window.removeEventListener("beforeunload", handleRouteChange);
    };
  }, [handleDrawerAddJobDetail]);

  useEffect(() => {
    if (isOpen) {
      trigger();
    }
  }, [isOpen, trigger]);

  return (
    <DrawerDrag
      open={isOpen}
      onClose={() => handleDrawerAddJobDetail(false)}
      hidden={hidden}
    >
      <BoxContent>
        <Row className="p-[16px] pt-[8px]">
          <h6 className="font-h7">{"header_text__2"}</h6>
        </Row>
        <Row className="px-[16px] py-[8px] gap-[12px] w-full">
          <Controller
            name={"job_scope"}
            control={control}
            rules={{
              required: "Required",
              maxLength: {
                value: 3000,
                message: "error_message__10",
              },
            }}
            render={({ field, fieldState: { error } }) => {
              const includeError = error?.type === "maxLength";

              return (
                <div className="w-full">
                  <Col
                    span={24}
                    className={clsx(
                      "!p-[16px] w-full border-[1px] border-[var(--gray-7)] hover:border-[var(--blue-6)] rounded-[8px] focus:border-[var(--blue-6)] focus-within:border-[var(--blue-6)]",
                      includeError && "!border-[var(--error)]"
                    )}
                  >
                    <TextArea
                      ref={field.ref}
                      value={field.value}
                      autoSize={{ minRows: 4 }}
                      className="!border-none !p-0 !outline-none !shadow-none !resize-none"
                      placeholder={"placeholder"}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      status={includeError ? "error" : undefined}
                    />
                  </Col>
                  {includeError && (
                    <Row
                      className="mt-[4px] pl-[16px] gap-[4px]"
                      align={"middle"}
                    >
                      <WarningOutlined
                        color="var(--error)"
                        style={{ color: "var(--error)", width: 12, height: 12 }}
                      />
                      <span className="font-footnote-description1 text-[var(--error)]">
                        {error.message}
                      </span>
                    </Row>
                  )}
                </div>
              );
            }}
          />
          <Col span={24}>
            {AdditionalInfo.map((item, index) => (
              <Fragment key={item.name}>
                {index !== 0 && (
                  <Divider className="!m-0 !bg-[var(--gray-5)]" />
                )}
                <Row justify={"space-between"} className="py-[12px]">
                  <div className="flex-auto flex items-center gap-[2px]">
                    <span className="font-body5 text-[var(--text-title)]">
                      {item.name}
                    </span>
                    {item.active && (
                      <div className="flex items-center gap-[4px]">
                        <SuccessFillIcon
                          width={16}
                          height={16}
                          fill="var(--green-6)"
                        />
                        <span className="font-body5 text-[var(--green-6)]">
                          {"confirm_message__1"}
                        </span>
                      </div>
                    )}
                  </div>
                  <button
                    className="flex items-center gap-[4px]"
                    onClick={item.onClick}
                  >
                    <span className="font-button2 text-[var(--blue-6)]">
                      {"button__5"}
                    </span>
                    <ChevronRightIcon fill="var(--blue-6)" />
                  </button>
                </Row>
              </Fragment>
            ))}
          </Col>
        </Row>
        <div className="flex flex-col w-full gap-[12px] px-[16px] py-[8px]">
          <Row>
            <ButtonCustom
              onClick={onSaveJobDetail}
              size="large"
              disabled={isError}
              variants="primary"
            >
              {"button__6"}
            </ButtonCustom>
          </Row>
        </div>
      </BoxContent>
    </DrawerDrag>
  );
};

const BoxContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  max-height: 80vh;
  overflow: auto;

  .search-input {
    outline: none;
    box-shadow: none;
    padding: 13.5px 16px;
    border-color: var(--gray-7);

    display: flex;
    justify-content: start;
    align-items: center;
    gap: 8px;

    &::placeholder {
      color: var(--text-disable);
    }

    &::before {
      display: none;
    }
  }
  .search-icon {
    color: var(--gray-7);
  }
`;

export default DrawerAddJobDetail;
