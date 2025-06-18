// import { useAppDispatch, useAppSelector } from "@/store/redux-hook";
import DrawerDrag from "./DrawerDrag";
// import { onCloseDrawerIndividualBillingInfo } from "@/store/slices/drawerSlice";
import { Col, Row } from "antd";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeftIcon } from "@/assets/job-solution/icons/directional-groups";
import DetailInput from "../detail/DetailInput";
import TextField from "../input/TextField";
// import {
//   // resetIndividualBillingInfo,
//   setIndividualBillingInfo,
// } from "@/store/slices/billingSlice";
import { WarningIcon } from "@/assets/job-solution/icons/suggested-groups/outline";
// import useTranslation from "@/hooks/useTranslation";

type individualProps = {
  address: string;
  contact: {
    phone_number: string;
    email: string;
  };
  information: {
    title: string;
    first_name: string;
    last_name: string;
    id_number: string;
  };
};

const DrawerIndividualBillingInfo = () => {
  // const dispatch = useAppDispatch();
  // const { t } = useTranslation("drawer");
  // const { drawerIndividualBillingInfo } = useAppSelector(
  //   (state) => state.drawer
  // );
  // const individual = useAppSelector((state) => state.billing.individual);
  // const savedBillingData = useAppSelector((state) => state.billing.individual);
  const [formData, setFormData] = useState<individualProps>({
    address: "",
    contact: {
      phone_number: "",
      email: "",
    },
    information: {
      title: "",
      first_name: "",
      last_name: "",
      id_number: "",
    },
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [, setIsValid] = useState(false);

  const CloseDrawer = useCallback(() => {
    const newFormData: individualProps = JSON.parse(JSON.stringify(formData));

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

    // dispatch(setIndividualBillingInfo(newFormData));
    // dispatch(onCloseDrawerIndividualBillingInfo());
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
  //   if (individual) {
  //     setFormData((prev) => ({
  //       ...prev,
  //       ...individual, // Override with Redux state if available
  //     }));
  //   }
  // }, [individual]);

  const BillingInfoInput = [
    {
      id: "1",
      category: "information",
      name: "title",
      title: "drawer_individual_billing_info_field_title",
      input_example: "drawer_individual_billing_info_label_title",
    },
    {
      id: "2",
      category: "information",
      name: "first_name",
      title: "drawer_individual_billing_info_field_firstname",
      input_example: "drawer_individual_billing_info_label_firstname",
    },
    {
      id: "3",
      category: "information",
      name: "last_name",
      title: "drawer_individual_billing_info_field_lastname",
      input_example: "drawer_individual_billing_info_label_lastname",
    },
    {
      id: "4",
      category: "information",
      name: "id_number",
      title: "drawer_individual_billing_info_field_id_number",
      input_example: "drawer_individual_billing_info_label_id_number",
    },
    {
      id: "5",
      category: "address",
      name: "address",
      title: "drawer_individual_billing_info_field_address",
      input_example: "drawer_individual_billing_info_label_address",
    },
    {
      id: "6",
      category: "contact",
      name: "phone_number",
      title: "drawer_individual_billing_info_field_phone_number",
      input_example: "drawer_individual_billing_info_label_phone_number",
    },
    {
      id: "7",
      category: "contact",
      name: "email",
      title: "drawer_individual_billing_info_field_email",
      input_example: "drawer_individual_billing_info_label_email",
    },
  ];

  const validateField = (name: string, value: string) => {
    let error = "";

    if (
      ["title", "first_name", "last_name", "address"].includes(name) &&
      value.length > 255
    ) {
      error = "drawer_billing_info_validation_error_255";
    } else if (
      ["id_number", "phone_number"].includes(name) &&
      !/^\d+$/.test(value)
    ) {
      error = "drawer_billing_info_validation_error_number";
    } else if (
      name === "email" &&
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
    ) {
      // /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ version2 (current)
      // /^[^\s@]+@[^\s@]+\.[^\s@]+$/ version1

      error = "drawer_billing_info_validation_error_email";
    }

    setErrors((prev) => ({ ...prev, [name]: error }));

    return error === "";
  };

  const handleChange = (
    category: keyof individualProps,
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
            <button title="close-button" onClick={CloseDrawer}>
              <ChevronLeftIcon fill="var(--icon-onlight)" />
            </button>
            <span className="font-h7 text-[var(--text-title)]">
              {"drawer_individual_billing_info_title"}
            </span>
          </div>
          <div className="max-h-[78vh] overflow-y-auto">
            <div className="p-[16px] font-body2">
              {"drawer_individual_billing_info_description"}
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
                            : formData[
                                item.category as keyof individualProps
                              ] &&
                              typeof formData[
                                item.category as keyof individualProps
                              ] === "object"
                            ? (
                                formData[
                                  item.category as keyof individualProps
                                ] as Record<string, string>
                              )[item.name] || ""
                            : ""
                        }
                        onChange={(e) =>
                          handleChange(
                            item.category as keyof individualProps,
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

export default DrawerIndividualBillingInfo;
