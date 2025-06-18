// import { useAppDispatch, useAppSelector } from "@/store/redux-hook";
import DrawerDrag from "./DrawerDrag";
// import { onCloseDrawerPaymentHistoryStatus } from "@/store/slices/drawerSlice";
import { Col, Row } from "antd";
import { useCallback, useEffect, useState } from "react";
import { CheckedIcon } from "@/assets/job-solution/icons/suggested-groups/outline";
import { PaymentHistoryStatusOptions } from "@/types/job-solution/global";
// import useTranslation from "@/hooks/useTranslation";

export type PaymentHistoryStatus =
  | "all"
  | "pending"
  | "verifying"
  | "paid"
  | "reject"
  | "expired";
const DrawerPaymentHistoryStatus = ({
  // onSelect,
  select,
}: {
  onSelect: (value: PaymentHistoryStatus) => void;
  select: PaymentHistoryStatus;
}) => {
  // const dispatch = useAppDispatch();
  // const { t } = useTranslation("paymentHistory");
  // const { drawerPaymentHistoryStatusSelection } = useAppSelector(
  //   (state) => state.drawer
  // );

  const [tempSelected, setTempSelected] =
    useState<PaymentHistoryStatus>(select);

  // useEffect(() => {
  //   if (drawerPaymentHistoryStatusSelection) {
  //     setTempSelected(select); // Reset selection when drawer opens
  //   }
  // }, [drawerPaymentHistoryStatusSelection, select]);

  // const CloseDrawer = useCallback(() => {
  //   dispatch(onCloseDrawerPaginationSelection());
  // }, [dispatch]);

  const CloseDrawer = useCallback(() => {
    // dispatch(onCloseDrawerPaymentHistoryStatus());
    // onSelect(tempSelected); // Finalize selection here
  }, [tempSelected]);

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

  // const handleSelect = (
  //   value: PaymentHistoryStatus
  // ) => {
  //   onSelect(value);
  //   CloseDrawer();
  // };

  return (
    <DrawerDrag
      open={true}
      onClose={CloseDrawer}
      // height="88vh"
    >
      <Row>
        <Col span={24}>
          {PaymentHistoryStatusOptions().map((item) => {
            return (
              <div
                key={item.key}
                className={`h-[38px] w-full py-[8px] px-[16px] hover:bg-[var(--blue-1)] cursor-pointer ${
                  item.value === tempSelected ? "bg-[var(--blue-1)] " : ""
                } flex justify-between`}
                // onClick={() => handleSelect(item.value)}
                onClick={() =>
                  setTempSelected(item.value as PaymentHistoryStatus)
                }
              >
                <span
                  className={`${
                    item.value === tempSelected
                      ? "font-button3"
                      : "font-button4"
                  }`}
                >
                  {item.label}
                </span>
                {item.value === tempSelected && (
                  <span className="w-[16px] h-[16px] self-center">
                    <CheckedIcon
                      width={16}
                      height={16}
                      minWidth={16}
                      fill="var(--blue-6)"
                    />
                  </span>
                )}
              </div>
            );
          })}
        </Col>
      </Row>
    </DrawerDrag>
  );
};

export default DrawerPaymentHistoryStatus;
