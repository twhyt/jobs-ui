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
  let mergedTheme: ThemeConfig = {};

  switch (variants) {
    case "primary":
      mergedTheme = {
        token: {
          colorPrimary: customTheme?.token?.colorPrimary ?? "#1890ff",
          borderRadius: customTheme?.token?.borderRadius ?? 10,
        },
      };
      break;

    case "secondary":
      mergedTheme = {
        token: {
          colorPrimary: customTheme?.token?.colorPrimary ?? "#000000",
          borderRadius: customTheme?.token?.borderRadius ?? 5,
        },
      };
      break;

    default:
      break;
  }

  return (
    <ConfigProvider theme={mergedTheme}>
      <ButtonAntd type="primary" {...props}>
        {children}
      </ButtonAntd>
    </ConfigProvider>
  );
};

export default Button;
