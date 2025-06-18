import { SuccessFillIcon } from "@/assets/job-solution/icons/suggested-groups/filled";
// import useTranslation from "@/hooks/useTranslation";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { ReactNode } from "react";
import styled from "styled-components";

export interface DetailInputProps {
  title: string | ReactNode;
  description?: string;
  input: ReactNode;
  loading?: boolean;
  saved?: boolean;
}

const DetailInput = ({
  title,
  description,
  input,
  loading = false,
  saved = false,
}: DetailInputProps) => {
  // const { t } = useTranslation("account");
  return (
    <DetailInputBox className={loading ? "loading" : ""}>
      <div className="title-line">
        <h1 className="font-h10 detail-input-title">
          {title}
          {loading && (
            <span className="spinner-inline">
              <Spin
                spinning={loading}
                indicator={
                  <LoadingOutlined
                    style={{ fontSize: 16, color: "var(--blue-6)" }}
                    spin={true}
                  />
                }
              />
            </span>
          )}
          <SavedStatus className={saved ? "visible" : ""}>
            <span className="min-w-[24px] min-h-[24px] flex items-center">
              <SuccessFillIcon width={16} height={16} fill="var(--success)" />
            </span>
            <span className="font-body5 text-[var(--success)]">
              {"account_confirm_message_saved"}
            </span>
          </SavedStatus>
        </h1>
      </div>

      {description && (
        <p className="font-body2 detail-input-description">{description}</p>
      )}
      <fieldset
        disabled={loading}
        style={{ all: "unset", display: "contents" }}
      >
        {input}
      </fieldset>
    </DetailInputBox>
  );
};

export default DetailInput;

const DetailInputBox = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  .detail-input-title {
    color: var(--text-primary);
    display: inline;
    font-weight: var(--weight-medium);
    word-break: break-word;
    white-space: normal;
  }

  .spinner-inline {
    display: inline-flex;
    min-width: 24px;
    justify-content: center;
    align-items: center;
    vertical-align: text-bottom;
    margin-left: 4px; /* spacing between text and spinner */
    line-height: 0;
  }

  .detail-input-description {
    color: var(--text-secondary);
    font-weight: var(--weight-regular);
    margin-top: -4px;
  }

  &.loading {
    pointer-events: none;
  }
`;

const SavedStatus = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  opacity: 0;
  transform: translateY(3px);
  transition: opacity 0.3s ease-in-out;
  pointer-events: none;

  &.visible {
    opacity: 1;
    /* transform: translateY(0); */
  }

  span {
    font-size: 14px;
    color: var(--success);
  }
`;
