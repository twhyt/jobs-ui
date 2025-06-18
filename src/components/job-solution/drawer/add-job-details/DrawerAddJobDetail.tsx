// import { useAppDispatch, useAppSelector } from "@/store/redux-hook";
import DrawerDrag from "../DrawerDrag";
// import {
//   onCloseDrawerAddJobDetail,
//   onOpenDrawerCriteria,
//   onOpenDrawerDuitesAndResponsibilities,
//   onOpenDrawerQualifications,
// } from "@/store/slices/drawerSlice";
import { Col, Divider, Row, Input } from "antd";
import { Fragment, useCallback, useEffect, useMemo } from "react";
import styled from "styled-components";
import { Controller, useFormContext } from "react-hook-form";
import { WarningOutlined } from "@ant-design/icons";
import { CandidateCheckerFormType } from "@/types/job-solution/candidate-checker";
import ButtonCustom from "@/components/job-solution/custom-antd/Button";
import { SuccessFillIcon } from "@/assets/job-solution/icons/suggested-groups/filled";
// import { setJobDetail } from "@/store/slices/projectSlice";
import { ChevronRightIcon } from "@/assets/job-solution/icons/directional-groups";
import clsx from "clsx";
// import useTranslation from "@/hooks/useTranslation";

const { TextArea } = Input;

const DrawerAddJobDetail = () => {
  // const { t } = useTranslation("candidateChecker");
  // const dispatch = useAppDispatch();
  const {
    control,
    // trigger,
    formState: { errors },
    watch,
  } = useFormContext<CandidateCheckerFormType>();

  // const {
  //   drawerAddJobDetail,
  //   drawerQualifications,
  //   drawerDuitesAndResponsibilities,
  //   drawerCriteria,
  // } = useAppSelector((state) => state.drawer);

  const isError = Object.keys(errors).length > 0;

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
          // dispatch(onOpenDrawerDuitesAndResponsibilities());
          console.log("q");
        },
      },
      {
        name: "header_text__4",
        active: activeQualifications,
        onClick: () => {
          // dispatch(onOpenDrawerQualifications());
          console.log("q");
        },
      },
      {
        name: "header_text__12",
        active: activeCriteria,
        onClick: () => {
          // dispatch(onOpenDrawerCriteria());
          console.log("q");
        },
      },
    ];
  }, [activeDuties, activeQualifications, activeCriteria]);

  const Hidden = useMemo(() => {
    // if (
    //   drawerQualifications ||
    //   drawerDuitesAndResponsibilities ||
    //   drawerCriteria
    // )
    // return true;
    // else
    return false;
  }, []);

  const CloseDrawer = useCallback(() => {
    // dispatch(onCloseDrawerAddJobDetail());
  }, []);

  function onAddJobDetails() {
    // dispatch(
    //   setJobDetail({
    //     job_detail: { ...watch() },
    //     job_detail_status: true,
    //   })
    // );
    CloseDrawer();
  }

  // ปิด drawer ก่อนออกจากหน้า หรือ Refresh
  useEffect(() => {
    const handleRouteChange = () => {
      CloseDrawer();
    };
    window.addEventListener("beforeunload", handleRouteChange);
    return () => {
      window.removeEventListener("beforeunload", handleRouteChange);
    };
  }, [CloseDrawer]);

  // useEffect(() => {
  //   if (drawerAddJobDetail) {
  //     // console.log("check trigger");
  //     trigger();
  //   }
  // }, [drawerAddJobDetail, trigger]);

  return (
    <DrawerDrag open={true} onClose={CloseDrawer} hidden={Hidden}>
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
              onClick={onAddJobDetails}
              size="large"
              disabled={isError}
              variants="primary"
            >
              {"button__6"}
            </ButtonCustom>
          </Row>
          {/* <Divider className="!m-0 !bg-[var(--gray-5)]" />
          <Row wrap={false} className="gap-[16px]" align={"middle"}>
            <span className="font-button4 text-[var(--text-title)]">
              {t("body_text__8")}
            </span>
            <ButtonCustom variants="secondary" size="large">
              {t("button__7")}
            </ButtonCustom>
          </Row> */}
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
