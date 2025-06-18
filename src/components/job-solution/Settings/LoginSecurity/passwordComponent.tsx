"use client";
import React, { useState } from "react";
import styled from "styled-components";
import * as Yup from "yup";
// import { useRouter } from "next/router";
import {
  VisibilityOffIcon,
  VisibilityOnIcon,
  WarningIcon,
} from "@/assets/job-solution/icons/suggested-groups/outline";
import {
  ErrorFillIcon,
  SuccessFillIcon,
} from "@/assets/job-solution/icons/suggested-groups/filled";
import TextFieldWithRef from "@/components/job-solution/input/TextField";
import Button from "@/components/job-solution/custom-antd/Button";
import ThreeDotColorLoading from "@/components/job-solution/loading";
// import axiosAuthInstance from "@/utils/axiosAuthInstance";
// import useTranslation from "@/hooks/useTranslation";

const PasswordComponent = () => {
  // const { t } = useTranslation("loginAndSecurity");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  // const router = useRouter();

  const passwordSchema = Yup.object().shape({
    new_password: Yup.string()
      .required("Please enter your password")
      .when([], {
        is: (_: any, context: any) => !!context?.checkStrength,
        then: (schema) =>
          schema
            .min(8)
            .matches(/[0-9]/)
            .matches(/[A-Z]/)
            .matches(/[a-z]/)
            .matches(/[!@#$%^&*(),.?":{}|<>]/),
      }),
    confirm_password: Yup.string()
      .required(
        "login_update_password_update_error_message_confirm_password_require"
      )
      .test(
        "passwords-match",
        "login_update_password_update_error_message_confirm_password_match",
        function (value) {
          const { new_password } = this.parent;

          if (!value) return true;
          return value === new_password;
        }
      ),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    try {
      await passwordSchema.validate(
        { new_password: password, confirm_password: confirmPassword },
        { abortEarly: false }
      );
      setErrors({});

      // await axiosAuthInstance
      //   .put("/v1/account/password", {
      //     new_password: password,
      //     confirm_password: confirmPassword,
      //     token: router.query.token,
      //     language: router.locale,
      //   })
      //   .then(async () => {
      //     await axiosAuthInstance.post("/auth/sign-out/all");
      //     setTimeout(() => {
      //       localStorage.clear();
      //       sessionStorage.clear();
      //       document.cookie.split(";").forEach((cookie) => {
      //         const [name] = cookie.split("=");
      //         document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      //       });
      //       router.push(`${process.env.authURL}/${router.locale}`);
      //     }, 100);
      //   });
    } catch (err: any) {
      const newErrors: { [key: string]: string } = {};
      err.inner.forEach((e: any) => {
        newErrors[e.path] = e.message;
      });
      setErrors(newErrors);
    } finally {
      setLoading(false);
    }
  };

  const criteria = {
    length: password.length >= 8,
    number: /\d/.test(password),
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const validateField = async (field: string, value: string) => {
    try {
      await passwordSchema.validateAt(field, {
        new_password: password,
        confirm_password: confirmPassword,
        [field]: value,
      });
      setErrors((prev) => ({ ...prev, [field]: "" }));
    } catch (err: any) {
      setErrors((prev) => ({ ...prev, [field]: err.message }));
    }
  };

  const isFormValid =
    password.length > 0 &&
    confirmPassword.length > 0 &&
    !errors.new_password &&
    !errors.confirm_password &&
    // optional: also check all criteria are met
    Object.values(criteria).every(Boolean);

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <TextFieldWithRef
        name="New Password"
        label={"login_update_password_update_new_password_placeholder"}
        labelOnTop
        labelType="projectName"
        type={showPassword1 ? "text" : "password"}
        error={!!errors.new_password}
        value={password}
        onChange={(e) => {
          const value = e.target.value;
          setPassword(value);
          validateField("new_password", value);
        }}
        suffixIcon={
          <button
            className="min-w-[24px] cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowPassword1((prev) => !prev);
            }}
          >
            {showPassword1 ? (
              <VisibilityOffIcon size="24" />
            ) : (
              <VisibilityOnIcon size="24" fill="var(--gray-7)" />
            )}
          </button>
        }
      />
      {errors.new_password === "Please enter your password" && (
        <ErrorMsg className="font-footnote-description1">
          <WarningIcon fill="var(--error)" className="mt-[1px]" />
          {/* {errors.new_password} */}
          {"login_update_password_update_error_message_new_password_require"}
        </ErrorMsg>
      )}

      <div className="font-h9">
        {"login_update_password_update_new_password_validation_header_text"}
      </div>

      <CriteriaList>
        {[
          {
            key: 1,
            label:
              "login_update_password_update_new_password_validation_8_char",
            case: criteria.length,
          },
          {
            key: 2,
            label: "login_update_password_update_new_password_validation_1_num",
            case: criteria.number,
          },
          {
            key: 3,
            label:
              "login_update_password_update_new_password_validation_uppercase",
            case: criteria.uppercase,
          },
          {
            key: 4,
            label:
              "login_update_password_update_new_password_validation_lowercase",
            case: criteria.lowercase,
          },
          {
            key: 5,
            label:
              "login_update_password_update_new_password_validation_special_char",
            case: criteria.special,
          },
        ].map((item) => {
          let className = "default";
          let icon = (
            <span className="block w-[4px] h-[4px] bg-[var(--text-title)] rounded-full mt-[9px]" />
          );

          if (password.length > 0) {
            className = item.case ? "valid" : "invalid";
            icon = item.case ? (
              <SuccessFillIcon
                width={16}
                height={16}
                fill="var(--success)"
                className="mt-1"
              />
            ) : (
              <ErrorFillIcon width={24} height={24} />
            );
          }
          return (
            <li className={`font-body5 ${className}`} key={item.key}>
              <span className="min-w-[24px] min-h-[24px]  justify-center flex">
                {icon}{" "}
              </span>
              {item.label}
            </li>
          );
        })}
      </CriteriaList>

      <TextFieldWithRef
        name="Confirm Password"
        label={"login_update_password_update_confirm_password_placeholder"}
        labelOnTop
        labelType="projectName"
        type={showPassword2 ? "text" : "password"}
        error={!!errors.confirm_password}
        value={confirmPassword}
        onChange={(e) => {
          const value = e.target.value;
          setConfirmPassword(value);
          validateField("confirm_password", value);
        }}
        suffixIcon={
          <button
            className="min-w-[24px] cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowPassword2((prev) => !prev);
            }}
          >
            {showPassword2 ? (
              <VisibilityOffIcon size="24" />
            ) : (
              <VisibilityOnIcon size="24" fill="var(--gray-7)" />
            )}
          </button>
        }
      />
      {errors.confirm_password && (
        <ErrorMsg className="font-footnote-description1">
          <WarningIcon fill="var(--error)" className="mt-[1px]" />
          {errors.confirm_password}
        </ErrorMsg>
      )}

      <Button
        variants={loading ? "secondary" : "primary"}
        size="large"
        htmlType="submit"
        loading={
          loading && {
            icon: <ThreeDotColorLoading color="bg-[var(--blue-6)]" />,
          }
        }
        disabled={!isFormValid}
        className="!mt-[16px]"
      >
        {!loading && "login_update_password_update_button_confirm"}
      </Button>
    </FormWrapper>
  );
};

export default PasswordComponent;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ErrorMsg = styled.div`
  color: var(--error);
  display: flex;
  align-items: start;
  gap: 4px;
  padding-left: 16px;
`;

const CriteriaList = styled.ul`
  list-style: none;
  /* padding-left: 1.5rem; */

  li {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .valid {
    padding-left: 0 !important;
    color: var(--success);
  }

  .invalid {
    padding-left: 0 !important;
    color: var(--error);
  }
`;
