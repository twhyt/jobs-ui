import { FC } from "react";
import DrawerDrag from "../../DrawerDrag";
import TextField from "@/components/job-solution/input/TextField";
import Button from "@/components/job-solution/custom-antd/Button";
import { Controller, useFormContext } from "react-hook-form";
import Message from "@/components/job-solution/message";
// import useTranslation from "@/hooks/useTranslation";
// import { UseMutateFunction } from "@tanstack/react-query";
import ThreeDotColorLoading from "@/components/job-solution/loading";
// import { useRouter } from "next/router";

interface Props {
  isOpen?: boolean;
  onClose: () => void;
  // inviteMutate: UseMutateFunction<
  //   void,
  //   Error,
  //   {
  //     email: string;
  //     language?: string;
  //   },
  //   unknown
  // >;
  invitePending: boolean;
  inviteError: { isExisting: boolean };
}

const DrawerInvite: FC<Props> = ({
  isOpen = false,
  onClose,
  inviteError,
  // inviteMutate,
  invitePending,
}): JSX.Element => {
  const { control, formState, watch } = useFormContext<{
    inviteEmail: string;
  }>();
  // const { t } = useTranslation("teamSetting");

  const { isExisting } = inviteError;
  // const { locale } = useRouter();

  const onInvite = () => {
    // const email = getValues("inviteEmail");
    // inviteMutate({ email, language: locale });
  };

  const emailValue = watch("inviteEmail");
  const isError = !!formState.errors.inviteEmail || !emailValue?.trim();

  return (
    <DrawerDrag open={isOpen} onClose={onClose}>
      <div className="flex flex-col p-[16px] gap-[12px]">
        <div className="flex flex-col gap-[12px]">
          <h4 className="font-h7 text-[var(--black-85)]">{"header_text__2"}</h4>

          <Controller
            control={control}
            name="inviteEmail"
            render={({ field, fieldState }) => {
              console.log(fieldState.error, "fieldState");
              return (
                <TextField
                  labelOnTop={true}
                  label={"field_label__5"}
                  value={field.value}
                  onChange={field.onChange}
                  error={!!fieldState.error}
                  wantLabelError={!!fieldState.error}
                  helperText={
                    !!fieldState.error && (
                      <div className="pl-[16px]">{"error_message__8"}</div>
                    )
                  }
                />
              );
            }}
          />
        </div>

        <div className="flex flex-col gap-[12px]">
          {isExisting && <Message message={"error_message__1"} />}
          {!isExisting && (
            <p className="font-body2 text-[var(--black-85)]">
              {"body_text__1"}
            </p>
          )}
          <div className="flex items-center justify-between gap-[16px]">
            <Button
              variants="cancel"
              size="large"
              onClick={onClose}
              disabled={invitePending}
            >
              {"button__4"}
            </Button>
            <Button
              variants={invitePending ? "secondary" : "primary"}
              size="large"
              disabled={isError}
              onClick={onInvite}
              loading={
                invitePending && {
                  icon: <ThreeDotColorLoading color="bg-[var(--blue-6)]" />,
                }
              }
            >
              {invitePending ? "" : "button__5"}
            </Button>
          </div>
        </div>
      </div>
    </DrawerDrag>
  );
};

// <Button
// variants={loading ? "secondary" : "primary"}
//       size="large"
//       className="flex items-center justify-center"
//       onClick={onGenerate}
// loading={
//   loading && {
//     icon: <ThreeDotColorLoading color="bg-[var(--blue-6)]" />,
//   }
// }
//     ></Button>

export default DrawerInvite;
