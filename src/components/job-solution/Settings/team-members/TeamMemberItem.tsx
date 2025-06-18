import Button from "@/components/job-solution/custom-antd/Button";
import DrawerActions from "@/components/job-solution/drawer/settings/team-members/DrawerActions";
// import useTranslation from "@/hooks/useTranslation";
import clsx from "clsx";
import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC, useMemo, useState } from "react";

import "dayjs/locale/th";
// import useTeam from "@/hooks/useTeam";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { GET_TEAM_MEMBERS } from "@/utils/queryKey";

type Status = "member" | "pending" | "deleted" | "expired";

interface Props {
  role?: "member" | "owner";
  id: string;
  name: string;
  email: string;
  status?: Status;
  isLast: boolean;
  isFirst: boolean;
  ownerPicture?: string;
  joined_at: string;
  currentRole?: "owner" | "member";
  memberId: string;
  teamIsFull: boolean;
}

const Tags = ({ status }: { status?: Status }) => {
  // const { t } = useTranslation("teamSetting");

  const label = useMemo(() => {
    const label = "label__1";
    if (status === "deleted") {
      return "label__2";
    }
    if (status === "pending") {
      return "label__3";
    }
    if (status === "expired") {
      return "label__4";
    }

    return label;
  }, [status]);

  const { bgColor, borderColor, textColor } = useMemo(() => {
    if (status === "deleted") {
      return {
        bgColor: "bg-[var(--gray-3)]",
        borderColor: "border-[var(--black-45)]",
        textColor: "text-[var(--black-45)]",
      };
    }
    if (status === "pending") {
      return {
        bgColor: "bg-[var(--yellow-1)]",
        borderColor: "border-[var(--warning)]",
        textColor: "text-[var(--yellow-10)]",
      };
    }
    if (status === "expired") {
      return {
        bgColor: "bg-[var(--red-1)]",
        borderColor: "border-[var(--error)]",
        textColor: "text-[var(--error)]",
      };
    }

    return {
      bgColor: "bg-[var(--green-1)]",
      borderColor: "border-[var(--green-6)]",
      textColor: "text-[var(--green-6)]",
    };
  }, [status]);

  return (
    <div
      className={clsx(
        "px-[12px] border rounded-full flex items-center justify-center min-w-[74px]",
        bgColor,
        borderColor
      )}
    >
      <span className={clsx("font-body2", textColor)}>{label}</span>
    </div>
  );
};

