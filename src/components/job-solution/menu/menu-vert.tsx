import React, { ButtonHTMLAttributes, ReactNode } from "react";
import styled from "styled-components";

export interface MenuVerticalProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  icon: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

const MenuVertical = ({
  title,
  disabled = false,
  icon,
  onClick,
}: MenuVerticalProps) => {
  return (
    <div>
      <MenuVerticalBox onClick={onClick} disabled={disabled}>
        <div className="menu-vertical-icon">{icon}</div>
        <p className="menu-vertical-text font-button5">{title}</p>
      </MenuVerticalBox>
    </div>
  );
};

const MenuVerticalBox = styled.button`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 4px;
  padding: 8px;
  width: fit-content;

  .menu-vertical-icon {
    background-color: var(--blue-1);
    border-radius: var(--border-radius-s);
    max-height: 40px;
    min-width: 40px;
    align-self: center;
    justify-content: center;
    align-items: center;
    display: flex;
    aspect-ratio: 1;

    path {
      fill: var(--blue-6);
    }
  }

  .menu-vertical-text {
    text-align: center;
    color: var(--text-title);
  }

  &:active:not(:disabled) {
    .menu-vertical-text {
      color: var(--blue-6);
    }
  }

  &:disabled {
    .menu-vertical-icon {
      background-color: var(--gray-2);
      path {
        fill: var(--text-disable);
      }
    }
    .menu-vertical-text {
      color: var(--text-disable);
    }
  }

  @media screen and (hover: hover) {
    &:hover:not(:disabled) {
      cursor: pointer;
      .menu-vertical-text {
        color: var(--blue-6);
      }
    }
  }
`;

export default MenuVertical;
