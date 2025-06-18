import { FC, useState } from "react";
import {
  FileResumeType,
  ResponseFileListItem,
} from "@/types/job-solution/candidate-checker";
// import useTranslation from "@/hooks/useTranslation";
import {
  AddCircleIcon,
  CloseIcon,
  DescriptionIcon,
} from "@/assets/job-solution/icons/suggested-groups/outline";
import clsx from "clsx";
import styled from "styled-components";
import DrawerAddMultipleResume from "../drawer/DrawerAddMultipleResume";
// import { onCloseDrawerAddJobDetail } from "@/store/slices/drawerSlice";
// import { useAppDispatch } from "@/store/redux-hook";
import dynamic from "next/dynamic";

const PreviewPdfAndImage = dynamic(
  () => import("../preview/PreviewPdfAndImage"),
  { ssr: false }
);

interface Props {
  item: {
    inputId: string;
    resume: ResponseFileListItem | null;
  };
  jd_cd_status: boolean;
  itemIndex: number;
  onSelectFileWithMultiple(index: number, data: FileResumeType): void;
  onRemoveResume(index: number): void;
}

const UploadMultipleResume: FC<Props> = ({
  item,
  jd_cd_status,
  itemIndex,
  onSelectFileWithMultiple,
  onRemoveResume,
}): JSX.Element => {
  // const { t } = useTranslation("candidateChecker");
  const [openDrawer, setOpenDrawer] = useState(false);
  // const dispatch = useAppDispatch();
  const [openPreview, setOpenPreview] = useState(false);
  const [renderPreview, setRenderPreview] = useState(false);

  function clickAddResume() {
    // dispatch(onCloseDrawerAddJobDetail());
    setOpenDrawer(true);
  }

  function handleOpenPreviewFile(open: boolean) {
    setOpenPreview(open);

    if (open) {
      setRenderPreview(open);
    } else {
      setTimeout(() => {
        setRenderPreview(open);
      }, 300);
    }
  }

  return (
    <>
      <DetailInputBox>
        {item.resume === null ? (
          <ButtonResume
            onClick={clickAddResume}
            disabled={item.resume !== null || jd_cd_status}
          >
            <AddCircleIcon fill={jd_cd_status ? "currentColor" : undefined} />
            <span className="font-body5 text-[var(--text-disable)]">
              {"placeholder_add_a_resume"}
            </span>
          </ButtonResume>
        ) : (
          <ButtonResume
            onClick={() => {
              handleOpenPreviewFile(true);
            }}
            disabled={jd_cd_status}
            className="px-[16px] flex-nowrap py-[14px] flex gap-[16px] border-[1px] rounded-[8px] border-[var(--gray-7)]"
          >
            <DescriptionIcon fill={jd_cd_status ? "currentColor" : undefined} />
            <span
              className={clsx(
                "flex-auto font-body5 text-[var(--text-title)] overflow-hidden whitespace-nowrap text-ellipsis text-start",
                jd_cd_status && "!text-[var(--text-disable)]"
              )}
            >
              {item.resume?.original_name ?? "Untitle"}
            </span>
            <button
              title="clear-file"
              onClick={(e) => {
                e.stopPropagation();
                onRemoveResume(itemIndex);
              }}
              disabled={jd_cd_status}
              type="button"
            >
              <CloseIcon fill={jd_cd_status ? "currentColor" : undefined} />
            </button>
          </ButtonResume>
        )}
      </DetailInputBox>

      <DrawerAddMultipleResume
        onSelectFile={(resume) => {
          onSelectFileWithMultiple(itemIndex, {
            inputId: item.inputId,
            resume: resume,
          });
        }}
        drawerAddResumeOpen={openDrawer}
        onCloseDrawer={() => {
          setOpenDrawer(false);
        }}
      />

      {renderPreview && (
        <PreviewPdfAndImage
          onClose={() => handleOpenPreviewFile(false)}
          fileName={item.resume?.original_name}
          fileId={item.resume?.file_id}
          open={openPreview}
        />
      )}
    </>
  );
};

const ButtonResume = styled.button`
  padding: 13.5px 16px;
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 16px;

  border: 1px solid var(--gray-7);
  border-radius: var(--border-radius-s);

  &:active {
    border-color: var(--blue-6);
  }

  &:disabled {
    border-color: var(--gray-6);
    color: var(--text-disable);
  }

  @media screen and (hover: hover) {
    &:hover:not(:disabled) {
      cursor: pointer;
      border-color: var(--blue-6);
    }
  }
`;

const DetailInputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  .detail-input-title {
    color: var(--text-primary);
  }

  .detail-input-description {
    color: var(--text-secondary);
    /* font-weight: var(--weight-medium); */
    font-weight: var(--weight-regular);
  }
`;

export default UploadMultipleResume;
