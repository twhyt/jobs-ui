import { Divider, Input, Row, Spin } from "antd";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import styled from "styled-components";
import {
  DescriptionIcon,
  MoreIcon,
} from "@/assets/job-solution/icons/suggested-groups/outline";
import Button from "@/components/job-solution/button/Button";
// import axiosInstance from "@/utils/axiosInstance";
import EmptyIcon from "@/assets/job-solution/icons/empty";
// import useTranslation from "@/hooks/useTranslation";
import DrawerDrag from "@/components/job-solution/drawer/DrawerDrag";
import ResumeUploadProgress from "@/components/job-solution/upload/ResumeUploadProgress";

interface ResponseFileListItem {
  exec_type: string;
  file_id: string;
  original_name: string;
}

// interface ResponseFileList {
//   count: number;
//   items: ResponseFileListItem[];
//   last_page: number;
//   limit: number;
//   page: number;
// }

interface DrawerAddResumeProps {
  handleDrawerAddResume: (open: boolean) => void;
  onSelectFile?: (e: ResponseFileListItem) => void;
  isOpen: boolean;
}

const DrawerAddResume = ({
  onSelectFile,
  isOpen,
  handleDrawerAddResume,
}: DrawerAddResumeProps) => {
  // const { t: resumeExtractionT } = useTranslation("resumeExtraction");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const DivLoadmore = useRef<HTMLDivElement>(null);

  const [fileList, setFileList] = useState<ResponseFileListItem[]>([]);
  const [filterText, setFilterText] = useState<string | undefined>(undefined);
  const [count, setCount] = useState(0);

  const [loading, setLoading] = useState(false);
  const [loadmore, setLoadmore] = useState(false);
  const [page] = useState(0);
  const [maxPage] = useState(0);
  const [onFetch, setOnFetch] = useState(false);
  const [progress, setProgress] = useState(0);

  const helperText = "other__1";

  const CloseDrawer = useCallback(() => {
    setFilterText(undefined);
    setLoading(false);
    setOnFetch(false);
    setCount(0);
    setFileList([]);
    handleDrawerAddResume(false);
  }, [handleDrawerAddResume]);

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

  const ItemFile = useMemo(() => {
    let filteredFiles = fileList;

    if (filterText) {
      filteredFiles = fileList?.filter((file) =>
        file.original_name.toLowerCase().includes(filterText.toLowerCase())
      );
      setCount(filteredFiles.length);
    }

    if (filteredFiles.length === 0 && filterText) {
      return (
        <div className="flex flex-col items-center pt-[32px] pb-[24px]">
          <EmptyIcon />
          <h5 className="font-h9 text-[var(--text-primary)] !mt-[16px]">
            {"title_text__5"}
          </h5>
          <p className="font-body5 text-[var(--text-secondary)] !mt-[8px] whitespace-break-spaces text-center">
            {"description__7"}
          </p>
        </div>
      );
    }

    return filteredFiles?.map((item, index) => {
      return (
        <button
          key={index}
          className="w-full flex flex-nowrap gap-[10px] items-center px-[16px] py-[12px]"
          onClick={() => {
            if (item.file_id && onSelectFile) {
              onSelectFile(item);
              handleDrawerAddResume(false);
            }
          }}
        >
          <DescriptionIcon fill="var(--blue-6)" />
          <span className="flex-auto text-start pr-[5px] overflow-hidden whitespace-nowrap text-ellipsis font-body5 text-[var(--text-primary)]">
            {item?.original_name ?? "Untitle" + (item.exec_type ?? "")}
          </span>
          <MoreIcon />
        </button>
      );
    });
  }, [fileList, filterText, onSelectFile, handleDrawerAddResume]);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // คลิกที่ input[type="file"] ที่ซ่อนอยู่
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setLoading(true);
      const formdata = new FormData();
      formdata.append("file", file);
      // try {
      //   const resume = await axiosInstance.post<{ file_id: string }>(
      //     "/v1/resume/file",
      //     formdata,
      //     {
      //       headers: {
      //         "Content-Type": "multipart/form-data",
      //       },
      //       onUploadProgress: (progressEvent) => {
      //         const percentCompleted = Math.round(
      //           (progressEvent.loaded * 100) / (progressEvent.total ?? 1)
      //         );
      //         setProgress(percentCompleted);
      //       },
      //     }
      //   );

      //   const resumes = await axiosInstance.get<ResponseFileList>("/v1/resume");

      //   const newItem = resumes.data.items.find(
      //     (item) => item.file_id === resume.data.file_id
      //   );

      //   if (newItem) {
      //     setFileList((prev) => [newItem, ...prev]);
      //   }
      // } catch (err) {
      //   console.log(err);
      // } finally {
      setLoading(false);
      setProgress(0);
      // }
    }
  };

  const fetchFileList = useCallback(async () => {
    setOnFetch(true);
    if (!isOpen) return;
    // axiosInstance
    //   .get<ResponseFileList>("/v1/resume")
    //   .then(({ data }) => {
    //     if (data.items) {
    //       setFileList(data.items);
    //       setPage(1);
    //       setMaxPage(data.last_page);
    //     }
    //     if (data.last_page > 1) {
    //       setLoadmore(true);
    //     }
    //   })
    //   .catch(() => {
    //     setFileList([]);
    //   })
    //   .finally(() => {
    setOnFetch(false);
    // });
  }, [isOpen]);

  const fetchFileNextPage = useCallback(async () => {
    setOnFetch(true);
    if (!isOpen) return;
    // axiosInstance
    //   .get<ResponseFileList>("/v1/resume", {
    //     params: {
    //       page: page,
    //     },
    //   })
    //   .then(({ data }) => {
    //     if (data.items) {
    //       setFileList([...fileList, ...data.items]);
    //     }
    //     if (data.last_page > page) {
    //       setLoadmore(true);
    //     }
    //     setPage(page);
    //   })
    //   .catch(() => {
    //     setFileList([]);
    //   })
    //   .finally(() => {
    setOnFetch(false);
    // });
  }, [isOpen]);

  useEffect(() => {
    fetchFileList();
  }, [fetchFileList]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && page < maxPage && loadmore) {
          setLoadmore(false);
          // fetchFileNextPage(page + 1);
          // observer.disconnect(); // หยุดสังเกตเมื่อเห็นครั้งแรก
        }
      },
      { threshold: 0.1 }
    );

    if (DivLoadmore.current) {
      observer.observe(DivLoadmore.current);
    }

    return () => observer.disconnect();
  }, [fetchFileNextPage, maxPage, page, loadmore]);

  return (
    <DrawerDrag open={isOpen} onClose={CloseDrawer}>
      <BoxContent>
        <Row className="p-[16px]">
          <Input
            placeholder={"field_label__2"}
            className="search-input"
            prefix={<SearchOutlined className="search-icon" />}
            onChange={(e) => {
              if (e.target.value.length === 0) {
                setFilterText(undefined);
              } else {
                setFilterText(e.target.value);
              }
            }}
            value={filterText}
          />
        </Row>
        <Row className="px-[16px] py-[8px]">
          <h1 className="font-h9">
            {filterText !== undefined
              ? `${"header_text__12"} ` + count
              : "header_text__11"}
            <Spin spinning={onFetch} />
          </h1>
        </Row>
        <div
          className="w-full min-h-[192px] max-h-[192px] overflow-y-scroll pb-[16px]"
          style={{ maxHeight: filterText ? "50vh" : 192 }}
        >
          <ResumeUploadProgress progress={progress} helperText={helperText} />
          {ItemFile}
          <div ref={DivLoadmore} className="w-full h-[1px]" />
        </div>
        <div className="px-[16px]">
          <Divider className="!m-0 bg-[var(--gray-5)]" />
        </div>
        <Row wrap={false} align={"middle"} className="p-[16px] gap-[12px]">
          <span className="font-button4">{"body_text__7"}</span>
          <label className="w-full text-[14px]">
            <Button
              className="w-full"
              onClick={handleButtonClick}
              disabled={loading}
            >
              {"button__12"}
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </Row>
      </BoxContent>
    </DrawerDrag>
  );
};

const BoxContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

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

export default DrawerAddResume;
