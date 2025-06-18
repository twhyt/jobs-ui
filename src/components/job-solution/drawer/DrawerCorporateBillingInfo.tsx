// import { useAppDispatch, useAppSelector } from "@/store/redux-hook";
import DrawerDrag from "./DrawerDrag";
// import { onCloseDrawerCorporateBillingInfo } from "@/store/slices/drawerSlice";
import { Col, Row } from "antd";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeftIcon } from "@/assets/job-solution/icons/directional-groups";
import DetailInput from "../detail/DetailInput";
import TextField from "../input/TextField";
// import {
//   // resetCorporateBillingInfo,
//   setCorporateBillingInfo,
// } from "@/store/slices/billingSlice";
import { WarningIcon } from "@/assets/job-solution/icons/suggested-groups/outline";
// import useTranslation from "@/hooks/useTranslation";

type corporateProps = {
  address: string;
  contact: {
    phone_number: string;
    email: string;
  };
  information: {
    organization_name: string;
    branch: string;
    tax_id: string;
  };
};

const DrawerCorporateBillingInfo = () => {
  // const dispatch = useAppDispatch();
  // const { t } = useTranslation("drawer");
  // const { drawerCorporateBillingInfo } = useAppSelector(
  //   (state) => state.drawer
  // );
  // const corporate = useAppSelector((state) => state.billing.corporate);
  // const savedBillingData = useAppSelector((state) => state.billing.corporate);
  const [formData, setFormData] = useState<corporateProps>({
    address: "",
    contact: {
      phone_number: "",
      email: "",
    },
    information: {
      organization_name: "",
      branch: "",
      tax_id: "",
    },
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [, setIsValid] = useState(false);

  const CloseDrawer = useCallback(() => {
    const newFormData: corporateProps = { ...formData };

    Object.keys(errors).forEach((key) => {
      if (errors[key]) {
        if (key === "address") {
          newFormData.address = "";
        } else if (key in newFormData.contact) {
          newFormData.contact = { ...newFormData.contact, [key]: "" };
        } else if (key in newFormData.information) {
          newFormData.information = { ...newFormData.information, [key]: "" };
        }
      }
    });

    setFormData(newFormData);

    // dispatch(setCorporateBillingInfo(newFormData));
    // dispatch(onCloseDrawerCorporateBillingInfo());
  }, [formData, errors]);

  // ปิด drawer ก่อนออกจากหน้า หรือ Refresh
  useEffect(() => {
    const handleRouteChange = () => {
      CloseDrawer();
    };
    window.addEventListener("beforeunload", handleRouteChange);
    return () => {
      window.removeEventListener("beforeunload", handleRouteChange);
    };
  }, [CloseDrawer]);

  // useEffect(() => {
  //   if (corporate) {
  //     setFormData((prev) => ({
  //       ...prev,
  //       ...corporate, // Override with Redux state if available
  //     }));
  //   }
  // }, [corporate]);

  const BillingInfoInput = [
    {
      id: "1",
      category: "information",
      name: "organization_name",
      title: "drawer_corporate_billing_info_field_organization_name",
      input_example: "drawer_corporate_billing_info_label_organization_name",
    },
    {
      id: "2",
      category: "information",
      name: "branch",
      title: "drawer_corporate_billing_info_field_branch",
      input_example: "drawer_corporate_billing_info_label_branch",
    },
    {
      id: "3",
      category: "information",
      name: "tax_id",
      title: "drawer_corporate_billing_info_field_tax_id",
      input_example: "drawer_corporate_billing_info_label_tax_id",
    },
    {
      id: "4",
      category: "address",
      name: "address",
      title: "drawer_corporate_billing_info_field_address",
      input_example: "drawer_corporate_billing_info_label_address",
    },
    {
      id: "5",
      category: "contact",
      name: "phone_number",
      title: "drawer_corporate_billing_info_field_phone_number",
      input_example: "drawer_corporate_billing_info_label_phone_number",
    },
    {
      id: "6",
      category: "contact",
      name: "email",
      title: "drawer_corporate_billing_info_field_email",
      input_example: "drawer_corporate_billing_info_label_email",
    },
  ];

  const validateField = (name: string, value: string) => {
    let error = "";

    if (
      ["organization_name", "branch", "address"].includes(name) &&
      value.length > 255
    ) {
      error = "drawer_billing_info_validation_error_255";
    } else if (
      ["tax_id", "phone_number"].includes(name) &&
      !/^\d+$/.test(value)
    ) {
      error = "drawer_billing_info_validation_error_number";
    } else if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = "drawer_billing_info_validation_error_email";
    }

    setErrors((prev) => ({ ...prev, [name]: error }));

    return error === "";
  };

  const handleChange = (
    category: keyof corporateProps,
    field: string,
    value: string
  ) => {
    if (category === "address") {
      setFormData((prev) => ({
        ...prev,
        address: value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [category]: {
          ...prev[category],
          [field]: value,
        },
      }));
    }

    const isFieldValid = validateField(field, value);
    setIsValid(Object.values(errors).every((e) => e === "") && isFieldValid);
  };

  return (
    <DrawerDrag open={true} onClose={CloseDrawer} height="88vh">
      <Row>
        <Col span={24}>
          <div className=" p-[16px] flex gap-[8px] border-b border-[var(--gray-5)]">
            <button onClick={CloseDrawer}>
              <ChevronLeftIcon fill="var(--icon-onlight)" />
            </button>
            <span className="font-h7 text-[var(--text-title)]">
              {"drawer_corporate_billing_info_title"}
            </span>
          </div>
          <div className="max-h-[78vh] overflow-y-auto">
            <div className="p-[16px] font-body2">
              {"drawer_corporate_billing_info_description"}
            </div>
            {BillingInfoInput.map((item, index) => {
              return (
                <div className="relative group" key={index}>
                  <DetailInput
                    title={item.id + ". " + item.title}
                    input={
                      <TextField
                        label={item.input_example}
                        value={
                          item.category === "address"
                            ? formData.address
                            : formData[item.category as keyof corporateProps]
                            ? (
                                formData[
                                  item.category as keyof corporateProps
                                ] as Record<string, string>
                              )[item.name] || ""
                            : ""
                        }
                        onChange={(e) =>
                          handleChange(
                            item.category as keyof corporateProps,
                            item.name,
                            e.target.value
                          )
                        }
                        error={!!errors[item.name]}
                        helperText={
                          errors[item.name] ? (
                            <div className="flex items-center gap-1 text-[var(--error)] pl-[16px]">
                              <WarningIcon
                                fill="var(--error)"
                                className="mt-[-1px]"
                              />
                              {errors[item.name]}
                            </div>
                          ) : (
                            ""
                          )
                        }
                      />
                    }
                  />
                  <span className="absolute bottom-0 left-[16px] right-[16px] group-last:hidden bg-[var(--gray-5)] h-[1px]" />
                </div>
              );
            })}
          </div>
        </Col>
      </Row>
    </DrawerDrag>
  );
};

export default DrawerCorporateBillingInfo;
