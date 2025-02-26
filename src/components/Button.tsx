import React from "react";
import {
  Button as ButtonAntd,
  ButtonProps,
  ConfigProvider,
  ThemeConfig,
} from "antd";

interface Props extends Omit<ButtonProps, "type" | "size" | "variant"> {
  variants?: "primary" | "secondary" | "dashed" | "link" | "text";
  size?: "small" | "medium" | "large";
  customTheme?: ThemeConfig;
}

const Button: React.FC<Props> = ({
  customTheme,
  children,
  variants,
  size,
  danger,
  ...props
}) => {
  const getSizeStyles = (size: string | undefined) => {
    switch (size) {
      case "small":
        return { fontSize: "var(--font-sm)", padding: 7 };
      case "large":
        return { fontSize: "var(--font-lg)", padding: 15 };
      default:
        return { fontSize: "var(--font-base)", padding: 15 };
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
    danger: boolean | undefined
  ) => {
    const { fontSize, padding } = size;

    const mergedTheme: ThemeConfig = {
      token: {
        fontFamily: "var(--font-roboto)",
      },
      cssVar: true,
      ...customTheme,
    };

    const disabledToken = {
      colorTextDisabled: "var(--color-foreground-3)",
      borderColorDisabled: "var(--color-light-gray-5)",
      colorBgContainerDisabled: "var(--color-light-gray-3)",
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
                  borderRadius: "var(--border-radius-2)" as unknown as number,
                  defaultColor: "var(--color-foreground-2)",
                  defaultBorderColor: "var(--color-light-red-1)",
                  defaultBg: "var(--color-light-red-1)",
                  defaultHoverColor: "var(--color-foreground-2)",
                  defaultHoverBorderColor: "var(--color-light-red-1)",
                  defaultHoverBg: "var(--color-light-red-2)",
                  defaultActiveColor: "var(--color-foreground-2)",
                  defaultActiveBorderColor: "var(--color-light-red-1)",
                  defaultActiveBg: "var(--color-light-red-2)",
                  ...disabledToken,
                }
              : {
                  fontSize: fontSize as unknown as number,
                  paddingInline: padding,
                  borderRadius: "var(--border-radius-2)" as unknown as number,
                  defaultColor: "var(--color-foreground-2)",
                  defaultBorderColor: "var(--color-light-blue-6)",
                  defaultBg: "var(--color-light-blue-6)",
                  defaultHoverColor: "var(--color-foreground-2)",
                  defaultHoverBorderColor: "var(--color-light-blue-5)",
                  defaultHoverBg: "var(--color-light-blue-5)",
                  defaultActiveColor: "var(--color-foreground-2)",
                  defaultActiveBorderColor: "var(--color-light-blue-7)",
                  defaultActiveBg: "var(--color-light-blue-7)",
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
                  borderRadius: "var(--border-radius-2)" as unknown as number,
                  defaultColor: "var(--color-light-red-1)",
                  defaultBorderColor: "var(--color-light-red-1)",
                  defaultBg: "var(--color-foreground-2)",
                  defaultHoverColor: "var(--color-light-red-1)",
                  defaultHoverBorderColor: "var(--color-light-red-1)",
                  defaultHoverBg: "var(--color-foreground-2)",
                  defaultActiveColor: "var(--color-light-red-1)",
                  defaultActiveBorderColor: "var(--color-light-red-1)",
                  defaultActiveBg: "var(--color-foreground-2)",
                  ...disabledToken,
                }
              : {
                  fontSize: fontSize as unknown as number,
                  paddingInline: padding,
                  borderRadius: "var(--border-radius-2)" as unknown as number,
                  defaultColor: "var(--color-light-blue-6)",
                  defaultBorderColor: "var(--color-light-blue-6)",
                  defaultBg: "var(--color-foreground-2)",
                  defaultHoverColor: "var(--color-light-blue-5)",
                  defaultHoverBorderColor: "var(--color-light-blue-5)",
                  defaultHoverBg: "var(--color-foreground-2)",
                  defaultActiveColor: "var(--color-light-blue-7)",
                  defaultActiveBorderColor: "var(--color-light-blue-7)",
                  defaultActiveBg: "var(--color-foreground-2)",
                  ...disabledToken,
                },
          },
        };

      case "dashed":
        return {
          ...mergedTheme,
          components: {
            Button: danger
              ? {
                  fontSize: fontSize as unknown as number,
                  paddingInline: padding,
                  borderRadius: "var(--border-radius-2)" as unknown as number,
                  defaultColor: "var(--color-light-red-1)",
                  defaultBorderColor: "var(--color-light-red-1)",
                  defaultBg: "var(--color-foreground-2)",
                  defaultHoverColor: "var(--color-light-red-1)",
                  defaultHoverBorderColor: "var(--color-light-red-1)",
                  defaultHoverBg: "var(--color-foreground-2)",
                  defaultActiveColor: "var(--color-light-red-1)",
                  defaultActiveBorderColor: "var(--color-light-red-1)",
                  defaultActiveBg: "var(--color-foreground-2)",
                  ...disabledToken,
                }
              : {
                  fontSize: fontSize as unknown as number,
                  paddingInline: padding,
                  borderRadius: "var(--border-radius-2)" as unknown as number,
                  defaultColor: "var(--color-foreground-4)",
                  defaultBorderColor: "var(--color-light-gray-5)",
                  defaultBg: "var(--color-foreground-2)",
                  defaultHoverColor: "var(--color-light-blue-6)",
                  defaultHoverBorderColor: "var(--color-light-blue-6)",
                  defaultHoverBg: "var(--color-foreground-2)",
                  defaultActiveColor: "var(--color-light-blue-7)",
                  defaultActiveBorderColor: "var(--color-light-blue-7)",
                  defaultActiveBg: "var(--color-foreground-2)",
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
                  colorLink: "var(--color-light-red-1)",
                  colorLinkHover: "var(--color-light-red-2)",
                  colorLinkActive: "var(--color-light-red-1)",
                  ...disabledToken,
                }
              : {
                  fontSize: fontSize as unknown as number,
                  paddingInline: padding,
                  colorLink: "var(--color-light-blue-6)",
                  colorLinkHover: "var(--color-light-blue-6)",
                  colorLinkActive: "var(--color-light-blue-6)",
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
                  textTextColor: "var(--color-light-red-1)",
                  textHoverBg: "var(--color-light-red-1)",
                  textTextHoverColor: "var(--color-foreground-2)",
                  textTextActiveColor: "var(--color-foreground-2)",
                  colorBgTextActive: "var(--color-light-red-2)",
                  ...disabledToken,
                }
              : {
                  fontSize: fontSize as unknown as number,
                  paddingInline: padding,
                  textTextColor: "var(--color-foreground-4)",
                  textHoverBg: "var(--color-light-gray-2)",
                  colorBgTextActive: "var(--color-light-gray-3)",
                  ...disabledToken,
                },
          },
        };

      default:
        return mergedTheme;
    }
  };

  const sizeStyles = getSizeStyles(size);
  const buttonType = getButtonType(variants);
  const mergedTheme = getVariantStyles(
    variants,
    sizeStyles,
    customTheme,
    danger
  );

  return (
    <ConfigProvider theme={mergedTheme}>
      <ButtonAntd {...props} type={buttonType}>
        {children}
      </ButtonAntd>
    </ConfigProvider>
  );
};

export default Button;
