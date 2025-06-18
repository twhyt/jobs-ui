// import { useAppDispatch, useAppSelector } from "@/store/redux-hook";
import DrawerDrag from "./DrawerDrag";
// import { onCloseDrawerSignOutAll } from "@/store/slices/drawerSlice";
import { Col, Row, Spin } from "antd";
import { useCallback, useEffect, useState } from "react";
import Button from "../button/Button";
import { useRouter } from "next/router";
import { LoadingOutlined } from "@ant-design/icons";
// import useTranslation from "@/hooks/useTranslation";
// import axiosAuthInstance from "@/utils/axiosAuthInstance";

const DrawerSignOut = () => {
  const router = useRouter();
  // const dispatch = useAppDispatch();
  // const { t } = useTranslation("drawer");
  // const { drawerSignOutAll } = useAppSelector((state) => state.drawer);
  const [loading, setLoading] = useState(false);

  const CloseDrawer = useCallback(() => {
    // dispatch(onCloseDrawerSignOutAll());
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
              <div className="p-[16px] font-h7">
                {"drawer_login_sign_out_title"}
              </div>
              <div className="p-[16px] flex flex-col gap-[12px]">
                <Button
                  size="large"
                  className="w-full"
                  isDanger
                  onClick={async () => {
                    setLoading(true);
                    // await axiosAuthInstance.post("/auth/sign-out/all");
                    setTimeout(() => {
                      localStorage.clear();
                      sessionStorage.clear();
                      document.cookie.split(";").forEach((cookie) => {
                        const [name] = cookie.split("=");
                        document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
                      });
                      router.push(`${process.env.authURL}/${router.locale}`);
                      // setLoading(false);
                    }, 100);
                  }}
                >
                  {"drawer_login_sign_out_button_sign_out"}
                </Button>
                <Button
                  size="large"
                  variant="quiet"
                  className="w-full"
                  onClick={CloseDrawer}
                >
                  {"drawer_login_sign_out_button_cancel"}
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

export default DrawerSignOut;
