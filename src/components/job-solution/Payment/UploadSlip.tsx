import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import BaseButton from "../BaseButton";
import TextField from "../input/TextField";
import {
  AddCircleIcon,
  CalendarIcon,
  ScheduleIcon,
} from "@/assets/job-solution/icons/suggested-groups/outline";
import { DatePicker, Spin, TimePicker } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/router";
// import axiosAuthInstance from "@/utils/axiosAuthInstance";
import {
  OrderDetailType,
  PackageInfoType,
  TopupInfoType,
} from "@/types/job-solution/payment";
// import useTranslation from "@/hooks/useTranslation";
import Button from "../button/Button";
import { AddPhotoAlternativeIcon } from "@/assets/job-solution/icons/editor-groups/outlined";
import styled from "styled-components";
import HelpingText from "../text/HelpingText";
// import axios from "axios";

// import dayjs from "dayjs";

const UploadSlip = ({
  packageInfo,
  topupInfo,
  orderId,
  orderData,
}: {
  packageInfo: PackageInfoType;
  topupInfo: TopupInfoType;
  orderId: string;
  orderData: OrderDetailType;
}) => {
  // const { t } = useTranslation("payment");
  const { prefetch, push } = useRouter();
  const [formData, setFormData] = useState({
    slip_file_id: "",
    slips_detail: {
      total_amount: packageInfo ? packageInfo.cost : topupInfo?.cost,
      date_on_slip: "", // "2025-03-25T12:34:56.789Z"
    },
    // file: null as File | null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const [selectedTime, setSelectedTime] = useState<dayjs.Dayjs | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileId] = useState<string>("");
  const [savedOrderId, setSavedOrderId] = useState<string>("");
  //   const [isImageLoading, setIsImageLoading] = useState(false);
  //   const [errors, setErrors] = useState({
  //     amount: "",
  //     date: "",
  //     time: "",
  //     file: "",
  //   });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [slipError, setSlipError] = useState(false);
  const order_id = savedOrderId || orderId;

  // console.log("packageInfo packageInfo", packageInfo, formData);

  useEffect(() => {
    if (!orderId) {
      const savedOrderId = sessionStorage.getItem("orderId");
      if (savedOrderId) {
        setSavedOrderId(savedOrderId);
      }
    }
  }, [savedOrderId]);

  useLayoutEffect(() => {
    if (packageInfo || topupInfo) {
      setFormData({
        ...formData,
        slips_detail: {
          ...formData.slips_detail,
          total_amount: packageInfo?.cost ?? topupInfo?.cost,
        },
      });
    }
  }, [packageInfo, topupInfo]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlipError(false);
    if (!e.target.files) return;

    if (e.target.files) {
      const file = e.target.files[0];

      const maxSizeInMB = 2;
      const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

      if (file.size > maxSizeInBytes) {
        console.error("File is too large. Maximum allowed size is 2MB.");
        // alert("File size must be less than 2MB.");
        setSlipError(true);
        setSelectedFile(null);

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        return;
      }

      setIsLoading(true);
      // setSelectedFile(file);
      // setTimeout(() => setIsLoading(false), 1500);

      const formData = new FormData();
      formData.append("file", file);
      // try {
      //   const res = await axiosAuthInstance.post(
      //     "/payment/slip/upload",
      //     formData,
      //     {
      //       headers: {
      //         "Content-Type": "multipart/form-data",
      //       },
      //     }
      //   );
      //   // console.log("Upload successful!", res.data.file_id);
      //   // setfileId(res.data.file_id);
      //   if (res.status === 200 || res.status === 204) {
      //     setSelectedFile(file); // <-- only set after success
      //     setfileId(res.data.file_id);
      //   } else {
      //     console.error("Unexpected status code:", res.status);
      //     setSlipError(true);
      //   }
      // } catch (error) {
      //   if (axios.isAxiosError(error) && error.response) {
      //     const status = error.response.status;
      //     if (status === 500 || status === 504) {
      //       console.error(`Server error (${status}). Please try again later.`);
      //     } else {
      //       console.error("Upload failed with status:", status);
      //     }
      //   } else {
      //     console.error("Upload failed:", error);
      //   }
      //   setSlipError(true);

      //   if (fileInputRef.current) {
      //     fileInputRef.current.value = "";
      //   }
      // } finally {
      setIsLoading(false);
      // }
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters

    const numberValue = Number(value); // Convert to a number

    setFormData((prev) => ({
      ...prev,
      slips_detail: {
        ...prev.slips_detail,
        total_amount: numberValue, // Update the correct field
      },
    }));
  };

  const updateDateTime = (
    newDate: dayjs.Dayjs | null,
    newTime: dayjs.Dayjs | null
  ) => {
    if (newDate && newTime) {
      const combinedDateTime = newDate
        .hour(newTime.hour())
        .minute(newTime.minute())
        .second(0)
        .millisecond(0)
        .toISOString();

      setFormData((prev) => ({
        ...prev,
        slips_detail: {
          ...prev.slips_detail,
          date_on_slip: combinedDateTime, // Store combined ISO string
        },
      }));
    }
  };

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    setSelectedDate(date);
    updateDateTime(date, selectedTime);
  };

  const handleTimeChange = (time: dayjs.Dayjs | null) => {
    setSelectedTime(time);
    updateDateTime(selectedDate, time);
  };

  //   const validateForm = () => {
  //     const newErrors = {
  //       amount: formData.amount ? "" : "Amount is required",
  //       date: formData.date ? "" : "Date is required",
  //       time: formData.time ? "" : "Time is required",
  //       file: formData.file ? "" : "File is required",
  //     };
  //     setErrors(newErrors);

  //     return !Object.values(newErrors).some((error) => error !== "");
  //   };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fileId) {
      console.error("No file uploaded!");
      return;
    }

    // if (validateForm()) {
    //   console.log("Form Submitted:", formData);
    //   // Handle your form submission logic here
    // } else {
    //   console.log("Form validation failed");
    // }

    // const submissionData = {
    //   ...formData,
    //   slip_file_id: fileId, // Attach the uploaded file ID
    //   public_order_id: order_id,
    // };

    // try {
    //   await axiosAuthInstance.post("/payment/slip/confirm", submissionData);
    //   // console.log("Submission successful!");
    //   // Redirect or show success message here
    // } catch (error) {
    //   console.error("Submission failed:", error);
    // }
    // console.log("Form Submitted:", submissionData);

    sessionStorage.removeItem("orderSummaryComplete");
    sessionStorage.removeItem("QR");
    sessionStorage.removeItem("orderId");

    prefetch("/settings/payment-history");
    push("/settings/payment-history");
  };

  const validateForm =
    formData.slips_detail.total_amount &&
    selectedDate &&
    selectedTime &&
    selectedFile;

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="relative w-full h-full min-h-[604px] flex flex-col justify-between gap-[32px]"
      >
        <div className="flex flex-col gap-[32px] h-full">
          <div className="flex flex-col gap-[4px]">
            <h1 className="font-h5 text-[var(--text-title)]">
              {"payment_upload_slip_title"}
            </h1>
            <p className="font-body2 text-[var(--text-title)]">
              {"payment_upload_slip_description"}
            </p>
          </div>
          <div className="flex flex-col gap-[16px]">
            <div className="flex gap-[4px] font-body2 text-[var(--gray-7)]">
              <span className="font-body4 text-[var(--text-title)] min-w-[60px]">
                {"payment_upload_slip_order_id"}
              </span>
              {orderData ? orderData.public_order_id : order_id}
            </div>
            <TextField
              label={"payment_upload_slip_amount"}
              name="total_amount"
              labelOnTop
              value={
                formData.slips_detail.total_amount === 0 ||
                formData.slips_detail.total_amount === null ||
                formData.slips_detail.total_amount === undefined
                  ? ""
                  : formData.slips_detail.total_amount.toLocaleString("en-US")
              }
              onChange={handleAmountChange}
              suffixIcon={
                <div className="text-[var(--gray-7)] w-[24px] h-[24px] items-center text-center">
                  {"payment_upload_slip_thb"}
                </div>
              }
              disabled={isLoading}
              //   error={!!errors.amount}
              //   helperText={errors.amount}
            />

            <div className="relative">
              {selectedDate && (
                <div
                  className={`font-footnote absolute top-[-8px] left-[10px] z-10 bg-[var(--white-100)] px-[4px] ${
                    isLoading ? "text-[var(--gray-6)]" : "text-[var(--gray-7)]"
                  }`}
                >
                  {"payment_upload_slip_date"}
                </div>
              )}

              <DatePicker
                format="DD MMM YYYY"
                className={`w-full h-[51px] !px-[16px] ${
                  isLoading
                    ? "!bg-transparent !border-[var(--gray-6)]"
                    : "!border-[var(--gray-7)]"
                } `}
                suffixIcon={
                  <CalendarIcon
                    fill={isLoading ? "var(--gray-6)" : "var(--gray-7)"}
                  />
                }
                name="date"
                value={selectedDate}
                onChange={handleDateChange}
                disabled={isLoading}
                allowClear={false}
                placeholder={"payment_upload_slip_date"}
                inputReadOnly
              />
            </div>

            <div className="relative">
              {selectedTime && (
                <div
                  className={`font-footnote absolute top-[-8px] left-[10px] z-10 bg-[var(--white-100)] px-[4px] ${
                    isLoading ? "text-[var(--gray-6)]" : "text-[var(--gray-7)]"
                  } !border-[var(--gray-7)]`}
                >
                  {"payment_upload_slip_time"}
                </div>
              )}
              <TimePicker
                format={"HH:mm"}
                className={`w-full h-[51px] !px-[16px] ${
                  isLoading
                    ? "!bg-transparent !border-[var(--gray-6)]"
                    : "!border-[var(--gray-7)]"
                }`}
                suffixIcon={
                  <ScheduleIcon
                    fill={isLoading ? "var(--gray-6)" : "var(--gray-7)"}
                  />
                }
                name="time"
                value={selectedTime}
                onChange={handleTimeChange}
                disabled={isLoading}
                placeholder={"payment_upload_slip_time"}
                allowClear={false}
                inputReadOnly
              />
            </div>

            <div className="flex flex-col gap-[8px] ">
              <div className="font-body4 text-[var(--text-title)]">
                {"payment_upload_slip_upload"}
              </div>
              <>
                {!selectedFile ? (
                  <>
                    <input
                      type="file"
                      name="file"
                      accept="image/jpeg,image/png,image/jpg"
                      onChange={handleFileChange}
                      className="hidden"
                      id="fileUpload"
                    />
                    <label
                      htmlFor="fileUpload"
                      className={`cursor-pointer flex items-center gap-2 p-3 border ${
                        isLoading
                          ? "border-[var(--gray-6)]"
                          : slipError
                          ? "border-[var(--error)]"
                          : "border-[var(--gray-7)]"
                      } rounded-md`}
                    >
                      <AddCircleIcon
                        fill={isLoading ? "var(--gray-6)" : "var(--gray-7)"}
                      />
                      <span className="font-body5 text-[var(--text-disable)]">
                        {"payment_upload_slip_add"}
                      </span>
                    </label>
                    <>
                      {slipError && ( // ******************************************************
                        <span className="ml-[16px] mt-[-5px]">
                          <HelpingText
                            color="var(--error)"
                            size="12"
                            text={"payment_upload_slip_error_message_2mb"}
                          />
                        </span>
                      )}
                    </>
                  </>
                ) : (
                  <>
                    <div className="p-[12px] border border-gray-300 rounded-md ">
                      {isLoading ? (
                        <div className="flex justify-center items-center w-full min-h-[271px] bg-[var(--blue-1)]">
                          <Spin indicator={<LoadingOutlined spin />} />
                        </div>
                      ) : (
                        <>
                          {selectedFile &&
                            selectedFile.type.startsWith("image/") && (
                              <div className="">
                                <Image
                                  src={URL.createObjectURL(selectedFile)}
                                  width={300}
                                  height={300}
                                  alt="Selected preview"
                                  className="w-full h-auto"
                                />
                              </div>
                            )}
                        </>
                      )}
                    </div>
                    <div className="mt-[24px] self-center">
                      <input
                        type="file"
                        name="file"
                        accept="image/jpeg,image/png,image/jpg"
                        onChange={handleFileChange}
                        className="hidden"
                        id="fileUpload"
                        ref={fileInputRef}
                      />
                      <ButtonCustom
                        variant="secondary"
                        className="flex items-center gap-[10px] cursor-pointer"
                        onClick={() => {
                          fileInputRef.current?.click();
                        }}
                        disabled={isLoading}
                      >
                        <AddPhotoAlternativeIcon />
                        <span>{"payment_upload_slip_button_change_slip"}</span>
                      </ButtonCustom>
                      {/* </label> */}
                    </div>
                  </>
                )}
              </>

              {/* {errors.file && <span className="text-red-500">{errors.file}</span>} */}
            </div>
          </div>
        </div>
        <BaseButton
          className="!h-[38.8px] !w-[calc(100%)] group"
          disabled={isLoading || !validateForm}
          htmlType="submit"
        >
          <span className="font-button2 text-[var(--gray-1)] group-disabled:text-[var(--gray-5)]">
            {"payment_upload_slip_button_submit"}
          </span>
        </BaseButton>
      </form>
    </>
  );
};

export default UploadSlip;

const ButtonCustom = styled(Button)`
  svg {
    path {
      fill: var(--blue-6);
    }
  }

  &:hover {
    svg {
      path {
        fill: var(--blue-5);
      }
    }
  }
  &:disabled {
    svg {
      path {
        fill: var(--text-disable);
      }
    }
  }
`;
