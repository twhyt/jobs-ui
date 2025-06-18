import { Modal } from "antd";
import { FC, useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { v4 as uuid } from "uuid";
import { CloseIcon } from "@/assets/job-solution/icons/suggested-groups/outline";
import { DownloadOutlined } from "@ant-design/icons";
import Image from "next/image";
import clsx from "clsx";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import dayjs from "dayjs";
import { useRouter } from "next/router";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;

interface Props {
  fileId?: string;
  fileName?: string;
  date?: string;
  open: boolean;
  onClose: () => void;
}

const PreviewAndDownload: FC<Props> = ({
  // fileId,
  fileName,
  open,
  onClose,
  date,
}) => {
  const router = useRouter();
  const [numPages, setNumPages] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [type, setType] = useState<"pdf" | "image" | "unknown" | null>(null);
  const [scale, setScale] = useState(1);
  dayjs.locale(router.locale);

  //   const { isPending, isFetching, isSuccess } = useQuery({
  //     queryKey: ["filePreview", fileId],
  //     queryFn: async () => {
  //       const response = await axiosInstance.get<Blob>(`/v1/resume/${fileId}`, {
  //         responseType: "blob",
  //       });
  //       const url = URL.createObjectURL(response.data);
  //       setBlobUrl(url);
  //       setType(getFileTypeFromBlob(response.data));
  //       return url;
  //     },
  //     refetchOnWindowFocus: false,
  //     enabled: !!fileId && open,
  //     gcTime: 0,
  //     staleTime: 0,
  //   });
  // console.log(fileId);

  useEffect(() => {
    if (open) {
      const testUrl = "/cash-receipt-form.pdf"; // must be in your public folder or statically served
      setBlobUrl(testUrl);
      setType("pdf");
    }
  }, [open]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    // console.log("Document loaded. Total pages:", numPages);
    // setCurrentPage(1);
  };

  const onPageLoadSuccess = ({ pageNumber }: { pageNumber: number }) => {
    // if (pageNumber !== currentPage) {
    //   console.log("Page loaded:", pageNumber); // Debugging
    //   setCurrentPage(pageNumber); // Update currentPage only when necessary
    // }
    console.log("Page loaded:", pageNumber);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateWidth = () => {
      const newWidth = el.getBoundingClientRect().width;
      if (newWidth > 0) setWidth(newWidth);
    };

    const observer = new ResizeObserver(updateWidth);
    observer.observe(el);
    updateWidth();

    return () => observer.disconnect();
    //   }, [isSuccess]);
  }, [open]);

  const hideModal = () => {
    onClose();
    setBlobUrl(null);
    setNumPages(null);
    setType(null);
  };

  return (
    <>
      {/* {open && !isFetching && ( */}
      {open && (
        <div className="fixed z-[9999] top-0 left-0 flex flex-wrap px-[16px] py-[16px] gap-2 items-start w-full justify-between">
          <div className="">
            <div className="text-[var(--gray-1)] font-h10 truncate flex-auto ">
              {fileName}
            </div>
            <div className="text-[var(--gray-1)] font-body2 truncate flex-auto ">
              {dayjs(date).format("DD MMM YYYY")}
            </div>
          </div>
          <div className="flex gap-[8px] items-center">
            <button
              onClick={() => setScale((s) => Math.max(0.25, s - 0.25))}
              className=" hover:text-blue-300 px-2 cursor-pointer w-4 h-4 flex items-center justify-center  rounded-[4px]"
              title="Zoom Out"
            >
              {/* − */}
            </button>
            <button
              onClick={() => setScale((s) => Math.min(4, s + 0.25))}
              className=" hover:text-blue-300 px-2 cursor-pointer w-4 h-4 flex items-center justify-center  rounded-[4px]"
              title="Zoom In"
            >
              {/* + */}
            </button>
            {blobUrl && (
              <a
                href={blobUrl}
                download={fileName ?? "file.pdf"}
                className="text-white hover:text-blue-300"
                title="Download"
              >
                <DownloadOutlined
                  style={{ fontSize: 16, color: "var(--white-100)" }}
                />
              </a>
            )}
            <button className="cursor-pointer" onClick={hideModal}>
              <CloseIcon fill="var(--white-100)" />
            </button>
          </div>
        </div>
      )}

      <Modal
        destroyOnClose
        open={open}
        onCancel={hideModal}
        footer={null}
        closable={false}
        centered
        maskClosable={false}
        wrapClassName={clsx("!top-[78px]", "inline-flex")}
        width="100%"
        style={{ maxWidth: "100vw", padding: 0 }}
        styles={{
          mask: { backgroundColor: "var(--black-85)" },
          content: {
            backgroundColor: "transparent",
            padding: 0,
            margin: "0px 16px 16px 16px",
            boxShadow: "none",
          },
        }}
      >
        {/* {(isPending || !blobUrl) && (
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
        )} */}

        {/* PDF Preview */}
        {blobUrl && type === "pdf" && (
          <div
            ref={containerRef}
            className="w-full max-h-[calc(100vh-60px)] px-[16px] overflow-auto"
            // className="w-full h-[calc(100vh-80px)] overflow-auto cursor-grab"
            // onMouseDown={(e) => {
            //   const el = e.currentTarget;
            //   el.style.cursor = "grabbing";
            //   const startX = e.pageX - el.scrollLeft;
            //   const startY = e.pageY - el.scrollTop;

            //   const onMouseMove = (moveEvent: MouseEvent) => {
            //     el.scrollLeft = startX - moveEvent.pageX;
            //     el.scrollTop = startY - moveEvent.pageY;
            //   };

            //   const onMouseUp = () => {
            //     el.style.cursor = "grab";
            //     document.removeEventListener("mousemove", onMouseMove);
            //     document.removeEventListener("mouseup", onMouseUp);
            //   };

            //   document.addEventListener("mousemove", onMouseMove);
            //   document.addEventListener("mouseup", onMouseUp);
            // }}
          >
            <div className="flex justify-center w-full min-w-fit">
              <Document
                file={blobUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={<></>}
              >
                {Array.from({ length: numPages ?? 0 }, (_, i) => {
                  const pageNumber = i + 1;
                  return (
                    <Page
                      key={uuid()}
                      pageNumber={pageNumber}
                      //   width={width > 0 ? width : 200}
                      scale={scale}
                      renderMode="canvas"
                      className="w-full max-w-full"
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                      onLoadSuccess={() => onPageLoadSuccess({ pageNumber })}
                    />
                  );
                  //   }
                })}
              </Document>
            </div>
          </div>
        )}

        {/* Image Preview */}
        {blobUrl && type === "image" && (
          <div
            ref={containerRef}
            className="flex items-center justify-center w-full"
          >
            <Image
              src={blobUrl}
              width={Math.min(width, 600)}
              height={Math.min(width, 600)}
              alt={fileName ?? "preview"}
            />
          </div>
        )}

        {/* Unknown file type */}
        {blobUrl && type === "unknown" && (
          <div className="text-center text-white py-10">
            Unsupported file format.
          </div>
        )}
      </Modal>
    </>
  );
};

export default PreviewAndDownload;
