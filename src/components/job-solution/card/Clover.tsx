import React from "react";
import BaseButton from "../BaseButton";
import CreditIcon from "@/assets/job-solution/icons/credit";
import styled from "styled-components";
// import useTranslation from "@/hooks/useTranslation";

const CloverCard = ({
  top_up_amount,
  cost,
  onClick,
}: {
  top_up_amount: number;
  cost: number;
  onClick?: () => void;
}) => {
  // const { t } = useTranslation("buypack");
  return (
    <CloverCardContainer className="shadow-md">
      <div className="flex flex-col gap-[4px] items-center">
        <div id="credits" className="flex gap-[4px]">
          <CreditIcon fill="var(--green-5)" />
          <span className="font-h5 text-[var(--green-6)]">{top_up_amount}</span>
        </div>
        <div className="font-h10 text-[var(--text-title)] pl-[6px]">
          ฿{" "}
          {cost.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
      </div>
      <BaseButton className="w-fit !px-[44px] !py-[4px]" onClick={onClick}>
        <span className="font-button4 text-[var(--gray-1)]">
          {"buy_pack_button_buy"}
        </span>
      </BaseButton>
    </CloverCardContainer>
  );
};

export default CloverCard;

const CloverCardContainer = styled.div`
  width: 144px;
  padding: 16px 0;
  background-color: var(--gray-1);
  border-radius: 8px;
  /* margin: auto; */
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;

  #credits {
    svg {
      width: 32px;
      height: 32px;
    }
  }
`;
