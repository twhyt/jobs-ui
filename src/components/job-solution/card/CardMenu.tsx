import { ReactNode } from "react";
import styled from "styled-components";

interface CardMenuProps {
  title: string;
  icon: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

export default function CardMenu({
  title,
  icon,
  disabled,
  ...rest
}: CardMenuProps) {
  return (
    <CardMenuBox disabled={disabled} {...rest}>
      <div className="card-menu-icon">{icon}</div>
      <span className="font-subtitle5 text-[var(--text-title)]">{title}</span>
    </CardMenuBox>
  );
}

const CardMenuBox = styled.button`
  padding: 16px;
  background-color: var(--blue-1);
  text-align: start;
  border-radius: var(--border-radius-s);
  border: 1px solid var(--blue-3);

  display: flex;
  flex-direction: column;
  gap: 4px;

  .card-menu-icon {
    fill: var(--blue-6);
  }

  &:disabled {
    cursor: not-allowed;
    /* opacity: 0.3; */
    background-color: var(--gray-3);
    border: 1px solid var(--gray-5);

    span {
      color: var(--gray-7);
    }
    .card-menu-icon {
      path {
        fill: var(--gray-7);
      }
      /* Optional: update icon color when disabled */
    }
  }
`;
