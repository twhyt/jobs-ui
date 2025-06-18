import React, { useCallback, useEffect, useState } from "react";
import DrawerDrag from "./DrawerDrag";
// import { useAppDispatch, useAppSelector } from "@/store/redux-hook";
// import { onCloseDrawerImproveModel } from "@/store/slices/drawerSlice";
import CustomButton from "../custom-antd/Button";
import Button from "../button/Button";
import ThreeDotColorLoading from "../loading";
// import useTranslation from "@/hooks/useTranslation";
import styled from "styled-components";

const DrawerDataControlsImproveModel = ({
  setIsSwitch,
  isSwitch,
}: {
  setIsSwitch: any;
  isSwitch: boolean;
}) => {
  // const dispatch = useAppDispatch();
  // const { t } = useTranslation("dataControl");
  // const { drawerImproveModel } = useAppSelector((state) => state.drawer);
  const [loading, setLoading] = useState(false);

  const learnMoreUrl = "/";

  const CloseDrawer = useCallback(() => {
    // dispatch(onCloseDrawerImproveModel());
  }, []);

  const onDone = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      CloseDrawer();
      setIsSwitch(!isSwitch);
    }, 800);
  }, [CloseDrawer, isSwitch, setIsSwitch]);

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
    <DrawerDrag open={true} onClose={CloseDrawer}>
      <div className="font-h7 p-[16px]">
        {isSwitch
          ? "data_controls_drawer_off_header"
          : "data_controls_drawer_on_header"}
      </div>
      <div className="p-[16px]">
        <CustomText
          className="font-body2"
          dangerouslySetInnerHTML={{
            __html: isSwitch
              ? "data_controls_drawer_off_body_text"
              : "data_controls_drawer_on_body_text",
          }}
        />{" "}
        <span
          className="font-button4 text-[var(--blue-6)] cursor-pointer"
          onClick={() => {
            window.open(learnMoreUrl);
          }}
        >
          {"data_controls_drawer_button_learn_more"}
        </span>
      </div>
      <div className="p-[16px] flex gap-[12px]">
        <Button
          variant="quiet"
          size="large"
          className="!w-full"
          onClick={CloseDrawer}
        >
          {"data_controls_drawer_button_cancel"}
        </Button>
        <CustomButton
          variants={loading ? "secondary" : "primary"}
          size="large"
          className="!w-full"
          loading={
            loading && {
              icon: <ThreeDotColorLoading color="bg-[var(--blue-6)]" />,
            }
          }
          onClick={onDone}
        >
          {!loading &&
            (isSwitch
              ? "data_controls_drawer_button_turn_off"
              : "data_controls_drawer_button_turn_on")}
        </CustomButton>
      </div>
    </DrawerDrag>
  );
};

export default DrawerDataControlsImproveModel;

const CustomText = styled.span`
  span {
    &.highlight-bold {
      font-weight: 700;
    }
  }
`;
