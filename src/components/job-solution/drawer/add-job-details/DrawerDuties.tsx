import DrawerDrag from "../DrawerDrag";
import { useCallback, useMemo } from "react";
// import { useAppDispatch, useAppSelector } from "@/store/redux-hook";
// import { onCloseDrawerDuitesAndResponsibilities } from "@/store/slices/drawerSlice";
import { Col, Divider, Row, Input } from "antd";
import { ChevronLeftIcon } from "@/assets/job-solution/icons/directional-groups";
import { Controller, useFormContext } from "react-hook-form";
import { WarningOutlined } from "@ant-design/icons";
import { CandidateCheckerFormType } from "@/types/job-solution/candidate-checker";
import clsx from "clsx";
import Button from "@/components/job-solution/custom-antd/Button";
// import useTranslation from "@/hooks/useTranslation";
const { TextArea } = Input;

export default function DrawerDutiesResponsibilities() {
  // const { t } = useTranslation("candidateChecker");
  // const dispatch = useAppDispatch();
  const {
    control,
    resetField,
    formState: { errors },
  } = useFormContext<CandidateCheckerFormType>();

  // const { drawerDuitesAndResponsibilities } = useAppSelector(
  //   (state) => state.drawer
  // );

  const isError = useMemo(() => {
    const error = errors.duties_and_responsibilities;
    if (!error) return false;
    return true;
  }, [errors.duties_and_responsibilities]);

  const closeDrawer = useCallback(() => {
    if (isError) {
      resetField("duties_and_responsibilities", { defaultValue: "" });
    }
    // dispatch(onCloseDrawerDuitesAndResponsibilities());
  }, [resetField, isError]);

  return (
    <DrawerDrag open={true} onClose={closeDrawer}>
      <Row align={"middle"} className="p-[16px] pt-[8px] gap-[8px]">
        <Button
          shape="circle"
          title="back"
          onClick={closeDrawer}
          disabled={isError}
          icon={
            <div className="flex items-center justify-center">
              <ChevronLeftIcon />
            </div>
          }
        ></Button>
        <h3 className="font-h7 text-[var(--text-title)]">{"header_text__3"}</h3>
      </Row>
      <Divider className="!m-0 !bg-[var(--gray-5)]" />
      <Col span={24} className="max-h-[75vh] overflow-auto">
        <Controller
          name={"duties_and_responsibilities"}
          control={control}
          rules={{
            maxLength: {
              value: 3000,
              message: "error_message__10",
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <div className="p-[16px]">
              <div
                className={clsx(
                  "!p-[16px] w-full border-[1px] border-[var(--gray-7)] hover:border-[var(--blue-6)] rounded-[8px] focus:border-[var(--blue-6)] focus-within:border-[var(--blue-6)]",
                  error && "!border-[var(--error)]"
                )}
              >
                <TextArea
                  ref={field.ref}
                  value={field.value}
                  autoSize={{ minRows: 7 }}
                  className="!border-none !p-0 !outline-none !shadow-none !resize-none"
                  placeholder={"placeholder__1"}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  status={error ? "error" : undefined}
                />
              </div>
              {error && (
                <Row className="mt-[4px] pl-[16px] gap-[4px]" align={"middle"}>
                  <WarningOutlined
                    size={16}
                    color="var(--error)"
                    style={{ color: "var(--error)", width: 12, height: 12 }}
                  />
                  <span className="font-footnote-description1 text-[var(--error)]">
                    {error.message}
                  </span>
                </Row>
              )}
            </div>
          )}
        />
      </Col>
    </DrawerDrag>
  );
}
