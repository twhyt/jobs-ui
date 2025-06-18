import DrawerDrag from "../DrawerDrag";
import { useCallback, useMemo } from "react";
// import { useAppDispatch, useAppSelector } from "@/store/redux-hook";
// import { onCloseDrawerQualifications } from "@/store/slices/drawerSlice";
import { Col, Divider, Input, Row } from "antd";
import { ChevronLeftIcon } from "@/assets/job-solution/icons/directional-groups";
import { Controller, useFormContext } from "react-hook-form";
import { WarningOutlined } from "@ant-design/icons";
import { CandidateCheckerFormType } from "@/types/job-solution/candidate-checker";
import clsx from "clsx";
import Button from "@/components/job-solution/custom-antd/Button";
// import useTranslation from "@/hooks/useTranslation";

const { TextArea } = Input;

export default function DrawerQualifications() {
  // const { t } = useTranslation("candidateChecker");

  // const dispatch = useAppDispatch();
  const {
    control,
    formState: { errors },
    resetField,
  } = useFormContext<CandidateCheckerFormType>();

  // const { drawerQualifications } = useAppSelector((state) => state.drawer);

  const FieldData = useMemo(() => {
    return [
      {
        key: "education",
        name: "header_text__5",
        placeholder: "placeholder__2",
      },
      {
        key: "work_experience",
        name: "header_text__6",
        placeholder: "placeholder__3",
      },
      {
        key: "skills",
        name: "header_text__7",
        placeholder: "placeholder__4",
      },
      {
        key: "behavior_competencies",
        name: "header_text__8",
        placeholder: "placeholder__5",
      },
      {
        key: "tool",
        name: "header_text__9",
        placeholder: "placeholder__6",
      },
      {
        key: "language",
        name: "header_text__10",
        placeholder: "placeholder__7",
      },
      {
        key: "other_characteristics",
        name: "header_text__11",
        placeholder: "placeholder__8",
      },
    ];
  }, []);

  const isError = useMemo(() => {
    const keysError = Object.keys(errors).map((key) => {
      return key;
    });

    const keysCandidate = FieldData.map((item) => item.key);

    const error = keysCandidate.some((key) => {
      return keysError.includes(key);
    });

    if (!error) return false;

    return true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    FieldData,
    errors.education,
    errors.work_experience,
    errors.skills,
    errors.behavior_competencies,
    errors.tool,
    errors.language,
    errors.other_characteristics,
  ]);

  const closeDrawer = useCallback(() => {
    const keysError = Object.keys(errors).map((key) => {
      return key;
    });

    const keysCandidate = FieldData.map((item) => item.key);

    const allErrors = keysCandidate.filter((key) => {
      return keysError.includes(key);
    });

    if (allErrors.length > 0) {
      allErrors.forEach((key) => {
        const name = key as keyof CandidateCheckerFormType;
        resetField(name, { defaultValue: "" });
      });
    }

    // dispatch(onCloseDrawerQualifications());
  }, [resetField, errors, FieldData]);

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
        <h3 className="font-h7 text-[var(--text-title)]">{"header_text__4"}</h3>
      </Row>
      <Divider className="!m-0 !bg-[var(--gray-5)]" />
      <Col span={24} className="max-h-[75vh] overflow-auto">
        {FieldData.map((item) => (
          <div key={item.key} className="p-[16px] flex flex-col gap-[12px]">
            <div>
              <span>{item.name}</span>
            </div>
            <Controller
              name={item.key as keyof CandidateCheckerFormType}
              control={control}
              rules={{
                maxLength: {
                  value: 500,
                  message: "error_message__7",
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <div className="w-full">
                  <Col
                    span={24}
                    className={clsx(
                      "!p-[16px] w-full border-[1px] border-[var(--gray-7)] hover:border-[var(--blue-6)] rounded-[8px] focus:border-[var(--blue-6)] focus-within:border-[var(--blue-6)]",
                      error && "!border-[var(--error)]"
                    )}
                  >
                    <TextArea
                      ref={field.ref}
                      value={field.value as string | undefined}
                      autoSize={{ minRows: 2 }}
                      className="!border-none !p-0 !outline-none !shadow-none !resize-none"
                      placeholder={item.placeholder}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      status={error ? "error" : undefined}
                    />
                  </Col>
                  {error && (
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
              )}
            />
          </div>
        ))}
      </Col>
    </DrawerDrag>
  );
}
