// import { useAppDispatch, useAppSelector } from "@/store/redux-hook";
import DrawerDrag from "./DrawerDrag";
// import { onCloseDrawerPaginationSelection } from "@/store/slices/drawerSlice";
import { Col, Row } from "antd";
import { useCallback, useEffect, useState } from "react";
import { CheckedIcon } from "@/assets/job-solution/icons/suggested-groups/outline";
// import useTranslation from "@/hooks/useTranslation";

export const PaginationOptions = () => {
  // const { t } = useTranslation("drawer");
  return [
    { key: 1, value: "10", label: "drawer_pagination_selection_10" },
    { key: 2, value: "20", label: "drawer_pagination_selection_20" },
    { key: 3, value: "50", label: "drawer_pagination_selection_50" },
  ];
};
const DrawerPaginationSelection = ({
  // onSelect,
  select,
}: {
  onSelect: (value: string) => void;
  select: string;
}) => {
  // const dispatch = useAppDispatch();
  // const { drawerPaginationSelection } = useAppSelector((state) => state.drawer);

  const options = PaginationOptions();

  const [tempSelected, setTempSelected] = useState(select);

  // useEffect(() => {
  //   if (drawerPaginationSelection) {
  //     setTempSelected(select); // Reset selection when drawer opens
  //   }
  // }, [drawerPaginationSelection, select]);

  // const CloseDrawer = useCallback(() => {
  //   dispatch(onCloseDrawerPaginationSelection());
  // }, [dispatch]);

  const CloseDrawer = useCallback(() => {
    // dispatch(onCloseDrawerPaginationSelection());
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

  // const handleSelect = (value: string) => {
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
          {options.map((item) => {
            return (
              <div
                key={item.key}
                className={`h-[38px] w-full py-[8px] px-[16px] hover:bg-[var(--blue-1)] cursor-pointer ${
                  item.value === tempSelected ? "bg-[var(--blue-1)]" : ""
                } flex justify-between`}
                // onClick={() => handleSelect(item.value)}
                onClick={() => setTempSelected(item.value)}
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

export default DrawerPaginationSelection;
