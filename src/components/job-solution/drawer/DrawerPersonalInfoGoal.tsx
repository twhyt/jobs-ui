// import { useAppDispatch, useAppSelector } from "@/store/redux-hook";
import DrawerDrag from "./DrawerDrag";
// import { onCloseDrawerPersonalInfoGoal } from "@/store/slices/drawerSlice";
import { Col, Row } from "antd";
import { useCallback, useEffect, useState } from "react";
import { CheckedIcon } from "@/assets/job-solution/icons/suggested-groups/outline";
// import useTranslation from "@/hooks/useTranslation";

export const GoalOptions = () => {
  // const { t } = useTranslation("drawer");
  return [
    {
      key: 1,
      value: "Create a high-quality job description",
      label: "drawer_profile_info_goal_dropdown_1",
    },
    {
      key: 2,
      value: "Write job posting captions",
      label: "drawer_profile_info_goal_dropdown_2",
    },
    {
      key: 3,
      value: "Analyze your resumes",
      label: "drawer_profile_info_goal_dropdown_3",
    },
    {
      key: 4,
      value: "Analyze multiple candidates",
      label: "drawer_profile_info_goal_dropdown_4",
    },
    {
      key: 5,
      value: "Rank candidates",
      label: "drawer_profile_info_goal_dropdown_5",
    },
    {
      key: 6,
      value: "Try new AI tools",
      label: "drawer_profile_info_goal_dropdown_6",
    },
    {
      key: 7,
      value: "Find the right AI tools for HR",
      label: "drawer_profile_info_goal_dropdown_7",
    },
  ];
};
const DrawerPersonalInfoGoal = ({
  onSelect,
  select,
}: {
  onSelect: (value: string) => void;
  select: string;
}) => {
  // const dispatch = useAppDispatch();
  // const { drawerPersonalInfoGoal } = useAppSelector((state) => state.drawer);

  const options = GoalOptions();

  const [tempSelected, setTempSelected] = useState(select);

  // useEffect(() => {
  //   if (drawerPersonalInfoGoal) {
  //     setTempSelected(select); // Reset selection when drawer opens
  //   }
  // }, [drawerPersonalInfoGoal, select]);

  const CloseDrawer = useCallback(() => {
    // dispatch(onCloseDrawerPersonalInfoGoal());
    if (select !== tempSelected) {
      onSelect(tempSelected); // Finalize selection here
    }
  }, [onSelect, tempSelected]);

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
                onClick={() => {
                  if (item.value !== tempSelected) {
                    setTempSelected(item.value);
                  }
                }}
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

export default DrawerPersonalInfoGoal;
