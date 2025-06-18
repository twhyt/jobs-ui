import { ReactNode } from "react";
import styled from "styled-components";
import Button from "../button/Button";
import { SuccessFillIcon } from "@/assets/job-solution/icons/suggested-groups/filled";
// import useTranslation from "@/hooks/useTranslation";

export interface DetailInputProps {
  title: string | ReactNode;
  description?: string;
  value?: string;
  value2?: string;
  valueFallback?: string;
  value2Fallback?: string;
  handleClickChange: () => void;
  isSaved?: boolean;
}

const DetailText = ({
  title,
  description,
  value,
  value2,
  valueFallback = "Not added",
  value2Fallback = "Not added",
  handleClickChange,
  isSaved,
}: DetailInputProps) => {
  // const { t } = useTranslation("account");
  const isValueValid = value?.trim();
  const isValue2Valid = value2?.trim();
  return (
    <DetailTextBox>
      <div className="detail-text">
        <h1 className="font-h10 detail-text-title">
          {title}

          <SavedStatus className={isSaved ? "visible" : ""}>
            <span className="min-w-[24px]">
              <SuccessFillIcon width={16} height={16} fill="var(--success)" />
            </span>
            <span className="font-body5 text-[var(--success)]">
              {"account_confirm_message_saved"}
            </span>
          </SavedStatus>
        </h1>
        {description && (
          <p className="font-body2 detail-text-description">{description}</p>
        )}
        <div
          className={`font-body5 overflow-anywhere ${
            isValueValid
              ? "text-[var(--text-title)]"
              : "text-[var(--text-disable)]"
          }`}
        >
          {isValueValid || valueFallback}
        </div>

        {value2 !== undefined && (
          <div
            className={`font-body5 overflow-anywhere ${
              isValue2Valid
                ? "text-[var(--text-title)]"
                : "text-[var(--text-disable)]"
            }`}
          >
            {isValue2Valid || value2Fallback}
          </div>
        )}
      </div>
      <Button
        variant="secondary"
        size="medium"
        onClick={handleClickChange}
        className="!px-[10px]"
      >
        {isValueValid || isValue2Valid
          ? "account_button_change"
          : "account_button_add"}
      </Button>
    </DetailTextBox>
  );
};

export default DetailText;

const DetailTextBox = styled.div`
  padding: 16px;
  display: flex;
  /* gap: 4px; */
  align-items: center;
  position: relative;

  .detail-text {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .detail-text-title {
    color: var(--text-primary);
    display: inline;
    word-break: break-word;
    white-space: normal;
  }

  .detail-text-description {
    color: var(--text-secondary);
    /* font-weight: var(--weight-medium); */
    font-weight: var(--weight-regular);
  }
`;

const SavedStatus = styled.span`
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
  gap: 4px;
  opacity: 0;
  /* transform: translateY(-2px); */
  transition: opacity 0.3s ease-in-out;
  pointer-events: none;

  &.visible {
    opacity: 1;
    /* transform: translateY(0); */
  }

  span {
    color: var(--success);
  }
`;
