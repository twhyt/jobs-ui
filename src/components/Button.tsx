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
  ...props
}) => {
  const disabledToken = {
    colorTextDisabled: "var(--color-foreground-3)",
    borderColorDisabled: "var(--color-light-gray-5)",
    colorBgContainerDisabled: "var(--color-light-gray-3)",
  };
  // const errorToken = {
  //   colorErrorText: "var(--color-foreground-2)",
  //   colorErrorBg: "var(--color-light-red-1)",
  //   colorErrorBorder: "var(--color-light-red-1)",
  //   colorErrorActive: "var(--color-light-red-2)",
  //   colorErrorBgHover: "var(--color-light-red-2)",
  //   colorErrorBorderHover: "var(--color-light-red-1)",
  // };

  let buttonType:
    | "link"
    | "text"
    | "primary"
    | "dashed"
    | "default"
    | undefined = "default";
  let mergedTheme: ThemeConfig = {
    token: {
      fontFamily: "var(--font-roboto)",
    },
    cssVar: true,
    ...customTheme,
  };
  let fontSize: string = "var(--font-base)";
  let padding: number = 15;

  switch (size) {
    case "small":
      fontSize = "var(--font-sm)";
      padding = 7;
      break;

    case "large":
      fontSize = "var(--font-lg)";
      break;

    default:
      break;
  }

  switch (variants) {
    case "primary":
      mergedTheme = {
        ...mergedTheme,
        components: {
          Button: {
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
      break;

    case "secondary":
      mergedTheme = {
        ...mergedTheme,
        components: {
          Button: {
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
      break;

    case "dashed":
      buttonType = "dashed";
      mergedTheme = {
        ...mergedTheme,
        components: {
          Button: {
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
      break;

    case "link":
      buttonType = "link";
      mergedTheme = {
        ...mergedTheme,
        components: {
          Button: {
            fontSize: fontSize as unknown as number,
            paddingInline: padding,
            defaultColor: "var(--color-light-blue-6)",
            ...disabledToken,
          },
        },
      };
      break;

    case "text":
      buttonType = "text";
      mergedTheme = {
        ...mergedTheme,
        components: {
          Button: {
            fontSize: fontSize as unknown as number,
            paddingInline: padding,
            textTextColor: "var(--color-foreground-4)",
            textHoverBg: "var(--color-light-gray-2)",
            colorBgTextActive: "var(--color-light-gray-3)",
            ...disabledToken,
          },
        },
      };
      break;

    default:
      break;
  }

  return (
    <ConfigProvider theme={mergedTheme}>
      <ButtonAntd {...props} type={buttonType}>
        {children}
      </ButtonAntd>
    </ConfigProvider>
  );
};

export default Button;
