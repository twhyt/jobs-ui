// import { useAppDispatch, useAppSelector } from "@/store/redux-hook";
import DrawerDrag from "./DrawerDrag";
// import {
//   onCloseDrawerEditRemovePhoto,
//   onOpenDrawerRemovePhoto,
// } from "@/store/slices/drawerSlice";
import { Col, Row } from "antd";
import { useCallback, useEffect } from "react";
import Button from "../button/Button";
// import useTranslation from "@/hooks/useTranslation";

const DrawerEditRemovePhoto = ({
  handleFileChange,
  fileInputRef,
}: {
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}) => {
  // const dispatch = useAppDispatch();
  // const { t } = useTranslation("drawer");
  // const { drawerEditRemovePhoto } = useAppSelector((state) => state.drawer);

  const CloseDrawer = useCallback(() => {
    // dispatch(onCloseDrawerEditRemovePhoto());
  }, []);

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

  return (
    <>
      <DrawerDrag open={true} onClose={CloseDrawer}>
        <Row>
          <Col span={24}>
            <div>
              <div className="p-[16px] !pt-0 flex flex-col gap-[12px]">
                <Button
                  size="large"
                  className="w-full"
                  isDanger
                  onClick={() => {
                    // dispatch(onCloseDrawerEditRemovePhoto());
                    // dispatch(onOpenDrawerRemovePhoto());
                  }}
                >
                  {"drawer_profile_picture_action_button_remove"}
                </Button>
                <input
                  type="file"
                  id="sharedUpload"
                  ref={fileInputRef}
                  accept="image/jpeg,image/png,image/jpg"
                  className="hidden"
                  onChange={(e) => {
                    handleFileChange(e);
                    CloseDrawer();
                  }}
                />
                <label htmlFor="fileUpload" className="cursor-pointer">
                  <Button
                    size="large"
                    className="w-full"
                    variant="secondary"
                    onClick={() => {
                      if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                        fileInputRef.current.click();
                      }
                    }}
                  >
                    {"drawer_profile_picture_action_button_change"}
                  </Button>
                </label>
                <Button
                  size="large"
                  variant="quiet"
                  className="w-full"
                  onClick={CloseDrawer}
                >
                  {"drawer_profile_picture_action_button_cancel"}
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </DrawerDrag>
    </>
  );
};

export default DrawerEditRemovePhoto;
