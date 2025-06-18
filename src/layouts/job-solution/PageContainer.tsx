import React, { ReactNode, useMemo } from "react";
import dynamic from "next/dynamic";
import DrawerCreateProject from "@/components/job-solution/drawer/DrawerCreateProject";
import clsx from "clsx";
import { HeaderTypeProps } from "@/layouts/job-solution/Header";
// import { useAppDispatch } from "@/store/redux-hook";
// import { getRemainCredit } from "@/store/slices/userSlice";

const Headers = dynamic(() => import("@/layouts/job-solution/Header"));
const NavigationBar = dynamic(
  () => import("@/layouts/job-solution/NavigationBar")
);

type LayoutsProps = {
  children: ReactNode;
  navigatorType?: "default" | "none" | "none";
  pageTitle?: string;
  classname?: string;
  headerType?: HeaderTypeProps;
  activeKey?: string;
  back?: string | boolean;
};

const PageContainer = (
  {
    children,
    navigatorType,
    pageTitle,
    classname,
    headerType,
    // activeKey,
    back,
  }: LayoutsProps,
  ref: React.ForwardedRef<HTMLDivElement>
) => {
  // const dispatch = useAppDispatch();

  const Navigation = useMemo(() => {
    switch (navigatorType) {
      // case "none":
      //   return <NavigationBarProjects activeKey={activeKey} />;
      case "none":
        return <></>;
      default:
        return <NavigationBar />;
    }
  }, [navigatorType]);

  // useEffect(() => {
  //   dispatch(getRemainCredit());
  // }, [dispatch]);

  return (
    <main className={clsx("min-h-screen !flex flex-col", classname)} ref={ref}>
      <Headers pageTitle={pageTitle} headerType={headerType} back={back} />
      <div className={clsx("flex flex-col flex-1")}>{children}</div>
      {Navigation}
      <DrawerCreateProject />
    </main>
  );
};

export default React.forwardRef(PageContainer);
