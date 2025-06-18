import { FC, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Button from "../custom-antd/Button";
import ThreeDotColorLoading from "@/components/job-solution/loading";
import { IconType } from "@/types/job-solution/project";
// import axiosInstance from "@/utils/axiosInstance";
// import useTranslation from "@/hooks/useTranslation";
import { useCustomMessage } from "../message/toast";

type TextFieldAndCopyProps = {
  value: string;
  setValue: any;
  projectId: string;
  publicId: string;
  isSwitch: boolean;
  type: IconType;
  setTempCopy: any;
  setShowStatement: any;
  showStatement: "view" | "copied" | "copy";
  setIsClickShare: any;
  projectName: string;
  setTempIsShare: any;
  loading: boolean;
  setLoading: any;
};

const TextFieldAndCopy: FC<TextFieldAndCopyProps> = ({
  value,
  setValue,
  // projectId,
  type,
  publicId,
  isSwitch,
  setTempCopy,
  setShowStatement,
  showStatement,
  setIsClickShare,
  projectName,
  setTempIsShare,
  loading,
  setLoading,
}): JSX.Element => {
  // const { t } = useTranslation("project");
  const [generatedValue, setGeneratedValue] = useState<string | undefined>(
    value
  );
  const [copied, setCopied] = useState(false);
  const showCustomMessage = useCustomMessage();

  const fileType = useMemo(() => {
    switch (type) {
      case "resume_extractor":
        return "resume-extractor";
      case "candidate checker":
        return "candidate-checker";
      case "jd_generator":
        return "smart-jd-generator";
      default:
        return "";
    }
  }, [type]);

  useEffect(() => {
    setCopied(false);
  }, [publicId]);

  const handleCreateLink = async () => {
    setLoading(true);

    const finalPublicId = publicId;

    // if (publicId === null) {
    //   try {
    //     const { data } = await axiosInstance.patch(
    //       `/v1/project/${projectId}/share-link`,
    //       {
    //         is_shared: true,
    //         public_id: null,
    //       }
    //     );
    //     finalPublicId = data.public_id;
    //   } catch (error) {
    //     console.log(error);
    //     setLoading(false);
    //     return;
    //   }
    // } else if (publicId !== null) {
    //   try {
    //     const { data } = await axiosInstance.patch(
    //       `/v1/project/${projectId}/share-link`,
    //       {
    //         is_shared: true,
    //         public_id: publicId,
    //       }
    //     );
    //     finalPublicId = data.public_id;
    //   } catch (error) {
    //     console.log(error);
    //     setLoading(false);
    //     return;
    //   }
    // }
    setTimeout(() => {
      // Simulate creating the link
      const newLink = `${process.env.assistURL}/share/${finalPublicId}?type=${fileType}`; // Replace with real logic if needed
      setGeneratedValue(newLink);
      setValue(newLink);
      setTempCopy(true);
      setLoading(false);
      setTempIsShare(true);
      if (publicId === null) {
        showCustomMessage({
          type: "success",
          label: "confirm_message".replace("{{project_name}}", projectName),
          hasCloseIcon: true,
        });
      }
      setShowStatement("copy");
    }, 1000);
  };

  const copyText = () => {
    setShowStatement("copied");
    if (generatedValue) {
      navigator.clipboard
        .writeText(generatedValue)
        .then(() => {
          setCopied(true);
          setTimeout(() => {
            setCopied(false);
            setShowStatement("copy");
          }, 2000);
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    }
  };

  const handleClick = () => {
    setIsClickShare(true);
    if (showStatement === "view") {
      handleCreateLink();
    } else {
      copyText();
    }
  };

  const Statement = useMemo(() => {
    switch (showStatement) {
      case "view":
        if (publicId !== null || value) {
          return {
            icon: (
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.7144 8.49978C13.3666 7.84767 13.6926 7.06199 13.6926 6.14276C13.6926 5.22352 13.3666 4.43784 12.7144 3.78573C12.0623 3.13362 11.2767 2.80757 10.3574 2.80757C9.43818 2.80757 8.65251 3.13362 8.0004 3.78573L6.58619 5.19995C6.45262 5.33351 6.38584 5.49065 6.38584 5.67135C6.38584 5.85206 6.45262 6.00919 6.58619 6.14276C6.71975 6.27632 6.87688 6.3431 7.05759 6.3431C7.2383 6.3431 7.39543 6.27632 7.52899 6.14276L8.94321 4.72854C9.33605 4.33571 9.80745 4.13929 10.3574 4.13929C10.9074 4.13929 11.3788 4.33571 11.7716 4.72854C12.1645 5.12138 12.3609 5.59278 12.3609 6.14276C12.3609 6.69273 12.1645 7.16413 11.7716 7.55697L10.3574 8.97118C10.2239 9.10475 10.1571 9.26188 10.1571 9.44259C10.1571 9.62329 10.2239 9.78043 10.3574 9.91399C10.491 10.0476 10.6481 10.1143 10.8288 10.1143C11.0095 10.1143 11.1667 10.0476 11.3002 9.91399L12.7144 8.49978ZM9.88602 7.55697C10.0196 7.4234 10.0864 7.26627 10.0864 7.08557C10.0864 6.90486 10.0196 6.74773 9.88602 6.61416C9.75245 6.4806 9.59532 6.41381 9.41461 6.41381C9.23391 6.41381 9.07677 6.4806 8.94321 6.61416L6.11478 9.44259C5.98122 9.57615 5.91443 9.73329 5.91443 9.91399C5.91443 10.0947 5.98122 10.2518 6.11478 10.3854C6.24835 10.519 6.40548 10.5857 6.58619 10.5857C6.76689 10.5857 6.92403 10.519 7.05759 10.3854L9.88602 7.55697ZM9.41461 11.7996C9.54818 11.666 9.61496 11.5089 9.61496 11.3282C9.61496 11.1475 9.54818 10.9904 9.41461 10.8568C9.28105 10.7232 9.12391 10.6565 8.94321 10.6565C8.7625 10.6565 8.60537 10.7232 8.4718 10.8568L7.05759 12.271C6.66475 12.6639 6.19335 12.8603 5.64338 12.8603C5.0934 12.8603 4.622 12.6639 4.22916 12.271C3.83633 11.8782 3.63991 11.4068 3.63991 10.8568C3.63991 10.3068 3.83633 9.83543 4.22916 9.44259L5.64338 8.02837C5.77694 7.89481 5.84372 7.73767 5.84372 7.55697C5.84372 7.37626 5.77694 7.21913 5.64338 7.08557C5.50981 6.952 5.35268 6.88522 5.17197 6.88522C4.99127 6.88522 4.83413 6.952 4.70057 7.08557L3.28635 8.49978C2.63424 9.15189 2.30819 9.93756 2.30819 10.8568C2.30819 11.776 2.63424 12.5617 3.28635 13.2138C3.93846 13.8659 4.72414 14.192 5.64338 14.192C6.56261 14.192 7.34829 13.8659 8.0004 13.2138L9.41461 11.7996Z"
                  fill={isSwitch ? "white" : "var(--gray-6)"}
                />
              </svg>
            ),
            label: "button__5", // "Update Link"
          };
        } else if (publicId === null) {
          return {
            icon: (
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.7144 8.49978C13.3666 7.84767 13.6926 7.06199 13.6926 6.14276C13.6926 5.22352 13.3666 4.43784 12.7144 3.78573C12.0623 3.13362 11.2767 2.80757 10.3574 2.80757C9.43818 2.80757 8.65251 3.13362 8.0004 3.78573L6.58619 5.19995C6.45262 5.33351 6.38584 5.49065 6.38584 5.67135C6.38584 5.85206 6.45262 6.00919 6.58619 6.14276C6.71975 6.27632 6.87688 6.3431 7.05759 6.3431C7.2383 6.3431 7.39543 6.27632 7.52899 6.14276L8.94321 4.72854C9.33605 4.33571 9.80745 4.13929 10.3574 4.13929C10.9074 4.13929 11.3788 4.33571 11.7716 4.72854C12.1645 5.12138 12.3609 5.59278 12.3609 6.14276C12.3609 6.69273 12.1645 7.16413 11.7716 7.55697L10.3574 8.97118C10.2239 9.10475 10.1571 9.26188 10.1571 9.44259C10.1571 9.62329 10.2239 9.78043 10.3574 9.91399C10.491 10.0476 10.6481 10.1143 10.8288 10.1143C11.0095 10.1143 11.1667 10.0476 11.3002 9.91399L12.7144 8.49978ZM9.88602 7.55697C10.0196 7.4234 10.0864 7.26627 10.0864 7.08557C10.0864 6.90486 10.0196 6.74773 9.88602 6.61416C9.75245 6.4806 9.59532 6.41381 9.41461 6.41381C9.23391 6.41381 9.07677 6.4806 8.94321 6.61416L6.11478 9.44259C5.98122 9.57615 5.91443 9.73329 5.91443 9.91399C5.91443 10.0947 5.98122 10.2518 6.11478 10.3854C6.24835 10.519 6.40548 10.5857 6.58619 10.5857C6.76689 10.5857 6.92403 10.519 7.05759 10.3854L9.88602 7.55697ZM9.41461 11.7996C9.54818 11.666 9.61496 11.5089 9.61496 11.3282C9.61496 11.1475 9.54818 10.9904 9.41461 10.8568C9.28105 10.7232 9.12391 10.6565 8.94321 10.6565C8.7625 10.6565 8.60537 10.7232 8.4718 10.8568L7.05759 12.271C6.66475 12.6639 6.19335 12.8603 5.64338 12.8603C5.0934 12.8603 4.622 12.6639 4.22916 12.271C3.83633 11.8782 3.63991 11.4068 3.63991 10.8568C3.63991 10.3068 3.83633 9.83543 4.22916 9.44259L5.64338 8.02837C5.77694 7.89481 5.84372 7.73767 5.84372 7.55697C5.84372 7.37626 5.77694 7.21913 5.64338 7.08557C5.50981 6.952 5.35268 6.88522 5.17197 6.88522C4.99127 6.88522 4.83413 6.952 4.70057 7.08557L3.28635 8.49978C2.63424 9.15189 2.30819 9.93756 2.30819 10.8568C2.30819 11.776 2.63424 12.5617 3.28635 13.2138C3.93846 13.8659 4.72414 14.192 5.64338 14.192C6.56261 14.192 7.34829 13.8659 8.0004 13.2138L9.41461 11.7996Z"
                  fill={isSwitch ? "white" : "var(--gray-6)"}
                />
              </svg>
            ),
            label: "button__2", // "Create Link"
          };
        }
        break;
      case "copied":
        return {
          icon: (
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.40289 10.9843L4.10917 8.75765C3.85359 8.50954 3.44727 8.50954 3.19169 8.75765C2.9361 9.00576 2.9361 9.4002 3.19169 9.64831L5.93759 12.3139C6.19318 12.562 6.60605 12.562 6.86163 12.3139L13.8083 5.57674C14.0639 5.32863 14.0639 4.93419 13.8083 4.68608C13.5527 4.43797 13.1464 4.43797 12.8908 4.68608L6.40289 10.9843Z"
                fill="#1A34FF"
              />
            </svg>
          ),
          label: "button__7", // "Copied"
        };
      case "copy":
        return {
          icon: (
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 12.4997C5.63333 12.4997 5.31944 12.3691 5.05833 12.108C4.79722 11.8469 4.66667 11.533 4.66667 11.1663V3.16634C4.66667 2.79967 4.79722 2.48579 5.05833 2.22467C5.31944 1.96356 5.63333 1.83301 6 1.83301H12C12.3667 1.83301 12.6806 1.96356 12.9417 2.22467C13.2028 2.48579 13.3333 2.79967 13.3333 3.16634V11.1663C13.3333 11.533 13.2028 11.8469 12.9417 12.108C12.6806 12.3691 12.3667 12.4997 12 12.4997H6ZM6 11.1663H12V3.16634H6V11.1663ZM3.33333 15.1663C2.96667 15.1663 2.65278 15.0358 2.39167 14.7747C2.13056 14.5136 2 14.1997 2 13.833V5.16634C2 4.97745 2.06389 4.81912 2.19167 4.69134C2.31944 4.56356 2.47778 4.49967 2.66667 4.49967C2.85556 4.49967 3.01389 4.56356 3.14167 4.69134C3.26944 4.81912 3.33333 4.97745 3.33333 5.16634V13.833H10C10.1889 13.833 10.3472 13.8969 10.475 14.0247C10.6028 14.1525 10.6667 14.3108 10.6667 14.4997C10.6667 14.6886 10.6028 14.8469 10.475 14.9747C10.3472 15.1025 10.1889 15.1663 10 15.1663H3.33333Z"
                fill={isSwitch ? "white" : "var(--gray-6)"}
              />
            </svg>
          ),
          label: "button__6", // Copy link
        };
      default:
        break;
    }
  }, [showStatement, isSwitch]);

  return (
    <div className="relative">
      <TextField
        placeholder={`${process.env.assistURL}/share/...`}
        value={generatedValue}
        readOnly
        disabled={!isSwitch}
      />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 p-2 ">
        <div className="relative flex flex-row min-w-[86px] items-center justify-end right-0 rounded-full bg-white">
          <Button
            variants={copied ? "secondary" : "primary"}
            style={{
              minWidth: "62px",
              maxHeight: "35px",
              paddingInline: "12px",
            }}
            size="small"
            onClick={handleClick}
            disabled={!isSwitch}
          >
            {loading ? (
              <ThreeDotColorLoading />
            ) : (
              <div className="flex flex-row gap-[6px] items-center">
                {Statement?.icon}
                <span>{Statement?.label}</span>
              </div>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

const TextField = styled.input`
  width: 100%;
  height: 100%;
  padding: 13.5px 13.5px 13.5px 1rem;
  border: 1px solid var(--gray-7);
  border-radius: 64px;
  font-size: 1rem;
  color: var(--text-primary);
  background-color: var(--white-100);
  &:focus {
    border-color: var(--blue-6);
    outline: none;
  }
  &:disabled {
    /* background-color: var(--gray-3); */
    color: var(--gray-6);
    border-color: var(--gray-6);
  }
`;

export default TextFieldAndCopy;
