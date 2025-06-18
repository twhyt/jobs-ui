import React, { ReactNode, useState } from "react";
import styled from "styled-components";

interface TextFieldProps {
  label?: string;
  value?: string;
  name?: string;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string | ReactNode;
  disabled?: boolean;
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
  labelOnTop?: boolean;
  labelType?: "default" | "projectName";
  handleEnter?: (value: string) => void;
  wantLabelError?: boolean;
}

const TextField = (
  {
    label,
    name,
    value = "",
    onChange,
    error,
    type = "text",
    helperText,
    disabled,
    prefixIcon,
    suffixIcon,
    labelOnTop,
    labelType = "default",
    handleEnter,
    wantLabelError,
  }: TextFieldProps,
  ref: React.LegacyRef<HTMLInputElement>
) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isHover, setIsHover] = useState(false);

  return (
    <>
      <InputContainer>
        {label && (
          <Label
            $isFocused={isFocused || value !== ""}
            $error={error}
            $hasPrefix={!!prefixIcon}
            $labelOnTop={labelOnTop}
            $value={value !== ""}
            $focus={isFocused}
            $disabled={disabled}
            $isHover={isHover}
            $type={labelType}
            $wantLabelError={wantLabelError}
          >
            {label}
          </Label>
        )}
        <InputWrapper>
          {prefixIcon && (
            <PrefixIconContainer $disabled={disabled}>
              {prefixIcon}
            </PrefixIconContainer>
          )}
          <Input
            ref={ref}
            disabled={disabled}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            // onChange={(e) => setValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onKeyDown={(e) => {
              // Prevent form submit
              if (e.key === "Enter") {
                e.preventDefault();
              }

              if (e.key === "Enter" && handleEnter) {
                handleEnter(value);
              }
            }}
            $disabled={disabled}
            $error={error}
            $hasPrefix={!!prefixIcon}
            $hasSuffix={!!suffixIcon}
          />
          {suffixIcon && (
            <SuffixIconContainer $disabled={disabled}>
              {suffixIcon}
            </SuffixIconContainer>
          )}
        </InputWrapper>
      </InputContainer>
      {helperText && <HelperText $error={error}>{helperText}</HelperText>}
    </>
  );
};

const TextFieldWithRef = React.forwardRef<HTMLInputElement, TextFieldProps>(
  TextField
);

export default TextFieldWithRef;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  /* max-width: 300px; */
`;

const Label = styled.label<{
  $isFocused: boolean;
  $error?: boolean;
  $hasPrefix?: boolean;
  $labelOnTop?: boolean;
  $value?: boolean;
  $focus?: boolean;
  $disabled?: boolean;
  $isHover?: boolean;
  $type?: "default" | "projectName";
  $wantLabelError?: boolean;
}>`
  position: absolute;
  top: ${({ $labelOnTop, $isFocused }) =>
    $isFocused && $labelOnTop ? "5px" : "55%"};
  left: ${({ $isFocused, $hasPrefix, $labelOnTop }) =>
    $isFocused && $labelOnTop ? ($hasPrefix ? "-18px" : "10px") : "16px"};
  transform: translateY(-65%);
  font-size: ${({ $isFocused, $labelOnTop }) =>
    $isFocused && $labelOnTop ? "12px" : "16px"};
  /* color: ${({ $isFocused }) =>
    $isFocused ? "var(--blue-6)" : "var(--text-disable)"}; */
  color: ${({
    $focus,
    $labelOnTop,
    $disabled,
    $error,
    $isHover,
    $type,
    $wantLabelError,
  }) => {
    if ($type === "projectName") {
      if ($error) {
        return "var(--error)";
        // return "var(--text-disable)";
      }

      if ($disabled) {
        return "var(--gray-6)";
      }
      if ($focus) {
        return $labelOnTop ? "var(--blue-6)" : "var(--text-title)";
      }

      if ($isHover && $labelOnTop) {
        return "var(--blue-6)";
      }

      return "var(--text-disable)";
    } else if ($wantLabelError) {
      if ($error) {
        return "var(--error)";
      }

      if ($disabled) {
        return "var(--gray-6)";
      }
      if ($focus) {
        return $labelOnTop ? "var(--blue-6)" : "var(--text-disable)";
      }

      if ($isHover && $labelOnTop) {
        return "var(--blue-6)";
      }

      return "var(--text-disable)";
    } else {
      // default
      if ($disabled) {
        return "var(--gray-6)";
      }
      if ($focus) {
        return $labelOnTop ? "var(--blue-6)" : "var(--text-disable)";
      }

      if ($isHover && $labelOnTop) {
        return "var(--blue-6)";
      }

      return "var(--text-disable)";
    }
  }};
  transition: all 0.3s ease;
  background-color: var(--white-100);
  z-index: ${({ $labelOnTop }) => ($labelOnTop ? 1 : 0)};
  pointer-events: none;
  padding: ${({ $hasPrefix, $labelOnTop }) =>
    $hasPrefix ? "0rem 0.2rem 0 2rem" : !$labelOnTop ? "0" : "0rem 0.2rem"};
  display: ${({ $labelOnTop, $value }) =>
    $value ? ($labelOnTop ? "block" : "none") : "block"};
`;
const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;

const Input = styled.input<{
  $error?: boolean;
  $hasPrefix?: boolean;
  $hasSuffix?: boolean;
  $disabled?: boolean;
}>`
  width: 100%;
  /* height: 44px; */
  line-height: normal;
  padding: 16px ${({ $hasSuffix }) => ($hasSuffix ? "40px" : "13.5px")} 16px
    ${({ $hasPrefix }) => ($hasPrefix ? "40px" : "13.5px")};
  font-size: 16px;
  border: 1px solid
    ${({ $error, $disabled }) =>
      $error ? "var(--error)" : $disabled ? "var(--gray-6)" : "var(--gray-7)"};
  border-radius: 5px;
  outline: none;
  /* background-color: ${({ disabled }) =>
    disabled ? "var(--gray-3)" : "var(--white-100)"}; */
  /* color: ${({ $disabled }) =>
    $disabled ? "var(--gray-6)" : "var(--text-primary)"}; */
  color: ${({ $disabled }) => $disabled && "var(--gray-6)"};

  &:focus:not(:disabled),
  &:hover:not(:disabled) {
    border-color: ${({ $error }) =>
      $error ? "var(--error)" : "var(--blue-6)"};
  }
`;

const PrefixIconContainer = styled.div<{ $disabled?: boolean }>`
  position: absolute;
  left: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* height: 44px; */
`;

const SuffixIconContainer = styled.div<{ $disabled?: boolean }>`
  position: absolute;
  right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* height: 44px; */

  div {
    color: ${({ $disabled }) => $disabled && "var(--gray-6)"};
  }
`;

const HelperText = styled.span<{ $error?: boolean }>`
  font-size: 12px;
  color: ${({ $error }) => ($error ? "var(--error)" : "var(--text-secondary)")};
  margin-top: -8px;
  display: block;
`;
