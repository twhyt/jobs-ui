import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  htmlType?: "submit" | "reset" | "button";
  type?: "default" | "dangerous" | "ghost";
  shape?: "default" | "circle" | "square";
  size?: "large" | "medium" | "small";
  variant?: "primary" | "secondary" | "dashed" | "link" | "text" | "quiet";
  isDanger?: boolean;
}

const Button = ({
  htmlType = "button",
  type = "default",
  shape = "default",
  size = "medium",
  variant = "primary",
  isDanger = false,
  className,
  children,
  ...rest
}: ButtonProps) => {
  return (
    <DefaultButton
      title="button"
      {...rest}
      type={htmlType}
      className={clsx(
        {
          [`variant-${variant}`]: variant !== "primary",
          [`type-${type}`]: type !== "default",
          [`shape-${shape}`]: shape !== "default",
          [`size-${size}`]: size !== "medium",
          ["font-button4"]: size === "medium",
          ["font-button2"]: size === "large",
          ["danger"]: isDanger,
        },
        className as string
      )}
    >
      {children}
    </DefaultButton>
  );
};

const DefaultButton = styled.button`
  padding: 4px 15px;
  border-radius: 32px;
  height: fit-content;
  cursor: pointer;

  border: 1px solid var(--blue-6);

  background-color: var(--blue-6);
  color: var(--white-100);

  &.size-large {
    min-height: 38.8px;
    padding: 6.4px 17px;
  }

  &:disabled,
  &:disabled:active {
    background-color: var(--gray-3) !important;
    color: var(--text-disable) !important;
    border: 1px solid var(--gray-5) !important;
  }

  &:active:not(:disabled) {
    background-color: var(--blue-5);
  }

  @media screen and (hover: hover) {
    &:hover:not(:disabled) {
      background-color: var(--blue-5);
    }
    &:disabled:hover {
      background-color: var(--gray-3) !important;
      color: var(--text-disable) !important;
      border: 1px solid var(--gray-5) !important;
    }
  }

  &.danger {
    color: var(--white-100);
    border-color: var(--error);
    background-color: var(--error);

    @media screen and (hover: hover) {
      &:hover:not(:disabled) {
        color: var(--white-100);
        border-color: var(--red-2);
        background-color: var(--red-2);
      }
      &:disabled:hover {
        background-color: var(--gray-3) !important;
        color: var(--text-disable) !important;
        border: 1px solid var(--gray-5) !important;
      }
    }
  }

  &.variant-secondary {
    background-color: transparent;
    color: var(--blue-6);
    border: 1px solid var(--blue-6);

    @media screen and (hover: hover) {
      &:hover:not(:disabled) {
        background-color: transparent;
        color: var(--blue-5);
        border: 1px solid var(--blue-5);
      }
      &:disabled:hover {
        background-color: var(--gray-3) !important;
        color: var(--text-disable) !important;
        border: 1px solid var(--gray-5) !important;
      }
    }
    &.danger {
      color: var(--error);
      border-color: var(--error);

      @media screen and (hover: hover) {
        &:hover:not(:disabled) {
          color: var(--red-2);
          border-color: var(--red-2);
        }
        &:disabled:hover {
          background-color: var(--gray-3) !important;
          color: var(--text-disable) !important;
          border: 1px solid var(--gray-5) !important;
        }
      }
    }
  }

  &.variant-quiet {
    background-color: var(--white-100);
    color: var(--text-title);
    border: 1px solid var(--gray-5);

    @media screen and (hover: hover) {
      &:hover:not(:disabled) {
        background-color: var(--white-100);
        color: var(--blue-6);
        border: 1px solid var(--blue-6);
      }
      &:disabled:hover {
        background-color: var(--gray-3) !important;
        color: var(--text-disable) !important;
        border: 1px solid var(--gray-5) !important;
      }
    }
  }
`;

export default Button;
