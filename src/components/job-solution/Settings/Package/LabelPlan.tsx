import SuccessIcon from "@/assets/job-solution/icons/suggested-groups/filled/success";
// import useTranslation from "@/hooks/useTranslation";
import React, { useMemo } from "react";

//title: Free trial
//member_amount: 1 account
//className: gradient-background-plan-free

//title: Individual
//member_amount: 1 account
//className: gradient-background-plan-individual

//title: Growing Team
//member_amount: 5 members
//className: gradient-background-plan-team

interface LabelPlanProps {
  currentPlan: "free" | "individual" | "team";
  expired: boolean;
}
const LabelPlan: React.FC<LabelPlanProps> = ({ currentPlan, expired }) => {
  // const { t } = useTranslation("buypack");
  const planSwitch = useMemo(() => {
    switch (currentPlan) {
      case "free":
        return {
          title: "buy_pack_free_header",
          member_amount: "buy_pack_free_account",
          className: "gradient-background-plan-free",
        };
      case "individual":
        if (expired) {
          return {
            title: "buy_pack_free_header",
            member_amount: "buy_pack_free_account",
            className: "gradient-background-plan-free",
          };
        } else
          return {
            title: "buy_pack_individual_header",
            member_amount: "buy_pack_individual_account",
            className: "gradient-background-plan-individual",
          };
      case "team":
        if (expired) {
          return {
            title: "buy_pack_free_header",
            member_amount: "buy_pack_free_account",
            className: "gradient-background-plan-free",
          };
        } else
          return {
            title: "buy_pack_team_header",
            member_amount: "buy_pack_team_account",
            className: "gradient-background-plan-team",
          };
    }
  }, [currentPlan, expired]);
  return (
    <div
      className={`p-[16px] flex flex-col gap-[4px] rounded-[8px] ${planSwitch?.className} mt-[8px]`}
    >
      <div className="font-h5 text-[var(--text-onprimary)]">
        {planSwitch?.title}
      </div>
      <div className="flex">
        <div className="w-full font-body5 text-[var(--text-onprimary)]">
          {planSwitch?.member_amount}
        </div>
        <span className="min-w-[24px]">
          <SuccessIcon fill="var(--icon-onprimary)" />
        </span>
      </div>
    </div>
  );
};

export default LabelPlan;
