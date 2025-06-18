// import { useAppDispatch, useAppSelector } from "@/store/redux-hook";
import DrawerDrag from "./DrawerDrag";
// import { onCloseDrawerRemovePhoto } from "@/store/slices/drawerSlice";
import { Col, Row, Spin } from "antd";
import { useCallback, useEffect, useState } from "react";
import Button from "../button/Button";
import { LoadingOutlined } from "@ant-design/icons";
// import useTranslation from "@/hooks/useTranslation";
// import axiosAuthInstance from "@/utils/axiosAuthInstance";
// import { useQueryClient } from "@tanstack/react-query";
// import { GET_PROFILE_PICTURE } from "@/utils/queryKey";

const DrawerRemovePhoto = ({
  setPreviewUrl,
  setHasImage,
}: {
  setPreviewUrl: any;
  setHasImage: any;
}) => {
  // const queryClient = useQueryClient();
  // const dispatch = useAppDispatch();
  // const { t } = useTranslation("drawer");
  // const { drawerRemovePhoto } = useAppSelector((state) => state.drawer);
  const [loading, setLoading] = useState(false);

  const CloseDrawer = useCallback(() => {
    // dispatch(onCloseDrawerRemovePhoto());
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
              <div className="p-[16px] !pt-0 font-h7">
                {"drawer_profile_picture_remove_description"}
              </div>
              <div className="p-[16px] flex flex-col gap-[12px]">
                <Button
                  size="large"
                  className="w-full"
                  isDanger
                  onClick={async () => {
                    setLoading(true);
                    // try {
                    //   await axiosAuthInstance.delete(
                    //     "/v1/account/picture-profile/remove"
                    //   );
                    //   queryClient.invalidateQueries({
                    //     queryKey: [GET_PROFILE_PICTURE],
                    //   });
                    // } catch (error) {
                    //   console.log(error);
                    // } finally {
                    setPreviewUrl(null);
                    setHasImage(false);
                    setLoading(false);
                    CloseDrawer();
                    // }
                  }}
                >
                  {loading ? (
                    <>
                      <span className="mr-[10px]">
                        <Spin
                          indicator={
                            <LoadingOutlined
                              style={{
                                fontSize: 16,
                                color: "var(--text-disable)",
                              }}
                              spin
                            />
                          }
                        />
                      </span>
                      {"drawer_profile_picture_remove_button_remove"}
                    </>
                  ) : (
                    "drawer_profile_picture_remove_button_remove"
                  )}
                </Button>
                <Button
                  size="large"
                  variant="quiet"
                  className="w-full"
                  onClick={CloseDrawer}
                >
                  {"drawer_profile_picture_remove_button_cancel"}
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </DrawerDrag>
      {loading && (
        <div className="w-screen h-screen flex justify-center items-center z-[9999] absolute top-0 left-0 bg-[var(--foreground-2)]">
          <Spin
            indicator={
              <LoadingOutlined
                style={{ fontSize: 48, color: "var(--blue-6)" }}
                spin
              />
            }
          />
        </div>
      )}
    </>
  );
};

export default DrawerRemovePhoto;
