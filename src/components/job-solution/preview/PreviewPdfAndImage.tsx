"use client";

import { Modal, Spin } from "antd";
import { FC, useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { v4 as uuid } from "uuid";
import { CloseIcon } from "@/assets/job-solution/icons/suggested-groups/outline";
// import { useQuery } from "@tanstack/react-query";
// import axiosInstance from "@/utils/axiosInstance";
import { LoadingOutlined } from "@ant-design/icons";
import clsx from "clsx";
// import { getFileTypeFromBlob } from "@/utils/getFileType";
import Image from "next/image";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;

interface Props {
  fileId?: string;
  fileName?: string;
  open: boolean;
  onClose: () => void;
}

const PreviewPdfAndImage: FC<Props> = ({
  fileId,
  onClose,
  open,
  fileName,
}): JSX.Element => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [type] = useState<"pdf" | "image" | "unknown" | null>(null);

  // const { isPending, isFetching, isSuccess } = useQuery({
  //   queryKey: ["repoData", fileId],
  //   queryFn: async () => {
  //     const resume = await axiosInstance.get<Blob>(`/v1/resume/${fileId}`, {
  //       responseType: "blob",
  //     });
  //     const url = URL.createObjectURL(resume.data);
  //     const fileType = getFileTypeFromBlob(resume.data);
  //     setBlobUrl(url);
  //     setType(fileType);
  //     return url;
  //   },
  //   refetchOnWindowFocus: false,
  //   enabled: !!fileId && open,
  //   gcTime: 0,
  //   staleTime: 0,
  // });

  const hideModal = () => {
    onClose();
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Initial measurement (for mobile)
    const raf = requestAnimationFrame(() => {
      const newWidth = el.getBoundingClientRect().width;
      if (newWidth > 0) setWidth(newWidth);
    });

    // Setup ResizeObserver
    const observer = new ResizeObserver(() => {
      const newWidth = el.getBoundingClientRect().width;
      if (newWidth > 0) setWidth(newWidth);
    });

    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  // Render Conditionally
  if (!fileId && open) {
    return <>Please provide a file id.</>;
  }

  if ((type === "unknown" || !type) && open) {
    return <>Unknown file type.</>;
  }

  return (
    <>
      {open && (
        <div className="fixed z-[9999] top-0 left-0 flex px-[16px] py-[18px] gap-2">
          <button className="cursor-pointer" onClick={hideModal}>
            <CloseIcon fill="var(--white-100)" />
          </button>
          {width > 0 && (
            <div
              className="text-[var(--white-100)] font-h7 overflow-hidden whitespace-nowrap text-ellipsis flex-auto"
              style={{
                maxWidth: width - 90,
              }}
            >
              {fileName}
            </div>
          )}
        </div>
      )}

      <Modal
        destroyOnClose
        wrapClassName={clsx("!top-[80px]", "inline-flex")}
        afterOpenChange={(open) => {
          if (!open) {
            setBlobUrl(null);
          }
        }}
        maskClosable={false}
        width={"100%"}
        style={{
          maxWidth: "100vw",
          margin: "0 auto",
          padding: 0,
        }}
        open={open}
        onOk={hideModal}
        onCancel={hideModal}
        closable={false}
        footer={null}
        centered
        styles={{
          mask: {
            backgroundColor: "var(--black-85)",
          },
          content: {
            backgroundColor: "transparent",
            padding: 0,
            margin: "0px 16px 16px 16px",
            boxShadow: "none",
          },
        }}
      >
        {/* Render loading */}
        {!blobUrl && (
          <div className="flex items-center justify-center w-full min-h-[100vh]">
            <Spin
              indicator={
                <LoadingOutlined
                  style={{ fontSize: 24, color: "var(--blue-6)" }}
                  spin
                />
              }
            />
          </div>
        )}

        {/* Render pdf file */}
        <div
          ref={containerRef}
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          {blobUrl && type === "pdf" && (
            <Document
              file={blobUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={<></>}
            >
              {new Array(numPages).fill(0).map((_, i) => {
                const pageNumber = i + 1;
                const key = uuid();
                return (
                  <Page
                    className={"mb-4"}
                    key={key}
                    pageNumber={pageNumber}
                    width={width > 0 ? width : 200}
                    renderMode="canvas"
                  />
                );
              })}
            </Document>
          )}
        </div>

        {/* Render image file */}
        <div
          ref={containerRef}
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          {blobUrl && type === "image" && (
            <Image
              src={blobUrl}
              width={Math.min(width, 600)}
              alt={fileName ?? "resume"}
              height={Math.min(width, 600)}
            ></Image>
          )}
        </div>
      </Modal>
    </>
  );
};

export default PreviewPdfAndImage;
