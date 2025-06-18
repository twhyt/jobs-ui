import { FC, useMemo, useState } from "react";
import styled from "styled-components";
import ProjectIcon from "./ProjectIcon";
import {
  IconType,
  Project,
  SharePublicResponse,
} from "@/types/job-solution/project";
import { GroupIcon } from "@/assets/job-solution/icons/suggested-groups/filled";
import Button from "@/components/job-solution/custom-antd/Button";
import { MoreIcon } from "@/assets/job-solution/icons/suggested-groups/outline";
import { useRouter } from "next/router";

import DrawerActions from "@/components/job-solution/drawer/projects/DrawerActions";
import DrawerShare from "@/components/job-solution/drawer/projects/DrawerShare";
import DrawerDelete from "@/components/job-solution/drawer/projects/DrawerDelete";
import dayjs from "dayjs";
import "dayjs/locale/th";
// import useTranslation from "@/hooks/useTranslation";
// import { useQueryClient } from "@tanstack/react-query";

interface Props {
  project: Project;
  href: string;
  variants: IconType;
  onClickDelete: (projectName: string) => void;
  infoSuccess: (projectName: string) => void;
  infoError: (projectName: string) => void;
}

const ProjectItem: FC<Props> = ({
  href,
  variants,
  project,
  onClickDelete,
  infoSuccess,
  infoError,
}): JSX.Element => {
  const { push, locale } = useRouter();
  // const { t } = useTranslation("project");
  // const queryClient = useQueryClient();

  const [openShareDrawer, setOpenShareDrawer] = useState(false);
  const [openActionDrawer, setOpenActionDrawer] = useState(false);
  const [openDeleteDrawer, setOpenDeleteDrawer] = useState(false);
  const [sharePublicData, setSharePublicData] =
    useState<SharePublicResponse | null>(null);
  const [shareValue, setShareValue] = useState<string>("");
  const [showStatement, setShowStatement] = useState<
    "view" | "copied" | "copy"
  >("view");

  const handleOpenShareDrawer = (open: boolean) => {
    setOpenShareDrawer(open);
  };
  const handleOpenActionDrawer = (open: boolean) => {
    setOpenActionDrawer(open);
  };
  const handleOpenDeleteDrawer = (open: boolean) => {
    setOpenDeleteDrawer(open);
  };
  const handleSharePublicData = (data: SharePublicResponse | null) => {
    setSharePublicData(data);
  };

  const projectName = project.project_name;
  dayjs.locale(locale);
  const updatedAt = dayjs(project.updated_at).format("DD MMM YYYY");

  const [tempIsShare, setTempIsShare] = useState(false);

  const [isSwitch, setIsSwitch] = useState<boolean>(() => {
    if (project.public_id) {
      return project.is_share;
    }
    return true;
  });
  const [isClickShare, setIsClickShare] = useState<boolean>(false);

  const fileType = useMemo(() => {
    switch (variants) {
      case "resume_extractor":
        return "resume-extractor";
      case "candidate checker":
        return "candidate-checker";
      case "jd_generator":
        return "smart-jd-generator";
      default:
        return "";
    }
  }, [variants]);

  return (
    <LinkItem
      onClick={() => {
        push(href);
      }}
    >
      <div className="flex gap-[10px] flex-1 items-center min-h-[66px]">
        <ProjectIcon variants={variants} />
        <div className="flex flex-col w-[calc(100%-84px)]">
          <p className="font-body5 truncate">{projectName}</p>
          <div className="flex gap-[6px] items-center">
            {(project.is_share || tempIsShare) && isSwitch && <GroupIcon />}

            <p className="font-body2 text-[var(--text-secondary)]">
              {"project_modified"}
            </p>
            <p className="font-body2 text-[var(--text-secondary)]">
              {/* {updatedAt} */}
              {isClickShare || !isSwitch
                ? dayjs(new Date()).format("DD MMM YYYY")
                : updatedAt}
            </p>
          </div>
        </div>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleOpenActionDrawer(true);
          }}
          icon={<MoreIcon fill="var(--icon-onlight)" />}
          shape="square"
        ></Button>
      </div>
      <DrawerWrapper onClick={(e) => e.stopPropagation()}>
        <DrawerActions
          projectId={project.project_id}
          open={openActionDrawer}
          onClose={() => {
            handleOpenActionDrawer(false);
          }}
          handleOpenShareDrawer={handleOpenShareDrawer}
          handleOpenActionDrawer={handleOpenActionDrawer}
          handleOpenDeleteDrawer={handleOpenDeleteDrawer}
          handleSharePublicData={handleSharePublicData}
          setShowStatement={setShowStatement}
          setIsClickShare={setIsClickShare}
        />

        <DrawerShare
          sharePublicData={sharePublicData}
          open={openShareDrawer}
          onClickClose={() => {
            // general onClose of modal
            handleOpenShareDrawer(false);
            handleSharePublicData(null);
            // queryClient.invalidateQueries({ queryKey: ["projects-scroll"] });
          }}
          variants={variants}
          projectId={project.project_id}
          publicId={project.public_id}
          setShareValue={setShareValue}
          shareValue={
            project.public_id !== null
              ? `${process.env.assistURL}/share/${project.public_id}?type=${fileType}`
              : shareValue
          }
          setTempIsShare={setTempIsShare}
          setIsSwitch={setIsSwitch}
          isSwitch={isSwitch}
          setShowStatement={setShowStatement}
          showStatement={showStatement}
          setIsClickShare={setIsClickShare}
          infoSuccess={infoSuccess}
          infoError={infoError}
          projectName={projectName}
        />
        <DrawerDelete
          projectName={project.project_name}
          projectId={project.project_id}
          open={openDeleteDrawer}
          onClose={() => {
            handleOpenDeleteDrawer(false);
          }}
          onClickDelete={() => {
            onClickDelete(projectName);
          }}
        />
      </DrawerWrapper>
    </LinkItem>
  );
};

const LinkItem = styled.li`
  width: 100%;
  a {
    text-decoration: none;
    color: inherit;
  }
`;

const DrawerWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export default ProjectItem;
