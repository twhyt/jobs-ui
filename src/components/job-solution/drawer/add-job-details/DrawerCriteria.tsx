import DrawerDrag from "../DrawerDrag";
import { useCallback, useMemo } from "react";
// import { useAppDispatch, useAppSelector } from "@/store/redux-hook";
// import { onCloseDrawerCriteria } from "@/store/slices/drawerSlice";
import { Col, Divider, Row, Input } from "antd";
import { ChevronLeftIcon } from "@/assets/job-solution/icons/directional-groups";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { WarningOutlined } from "@ant-design/icons";
import { CandidateCheckerFormType } from "@/types/job-solution/candidate-checker";
import {
  AddCircleIcon,
  CloseIcon,
} from "@/assets/job-solution/icons/suggested-groups/outline";
import {
  CancelFillIcon,
  SuccessFillIcon,
} from "@/assets/job-solution/icons/suggested-groups/filled";

import Button from "@/components/job-solution/custom-antd/Button";
import clsx from "clsx";
// import useTranslation from "@/hooks/useTranslation";

const { TextArea } = Input;

export default function DrawerCriteria() {
  // const { t } = useTranslation("candidateChecker");
  // const { t: tCommon } = useTranslation("common");
  // const dispatch = useAppDispatch();
  const {
    control,
    formState: { errors },
    getValues,
    resetField,
    getFieldState,
  } = useFormContext<CandidateCheckerFormType>();

  const highlightedCriteria = useFieldArray({
    name: "highlighted_criteria",
    control: control,
  });
  const excludedCriteria = useFieldArray({
    name: "excluded_criteria",
    control: control,
  });

  // const { drawerCriteria } = useAppSelector((state) => state.drawer);

  const disabledAddMoreExclude = excludedCriteria.fields.length >= 5;
  const disabledAddMoreHighlight = highlightedCriteria.fields.length >= 5;

  function onAddMoreHighlight() {
    highlightedCriteria.append({ value: "" });
  }

  function onRemoveHighlight(index: number) {
    highlightedCriteria.remove(index);
  }

  function onAddMoreExcluded() {
    excludedCriteria.append({ value: "" });
  }

  function onRemoveExcluded(index: number) {
    excludedCriteria.remove(index);
  }

  const isError = useMemo(() => {
    const highlightedCriteriaError = Array.isArray(errors.highlighted_criteria);
    const excludedCriteriaError = Array.isArray(errors.excluded_criteria);
    return highlightedCriteriaError || excludedCriteriaError;
  }, [errors.highlighted_criteria, errors.excluded_criteria]);

  const closeDrawer = useCallback(() => {
    const highlightedCriteriaValues = getValues("highlighted_criteria");
    const excludedCriteriaValues = getValues("excluded_criteria");

    // Check error
    const errorHighlightedCriteria = getFieldState(
      "highlighted_criteria"
    ).error;
    const errorExcludedCriteria = getFieldState("excluded_criteria").error;

    const errorHighlightedCriteriaIndex: number[] = [];
    if (Array.isArray(errorHighlightedCriteria)) {
      errorHighlightedCriteria.forEach((item, index) => {
        if (item) {
          errorHighlightedCriteriaIndex.push(index);
        }
      });
    }

    const errorExcludedCriteriaIndex: number[] = [];
    if (Array.isArray(errorExcludedCriteria)) {
      errorExcludedCriteria.forEach((item, index) => {
        if (item) {
          errorExcludedCriteriaIndex.push(index);
        }
      });
    }

    // Filter error values out
    const includeHighlightedCriteria = highlightedCriteriaValues.filter(
      (item, index) => {
        return (
          item.value?.trim() !== "" &&
          !errorHighlightedCriteriaIndex.includes(index)
        );
      }
    );
    const includeCriterial = excludedCriteriaValues.filter((item, index) => {
      return (
        item.value?.trim() !== "" && !errorExcludedCriteriaIndex.includes(index)
      );
    });

    // Preserve values
    if (includeHighlightedCriteria.length === 0) {
      includeHighlightedCriteria.push({ value: "" });
    }
    if (includeCriterial.length === 0) {
      includeCriterial.push({ value: "" });
    }

    resetField("highlighted_criteria", {
      defaultValue: includeHighlightedCriteria,
    });

    resetField("excluded_criteria", {
      defaultValue: includeCriterial,
    });

    // dispatch(onCloseDrawerCriteria());
  }, [getValues, resetField, getFieldState]);

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
        <h3 className="font-h7 text-[var(--text-title)]">{"body_text__3"}</h3>
      </Row>
      <Divider className="!m-0 !bg-[var(--gray-5)]" />
      <Col span={24} className="max-h-[75vh] overflow-auto">
        <div className="p-[16px] flex flex-col gap-[12px]">
          <h3 className="font-h10 text-[var(--text-title)]">
            {"header_text__13"}
          </h3>
          <span className="font-body2 text-[var(--text-secondary)]">
            {"body_text__5"}
          </span>
          {highlightedCriteria.fields.map((item, index) => (
            <div key={item.id} className="flex flex-col gap-[12px]">
              <Controller
                name={`highlighted_criteria.${index}.value`}
                control={control}
                rules={{
                  maxLength: {
                    value: 255,
                    message: "error_message__9",
                  },
                }}
                render={({ field, fieldState: { error } }) => {
                  return (
                    <div className="w-full">
                      <Row
                        wrap={false}
                        align={"top"}
                        className={clsx(
                          "!py-[13.5px] flex gap-[8px] px-[18px] w-full border-[1px] border-[var(--gray-7)] hover:border-[var(--blue-6)] rounded-[8px] focus:border-[var(--blue-6)] focus-within:border-[var(--blue-6)]",
                          error && "!border-[var(--error)]"
                        )}
                      >
                        {field.value && field.value?.length > 0 && !error ? (
                          <SuccessFillIcon
                            className="flex items-center"
                            fill="var(--success)"
                          />
                        ) : (
                          <AddCircleIcon className="flex items-center" />
                        )}
                        <TextArea
                          ref={field.ref}
                          value={field.value}
                          autoSize={{ minRows: 1 }}
                          placeholder={"placeholder__9"}
                          className="!border-none !p-0 !outline-none !shadow-none !resize-none"
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          status={error ? "error" : undefined}
                        />
                        {highlightedCriteria.fields.length !== 1 && (
                          <button
                            onClick={() => onRemoveHighlight(index)}
                            title="delete-button"
                          >
                            <CloseIcon />
                          </button>
                        )}
                      </Row>
                      {error && (
                        <Row
                          className="mt-[4px] pl-[16px] gap-[4px]"
                          align={"middle"}
                        >
                          <WarningOutlined
                            size={16}
                            color="var(--error)"
                            style={{
                              color: "var(--error)",
                              width: 12,
                              height: 12,
                            }}
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
            </div>
          ))}

          <Button
            variants="text"
            title="add-more"
            className={clsx(
              "!w-fit flex gap-[4px] items-center !p-0",
              !disabledAddMoreHighlight && "!text-[var(--blue-6)]"
            )}
            onClick={onAddMoreHighlight}
            disabled={disabledAddMoreHighlight}
          >
            <AddCircleIcon width={16} height={16} fill="currentColor" />
            <span className="font-button2">{"button__8"}</span>
          </Button>
        </div>

        <Divider className="!m-0 !bg-[var(--gray-5)]" />

        <div className="p-[16px] flex flex-col gap-[12px]">
          <h3 className="font-h10 text-[var(--text-title)]">
            {"placeholder__10"}
          </h3>
          <span className="font-body2 text-[var(--text-secondary)]">
            {"body_text__6"}
          </span>
          {excludedCriteria.fields.map((item, index) => (
            <div key={item.id} className="flex flex-col gap-[12px]">
              <Controller
                name={`excluded_criteria.${index}.value`}
                control={control}
                rules={{
                  maxLength: {
                    value: 255,
                    message: "error_message_limit_char_255",
                  },
                }}
                render={({ field, fieldState: { error } }) => {
                  return (
                    <div className="w-full">
                      <Row
                        wrap={false}
                        align={"top"}
                        className={clsx(
                          "!py-[13.5px] flex gap-[8px] px-[18px] w-full border-[1px] border-[var(--gray-7)] hover:border-[var(--blue-6)] rounded-[8px] focus:border-[var(--blue-6)] focus-within:border-[var(--blue-6)]",
                          error && "!border-[var(--error)]"
                        )}
                      >
                        {field.value && field.value?.length > 0 && !error ? (
                          <CancelFillIcon
                            className="flex items-center"
                            fill="var(--error)"
                          />
                        ) : (
                          <AddCircleIcon className="flex items-center" />
                        )}
                        <TextArea
                          ref={field.ref}
                          value={field.value}
                          autoSize={{ minRows: 1 }}
                          placeholder={"placeholder__9"}
                          className="!border-none !p-0 !outline-none !shadow-none !resize-none"
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          status={error ? "error" : undefined}
                        />
                        {excludedCriteria.fields.length !== 1 && (
                          <button
                            onClick={() => onRemoveExcluded(index)}
                            title="delete-button"
                          >
                            <CloseIcon />
                          </button>
                        )}
                      </Row>
                      {error && (
                        <Row
                          className="mt-[4px] pl-[16px] gap-[4px]"
                          align={"middle"}
                        >
                          <WarningOutlined
                            size={16}
                            color="var(--error)"
                            style={{
                              color: "var(--error)",
                              width: 12,
                              height: 12,
                            }}
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
            </div>
          ))}

          <Button
            variants="text"
            title="add-more"
            className={clsx(
              "!w-fit flex gap-[4px] items-center !p-0",
              !disabledAddMoreExclude && "!text-[var(--blue-6)]"
            )}
            onClick={onAddMoreExcluded}
            disabled={disabledAddMoreExclude}
          >
            <AddCircleIcon width={16} height={16} fill="currentColor" />
            <span className="font-button2">{"button__9"}</span>
          </Button>
        </div>
      </Col>
    </DrawerDrag>
  );
}
