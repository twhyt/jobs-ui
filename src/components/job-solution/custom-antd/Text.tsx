import clsx from "clsx";
import React from "react";

type Variant =
  | "test"
  | "font-h1"
  | "font-h2"
  | "font-h3"
  | "font-h4"
  | "font-h5"
  | "font-h6"
  | "font-h7"
  | "font-h8"
  | "font-h9"
  | "font-h10"
  | "font-subtitle1"
  | "font-subtitle5"
  | "font-body1"
  | "font-body2"
  | "font-body3"
  | "font-body4"
  | "font-body5"
  | "font-button2"
  | "font-button4"
  | "font-button5"
  | "font-regular-underline"
  | "font-regular-strike"
  | "font-regular-italic"
  | "font-regular-code"
  | "font-footnote"
  | "font-sub-title-5"
  | "font-footnote-description1";

interface TextProps<C extends React.ElementType> {
  as?: C;
  variants?: Variant | "font-body1";
}

type Props<C extends React.ElementType> = React.PropsWithChildren<
  TextProps<C>
> &
  Omit<React.ComponentPropsWithoutRef<C>, keyof TextProps<C>>;

const Text = <C extends React.ElementType = "span">({
  as,
  children,
  variants,
  className,
  ...restProps
}: Props<C>) => {
  const Component = as ?? "span";

  return (
    <Component {...restProps} className={clsx(className, variants)}>
      {children}
    </Component>
  );
};

export default Text;
