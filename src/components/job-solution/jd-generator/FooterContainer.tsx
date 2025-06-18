import { FC, useState } from "react";
import Button from "../custom-antd/Button";
import { Divider } from "antd";
import { EFeatureName } from "@/types/job-solution/package";
import CreditRemain from "../credit/CreditRemain";
import { useFormContext } from "react-hook-form";
import ThreeDotColorLoading from "../loading";
import { v4 } from "uuid";
import { FormValues, Step } from "@/types/job-solution/global";
// import useTranslation from "@/hooks/useTranslation";

interface Props {
  step: Step;
  isGenerated: boolean;
  onChangeOpenPreview: () => void;
  disabledNextButton: boolean;
  handleStep: (step: Step) => void;
  onSaveJd: () => Promise<void>;
  onRegenerate: () => void;
  isSaving: boolean;
  isRegenerating: boolean;
}

const FooterContainer: FC<Props> = ({
  isGenerated,
  step,
  disabledNextButton,
  onChangeOpenPreview,
  handleStep,
  onSaveJd,
  isSaving,
  isRegenerating,
  onRegenerate,
}): JSX.Element => {
  const form = useFormContext<FormValues>();
  // const { t } = useTranslation("jdGen");
  // const { t: tCommon } = useTranslation("common");
  const selectedJobTitleId = form.watch("selectedJobTitleId");
  const selectedJobDescriptionId = form.watch("selectedJobDescriptionId");
  const [isOpeningNewTab, setIsOpeningNewTab] = useState(false);

  const generateNewProjectName = (originalName?: string): string => {
    const MAX_LENGTH = 200;
    const prefix = "Copy of ";

    const baseName =
      originalName?.trim() && originalName.trim().toLowerCase() !== "untitled"
        ? originalName.trim()
        : "untitled";

    let newName = prefix + baseName;

    if (newName.length > MAX_LENGTH) {
      const remainingLengthForBase = MAX_LENGTH - prefix.length;
      newName =
        prefix + baseName.substring(0, Math.max(0, remainingLengthForBase));
    }

    return newName;
  };

  const onEditInNew = async () => {
    setIsOpeningNewTab(true);
    const formValues = form.getValues();
    const newProjectName = generateNewProjectName(formValues.projectName);
    const currentInput = { ...formValues, projectName: newProjectName };
    const editInNewId = v4();
    try {
      localStorage.setItem(
        `edit_in_new_jd_gen_${editInNewId}`,
        JSON.stringify(currentInput)
      );
      const newUrl = new URL(window.location.href);
      newUrl.pathname = "/smart-jd-generator";
      newUrl.searchParams.set("edit-in-new-id", editInNewId);

      window.open(newUrl.toString(), "_blank", "noopener,noreferrer");
      setIsOpeningNewTab(false);
    } catch (error) {
      console.log(error);
    }
  };

  const iconColor = isRegenerating ? "var(--black-25)" : "var(--blue-6)";

  const disabledConfirmButton =
    !selectedJobTitleId && !selectedJobDescriptionId;

  return (
    <>
      {/* Footer Container */}
      {!isGenerated && step === "user_input" && (
        <Button
          variants="primary"
          size="large"
          onClick={() => {
            onChangeOpenPreview();
          }}
          disabled={disabledNextButton}
        >
          {"jd_gen_button_next"}
        </Button>
      )}
      {isGenerated && step === "jd_generated" && (
        <div className="flex flex-col gap-6">
          <Divider className="!m-0 !bg-[var(--gray-5)]" />
          <div className="flex flex-col gap-2">
            <Button
              variants="primary"
              size="large"
              onClick={() => {
                handleStep("user_select_options");
              }}
              disabled={isRegenerating}
            >
              {"jd_gen_result_button_save"}
            </Button>
            <Button
              variants="secondary"
              size="large"
              className="flex gap-2"
              onClick={onRegenerate}
              disabled={isRegenerating}
            >
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.0013 13.5339C6.51241 13.5339 5.2513 13.0172 4.21797 11.9839C3.18464 10.9505 2.66797 9.68941 2.66797 8.20052C2.66797 6.71163 3.18464 5.45052 4.21797 4.41719C5.2513 3.38385 6.51241 2.86719 8.0013 2.86719C8.76797 2.86719 9.5013 3.02552 10.2013 3.34219C10.9013 3.65885 11.5013 4.11163 12.0013 4.70052V3.53385C12.0013 3.34497 12.0652 3.18663 12.193 3.05885C12.3207 2.93108 12.4791 2.86719 12.668 2.86719C12.8569 2.86719 13.0152 2.93108 13.143 3.05885C13.2707 3.18663 13.3346 3.34497 13.3346 3.53385V6.86719C13.3346 7.05608 13.2707 7.21441 13.143 7.34219C13.0152 7.46996 12.8569 7.53385 12.668 7.53385H9.33463C9.14575 7.53385 8.98741 7.46996 8.85963 7.34219C8.73186 7.21441 8.66797 7.05608 8.66797 6.86719C8.66797 6.6783 8.73186 6.51997 8.85963 6.39219C8.98741 6.26441 9.14575 6.20052 9.33463 6.20052H11.468C11.1124 5.5783 10.6263 5.08941 10.0096 4.73385C9.39297 4.3783 8.72352 4.20052 8.0013 4.20052C6.89019 4.20052 5.94575 4.58941 5.16797 5.36719C4.39019 6.14497 4.0013 7.08941 4.0013 8.20052C4.0013 9.31163 4.39019 10.2561 5.16797 11.0339C5.94575 11.8116 6.89019 12.2005 8.0013 12.2005C8.75686 12.2005 9.44852 12.0089 10.0763 11.6255C10.7041 11.2422 11.1902 10.7283 11.5346 10.0839C11.6235 9.9283 11.7485 9.81996 11.9096 9.75885C12.0707 9.69774 12.2346 9.69496 12.4013 9.75052C12.5791 9.80608 12.7069 9.92274 12.7846 10.1005C12.8624 10.2783 12.8569 10.445 12.768 10.6005C12.3124 11.4894 11.6624 12.2005 10.818 12.7339C9.97352 13.2672 9.03464 13.5339 8.0013 13.5339Z"
                  fill={iconColor}
                />
              </svg>

              <span>{"jd_gen_result_button_retry"}</span>
            </Button>

            <CreditRemain feature={EFeatureName.JC_GENERETOR_GENERATE} />
          </div>
          <Divider className="!m-0 !bg-[var(--gray-5)]" />
          <div className="flex gap-2 items-center">
            <span>{"jd_gen_result_body_text_or"}</span>

            <Button
              variants="secondary"
              size="large"
              className="flex gap-2"
              onClick={onEditInNew}
              disabled={isRegenerating}
              loading={
                isOpeningNewTab && {
                  icon: <ThreeDotColorLoading color="bg-[var(--blue-6)]" />,
                }
              }
            >
              {!isOpeningNewTab && (
                <div className="flex gap-2 items-center">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.6672 5.5987L4.73385 11.532C4.61163 11.6543 4.45608 11.7154 4.26719 11.7154C4.0783 11.7154 3.92274 11.6543 3.80052 11.532C3.6783 11.4098 3.61719 11.2543 3.61719 11.0654C3.61719 10.8765 3.6783 10.7209 3.80052 10.5987L9.73385 4.66536H4.66719C4.4783 4.66536 4.31997 4.60148 4.19219 4.4737C4.06441 4.34592 4.00052 4.18759 4.00052 3.9987C4.00052 3.80981 4.06441 3.65148 4.19219 3.5237C4.31997 3.39592 4.4783 3.33203 4.66719 3.33203H11.3339C11.5227 3.33203 11.6811 3.39592 11.8089 3.5237C11.9366 3.65148 12.0005 3.80981 12.0005 3.9987V10.6654C12.0005 10.8543 11.9366 11.0126 11.8089 11.1404C11.6811 11.2681 11.5227 11.332 11.3339 11.332C11.145 11.332 10.9866 11.2681 10.8589 11.1404C10.7311 11.0126 10.6672 10.8543 10.6672 10.6654V5.5987Z"
                      fill={iconColor}
                    />
                  </svg>
                  <span style={{ fontSize: 16 }}>
                    {"jd_gen_result_button_edit_in_new"}
                  </span>
                </div>
              )}
            </Button>
          </div>
        </div>
      )}
      {isGenerated && step === "user_select_options" && (
        <div className="flex flex-col gap-6">
          <Divider className="!m-0 !bg-[var(--gray-5)]" />
          <div className="flex gap-2">
            <Button
              disabled={isSaving}
              variants="secondary"
              size="large"
              className="flex gap-2"
              onClick={() => {
                handleStep("jd_generated");
              }}
            >
              <span>{"jd_gen_result_save_button_cancel"}</span>
            </Button>
            <Button
              disabled={disabledConfirmButton}
              variants="primary"
              size="large"
              onClick={onSaveJd}
              loading={isSaving && { icon: <ThreeDotColorLoading /> }}
            >
              {!isSaving && "jd_gen_result_save_button_save"}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default FooterContainer;
