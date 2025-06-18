import { Row } from "antd";
import { Menu } from "@/components/job-solution/menu";
import { MenuProps } from "@/components/job-solution/menu/menu";
import {
  AccountBoxIcon,
  DescriptionIcon,
} from "@/assets/job-solution/icons/suggested-groups/outline";
import { useRouter } from "next/router";
import {
  EditDocumentIcon,
  InventorySmartIcon,
} from "@/assets/job-solution/icons/editor-groups/outlined";
// import useTranslation from "@/hooks/useTranslation";

interface Props {
  activeKey?: string;
}

const NavigationBarProjects = ({ activeKey }: Props) => {
  const { pathname, push } = useRouter();
  // const { t: commonT } = useTranslation("common");

  function onPush(url: string) {
    if (pathname !== url) {
      push(url);
    }
  }

  const resumeExtractorSelected =
    pathname === "/resume-extraction" || activeKey === "resume_extractor";

  const candidateCheckerSelected =
    pathname === "/candidate-checker" || activeKey === "candidate_checker";

  const smartJdGeneratorSelected =
    pathname === "/smart-jd-generator" || activeKey === "smart_jd_generator";

  const MenuItem: MenuProps[] = [
    {
      key: "resume-extractor",
      title: "resume_extractor",
      icon: <DescriptionIcon />,
      selected: resumeExtractorSelected,
      onClick: () => {
        if (resumeExtractorSelected) return;
        onPush("/resume-extraction");
      },
    },
    {
      key: "candidate-checker",
      title: "candidate_checker",
      icon: <AccountBoxIcon />,
      selected: candidateCheckerSelected,
      onClick: () => {
        if (candidateCheckerSelected) return;
        onPush("/candidate-checker");
      },
    },
    {
      key: "smart-jd-generator",
      title: "smart_jd_generator",
      icon: <InventorySmartIcon />,
      selected: smartJdGeneratorSelected,
      onClick: () => {
        onPush("/smart-jd-generator");
      },
    },
    {
      key: "job-caption-creator",
      title: "job_caption_creator",
      icon: <EditDocumentIcon />,
      disabled: true,
    },
  ];

  // const

  return (
    <div id="navigation-bar" className="navigation-bar">
      <Row justify={"space-around"} align={"middle"} wrap={false}>
        {MenuItem.map((item) => {
          return <Menu {...item} key={item.key} />;
        })}
      </Row>
    </div>
  );
};

export default NavigationBarProjects;
