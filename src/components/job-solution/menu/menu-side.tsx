// import clsx from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";
import styled from "styled-components";

export interface MenuSideProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  icon?: ReactNode;
  suffixIcon?: ReactNode;
  disabled?: boolean;
  // selected?: boolean;
  onClick?: () => void;
  color?: string;
}

const MenuSide = ({
  title,
  icon,
  disabled,
  //   selected,
  color,
  // className,
  suffixIcon,
  onClick,
  ...rest
}: MenuSideProps) => {
  return (
    <MenuSideBox
      {...rest}
      onClick={onClick}
      disabled={disabled}
      // className={clsx(className, {
      //   // ["selected"]: selected,
      // })}
    >
      {icon && <span className="menu-side-box-icon">{icon}</span>}
      <span
        className={`menu-side-box-text font-h10`}
        style={{ color: color ? color : "var(--text-title)" }}
      >
        {title}
      </span>
      {suffixIcon && (
        <span className="menu-side-box-suffix-icon">{suffixIcon}</span>
      )}
    </MenuSideBox>
  );
};

const MenuSideBox = styled.button`
  width: 100%;
  display: flex;
  padding: 16px;
  gap: 16px;
  align-items: center;
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.3;
  }

  .menu-side-box-icon {
    width: 24px;
    height: 24px;
    min-width: 24px;
    svg {
      width: 100%;
      height: 100%;
    }
    path {
      fill: var(--icon-onlight);
    }
  }

  .menu-side-box-suffix-icon {
    width: 24px;
    min-width: 24px;
    height: 24px;
    svg {
      width: 100%;
      height: 100%;
    }
    path {
      fill: var(--gray-7);
    }
  }

  .menu-side-box-text {
    text-align: left;
    width: 100%;
  }
`;

export default MenuSide;
