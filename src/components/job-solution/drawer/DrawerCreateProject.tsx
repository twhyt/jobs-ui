// import { useAppDispatch, useAppSelector } from "@/store/redux-hook";
import DrawerDrag from "./DrawerDrag";
// import { onCloseDrawerCreateProject } from "@/store/slices/drawerSlice";
import { Col, Row } from "antd";
import { MenuHorizon } from "@/components/job-solution/menu/index";
import { useCallback, useEffect } from "react";
import { MenuHorizonProps } from "../menu/menu-horiz";
import {
  AccountBoxIcon,
  DescriptionIcon,
} from "@/assets/job-solution/icons/suggested-groups/outline";
import {
  EditDocumentIcon,
  InventorySmartIcon,
} from "@/assets/job-solution/icons/editor-groups/outlined";
import { useRouter } from "next/router";
// import { newProject } from "@/store/slices/projectSlice";
// import useTranslation from "@/hooks/useTranslation";

const DrawerCreateProject = () => {
  const { push } = useRouter();

  // const dispatch = useAppDispatch();
  // const { drawerCreateProjectOpen } = useAppSelector((state) => state.drawer);

  // const { t } = useTranslation("drawer");

  const MenuItem: MenuHorizonProps[] = [
    {
      title: "drawer_create_project_resume_extractor",
      description: "drawer_create_project_resume_extractor_detail",
      icon: <DescriptionIcon />,
      onClick: () => {
        push("/resume-extraction");
        // dispatch(newProject());
        CloseDrawer();
      },
    },
    {
      title: "drawer_create_project_candidate_checker",
      description: "drawer_create_project_candidate_checker_detail",
      icon: <AccountBoxIcon />,
      onClick: () => {
        push("/candidate-checker");
        // dispatch(newProject());
        CloseDrawer();
      },
    },
    {
      title: "drawer_create_project_smart_jd_generator",
      description: "drawer_create_project_smart_jd_generator_detail",
      icon: <InventorySmartIcon />,
      onClick: () => {
        push("/smart-jd-generator");
        // dispatch(newProject());
        CloseDrawer();
      },
    },
    {
      title: "drawer_create_project_job_caption_creator",
      description: "drawer_create_project_job_caption_creator_detail",
      icon: <EditDocumentIcon />,
      disabled: true,
    },
  ];

  const CloseDrawer = useCallback(() => {
    // dispatch(onCloseDrawerCreateProject());
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
    <DrawerDrag open={true} onClose={CloseDrawer}>
      <Row>
        <Col span={24}>
          <Row align={"middle"} className="p-[16px] gap-[4px]">
            <AiIcon />
            <span className="font-h7">{"drawer_create_project_title"}</span>
          </Row>
          {MenuItem.map((item) => (
            <MenuHorizon key={item.title} {...item} />
          ))}
        </Col>
      </Row>
    </DrawerDrag>
  );
};

export default DrawerCreateProject;

const AiIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.79012 6.01664C9.8447 5.86437 10.0533 5.86437 10.1079 6.01664L10.3443 6.67642C11.1679 8.97423 12.9227 10.7859 15.1483 11.6362L15.7874 11.8803C15.9349 11.9367 15.9349 12.152 15.7874 12.2084L15.1483 12.4525C12.9227 13.3028 11.1679 15.1145 10.3443 17.4123L10.1079 18.0721C10.0533 18.2243 9.8447 18.2243 9.79012 18.0721L9.55365 17.4123C8.73009 15.1145 6.97531 13.3028 4.74967 12.4525L4.11061 12.2084C3.96313 12.152 3.96313 11.9367 4.11061 11.8803L4.74967 11.6362C6.97531 10.7859 8.73009 8.97423 9.55365 6.67642L9.79012 6.01664Z"
        fill="url(#paint0_linear_4151_85)"
      />
      <path
        d="M16.8248 2.05937C16.8532 1.98021 16.9616 1.98021 16.99 2.05937L17.1129 2.40236C17.541 3.59689 18.4533 4.5387 19.6103 4.98072L19.9425 5.10764C20.0192 5.13693 20.0192 5.24888 19.9425 5.27817L19.6103 5.40509C18.4533 5.84711 17.541 6.78892 17.1129 7.98345L16.99 8.32644C16.9616 8.4056 16.8532 8.4056 16.8248 8.32644L16.7019 7.98345C16.2737 6.78892 15.3615 5.84711 14.2045 5.40509L13.8723 5.27817C13.7956 5.24888 13.7956 5.13693 13.8723 5.10764L14.2045 4.98072C15.3615 4.5387 16.2737 3.59689 16.7019 2.40236L16.8248 2.05937Z"
        fill="url(#paint1_linear_4151_85)"
      />
      <path
        d="M16.8248 15.6736C16.8532 15.5944 16.9616 15.5944 16.99 15.6736L17.1129 16.0165C17.541 17.2111 18.4533 18.1529 19.6103 18.5949L19.9425 18.7218C20.0192 18.7511 20.0192 18.8631 19.9425 18.8924L19.6103 19.0193C18.4533 19.4613 17.541 20.4031 17.1129 21.5976L16.99 21.9406C16.9616 22.0198 16.8532 22.0198 16.8248 21.9406L16.7019 21.5976C16.2737 20.4031 15.3615 19.4613 14.2045 19.0193L13.8723 18.8924C13.7956 18.8631 13.7956 18.7511 13.8723 18.7218L14.2045 18.5949C15.3615 18.1529 16.2737 17.2111 16.7019 16.0165L16.8248 15.6736Z"
        fill="url(#paint2_linear_4151_85)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_4151_85"
          x1="4"
          y1="20.8829"
          x2="23.2693"
          y2="6.32837"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3379FF" />
          <stop offset="1" stopColor="#43E1FF" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_4151_85"
          x1="4"
          y1="20.8829"
          x2="23.2693"
          y2="6.32837"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3379FF" />
          <stop offset="1" stopColor="#43E1FF" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_4151_85"
          x1="4"
          y1="20.8829"
          x2="23.2693"
          y2="6.32837"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3379FF" />
          <stop offset="1" stopColor="#43E1FF" />
        </linearGradient>
      </defs>
    </svg>
  );
};
