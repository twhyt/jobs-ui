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
        return { fontSize: "var(--jobs-font-sm)", padding: 7 };
      case "large":
        return { fontSize: "var(--jobs-font-lg)", padding: 15 };
      default:
        return { fontSize: "var(--jobs-font-base)", padding: 15 };
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
        fontFamily: "var(--jobs-font-roboto)",
      },
      cssVar: true,
      ...customTheme,
    };

    const disabledToken = {
      colorTextDisabled: "var(--jobs-color-foreground-3)",
      borderColorDisabled: "var(--jobs-color-light-gray-5)",
      colorBgContainerDisabled: "var(--jobs-color-light-gray-3)",
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
                  borderRadius:
                    "var(--jobs-border-radius-2)" as unknown as number,
                  defaultColor: "var(--jobs-color-foreground-2)",
                  defaultBorderColor: "var(--jobs-color-light-red-1)",
                  defaultBg: "var(--jobs-color-light-red-1)",
                  defaultHoverColor: "var(--jobs-color-foreground-2)",
                  defaultHoverBorderColor: "var(--jobs-color-light-red-1)",
                  defaultHoverBg: "var(--jobs-color-light-red-2)",
                  defaultActiveColor: "var(--jobs-color-foreground-2)",
                  defaultActiveBorderColor: "var(--jobs-color-light-red-1)",
                  defaultActiveBg: "var(--jobs-color-light-red-2)",
                  ...disabledToken,
                }
              : {
                  fontSize: fontSize as unknown as number,
                  paddingInline: padding,
                  borderRadius:
                    "var(--jobs-border-radius-2)" as unknown as number,
                  defaultColor: "var(--jobs-color-foreground-2)",
                  defaultBorderColor: "var(--jobs-color-light-blue-6)",
                  defaultBg: "var(--jobs-color-light-blue-6)",
                  defaultHoverColor: "var(--jobs-color-foreground-2)",
                  defaultHoverBorderColor: "var(--jobs-color-light-blue-5)",
                  defaultHoverBg: "var(--jobs-color-light-blue-5)",
                  defaultActiveColor: "var(--jobs-color-foreground-2)",
                  defaultActiveBorderColor: "var(--jobs-color-light-blue-7)",
                  defaultActiveBg: "var(--jobs-color-light-blue-7)",
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
                  borderRadius:
                    "var(--jobs-border-radius-2)" as unknown as number,
                  defaultColor: "var(--jobs-color-light-red-1)",
                  defaultBorderColor: "var(--jobs-color-light-red-1)",
                  defaultBg: "var(--jobs-color-foreground-2)",
                  defaultHoverColor: "var(--jobs-color-light-red-1)",
                  defaultHoverBorderColor: "var(--jobs-color-light-red-1)",
                  defaultHoverBg: "var(--jobs-color-foreground-2)",
                  defaultActiveColor: "var(--jobs-color-light-red-1)",
                  defaultActiveBorderColor: "var(--jobs-color-light-red-1)",
                  defaultActiveBg: "var(--jobs-color-foreground-2)",
                  ...disabledToken,
                }
              : {
                  fontSize: fontSize as unknown as number,
                  paddingInline: padding,
                  borderRadius:
                    "var(--jobs-border-radius-2)" as unknown as number,
                  defaultColor: "var(--jobs-color-light-blue-6)",
                  defaultBorderColor: "var(--jobs-color-light-blue-6)",
                  defaultBg: "var(--jobs-color-foreground-2)",
                  defaultHoverColor: "var(--jobs-color-light-blue-5)",
                  defaultHoverBorderColor: "var(--jobs-color-light-blue-5)",
                  defaultHoverBg: "var(--jobs-color-foreground-2)",
                  defaultActiveColor: "var(--jobs-color-light-blue-7)",
                  defaultActiveBorderColor: "var(--jobs-color-light-blue-7)",
                  defaultActiveBg: "var(--jobs-color-foreground-2)",
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
                  borderRadius:
                    "var(--jobs-border-radius-2)" as unknown as number,
                  defaultColor: "var(--jobs-color-light-red-1)",
                  defaultBorderColor: "var(--jobs-color-light-red-1)",
                  defaultBg: "var(--jobs-color-foreground-2)",
                  defaultHoverColor: "var(--jobs-color-light-red-1)",
                  defaultHoverBorderColor: "var(--jobs-color-light-red-1)",
                  defaultHoverBg: "var(--jobs-color-foreground-2)",
                  defaultActiveColor: "var(--jobs-color-light-red-1)",
                  defaultActiveBorderColor: "var(--jobs-color-light-red-1)",
                  defaultActiveBg: "var(--jobs-color-foreground-2)",
                  ...disabledToken,
                }
              : {
                  fontSize: fontSize as unknown as number,
                  paddingInline: padding,
                  borderRadius:
                    "var(--jobs-border-radius-2)" as unknown as number,
                  defaultColor: "var(--jobs-color-foreground-4)",
                  defaultBorderColor: "var(--jobs-color-light-gray-5)",
                  defaultBg: "var(--jobs-color-foreground-2)",
                  defaultHoverColor: "var(--jobs-color-light-blue-6)",
                  defaultHoverBorderColor: "var(--jobs-color-light-blue-6)",
                  defaultHoverBg: "var(--jobs-color-foreground-2)",
                  defaultActiveColor: "var(--jobs-color-light-blue-7)",
                  defaultActiveBorderColor: "var(--jobs-color-light-blue-7)",
                  defaultActiveBg: "var(--jobs-color-foreground-2)",
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
                  colorLink: "var(--jobs-color-light-red-1)",
                  colorLinkHover: "var(--jobs-color-light-red-2)",
                  colorLinkActive: "var(--jobs-color-light-red-1)",
                  ...disabledToken,
                }
              : {
                  fontSize: fontSize as unknown as number,
                  paddingInline: padding,
                  colorLink: "var(--jobs-color-light-blue-6)",
                  colorLinkHover: "var(--jobs-color-light-blue-6)",
                  colorLinkActive: "var(--jobs-color-light-blue-6)",
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
                  textTextColor: "var(--jobs-color-light-red-1)",
                  textHoverBg: "var(--jobs-color-light-red-1)",
                  textTextHoverColor: "var(--jobs-color-foreground-2)",
                  textTextActiveColor: "var(--jobs-color-foreground-2)",
                  colorBgTextActive: "var(--jobs-color-light-red-2)",
                  ...disabledToken,
                }
              : {
                  fontSize: fontSize as unknown as number,
                  paddingInline: padding,
                  textTextColor: "var(--jobs-color-foreground-4)",
                  textHoverBg: "var(--jobs-color-light-gray-2)",
                  colorBgTextActive: "var(--jobs-color-light-gray-3)",
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
      <ButtonAntd style={{ width: "100%" }} {...props} type={buttonType}>
        {children}
      </ButtonAntd>
    </ConfigProvider>
  );
};

export default Button;
