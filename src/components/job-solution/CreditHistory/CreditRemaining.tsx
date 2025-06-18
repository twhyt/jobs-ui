import CreditIcon from "@/assets/job-solution/icons/credit";
import { ChevronRightIcon } from "@/assets/job-solution/icons/directional-groups";
import { Divider } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CreditHistoryCTA from "./CreditHistoryCTA";
import dayjs from "dayjs";
import "dayjs/locale/th";
// import axiosAuthInstance from "@/utils/axiosAuthInstance";
// import useTranslation from "@/hooks/useTranslation";

const CreditRemaining = ({
  remainingCredit,
  isTeamMember,
  pocket,
}: {
  remainingCredit: number;
  isTeamMember?: boolean;
  pocket: "account" | "team";
}) => {
  const router = useRouter();
  // const { t } = useTranslation("creditHistory");
  const credits = remainingCredit ?? 0;
  const [expireDate] = useState();
  dayjs.locale(router.locale);

  useEffect(() => {
    const fetchData = async () => {
      // try {
      //   const { data } = await axiosAuthInstance.get(
      //     "/v1/credit-history/expiration",
      //     {
      //       params: {
      //         limit: 1,
      //         page: 1,
      //         pocket: pocket,
      //       },
      //     }
      //   );
      //   setExpireDate(data.items[0].expired_at);
      // } catch (err) {
      //   console.error("Error fetching payment history:", err);
      // } finally {
      // }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-[16px]">
        <RemainingCreditCard>
          <div className="w-full h-[92px] bg-[var(--green-1)] flex flex-col gap-[6px] p-[16px]">
            <div className="font-subtitle5">
              {"credit_history_remain_credits"}
            </div>
            <div id="credits" className="flex gap-[4px] items-center">
              <CreditIcon fill="var(--green-5)" />
              <span className="font-h5 text-[var(--green-6)]">
                {credits.toLocaleString("en-US")}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-[4px] p-[16px]">
            <div className="font-body5">
              {"credit_history_expiring_credits"}{" "}
              <span className="text-[var(--text-secondary)]">
                {dayjs(expireDate).format("DD MMM YYYY")}
              </span>
            </div>
            <div
              className="flex gap-[4px] items-center cursor-pointer"
              onClick={() => {
                router.push(`/credit-history/expire?pocket=${pocket}`);
              }}
            >
              <div className="font-button2 text-[var(--blue-6)]">
                {"credit_history_button_view_more"}
              </div>
              <ChevronRightIcon fill="var(--blue-6)" />
            </div>
          </div>
        </RemainingCreditCard>
        {!isTeamMember && <CreditHistoryCTA />}
      </div>
      {!isTeamMember ? (
        <Divider className="!m-0 !bg-[var(--gray-5)] !my-[24px]" />
      ) : (
        <div className="pt-[24px]"></div>
      )}
    </>
  );
};

export default CreditRemaining;

const RemainingCreditCard = styled.div`
  border-radius: 8px;
  width: 100%;
  height: 176px;
  background-color: var(--white-100);
  border: 1px solid var(--gray-5);
  overflow: hidden;

  #credits {
    svg {
      width: 24px;
      height: 24px;
    }
  }
`;
