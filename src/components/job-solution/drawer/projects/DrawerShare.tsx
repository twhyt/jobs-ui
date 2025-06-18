import { FC, useState } from "react";
import DrawerDrag from "../DrawerDrag";
// import Button from "@/components/custom-antd/Button";
import { Switch } from "antd";
import { IconType, SharePublicResponse } from "@/types/job-solution/project";
import TextFieldAndCopy from "@/components/job-solution/input/TextFieldAndCopy";
// import axiosInstance from "@/utils/axiosInstance";
// import useTranslation from "@/hooks/useTranslation";

interface Props {
  open: boolean;
  onClickClose: () => void;
  sharePublicData: SharePublicResponse | null;
  variants: IconType;
  projectId: string;
  publicId: string;
  shareValue: string;
  setShareValue: any;
  setTempIsShare: any;
  isSwitch: boolean;
  setIsSwitch: any;
  setShowStatement: any;
  showStatement: "view" | "copied" | "copy";
  setIsClickShare: any;
  infoSuccess: (projectName: string) => void;
  infoError: (projectName: string) => void;
  projectName: string;
}

const DrawerShare: FC<Props> = ({
  onClickClose,
  // onClickDone,
  // onClickCancel,
  open,
  variants,
  // sharePublicData,
  projectId,
  publicId,
  shareValue,
  setShareValue,
  setTempIsShare,
  isSwitch,
  // setIsSwitch,
  showStatement,
  setShowStatement,
  setIsClickShare,
  // infoSuccess,
  // infoError,
  projectName,
}): JSX.Element => {
  // const { t } = useTranslation("project");
  const [, setTempCopy] = useState(false);
  const [loading, setLoading] = useState(false);

  const onClose = () => {
    setShowStatement("view");
    onClickClose();
  };

  // console.log(
  //   "isSwitch",
  //   isSwitch,
  //   "tempCopy",
  //   tempCopy,
  //   "tempSwitch",
  //   tempSwitch
  // );
  // console.log("showStatement", showStatement, "shareValue", shareValue);

  // const fileType = useMemo(() => {
  //   switch (variants) {
  //     case "resume_extractor":
  //       return "resume-extractor";
  //     case "candidate checker":
  //       return "candidate-checker";
  //     case "jd_generator":
  //       return "smart-jd-generator";
  //     default:
  //       return "";
  //   }
  // }, [variants]);

  return (
    <DrawerDrag open={open} onClose={onClose}>
      <div className="flex flex-col px-4">
        <div className="flex flex-col gap-1 py-4">
          <h5 className="font-subtitle2">{"header_text"}</h5>
          {(variants === "resume_extractor" ||
            variants === "candidate checker") && (
            <>
              <div>
                <p className="font-body5">{"body_text__2"}</p>
                <p className="font-body5" style={{ fontWeight: 500 }}>
                  {"body_text__2_2"}
                </p>
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col pt-6 pb-[33px] gap-[8px]">
          {shareValue.length > 0 && (
            <div className="flex flex-row justify-between items-center">
              <p className="font-h10">{"body_text__3"}</p>
              <Switch
                checkedChildren={"toggle"}
                unCheckedChildren={"toggle__1"}
                disabled={loading}
                checked={isSwitch}
                onChange={async () => {
                  // try {
                  //   await axiosInstance
                  //     .patch(`/v1/project/${projectId}/share-link`, {
                  //       ///////////////////////////////////////////////////////////////
                  //       is_shared: checked,
                  //     })
                  //     .then(() => {
                  //       setIsSwitch(checked);
                  //       setShareValue(
                  //         `${process.env.assistURL}/share/${publicId}?type=${fileType}`
                  //       );

                  //       if (checked) {
                  //         infoSuccess(projectName); // Sharing was enabled
                  //       } else {
                  //         infoError(projectName); // Sharing was disabled
                  //       }
                  //     });
                  // } catch (error) {
                  //   console.log(error);
                  // }
                  console.log("");
                }}
              />
            </div>
          )}
          <TextFieldAndCopy
            value={shareValue}
            setValue={setShareValue}
            projectId={projectId}
            publicId={publicId}
            isSwitch={isSwitch}
            type={variants}
            setTempCopy={setTempCopy}
            setShowStatement={setShowStatement}
            showStatement={showStatement}
            setIsClickShare={setIsClickShare}
            projectName={projectName}
            setTempIsShare={setTempIsShare}
            setLoading={setLoading}
            loading={loading}
          />
          {publicId !== null && (
            <div className="font-body5 text-[var(--text-secondary)]">
              {"body_text__4"}
            </div>
          )}
        </div>
      </div>
    </DrawerDrag>
  );
};

export default DrawerShare;
