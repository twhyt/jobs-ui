import React, { useState } from "react";
import BaseButton from "../BaseButton";
import { Divider, Row } from "antd";
import BankLabel from "@public/BankLabel.png";
import Image from "next/image";
import {
  CheckedIcon,
  ContentCopyIcon,
} from "@/assets/job-solution/icons/suggested-groups/outline";
// import QrCode from "@public/qrExample.png";
// import JanieQR from "@public/janie-qr.png";
import { PackageInfoType, TopupInfoType } from "@/types/job-solution/payment";
// import useTranslation from "@/hooks/useTranslation";

const BankAccountPaymant = ({
  packageInfo,
  setUploadSlip,
  topupInfo,
}: {
  packageInfo: PackageInfoType;
  topupInfo: TopupInfoType;
  setUploadSlip: (type: boolean) => void;
}) => {
  // const { t } = useTranslation("payment");
  const [copied, setCopied] = useState(false);
  // const imgRef = useRef<HTMLImageElement | null>(null);
  const originalBankAccountNumber = "531-1-43473-2"; // Your number with dashes
  const textToCopy = originalBankAccountNumber.replace(/-/g, ""); // Remove dashes
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500); // Reset after 2 sec
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  // const saveImage = () => {
  //   if (!imgRef.current) return;

  //   // Create a canvas
  //   const canvas = document.createElement("canvas");
  //   const ctx = canvas.getContext("2d");
  //   if (!ctx) return;

  //   // Set canvas size to image size
  //   const img = imgRef.current;
  //   canvas.width = img.naturalWidth;
  //   canvas.height = img.naturalHeight;

  //   // Draw the image onto the canvas
  //   ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);

  //   // Convert canvas to Data URL (PNG format)
  //   const dataUrl = canvas.toDataURL("image/png");

  //   // const win = window.open();
  //   // if (win) {
  //   //   // win.document.write(
  //   //   //   `<html><body style="margin:0"><img src="${dataUrl}" style="width:100%" /></body></html>`
  //   //   // );
  //   //   const html = `
  //   //   <html>
  //   //     <head><title>QR Code</title></head>
  //   //     <body style="margin:0; display:flex; justify-content:center; align-items:center; height:100vh;">
  //   //       <img src="${dataUrl}" style="width:100%; max-width:500px;" />
  //   //     </body>
  //   //   </html>
  //   // `;
  //   // win.document.open();
  //   // win.document.write(html);
  //   // win.document.close();
  //   // const newWindow = window.open();
  //   // if (newWindow) {
  //   //   const doc = newWindow.document;

  //   //   // Create the basic structure
  //   //   const html = doc.createElement("html");
  //   //   const body = doc.createElement("body");
  //   //   body.style.margin = "0";
  //   //   body.style.display = "flex";
  //   //   body.style.justifyContent = "center";
  //   //   body.style.alignItems = "center";
  //   //   body.style.height = "100vh";

  //   //   const imgEl = doc.createElement("img");
  //   //   imgEl.src = dataUrl;
  //   //   imgEl.style.maxWidth = "500px";
  //   //   imgEl.style.width = "100%";

  //   //   body.appendChild(imgEl);
  //   //   html.appendChild(body);
  //   //   doc.body.replaceWith(body); // Replace the existing body
  //   // } else {
  //   // fallback for download
  //   const link = document.createElement("a");
  //   link.href = dataUrl;
  //   link.download = "EdVISORY_QR.png";
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  //   // }
  // };

  // const saveImage2 = async () => {
  //   if (!imgRef.current) return;

  //   const canvas = document.createElement("canvas");
  //   const ctx = canvas.getContext("2d");
  //   if (!ctx) return;

  //   const img = imgRef.current;
  //   canvas.width = img.naturalWidth;
  //   canvas.height = img.naturalHeight;
  //   ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);

  //   const dataUrl = canvas.toDataURL("image/png");
  //   const blob = await (await fetch(dataUrl)).blob();
  //   const file = new File([blob], "EdVISORY_QR.png", { type: "image/png" });

  //   // if (
  //   //   navigator.canShare &&
  //   //   navigator.canShare({ files: [file] }) &&
  //   //   navigator.share
  //   // ) {
  //   // }

  //   const canShareFile =
  //     typeof navigator !== "undefined" &&
  //     typeof navigator.share === "function" &&
  //     typeof navigator.canShare === "function" &&
  //     navigator.canShare({ files: [file] });

  //   console.log("canShareFile", canShareFile, navigator);

  //   if (canShareFile) {
  //     try {
  //       await navigator.share({
  //         title: "QR Code",
  //         text: "Scan this QR code to pay",
  //         files: [file],
  //       });
  //       return;
  //     } catch (err) {
  //       console.error("Share failed:", err);
  //     }
  //   }

  //   //     try {
  //   //   await navigator.share({
  //   //     title: "QR Code",
  //   //     text: "Scan this QR code to pay",
  //   //     files: [file],
  //   //   });
  //   //   return;
  //   // } catch (err) {
  //   //   console.error("Share failed:", err);
  //   // }

  //   // Fallback: download link if share is not supported or fails
  //   // const link = document.createElement("a");
  //   // link.href = dataUrl;
  //   // link.download = "EdVISORY_QR.png";
  //   // document.body.appendChild(link);
  //   // link.click();
  //   // document.body.removeChild(link);
  // };

  return (
    <>
      <div className="flex flex-col gap-[32px]">
        <div className="flex flex-col gap-[4px]">
          <h1 className="font-h5 text-[var(--text-title)]">
            {"payment_bank_account_title"}
          </h1>
          <p className="font-body2 text-[var(--text-title)]">
            {"payment_bank_account_description"}
          </p>
        </div>
        <div>
          <div className="flex flex-col gap-[16px]">
            <Image
              priority
              unoptimized
              src={BankLabel}
              width={295}
              height={48}
              alt="bank label"
              className="w-full !h-auto"
            />
            <div className="flex justify-center text-center font-h5 text-[var(--text-title)]">
              {"payment_bank_account_krungsri"}
            </div>
            <Divider
              style={{ margin: " 0", backgroundColor: "var(--gray-5)" }}
            />
            <div className="flex justify-between">
              <span className="font-body4 text-[var(--text-title)] w-[60px]">
                {"payment_bank_account_account"}
              </span>

              <div className="font-body1 text-[var(--blue-6)] flex gap-[8px] items-center">
                {originalBankAccountNumber}
                <span
                  className="text-[var(--blue-6)] cursor-pointer"
                  onClick={handleCopy}
                >
                  {copied ? (
                    <Row align={"middle"}>
                      <CheckedIcon fill="var(--blue-6)" />
                      <p className="font-button4 text-[var(--blue-6)]">
                        {"payment_bank_account_button_copied"}
                      </p>
                    </Row>
                  ) : (
                    <ContentCopyIcon />
                  )}
                </span>
              </div>
            </div>

            <div className="flex justify-between">
              <span className="font-body4 text-[var(--text-title)] w-[60px]">
                {"payment_bank_account_name"}
              </span>

              <div className="font-body1 text-[var(--text-title)]">
                {"payment_bank_account_edv"}
              </div>
            </div>

            <div className="font-body2 text-[var(--text-title)] flex justify-between">
              <span className="font-body4 text-[var(--text-title)] min-w-[60px]">
                {"payment_bank_account_amount"}
              </span>
              ฿{" "}
              {packageInfo
                ? packageInfo?.cost.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                : topupInfo?.cost.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
            </div>
          </div>
          {/* <Divider
            style={{ margin: "12px 0", backgroundColor: "var(--gray-5)" }}
          />
          <div className="p-[16px] flex flex-col justify-center items-center gap-[8px]">
            <Image
              priority
              unoptimized
              // src={QrCode}
              src={JanieQR}
              width={128}
              height={128}
              alt="qr code"
              ref={imgRef}
            />
            <button
              onClick={saveImage2}
              className="font-button2 !text-[var(--blue-6)] cursor-pointer"
            >
              {("payment_bank_account_button_save_qr")}
            </button>
          </div>
          <Divider
            style={{ margin: "12px 0 0", backgroundColor: "var(--gray-5)" }}
          /> */}
        </div>
      </div>
      <BaseButton
        className="!h-[38.8px] !w-full !mt-[31.2px]"
        onClick={() => {
          setUploadSlip(true);
        }}
      >
        <span className="font-button2 text-[var(--gray-1)]">
          {"payment_bank_account_button_upload"}
        </span>
      </BaseButton>
    </>
  );
};

export default BankAccountPaymant;
