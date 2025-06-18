import clsx from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";
import styled from "styled-components";

export interface MenuProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  key?: string | number;
  title: string;
  icon: ReactNode;
  disabled?: boolean;
  selected?: boolean;
  onClick?: () => void;
}

const Menu = ({
  title,
  icon,
  disabled,
  selected,
  className,
  onClick,
  ...rest
}: MenuProps) => {
  return (
    <MenuBox
      {...rest}
      onClick={onClick}
      disabled={disabled}
      className={clsx(className, {
        ["selected"]: selected,
      })}
    >
      <span className="menu-box-icon">{icon}</span>
      <span className="menu-box-text font-button5 whitespace-break-spaces">
        {title}
      </span>
    </MenuBox>
  );
};

const MenuBox = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-width: 53px;

  .menu-box-icon {
    path {
      fill: var(--gray-7);
    }
  }

  .menu-box-text {
    color: var(--gray-7);
    text-align: center;
  }

  &:active:not(:disabled),
  &.selected:not(:disabled) {
    .menu-box-icon {
      path {
        fill: var(--blue-6);
      }
    }
    .menu-box-text {
      color: var(--blue-6);
    }
  }

  &:disabled {
    .menu-horizon-icon {
      path {
        fill: var(--text-disable);
      }
    }
    .menu-box-text {
      color: var(--text-disable);
    }
  }

  @media screen and (hover: hover) {
    &:hover:not(:disabled) {
      cursor: pointer;
      .menu-box-icon {
        path {
          fill: var(--blue-6);
        }
      }
      .menu-box-text {
        color: var(--blue-6);
      }
    }
  }
`;

export default Menu;
