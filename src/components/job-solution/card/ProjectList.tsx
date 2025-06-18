import { MoreIcon } from "@/assets/job-solution/icons/suggested-groups/outline";
import React from "react";
import styled from "styled-components";
import ProjectTypeCard, { ProjectTypeProps } from "./ProjectType";

interface ProjectListProps {
  title: string;
  onClick?: () => void;
  ProjectType: ProjectTypeProps;
}

const ProjectList = ({ title, onClick, ProjectType }: ProjectListProps) => {
  return (
    <ProjectListBox className="border-b last:border-none border-[var(--gray-5)]">
      <ProjectTypeCard type={ProjectType.type} />
      <div className="font-body5 text-[var(--text-title)] w-full">{title}</div>
      <button title="more-action" onClick={onClick}>
        <MoreIcon fill="var(--gray-12)" />
      </button>
    </ProjectListBox>
  );
};

export default ProjectList;

const ProjectListBox = styled.div`
  display: flex;
  gap: 10px;
  padding: 16px 0;
`;
