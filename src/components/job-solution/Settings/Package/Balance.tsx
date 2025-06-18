import CreditIcon from "@/assets/job-solution/icons/credit";
import { ChevronRightIcon } from "@/assets/job-solution/icons/directional-groups";
// import useTranslation from "@/hooks/useTranslation";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
// import pluralize from "pluralize";
import { Divider } from "antd";

const Balance = ({
  currentPlan,
  my_total_credit,
  team_total_credit,
}: // expiring_credit,
// no_expired_credit,
// credit_expiration_date = "01 Dec 2025",
{
  currentPlan: "free" | "individual" | "team";
  my_total_credit: number;
  team_total_credit: number;
  // no_expired_credit?: number;
  // expiring_credit?: number;
  // credit_expiration_date?: string;
}) => {
  // const { t } = useTranslation("buypack");

  const ComponentRender = () => {
    switch (currentPlan) {
      case "team":
        return (
          <div className="py-[16px] flex flex-col gap-[16px]">
            <div className="rounded-[4px] bg-[var(--green-1)] w-full h-[68px] p-[8px] flex">
              <div className="w-full flex flex-col gap-[4px]">
                <div className="font-h10">My Pocket</div>
                <div className="flex gap-[4px]" id="credits">
                  <CreditIcon fill="var(--green-5)" />
                  <span className="font-h10 text-[var(--green-6)]">
                    {new Intl.NumberFormat("en-US").format(my_total_credit)}
                  </span>
                </div>
              </div>
              <Divider
                type="vertical"
                className="!bg-[#DFE5EA] !mx-[8px] !h-[52px] !mt-[1px]"
              />
              <div className="w-full flex flex-col gap-[4px]">
                <div className="font-h10">Team Pocket</div>
                <div className="flex gap-[4px]" id="credits">
                  <CreditIcon fill="var(--green-5)" />
                  <span className="font-h10 text-[var(--green-6)]">
                    {new Intl.NumberFormat("en-US").format(team_total_credit)}
                  </span>
                </div>
              </div>
            </div>
            <Link
              href={"/credit-history"}
              className="flex gap-[4px] items-center min-w-fit self-center"
            >
              <span className="font-button2 text-[var(--blue-6)] w-fit">
                view credit history
              </span>
              <ChevronRightIcon fill="var(--blue-6)" />
            </Link>
          </div>
        );

      default: // free | individual
        return (
          <div className="p-[16px] flex">
            <div className="flex gap-[4px] w-full" id="credits">
              <CreditIcon fill="var(--green-5)" />
              <div
                className="font-h10 text-[var(--text-title)]"
                dangerouslySetInnerHTML={{
                  __html: "buy_pack_total_credits".replace(
                    "{{remaining_credits}}",
                    `<span class='text-[var(--green-6)]'>${new Intl.NumberFormat(
                      "en-US"
                    ).format(my_total_credit as number)}</span>`
                  ),
                }}
              ></div>
            </div>
            <Link
              href={"/credit-history"}
              className="flex gap-[4px] items-center min-w-fit"
            >
              <span className="font-button2 text-[var(--blue-6)] w-fit">
                {"buy_pack_credit_history"}
              </span>
              <ChevronRightIcon fill="var(--blue-6)" />
            </Link>
          </div>
        );
    }
  };

  return (
    <BalanceContainer className="flex flex-col gap-[4px]">
      <ComponentRender />

      {/* {currentPlan === "free" ? (
        <></>
      ) : (
        <div className="pl-[28px]">
          {(no_expired_credit as number) > 0 &&
            (expiring_credit as number) > 0 && (
              <div>
                <span className="font-body5 text-[var(--green-6)]">
                  {new Intl.NumberFormat("en-US").format(
                    no_expired_credit as number
                  )}
                </span>{" "}
                <span className="font-body5 text-[var(--text-title)]">
                  {t("buy_pack_credit").replace(
                    "{{credit}}",
                    pluralize("credit", no_expired_credit)
                  )}{" "}
                </span>
              </div>
            )}
          {(expiring_credit as number) > 0 && (
            <div>
              <span className="font-body5 text-[var(--green-6)]">
                {new Intl.NumberFormat("en-US").format(
                  expiring_credit as number
                )}
              </span>{" "}
              <span className="font-body5 text-[var(--text-title)]">
                {t("buy_pack_credit").replace(
                  "{{credit}}",
                  pluralize("credit", expiring_credit)
                )}{" "}
              </span>
              <span className="font-body5 text-[var(--text-secondary)]">
                {t("buy_pack_credit_valid")} {credit_expiration_date}
              </span>
            </div>
          )}
        </div>
      )} */}
    </BalanceContainer>
  );
};

export default Balance;

const BalanceContainer = styled.div`
  #credits {
    svg {
      width: 24px;
      height: 24px;
    }
  }
`;
