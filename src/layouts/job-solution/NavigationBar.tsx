import { Row } from "antd";
// import { useAppDispatch } from "@/store/redux-hook";
// import { onOpenDrawerCreateProject } from "@/store/slices/drawerSlice";
import { Menu } from "@/components/job-solution/menu";
import { MenuProps } from "@/components/job-solution/menu/menu";
import {
  AssetsOutlineIcon,
  CrownOutlineIcon,
  FolderOutlineIcon,
} from "@/assets/job-solution/icons/suggested-groups/outline";
import { HomeFilledIcon } from "@/assets/job-solution/icons/suggested-groups/filled";
import { useRouter } from "next/router";
// import useTranslation from "@/hooks/useTranslation";

const NavigationBar = () => {
  const { pathname, push } = useRouter();
  // const { t } = useTranslation("common");
  // const dispatch = useAppDispatch();

  const MenuItem: MenuProps[] = [
    {
      key: "Home",
      title: "menu_bottom_home",
      icon: <HomeFilledIcon />,
      selected: pathname === "/",
      onClick: () => {
        push("/");
      },
    },
    {
      key: "Projects",
      title: "menu_bottom_project",
      icon: <FolderOutlineIcon />,
      onClick: () => {
        push("/projects");
      },
      selected: pathname === "/projects",
    },
    {
      key: "function",
      title: "function",
      icon: <AddIcon />,
    },
    {
      key: "Assets",
      title: "menu_bottom_assets",
      icon: <AssetsOutlineIcon />,
      disabled: true,
    },
    {
      key: "Teams",
      title: "menu_bottom_team",
      icon: <CrownOutlineIcon />,
      disabled: true,
    },
  ];

  return (
    <div id="navigation-bar" className="navigation-bar">
      <Row
        justify={"space-around"}
        align={"middle"}
        wrap={false}
        className="gap-[24px]"
      >
        {MenuItem.map((item, index) => {
          if (item.key === "function") {
            return (
              <button
                key={index}
                aria-label={"menu-add-button"}
                className="navigation-bar-button-add"
                onClick={() => {
                  // dispatch(onOpenDrawerCreateProject());
                }}
              >
                {item.icon}
              </button>
            );
          } else {
            return <Menu key={index} {...item} />;
          }
        })}
      </Row>
    </div>
  );
};

function AddIcon() {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.5 13H6.5C6.21667 13 5.97917 12.9042 5.7875 12.7125C5.59583 12.5208 5.5 12.2833 5.5 12C5.5 11.7167 5.59583 11.4792 5.7875 11.2875C5.97917 11.0958 6.21667 11 6.5 11H11.5V6C11.5 5.71667 11.5958 5.47917 11.7875 5.2875C11.9792 5.09583 12.2167 5 12.5 5C12.7833 5 13.0208 5.09583 13.2125 5.2875C13.4042 5.47917 13.5 5.71667 13.5 6V11H18.5C18.7833 11 19.0208 11.0958 19.2125 11.2875C19.4042 11.4792 19.5 11.7167 19.5 12C19.5 12.2833 19.4042 12.5208 19.2125 12.7125C19.0208 12.9042 18.7833 13 18.5 13H13.5V18C13.5 18.2833 13.4042 18.5208 13.2125 18.7125C13.0208 18.9042 12.7833 19 12.5 19C12.2167 19 11.9792 18.9042 11.7875 18.7125C11.5958 18.5208 11.5 18.2833 11.5 18V13Z"
        fill="white"
      />
    </svg>
  );
}

export default NavigationBar;
