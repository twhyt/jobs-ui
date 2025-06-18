// MessageProvider.tsx
import React, { createContext, useContext } from "react";
import { message } from "antd";
import { v4 } from "uuid";

type ShowMessageParams = {
  type: "success" | "error";
  //   key?: string;
  label: string;
  //   className: string;
  hasCloseIcon: boolean;
};
type MessageContextType = {
  showCustomMessage: (params: ShowMessageParams) => void;
};

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const useCustomMessage = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useCustomMessage must be used within MessageProvider");
  }
  return context.showCustomMessage;
};

export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [messageApi, contextHolder] = message.useMessage();

  const showCustomMessage = ({
    type,
    // key = Date.now().toString(),
    label,
    // className,
    hasCloseIcon = true,
  }: ShowMessageParams) => {
    const messageId = v4();
    messageApi.open({
      type,
      key: messageId,
      icon:
        type === "success" ? (
          <span className="min-w-[16px] max-w-[16px] self-start mt-[4px]">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.06732 9.20016L5.63398 7.76683C5.51176 7.64461 5.35621 7.5835 5.16732 7.5835C4.97843 7.5835 4.82287 7.64461 4.70065 7.76683C4.57843 7.88905 4.51732 8.04461 4.51732 8.2335C4.51732 8.42238 4.57843 8.57794 4.70065 8.70016L6.60065 10.6002C6.73398 10.7335 6.88954 10.8002 7.06732 10.8002C7.2451 10.8002 7.40065 10.7335 7.53398 10.6002L11.3007 6.8335C11.4229 6.71127 11.484 6.55572 11.484 6.36683C11.484 6.17794 11.4229 6.02238 11.3007 5.90016C11.1784 5.77794 11.0229 5.71683 10.834 5.71683C10.6451 5.71683 10.4895 5.77794 10.3673 5.90016L7.06732 9.20016ZM8.00065 14.6668C7.07843 14.6668 6.21176 14.4918 5.40065 14.1418C4.58954 13.7918 3.88398 13.3168 3.28398 12.7168C2.68398 12.1168 2.20898 11.4113 1.85898 10.6002C1.50898 9.78905 1.33398 8.92238 1.33398 8.00016C1.33398 7.07794 1.50898 6.21127 1.85898 5.40016C2.20898 4.58905 2.68398 3.8835 3.28398 3.2835C3.88398 2.6835 4.58954 2.2085 5.40065 1.8585C6.21176 1.5085 7.07843 1.3335 8.00065 1.3335C8.92287 1.3335 9.78954 1.5085 10.6007 1.8585C11.4118 2.2085 12.1173 2.6835 12.7173 3.2835C13.3173 3.8835 13.7923 4.58905 14.1423 5.40016C14.4923 6.21127 14.6673 7.07794 14.6673 8.00016C14.6673 8.92238 14.4923 9.78905 14.1423 10.6002C13.7923 11.4113 13.3173 12.1168 12.7173 12.7168C12.1173 13.3168 11.4118 13.7918 10.6007 14.1418C9.78954 14.4918 8.92287 14.6668 8.00065 14.6668Z"
                fill="#008A20"
              />
            </svg>
          </span>
        ) : (
          <span className="min-w-[16px] max-w-[16px] self-start mt-[4px]">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 3.29193L12.7401 11.7065H3.25986L8 3.29193ZM2.17083 11.0597C1.68611 11.9199 2.29043 13 3.25986 13H12.7401C13.7096 13 14.3139 11.9199 13.8292 11.0597L9.08904 2.64516C8.60432 1.78495 7.39568 1.78495 6.91096 2.64516L2.17083 11.0597ZM7.3705 6.53227V7.82581C7.3705 8.18154 7.65378 8.47259 8 8.47259C8.34623 8.47259 8.6295 8.18154 8.6295 7.82581V6.53227C8.6295 6.17654 8.34623 5.88549 8 5.88549C7.65378 5.88549 7.3705 6.17654 7.3705 6.53227ZM7.3705 9.76613H8.6295V11.0597H7.3705V9.76613Z"
                fill="#FF4D4F"
              />
            </svg>
          </span>
        ),
      content: (
        <div className="flex items-center" onClick={(e) => e.stopPropagation()}>
          <span className="w-full text-start font-body2">{label}</span>
          {hasCloseIcon && (
            <span
              className="cursor-pointer min-w-[16px] max-w-[16px]"
              onClick={(e) => {
                e.stopPropagation();
                messageApi.destroy(messageId);
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.73385 12.2005L8.00052 8.93385L11.2672 12.2005C11.3894 12.3227 11.545 12.3839 11.7339 12.3839C11.9227 12.3839 12.0783 12.3227 12.2005 12.2005C12.3227 12.0783 12.3839 11.9227 12.3839 11.7339C12.3839 11.545 12.3227 11.3894 12.2005 11.2672L8.93385 8.00052L12.2005 4.73385C12.3227 4.61163 12.3839 4.45608 12.3839 4.26719C12.3839 4.0783 12.3227 3.92274 12.2005 3.80052C12.0783 3.6783 11.9227 3.61719 11.7339 3.61719C11.545 3.61719 11.3894 3.6783 11.2672 3.80052L8.00052 7.06719L4.73385 3.80052C4.61163 3.6783 4.45608 3.61719 4.26719 3.61719C4.0783 3.61719 3.92274 3.6783 3.80052 3.80052C3.6783 3.92274 3.61719 4.0783 3.61719 4.26719C3.61719 4.45608 3.6783 4.61163 3.80052 4.73385L7.06719 8.00052L3.80052 11.2672C3.6783 11.3894 3.61719 11.545 3.61719 11.7339C3.61719 11.9227 3.6783 12.0783 3.80052 12.2005C3.92274 12.3227 4.0783 12.3839 4.26719 12.3839C4.45608 12.3839 4.61163 12.3227 4.73385 12.2005Z"
                  fill="#8C8C8C"
                />
              </svg>
            </span>
          )}
        </div>
      ),
      //   duration: 100,
      style: {
        zIndex: 9999,
      },
      onClick: (e: any) => e.stopPropagation(),
    });

    // setTimeout(() => {
    //   const container = document.querySelector(".ant-message");
    //   if (container && !container.classList.contains(className)) {
    //     container.classList.add(className);
    //   }
    // }, 0);
  };

  return (
    <MessageContext.Provider value={{ showCustomMessage }}>
      {contextHolder}
      {children}
    </MessageContext.Provider>
  );
};
