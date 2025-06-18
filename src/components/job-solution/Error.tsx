import EmergencyIcon from "@/assets/job-solution/icons/emergency";
import React from "react";
import BaseButton from "./BaseButton";
import Meta from "./meta";
// import useTranslation from "@/hooks/useTranslation";

const ErrorComponent = ({
  title,
  subtitle,
  description,
  button_label,
  buttonOnClick,
}: {
  title?: string;
  subtitle: string;
  description: string;
  button_label?: string;
  buttonOnClick?: () => void;
}) => {
  // const { t } = useTranslation("common");

  return (
    <>
      <Meta title={"metadata_404"} />

      <div className="justify-center h-[100vh] flex flex-col gap-[32px] items-center">
        <EmergencyIcon />
        <div className="flex flex-col items-center gap-[16px] w-full px-[40px]">
          {title && <div className="font-subtitle2">{title}</div>}
          <div className="font-h1">{subtitle}</div>
          <div className="font-body1">{description}</div>
          {button_label && (
            <BaseButton
              className="!w-full !h-[38.8px] !mt-[16px] cursor-pointer"
              onClick={buttonOnClick}
            >
              {button_label}
            </BaseButton>
          )}
        </div>
      </div>
    </>
  );
};

export default ErrorComponent;
