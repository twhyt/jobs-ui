import clsx from "clsx";
import { FC, useMemo } from "react";
import styled from "styled-components";

interface Props {
  suitabilityLevel: number;
}

const Tag: FC<Props> = ({ suitabilityLevel }): JSX.Element => {
  const suitabilityLevelText = useMemo(() => {
    if (typeof suitabilityLevel !== "number") {
      return "";
    }

    switch (suitabilityLevel) {
      case 3:
        return "Perfect Fit";
      case 2:
        return "High Potential";
      case 1:
        return "Partial Fit";

      default:
        return "Not Aligned";
    }
  }, [suitabilityLevel]);

  const suitabilityLevelColor = useMemo(() => {
    if (typeof suitabilityLevel !== "number") {
      return "";
    }

    switch (suitabilityLevel) {
      case 3:
      case 2:
      case 1:
        return "text-[var(--white-100)]";

      default:
        return "text-[var(--blue-8)]";
    }
  }, [suitabilityLevel]);

  const suitabilityLevelBgColor = useMemo(() => {
    if (typeof suitabilityLevel !== "number") {
      return "";
    }

    switch (suitabilityLevel) {
      case 3:
        return "bg-[var(--blue-8)]";
      case 2:
        return "bg-[var(--blue-6)]";
      case 1:
        return "bg-[var(--blue-5)]";

      default:
        return "bg-[var(--blue-3)]";
    }
  }, [suitabilityLevel]);
  return (
    <TagDiv className={clsx(suitabilityLevelBgColor)}>
      <p className={clsx("font-subtitle6", suitabilityLevelColor)}>
        {suitabilityLevelText}
      </p>
    </TagDiv>
  );
};

export default Tag;

const TagDiv = styled.div`
  color: var(--white-100);
  padding: 2px 6px;
  border-radius: 9999px;
  width: 89px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
