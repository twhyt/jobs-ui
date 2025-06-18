import { AddCircleIcon } from "@/assets/job-solution/icons/suggested-groups/outline";
import React from "react";
import styled from "styled-components";

interface CardStatisticsProps {
  amount: number;
  title: string;
}

const CardStatistics = ({ amount, title }: CardStatisticsProps) => {
  return (
    <CardStatisticBox>
      <StatBox
        className={`${amount === 0 ? "justify-between" : "justify-center"}`}
      >
        <h1
          className={`font-h5 ${
            amount > 0 ? "text-[var(--blue-6)]" : "text-[var(--text-disable)]"
          }`}
        >
          {amount}
        </h1>
        {amount === 0 && (
          <button title="add">
            <AddCircleIcon fill="var(--blue-6)" />
          </button>
        )}
      </StatBox>
      <p className="font-button5 text-[var(--text-title)]">{title}</p>
    </CardStatisticBox>
  );
};

export default CardStatistics;

const CardStatisticBox = styled.div`
  /* background-color: var(--blue-1); */
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  min-width: 75.75px;
  text-align: center;
`;

const StatBox = styled.div`
  background-color: var(--gray-3);
  border-radius: var(--border-radius-s);
  display: flex;
  padding: 8px;
  height: 48px;
  align-items: center;
  /* justify-content: center; */
`;
