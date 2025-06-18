import React from "react";
import {
  Button as ButtonAntd,
  ButtonProps,
  ConfigProvider,
  ThemeConfig,
} from "antd";
import clsx from "clsx";

interface Props
  extends Omit<ButtonProps, "type" | "size" | "variant" | "shape"> {
  variants?: "primary" | "secondary" | "dashed" | "link" | "text" | "cancel";
  size?: "small" | "medium" | "large";
  customTheme?: ThemeConfig;
  shape?: "default" | "circle" | "square" | undefined;
  className?: string;
}

const Button: React.FC<Props> = ({
  customTheme,
  children,
  variants,
  size,
  danger,
  shape = "default",
  icon,
  className,
  ...props
}) => {
  const getMaxHeight = (
    shape: string | undefined,
    size: string | undefined
  ) => {
    switch (shape) {
      case "square":
      case "circle": {
        if (size === "medium") return "32px";
        if (size === "small") return "24px";
        return "43.2px";
      }
      default:
        switch (size) {
          case "small":
            return "22px";
          case "large":
            return "38.8px";
          default:
            return "32px";
        }
    }
  };
  const getMaxWidth = (shape: string | undefined, size: string | undefined) => {
    switch (shape) {
      case "square":
      case "circle": {
        if (size === "medium") return "32px";
        if (size === "small") return "24px";
        return "40px";
      }
      default:
        return "100%";
    }
  };

  const getBorderRadius = (shape: string | undefined) => {
    switch (shape) {
      case "circle":
        return "100%";

      case "square":
        return "0";

      default:
        return "var(--border-radius-2)";
    }
  };

  const getSizeStyles = (size: string | undefined) => {
    switch (size) {
      case "small":
        return { fontSize: "var(--font-sm)", padding: 7, height: "22px" };
      case "large":
        return {
          fontSize: "var(--font-lg)",
          padding: 15,
          height: "38.8px",
        };
      default:
        return {
          // fontSize: "var(--font-base)",
          fontSize: "14px", // font-button4
          padding: 15,
          height: "32px",
        };
    }
  };

  const getButtonType = (variants: string | undefined) => {
    const buttonType:
      | "link"
      | "text"
      | "primary"
      | "dashed"
      | "default"
      | undefined = "default";

    switch (variants) {
      case "link":
        return "link";

      case "dashed":
        return "dashed";

      case "text":
        return "text";

      default:
        return buttonType;
    }
  };

  const getVariantStyles = (
    variants: string | undefined,
    size: {
      fontSize: string;
      padding: number;
    },
    customTheme: ThemeConfig | undefined,
    danger: boolean | undefined,
    borderRadius: string
  ) => {
    const { fontSize, padding } = size;

    const mergedTheme: ThemeConfig = {
      cssVar: true,
      ...customTheme,
    };

    const disabledToken = {
      colorTextDisabled: "var(--foreground-3)",
      borderColorDisabled: "var(--gray-5)",
      colorBgContainerDisabled: "var(--gray-3)",
    };

    switch (variants) {
      case "primary":
        return {
          ...mergedTheme,
          components: {
            Button: danger
              ? {
                  fontSize: fontSize as unknown as number,
                  paddingInline: padding,
                  borderRadius: borderRadius as unknown as number,
                  defaultColor: "var(--foreground-2)",
                  defaultBorderColor: "var(--error)",
                  defaultBg: "var(--error)",
                  defaultHoverColor: "var(--foreground-2)",
                  defaultHoverBorderColor: "var(--error)",
                  defaultHoverBg: "var(--red-2)",
                  defaultActiveColor: "var(--foreground-2)",
                  defaultActiveBorderColor: "var(--error)",
                  defaultActiveBg: "var(--red-2)",
                  ...disabledToken,
                }
              : {
                  fontSize: fontSize as unknown as number,
                  paddingInline: padding,
                  borderRadius: borderRadius as unknown as number,
                  defaultColor: "var(--foreground-2)",
                  defaultBorderColor: "var(--blue-6)",
                  defaultBg: "var(--blue-6)",
                  defaultHoverColor: "var(--foreground-2)",
                  defaultHoverBorderColor: "var(--blue-5)",
                  defaultHoverBg: "var(--blue-5)",
                  defaultActiveColor: "var(--foreground-2)",
                  defaultActiveBorderColor: "var(--blue-7)",
                  defaultActiveBg: "var(--blue-7)",
                  ...disabledToken,
                },
          },
        };

      case "secondary":
        return {
          ...mergedTheme,
          components: {
            Button: danger
              ? {
                  fontSize: fontSize as unknown as number,
                  paddingInline: padding,
                  borderRadius: borderRadius as unknown as number,
                  defaultColor: "var(--error)",
                  defaultBorderColor: "var(--error)",
                  defaultBg: "var(--foreground-2)",
                  defaultHoverColor: "var(--error)",
                  defaultHoverBorderColor: "var(--error)",
                  defaultHoverBg: "var(--foreground-2)",
                  defaultActiveColor: "var(--error)",
                  defaultActiveBorderColor: "var(--error)",
                  defaultActiveBg: "var(--foreground-2)",
                  ...disabledToken,
                }
              : {
                  fontSize: fontSize as unknown as number,
                  paddingInline: padding,
                  borderRadius: borderRadius as unknown as number,
                  defaultColor: "var(--blue-6)",
                  defaultBorderColor: "var(--blue-6)",
                  defaultBg: "var(--foreground-2)",
                  defaultHoverColor: "var(--blue-5)",
                  defaultHoverBorderColor: "var(--blue-5)",
                  defaultHoverBg: "var(--foreground-2)",
                  defaultActiveColor: "var(--blue-7)",
                  defaultActiveBorderColor: "var(--blue-7)",
                  defaultActiveBg: "var(--foreground-2)",
                  ...disabledToken,
                },
          },
        };

      case "cancel":
      case "dashed":
        return {
          ...mergedTheme,
          components: {
            Button: danger
              ? {
                  fontSize: fontSize as unknown as number,
                  paddingInline: padding,
                  borderRadius: borderRadius as unknown as number,
                  defaultColor: "var(--error)",
                  defaultBorderColor: "var(--error)",
                  defaultBg: "var(--foreground-2)",
                  defaultHoverColor: "var(--error)",
                  defaultHoverBorderColor: "var(--error)",
                  defaultHoverBg: "var(--foreground-2)",
                  defaultActiveColor: "var(--error)",
                  defaultActiveBorderColor: "var(--error)",
                  defaultActiveBg: "var(--foreground-2)",
                  ...disabledToken,
                }
              : {
                  fontSize: fontSize as unknown as number,
                  paddingInline: padding,
                  borderRadius: borderRadius as unknown as number,
                  defaultColor: "var(--foreground-4)",
                  defaultBorderColor: "var(--gray-5)",
                  defaultBg: "var(--foreground-2)",
                  defaultHoverColor: "var(--blue-6)",
                  defaultHoverBorderColor: "var(--blue-6)",
                  defaultHoverBg: "var(--foreground-2)",
                  defaultActiveColor: "var(--blue-7)",
                  defaultActiveBorderColor: "var(--blue-7)",
                  defaultActiveBg: "var(--foreground-2)",
                  ...disabledToken,
                },
          },
        };

      case "link":
        return {
          ...mergedTheme,
          components: {
            Button: danger
              ? {
                  fontSize: fontSize as unknown as number,
                  paddingInline: padding,
                  colorLink: "var(--error)",
                  colorLinkHover: "var(--red-2)",
                  colorLinkActive: "var(--error)",
                  ...disabledToken,
                }
              : {
                  fontSize: fontSize as unknown as number,
                  paddingInline: padding,
                  colorLink: "var(--blue-6)",
                  colorLinkHover: "var(--blue-6)",
                  colorLinkActive: "var(--blue-6)",
                  ...disabledToken,
                },
          },
        };

      case "text":
        return {
          ...mergedTheme,
          components: {
            Button: danger
              ? {
                  fontSize: fontSize as unknown as number,
                  paddingInline: padding,
                  textTextColor: "var(--error)",
                  textHoverBg: "var(--error)",
                  textTextHoverColor: "var(--foreground-2)",
                  textTextActiveColor: "var(--foreground-2)",
                  colorBgTextActive: "var(--red-2)",
                  ...disabledToken,
                }
              : {
                  fontSize: fontSize as unknown as number,
                  paddingInline: padding,
                  textTextColor: "var(--foreground-4)",
                  textHoverBg: "var(--gray-2)",
                  colorBgTextActive: "var(--gray-3)",
                  ...disabledToken,
                },
          },
        };

      default:
        return mergedTheme;
    }
  };

  const maxWidth = getMaxWidth(shape, size);
  const maxHeight = getMaxHeight(shape, size);

  const sizeStyles = getSizeStyles(size);
  const buttonType = getButtonType(variants);
  const borderRadius = getBorderRadius(shape);
  const mergedTheme = getVariantStyles(
    variants,
    sizeStyles,
    customTheme,
    danger,
    borderRadius
  );

  if (icon) {
    return (
      <ButtonAntd
        icon={icon}
        {...props}
        shape={shape === "square" ? "default" : "circle"}
        style={{
          border: "none",
          boxShadow: "none",
          backgroundColor: "transparent",
        }}
      ></ButtonAntd>
    );
  }

  return (
    <ConfigProvider theme={mergedTheme}>
      <ButtonAntd
        style={{ width: "100%", maxHeight, maxWidth, height: maxHeight }}
        {...props}
        type={buttonType}
        className={clsx(
          {
            ["font-button4"]: size === "medium",
            ["font-button2"]: size === "large",
          },
          className as string
        )}
      >
        {children}
      </ButtonAntd>
    </ConfigProvider>
  );
};

export default Button;