const TeamMemberItem: FC<Props> = ({
  role = "member",
  isLast,
  status,
  ownerPicture,
  email,
  name,
  joined_at,
  currentRole,
  // memberId,
  teamIsFull,
}): JSX.Element => {
  // const queryClient = useQueryClient();
  // const { t } = useTranslation("teamSetting");
  const showMoreActions = status !== "pending" && currentRole === "owner";
  const [openDrawerActions, setOpenDrawerActions] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [confirmType, setConfirmType] = useState<
    "remove" | "reinvite" | "delete"
  >("reinvite");
  const { locale } = useRouter();
  // const { postReInviteTeamMember, deleteTeamMember } = useTeam();

  // const { mutate: reInviteMutation, isPending: isPendingReInvite } =
  //   useMutation({
  //     mutationFn: postReInviteTeamMember,
  //     onSuccess: () => {
  //       setOpenConfirm(false);
  //     },
  //   });

  // const { mutate: deleteMutation, isPending: isPendingDelete } = useMutation({
  //   mutationFn: deleteTeamMember,
  //   onSuccess: () => {
  //     setOpenConfirm(false);
  //     queryClient.invalidateQueries({ queryKey: [GET_TEAM_MEMBERS] });
  //   },
  // });

  const actionItems = useMemo(() => {
    let items: {
      id: string;
      button: JSX.Element;
      hidden?: boolean;
    }[] = [
      {
        id: "delete",
        button: (
          <Button
            size="large"
            variants="primary"
            danger
            onClick={() => {
              setConfirmType("delete");
              setOpenConfirm(true);
              setOpenDrawerActions(false);
            }}
          >
            {"button__11"}
          </Button>
        ),
      },
      {
        id: "cancel",
        button: (
          <Button
            size="large"
            variants="cancel"
            onClick={() => {
              setOpenDrawerActions(false);
            }}
          >
            {"button__12"}
          </Button>
        ),
      },
    ];

    if (status === "expired") {
      items = [
        {
          id: "remove",
          button: (
            <Button
              size="large"
              variants="primary"
              danger
              onClick={() => {
                setConfirmType("remove");
                setOpenConfirm(true);
                setOpenDrawerActions(false);
              }}
            >
              {"button__13"}
            </Button>
          ),
        },
        {
          id: "re-invite",
          button: (
            <Button
              size="large"
              variants="secondary"
              onClick={() => {
                setConfirmType("reinvite");
                setOpenConfirm(true);
                setOpenDrawerActions(false);
              }}
            >
              {"button__14"}
            </Button>
          ),
          hidden: teamIsFull,
        },
        {
          id: "cancel",
          button: (
            <Button
              size="large"
              variants="cancel"
              onClick={() => {
                setOpenDrawerActions(false);
              }}
            >
              {"button__15"}
            </Button>
          ),
        },
      ];
    }

    if (status === "deleted") {
      items = [
        {
          id: "remove",
          button: (
            <Button
              size="large"
              variants="primary"
              danger
              onClick={() => {
                setConfirmType("remove");
                setOpenConfirm(true);
                setOpenDrawerActions(false);
              }}
            >
              {"button__13"}
            </Button>
          ),
        },
        {
          id: "re-invite",
          button: (
            <Button
              size="large"
              variants="secondary"
              onClick={() => {
                setConfirmType("reinvite");
                setOpenConfirm(true);
                setOpenDrawerActions(false);
              }}
            >
              {"button__14"}
            </Button>
          ),
          hidden: teamIsFull,
        },
        {
          id: "cancel",
          button: (
            <Button
              size="large"
              variants="cancel"
              onClick={() => {
                setOpenDrawerActions(false);
              }}
            >
              {"button__15"}
            </Button>
          ),
        },
      ];
    }

    return items;
  }, [status, teamIsFull]);

  const confirmItems = useMemo(() => {
    // delete
    let items = [
      {
        id: "delete-member",
        button: (
          <Button
            size="large"
            variants="primary"
            danger
            onClick={() => {
              // deleteMutation({ member_id: memberId });
            }}
            loading={false}
          >
            {"button__11"}
          </Button>
        ),
      },
      {
        id: "cancel",
        button: (
          <Button
            size="large"
            variants="cancel"
            onClick={() => {
              setOpenConfirm(false);
            }}
            disabled={false}
          >
            {"button__12"}
          </Button>
        ),
      },
    ];

    if (confirmType === "remove") {
      items = [
        {
          id: "remove-member",
          button: (
            <Button
              size="large"
              variants="primary"
              danger
              onClick={() => {
                // deleteMutation({ member_id: memberId });
              }}
              loading={false}
            >
              {"button__16"}
            </Button>
          ),
        },
        {
          id: "cancel",
          button: (
            <Button
              disabled={false}
              size="large"
              variants="cancel"
              onClick={() => {
                setOpenConfirm(false);
              }}
            >
              {"button__12"}
            </Button>
          ),
        },
      ];
    }

    if (confirmType === "reinvite") {
      items = [
        {
          id: "reinvite-member",
          button: (
            <Button
              size="large"
              variants="primary"
              onClick={() => {
                // reInviteMutation({ member_id: memberId, language: locale });
              }}
              loading={false}
            >
              {"button__18"}
            </Button>
          ),
        },
        {
          id: "cancel",
          button: (
            <Button
              disabled={false}
              size="large"
              variants="cancel"
              onClick={() => {
                setOpenConfirm(false);
              }}
            >
              {"button__19"}
            </Button>
          ),
        },
      ];
    }
    return items;
  }, [
    // t,
    confirmType,
    // deleteMutation,
    // reInviteMutation,
    // isPendingDelete,
    // isPendingReInvite,
    // memberId,
  ]);

  const confirmTitle = useMemo(() => {
    // delete
    let title = "confirm_dialogue";

    if (confirmType === "remove") {
      title = "confirm_dialogue__1";
    }

    if (confirmType === "reinvite") {
      title = "confirm_dialogue__2";
    }

    return title;
  }, [confirmType]);

  const firstCharEmail = email.charAt(0);

  dayjs.locale(locale);

  if (role === "owner") {
    return (
      <td
        className="border-[var(--gray-5)] p-[16px]"
        style={{ borderBottom: isLast ? "none" : "1px solid var(--gray-5)" }}
      >
        <div className="flex items-center justify-between gap-[10px]">
          {/* Image */}
          <div className="w-[60px] h-[60px] rounded-full flex items-center justify-center bg-[var(--blue-1)] overflow-hidden">
            {ownerPicture ? (
              <Image
                src={ownerPicture}
                height={60}
                width={60}
                alt="owner-picture"
                className="object-cover"
              />
            ) : (
              <div className="bg-[var(--blue-1)] w-[60px] h-[60px] rounded-full flex items-center justify-center">
                <p className="font-subtitle1">{firstCharEmail.toUpperCase()}</p>
              </div>
            )}
          </div>
          <div className="flex flex-col flex-1">
            <h4 className="font-h10">{name}</h4>
            <div className="flex justify-between flex-wrap gap-x-[10px]">
              <p className="font-button4 text-[var(--black-45)]">{email}</p>
              <p className="font-button4 text-[var(--blue-6)]">{"label"}</p>
            </div>
          </div>
        </div>
      </td>
    );
  }

  return (
    <td
      className="p-[16px]"
      style={{ borderBottom: isLast ? "none" : "1px solid var(--gray-5)" }}
    >
      <div className="flex items-center justify-between gap-[10px]">
        <div className="bg-[var(--blue-1)] w-[60px] h-[60px] rounded-full flex items-center justify-center">
          <p className="font-subtitle1">{firstCharEmail.toUpperCase()}</p>
        </div>
        <div className="flex flex-col flex-1 gap-[4px]">
          <h4 className="font-h10">{email}</h4>
          <div className="flex items-center  flex-wrap gap-x-[10px]">
            <Tags status={status} />
            {status === "member" && (
              <p className="font-button4 text-[var(--black-45)]">
                {"body_text".replace(
                  "{{join_date}}",
                  dayjs(joined_at).format("DD MMM YYYY")
                )}
              </p>
            )}
          </div>
        </div>
        {showMoreActions && (
          <Button
            onClick={() => setOpenDrawerActions(true)}
            shape="square"
            icon={
              <div>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 14C5.45 14 4.97917 13.8042 4.5875 13.4125C4.19583 13.0208 4 12.55 4 12C4 11.45 4.19583 10.9792 4.5875 10.5875C4.97917 10.1958 5.45 10 6 10C6.55 10 7.02083 10.1958 7.4125 10.5875C7.80417 10.9792 8 11.45 8 12C8 12.55 7.80417 13.0208 7.4125 13.4125C7.02083 13.8042 6.55 14 6 14ZM12 14C11.45 14 10.9792 13.8042 10.5875 13.4125C10.1958 13.0208 10 12.55 10 12C10 11.45 10.1958 10.9792 10.5875 10.5875C10.9792 10.1958 11.45 10 12 10C12.55 10 13.0208 10.1958 13.4125 10.5875C13.8042 10.9792 14 11.45 14 12C14 12.55 13.8042 13.0208 13.4125 13.4125C13.0208 13.8042 12.55 14 12 14ZM18 14C17.45 14 16.9792 13.8042 16.5875 13.4125C16.1958 13.0208 16 12.55 16 12C16 11.45 16.1958 10.9792 16.5875 10.5875C16.9792 10.1958 17.45 10 18 10C18.55 10 19.0208 10.1958 19.4125 10.5875C19.8042 10.9792 20 11.45 20 12C20 12.55 19.8042 13.0208 19.4125 13.4125C19.0208 13.8042 18.55 14 18 14Z"
                    fill="#141414"
                  />
                </svg>
              </div>
            }
          ></Button>
        )}
      </div>

      {/* Actions */}
      <DrawerActions
        isOpen={openDrawerActions}
        items={actionItems}
        onClose={() => {
          setOpenDrawerActions(false);
        }}
      />

      {/* Confirm Actions */}
      <DrawerActions
        isOpen={openConfirm}
        items={confirmItems}
        title={confirmTitle}
        onClose={() => {
          setOpenConfirm(false);
        }}
      />
    </td>
  );
};

export default TeamMemberItem;
