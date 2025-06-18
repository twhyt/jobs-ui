import { FC } from "react";
import DrawerDrag from "../DrawerDrag";
import Button from "@/components/job-solution/custom-antd/Button";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import useProject from "@/hooks/useProject";
// import useTranslation from "@/hooks/useTranslation";

interface Props {
  open: boolean;
  projectId: string;
  projectName: string;
  onClose: () => void;
  onClickDelete: () => void;
}

const DrawerDelete: FC<Props> = ({
  onClose,
  open,
  // projectId,
  projectName,
  // onClickDelete,
}): JSX.Element => {
  // const { t } = useTranslation("project");
  // const queryClient = useQueryClient();

  // const { deleteProject } = useProject();
  // const { mutate: deleteProjectMutation } = useMutation({
  //   mutationFn: deleteProject,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["projects-scroll"] });
  //     onClose();
  //     onClickDelete();
  //   },
  // });
  return (
    <DrawerDrag open={open} onClose={onClose}>
      <div className="flex flex-col ">
        <div className="p-4">
          <h1 className="font-h7">
            {"confirm_dialogue".replace("{{project_name}}", projectName)}
          </h1>
          <p className="text-sm font-body5 text-[var(--text-secondary)]">
            {"confirm_dialogue__1"}
          </p>
        </div>
        <div className="flex flex-col gap-3 p-4 pb-6">
          <Button
            variants="primary"
            danger
            onClick={() => {
              // deleteProjectMutation(projectId);
              console.log("");
            }}
          >
            {"button__8"}
          </Button>
          <Button variants="cancel" onClick={onClose}>
            {"button__9"}
          </Button>
        </div>
      </div>
    </DrawerDrag>
  );
};

export default DrawerDelete;
