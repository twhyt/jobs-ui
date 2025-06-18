// import { useAppDispatch, useAppSelector } from "@/store/redux-hook";
import DrawerDrag from "./DrawerDrag";
// import { onCloseDrawerDeleteAccount } from "@/store/slices/drawerSlice";
import { Col, Row } from "antd";
import { useCallback, useEffect, useState } from "react";
import Button from "../button/Button";
import TextField from "../input/TextField";
import { WarningIcon } from "@/assets/job-solution/icons/suggested-groups/outline";
// import useTranslation from "@/hooks/useTranslation";
import styled from "styled-components";

const DrawerDeleteAccount = () => {
  // const router = useRouter();
  // const { email } = useAppSelector((state) => state.user);
  // const dispatch = useAppDispatch();
  // const { t } = useTranslation("drawer");
  // const { drawerDeleteAccount } = useAppSelector((state) => state.drawer);
  // const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");

  const CloseDrawer = useCallback(() => {
    setCode("");
    setCodeError("");
    // dispatch(onCloseDrawerDeleteAccount());
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

  const handleSubmit = () => {
    if (code !== "123456") {
      setCodeError("The code you entered is incorrect.");
      return;
    } else {
      CloseDrawer();
    }

    // continue with the valid code
  };

  return (
    <>
      <DrawerDrag open={true} onClose={CloseDrawer}>
        <Row>
          <Col span={24}>
            <div className="p-[16px] flex flex-col gap-[12px]">
              <div className="font-subtitle2">
                {"drawer_login_delete_account_title"}
              </div>
              <CustomParagraph
                className="font-body2"
                dangerouslySetInnerHTML={{
                  __html: "drawer_login_delete_account_decription",
                }}
              />
              <div className="p-[16px] bg-[var(--yellow-1)] border-[1px] border-[var(--warning)] rounded-[8px] flex flex-col gap-[12px]">
                <div className="flex flex-col gap-[4px]">
                  <div className="font-h10">
                    {"drawer_login_delete_account_list_important"}
                  </div>
                  <div className="font-body5">
                    {"drawer_login_delete_account_list_header"}
                  </div>
                </div>
                <div>
                  <ul className="list-disc pl-7 !mb-0">
                    {[
                      "drawer_login_delete_account_list_body1",
                      "drawer_login_delete_account_list_body2",
                      "drawer_login_delete_account_list_body3",
                    ].map((label, index) => (
                      <li key={index}>
                        <span className="font-body5">{label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <CustomParagraph
                className="font-body2"
                dangerouslySetInnerHTML={{
                  __html: "drawer_login_delete_account_body_text",
                }}
              />
              {codeError && (
                <div className="border-[1px] border-[var(--error)] bg-[var(--red-1)] rounded-[4px] px-[16px] py-[9px] flex gap-[10px] items-center">
                  <WarningIcon
                    fill="var(--error)"
                    className="mt-[-1px] min-w-[16px]"
                  />
                  <span className="font-body2">
                    {"drawer_login_delete_account_error_message"}
                  </span>
                </div>
              )}
              <TextField
                label={"drawer_login_delete_account_input_label"}
                type="text"
                labelOnTop
                wantLabelError
                value={code}
                onChange={(e) => {
                  const value = e.target.value;
                  // Allow only numbers and max 6 digits
                  if (/^\d{0,6}$/.test(value)) {
                    setCode(value);
                    setCodeError("");
                  }
                }}
                // error={code.length > 0 && code.length < 6 }
                error={!!codeError}
              />
              <div className="mb-[16px] mt-[28px] flex gap-[12px]">
                <Button
                  variant="quiet"
                  size="large"
                  className="w-full"
                  onClick={CloseDrawer}
                >
                  {"drawer_login_delete_account_button_cancel"}
                </Button>
                <Button
                  variant="primary"
                  size="large"
                  isDanger
                  className="w-full"
                  onClick={handleSubmit}
                  disabled={code.length < 6 || !!codeError}
                >
                  {"drawer_login_delete_account_button_delete"}
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </DrawerDrag>
      {/* {loading && (
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
      )} */}
    </>
  );
};

export default DrawerDeleteAccount;

const CustomParagraph = styled.div`
  span {
    &.highlight-blue {
      color: var(--blue-6);
    }
    &.highlight-red {
      color: var(--error);
      font-weight: 700;
    }
    &.highlight-bold {
      font-weight: 700;
    }
  }
`;
