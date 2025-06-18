import { Divider, Drawer, Row, Space } from "antd";
import Image from "next/image";
import Link from "next/link";

import MenuIcon from "@/assets/job-solution/icons/menu";

import CreditIcon from "@/assets/job-solution/icons/credit";
import { useRouter } from "next/router";
import { useCallback, useMemo, useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/assets/job-solution/icons/directional-groups";

import Logo from "@public/logo.png";
import Account from "@/components/job-solution/card/Account";
import { MenuSide } from "@/components/job-solution/menu";
import {
  GroupAddIcon,
  ListAltIcon,
} from "@/assets/job-solution/icons/suggested-groups/outline";
// import { useAppSelector } from "@/store/redux-hook";
// import { getCredit } from "@/store/slices/userSlice";
import LanguageSwitcher from "@/components/job-solution/LanguageSwitcher";
// import useTranslation from "@/hooks/useTranslation";
// import { useAccountPackage } from "@/hooks/useAccountPackage";
// import { getUserRoleFromPackage } from "@/utils/accountPackage";
// import axiosAuthInstance from "@/utils/axiosAuthInstance";
// import { formatCredits } from "@/utils/formatAmount";
// import { useRouteHistory } from "@/context/RouteHistoryContext";
// import pluralize from "pluralize";

export type HeaderTypeProps =
  | "menu-logo-credit"
  | "back-title"
  | "menu-logo"
  | "back-title-credit";
interface HeaderProps {
  pageTitle?: string;
  headerType?: HeaderTypeProps;
  back?: string | boolean;
}

const Header = ({
  pageTitle,
  headerType = "menu-logo-credit",
  back = "/",
}: HeaderProps) => {
  // const { email } = useAppSelector((state) => state.user);
  const { pathname, push, locale } = useRouter();
  // const dispatch = useAppDispatch();
  // const { t } = useTranslation("common");
  const [open, setOpen] = useState(false);
  const [currentMember] = useState(1);
  // const { credit, isTeam } = useAppSelector((state) => state.user);
  // const accountPackage = useAccountPackage();
  // const role = getUserRoleFromPackage(accountPackage);
  // const { previousPath } = useRouteHistory();

  // const resetCredit = useCallback(() => {
  //   dispatch(getCredit());
  // }, [dispatch]);

  let email;
  const role = "TeamOwner";

  const resetCredit = useCallback(() => {
    push("/settings/package");
  }, [push]);

  const handleGoBack = useCallback(() => {
    if (typeof back === "boolean") {
      // if (previousPath) {
      //   push(previousPath);
      // } else {
      push("/"); // e.g., homepage
      // }
    } else if (typeof back === "string") {
      push(back);
    }
  }, [push, back]);

  const TypeHeader = useMemo(() => {
    if (pathname === "/" || headerType === "menu-logo-credit") {
      return (
        <>
          <Space size={8}>
            <button
              title="menu"
              className="cursor-pointer flex"
              onClick={() => {
                // console.log("click");
                setOpen(true);
              }}
            >
              <MenuIcon fill="var(--icon-onlight)" />
            </button>
            <Link href={"/"}>
              <Image
                priority
                unoptimized
                src={Logo}
                width={105}
                height={32}
                alt="jobs solution logo"
              />
            </Link>
          </Space>
          {email && (
            <button className="credit-button" onClick={resetCredit}>
              <CreditIcon fill={"var(--white-100)"} />
              <span>{0}</span>
              <ChevronRightIcon fill={"var(--white-100)"} />
            </button>
          )}
        </>
      );
    }

    if (headerType === "menu-logo") {
      return (
        <Space size={8}>
          <button
            title="menu"
            className="cursor-pointer flex"
            onClick={() => {
              // console.log("click");
              setOpen(true);
            }}
          >
            <MenuIcon />
          </button>
          <Link href={"/"}>
            <Image
              priority
              unoptimized
              src={Logo}
              width={105}
              height={32}
              alt="jobs solution logo"
            />
          </Link>
        </Space>
      );
    }

    if (headerType === "back-title") {
      return (
        <div className="flex w-full gap-[8px] relative">
          {email && (
            <button
              title="go_previous_page"
              onClick={handleGoBack}
              className="my-auto absolute left-0 top-[1px] cursor-pointer"
            >
              <ChevronLeftIcon fill="var(--icon-onlight)" />
            </button>
          )}

          <h1 className="font-h10 w-full flex justify-center">
            {pageTitle ?? "Page"}
          </h1>
        </div>
      );
    }

    if (headerType === "back-title-credit") {
      return (
        <>
          <Space size={8}>
            {email && (
              <button
                title="go_previous_page"
                onClick={handleGoBack}
                className="my-auto translate-y-[3px]"
              >
                <ChevronLeftIcon fill="var(--icon-onlight)" />
              </button>
            )}

            <h1 className="font-h10 w-full flex justify-center">
              {pageTitle ?? "Page"}
            </h1>
          </Space>
          {email && (
            <button className="credit-button" onClick={resetCredit}>
              <CreditIcon fill={"var(--white-100)"} />
              <span>{0}</span>
              <ChevronRightIcon fill={"var(--white-100)"} />
            </button>
          )}
        </>
      );
    }

    return (
      <div className="flex gap-[8px]">
        <button
          title="go_previous_page"
          onClick={handleGoBack}
          className="my-auto"
        >
          <ChevronLeftIcon />
        </button>
        <h1 className="font-h10">{pageTitle ?? "Page"}</h1>
      </div>
    );
  }, [
    pathname,
    pageTitle,
    // credit,
    headerType,
    resetCredit,
    email,
    handleGoBack,
  ]);

  const MenuData = [
    {
      key: "credit_history",
      title: "menu_credit_history",
      link: "/credit-history",
    },
    { key: "setting", title: "menu_settings", link: "/settings" },
    {
      key: "privacy_policy",
      title: "menu_privacy_policy",
      link: "https://drive.google.com/file/d/1Jks4qpgAC9eXD2yLja-Sh8LovcCcB9lA/view",
    },
    { key: "language", title: "menu_language" },
    { key: "sign_out", title: "menu_sign_out" },
  ];

  const MenuTeamData = useMemo(() => {
    const memberCount = Number(currentMember);
    if (role?.startsWith("Team")) {
      if (memberCount === 0) return [];
      if (role === "TeamOwner") {
        if (memberCount > 0 && memberCount < 5)
          return [
            {
              key: "Invite members",
              title: "menu_team_invite",
              link: "/settings/team-members",
              icon: <GroupAddIcon />,
            },
            {
              key: "Team details",
              title: "menu_team_detail",
              link: "/settings/team-details",
              icon: <ListAltIcon />,
            },
          ];
        if (memberCount === 5)
          return [
            {
              key: "Team details",
              title: "menu_team_detail",
              link: "",
              icon: <ListAltIcon />,
            },
          ];
      } else if (role === "TeamMember") {
        return [
          {
            key: "Team details",
            title: "menu_team_detail",
            link: "/settings/team-details",
            icon: <ListAltIcon />,
          },
        ];
      }
    }

    return [];
  }, [currentMember, role]);

  return (
    <nav className="header">
      <Row justify={"space-between"} align={"middle"}>
        {/* <Space size={8}>
                    <MenuIcon/>
                    <Link href={process.env.landingURL as string}>
                        <Image priority src={"/logo.png"} width={105} height={32} alt="jobs solution logo"/>
                    </Link>
                </Space> */}
        {TypeHeader}
        {/* {headerType === "menu-logo-credit" && (
          <button className="credit-button" onClick={resetCredit}>
            <CreditIcon fill={"var(--white-100)"} />
            <span>{credit.toLocaleString() ?? 0} credits</span>
            <ChevronRightIcon fill={"var(--white-100)"} />
          </button>
        )} */}

        <Drawer
          title="Menu"
          placement={"left"}
          onClose={() => setOpen(false)}
          open={open}
          key={"left"}
          width={303}
          destroyOnClose
          closable={false}
          maskClosable
          styles={{
            header: { display: "none" },
            body: { padding: "0px" }, // this is the container of the content
          }}
        >
          <div className="px-[16px] py-[12px] font-h10 text-[var(--text-title)] flex justify-between">
            {"menu_title"}
            {/* <div className="flex gap-[8px] items-center">
              <span className=" text-[var(--text-secondary)]">{role}</span>
              {role?.startsWith("Team") && (
                <>
                  <span
                    className="bg-[var(--gray-2)] rounded-[4px] px-[8px] py-[2px] text-[var(--text-secondary)] cursor-pointer"
                    onClick={() => setCurrentMember(1)}
                  >
                    1
                  </span>
                  <span
                    className="bg-[var(--gray-2)] rounded-[4px] px-[8px] py-[2px] text-[var(--text-secondary)] cursor-pointer"
                    onClick={() => setCurrentMember(5)}
                  >
                    5
                  </span>
                </>
              )}
            </div> */}
          </div>
          <Divider style={{ margin: 0, backgroundColor: "var(--gray-5)" }} />
          <Account fullnameWidth="w-[190px]" />
          {role?.startsWith("Team") && currentMember > 0 && (
            <>
              <Divider
                style={{ margin: 0, backgroundColor: "var(--gray-5)" }}
              />
              {/* <p className="font-h10 text-[var(--text-title)] px-[16px] pt-[16px] pb-[4px]">
                {("menu_team")}{" "}
                <span className="font-body5 text-[var(--text-secondary)]">
                  {`(${currentMember}/5)`}
                </span>
              </p> */}
            </>
          )}
          {MenuTeamData.map((item, index) => (
            <MenuSide
              key={index}
              title={item.title}
              // color={""}
              icon={item.icon}
              onClick={() => item.link && push(item.link)}
              disabled={false}
            />
          ))}
          <Divider style={{ margin: 0, backgroundColor: "var(--gray-5)" }} />
          {MenuData.map((item, index) =>
            item.key === "language" ? (
              // Custom component for language selection when title is "Language"
              <LanguageSwitcher key={index} />
            ) : (
              // Default MenuSide component for other items
              <MenuSide
                key={index}
                title={item.title}
                color={item.key === "sign_out" ? "var(--error)" : ""}
                onClick={async () => {
                  if (item.key === "sign_out") {
                    // await axiosAuthInstance.post("/auth/sign-out");
                    // localStorage.clear();
                    // sessionStorage.clear();
                    // document.cookie.split(";").forEach((cookie) => {
                    //   const [name] = cookie.split("=");
                    //   document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
                    // });
                    push(`${process.env.authURL}/${locale}`);
                  }

                  if (item.key === "privacy_policy") {
                    if (item.link) {
                      // push(item.link);
                      window.open(item.link, "_blank");
                    }
                  } else {
                    if (item.link) {
                      push(item.link);
                    }
                  }
                }}
              />
            )
          )}
        </Drawer>
      </Row>
    </nav>
  );
};

export default Header;
