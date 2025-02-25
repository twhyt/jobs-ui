import React from "react";
import {
  Button as ButtonAntd,
  ButtonProps,
  ConfigProvider,
  ThemeConfig,
} from "antd";

interface Props extends ButtonProps {
  variants?: "primary" | "secondary";
  customTheme?: ThemeConfig;
}

const Button: React.FC<Props> = ({
  customTheme,
  children,
  variants,
  ...props
}) => {
  let mergedTheme: ThemeConfig = {
    token: { fontFamily: "var(--font-roboto)" },
    cssVar: true,
  };

  switch (variants) {
    case "primary":
      mergedTheme = {
        ...mergedTheme,
        components: {
          Button: {
            borderRadius: "var(--border-radius-2)" as unknown as number,
            defaultColor: "var(--color-foreground)",
            defaultBg: "var(--color-light-blue-6)",
            defaultBorderColor: "var(--color-light-blue-6)",
            defaultHoverBg: "var(--color-light-blue-5)",
            defaultHoverBorderColor: "var(--color-light-blue-5)",
            defaultHoverColor: "var(--color-foreground)",
            defaultActiveBg: "var(--color-light-blue-7)",
            defaultActiveBorderColor: "var(--color-light-blue-7)",
            defaultActiveColor: "var(--color-foreground)",
          },
        },
      };
      break;

    case "secondary":
      mergedTheme = {
        ...mergedTheme,
        token: {
          ...mergedTheme.token,
        },
      };
      break;

    default:
      break;
  }

  return (
    <ConfigProvider theme={mergedTheme}>
      <ButtonAntd {...props} type="default">
        {children}
      </ButtonAntd>
    </ConfigProvider>
  );
};

export default Button;
