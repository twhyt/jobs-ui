import { FC } from "react";
import DrawerDrag from "../DrawerDrag";
import styled from "styled-components";
import clsx from "clsx";
import { SharePublicResponse } from "@/types/job-solution/project";
// import useTranslation from "@/hooks/useTranslation";

interface Props {
  open: boolean;
  onClose: () => void;
  handleOpenActionDrawer: (open: boolean) => void;
  handleOpenShareDrawer: (open: boolean) => void;
  handleOpenDeleteDrawer: (open: boolean) => void;
  handleSharePublicData: (data: SharePublicResponse) => void;
  projectId: string;
  setShowStatement: any;
  setIsClickShare: any;
}

const DrawerActions: FC<Props> = ({
  onClose,
  open,
  handleOpenActionDrawer,
  handleOpenShareDrawer,
  handleOpenDeleteDrawer,
  setShowStatement,
  setIsClickShare,
}): JSX.Element => {
  // const { t } = useTranslation("project");
  const menus = [
    {
      id: "share",
      name: "button",
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.666992 11.467C0.666992 11.0892 0.764214 10.742 0.958659 10.4253C1.1531 10.1087 1.41144 9.86699 1.73366 9.70033C2.42255 9.35588 3.12255 9.09755 3.83366 8.92532C4.54477 8.7531 5.26699 8.66699 6.00033 8.66699C6.73366 8.66699 7.45588 8.7531 8.16699 8.92532C8.8781 9.09755 9.5781 9.35588 10.267 9.70033C10.5892 9.86699 10.8475 10.1087 11.042 10.4253C11.2364 10.742 11.3337 11.0892 11.3337 11.467V12.0003C11.3337 12.367 11.2031 12.6809 10.942 12.942C10.6809 13.2031 10.367 13.3337 10.0003 13.3337H2.00033C1.63366 13.3337 1.31977 13.2031 1.05866 12.942C0.797548 12.6809 0.666992 12.367 0.666992 12.0003V11.467ZM14.0003 13.3337H12.3003C12.4225 13.1337 12.5142 12.9198 12.5753 12.692C12.6364 12.4642 12.667 12.2337 12.667 12.0003V11.3337C12.667 10.8448 12.5309 10.3753 12.2587 9.92532C11.9864 9.47533 11.6003 9.08921 11.1003 8.76699C11.667 8.83366 12.2003 8.94755 12.7003 9.10866C13.2003 9.26977 13.667 9.46699 14.1003 9.70033C14.5003 9.92255 14.8059 10.1698 15.017 10.442C15.2281 10.7142 15.3337 11.0114 15.3337 11.3337V12.0003C15.3337 12.367 15.2031 12.6809 14.942 12.942C14.6809 13.2031 14.367 13.3337 14.0003 13.3337ZM6.00033 8.00033C5.26699 8.00033 4.63921 7.73921 4.11699 7.21699C3.59477 6.69477 3.33366 6.06699 3.33366 5.33366C3.33366 4.60033 3.59477 3.97255 4.11699 3.45033C4.63921 2.9281 5.26699 2.66699 6.00033 2.66699C6.73366 2.66699 7.36144 2.9281 7.88366 3.45033C8.40588 3.97255 8.66699 4.60033 8.66699 5.33366C8.66699 6.06699 8.40588 6.69477 7.88366 7.21699C7.36144 7.73921 6.73366 8.00033 6.00033 8.00033ZM12.667 5.33366C12.667 6.06699 12.4059 6.69477 11.8837 7.21699C11.3614 7.73921 10.7337 8.00033 10.0003 8.00033C9.8781 8.00033 9.72255 7.98644 9.53366 7.95866C9.34477 7.93088 9.18921 7.90033 9.06699 7.86699C9.36699 7.51144 9.59755 7.11699 9.75866 6.68366C9.91977 6.25033 10.0003 5.80033 10.0003 5.33366C10.0003 4.86699 9.91977 4.41699 9.75866 3.98366C9.59755 3.55033 9.36699 3.15588 9.06699 2.80033C9.22255 2.74477 9.3781 2.70866 9.53366 2.69199C9.68921 2.67533 9.84477 2.66699 10.0003 2.66699C10.7337 2.66699 11.3614 2.9281 11.8837 3.45033C12.4059 3.97255 12.667 4.60033 12.667 5.33366ZM2.00033 12.0003H10.0003V11.467C10.0003 11.3448 9.96977 11.2337 9.90866 11.1337C9.84755 11.0337 9.76699 10.9559 9.66699 10.9003C9.06699 10.6003 8.46144 10.3753 7.85033 10.2253C7.23921 10.0753 6.62255 10.0003 6.00033 10.0003C5.3781 10.0003 4.76144 10.0753 4.15033 10.2253C3.53921 10.3753 2.93366 10.6003 2.33366 10.9003C2.23366 10.9559 2.1531 11.0337 2.09199 11.1337C2.03088 11.2337 2.00033 11.3448 2.00033 11.467V12.0003ZM6.00033 6.66699C6.36699 6.66699 6.68088 6.53644 6.94199 6.27533C7.2031 6.01421 7.33366 5.70033 7.33366 5.33366C7.33366 4.96699 7.2031 4.6531 6.94199 4.39199C6.68088 4.13088 6.36699 4.00033 6.00033 4.00033C5.63366 4.00033 5.31977 4.13088 5.05866 4.39199C4.79755 4.6531 4.66699 4.96699 4.66699 5.33366C4.66699 5.70033 4.79755 6.01421 5.05866 6.27533C5.31977 6.53644 5.63366 6.66699 6.00033 6.66699Z"
            fill="#141414"
          />
        </svg>
      ),
      onClick: () => {
        setShowStatement("view");
        setIsClickShare(false);
        handleOpenShareDrawer(true);
        handleOpenActionDrawer(false);
        handleOpenDeleteDrawer(false);
      },
    },
    {
      id: "delete",
      name: "button__1",
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.1594 2.53301H5.02745C5.10002 2.53301 5.1594 2.47301 5.1594 2.39967V2.53301H10.1733V2.39967C10.1733 2.47301 10.2327 2.53301 10.3052 2.53301H10.1733V3.73301H11.3608V2.39967C11.3608 1.81134 10.8874 1.33301 10.3052 1.33301H5.02745C4.44525 1.33301 3.9719 1.81134 3.9719 2.39967V3.73301H5.1594V2.53301ZM13.4719 3.73301H1.86079C1.56886 3.73301 1.33301 3.97134 1.33301 4.26634V4.79967C1.33301 4.87301 1.39238 4.93301 1.46495 4.93301H2.46113L2.86851 13.6497C2.8949 14.218 3.36 14.6663 3.92242 14.6663H11.4103C11.9743 14.6663 12.4378 14.2197 12.4642 13.6497L12.8715 4.93301H13.8677C13.9403 4.93301 13.9997 4.87301 13.9997 4.79967V4.26634C13.9997 3.97134 13.7638 3.73301 13.4719 3.73301ZM11.2833 13.4663H4.04941L3.65028 4.93301H11.6824L11.2833 13.4663Z"
            fill="#FF4D4F"
          />
        </svg>
      ),
      onClick: () => {
        handleOpenShareDrawer(false);
        handleOpenActionDrawer(false);
        handleOpenDeleteDrawer(true);
      },
    },
  ];

  return (
    <DrawerDrag open={open} onClose={onClose}>
      <div className="min-h-[110px]">
        <ListContent>
          {menus.map((menu) => {
            const isDelete = menu.id === "delete";
            const style = isDelete ? { color: "var(--error)" } : {};
            return (
              <Item
                key={menu.id}
                onClick={(e) => {
                  e.stopPropagation();
                  menu.onClick();
                }}
              >
                <div className="flex gap-2 items-center">
                  <div>{menu.icon}</div>
                  <p className={clsx("font-button4")} style={style}>
                    {menu.name}
                  </p>
                </div>
              </Item>
            );
          })}
        </ListContent>
      </div>
    </DrawerDrag>
  );
};

const Item = styled.li`
  width: 100%;
  min-height: 38px;
  cursor: pointer;
  display: flex;
  padding: 8px 16px;
`;

const ListContent = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export default DrawerActions;
