import React, { useEffect, useState } from "react";
import RadioButton from "../button/RadioButton";
// import { useAppDispatch, useAppSelector } from "@/store/redux-hook";
// import {
//   onOpenDrawerCorporateBillingInfo,
//   onOpenDrawerIndividualBillingInfo,
// } from "@/store/slices/drawerSlice";
import BaseButton from "../BaseButton";
// import { setBillingDefault } from "@/store/slices/billingSlice";
// import axiosAuthInstance from "@/utils/axiosAuthInstance";
// import useTranslation from "@/hooks/useTranslation";

// import styled from "styled-components";

const SetUpBillingDetail = ({
  setBillingType,
  individualCondition,
  corporateCondition,
}: {
  setBillingType: (type: "individual" | "corporate") => void; // from payment
  individualCondition: boolean;
  corporateCondition: boolean;
}) => {
  // const dispatch = useAppDispatch();
  // const { t } = useTranslation("payment");
  // const billingDefault = useAppSelector(
  //   (state) => state.billing.billing_default
  // );
  // const individual = useAppSelector((state) => state.billing.individual);
  // const corporate = useAppSelector((state) => state.billing.corporate);

  const [accountType, setAccountType] = useState<"individual" | "corporate">(
    "individual"
  ); // for option only
  const [hasIndividualInfo] = useState(false);
  const [hasCorporateInfo, setHasCorporateInfo] = useState(false);

  // useEffect(() => {
  //   if (individualCondition) {
  //     setHasIndividualInfo(true);
  //   }
  // }, [individual, hasIndividualInfo]);

  useEffect(() => {
    if (corporateCondition) {
      setHasCorporateInfo(true);
    }
  }, [corporateCondition, hasCorporateInfo]);

  return (
    <>
      <div className="flex flex-col gap-[32px]">
        <div className="flex flex-col gap-[4px]">
          <h1 className="font-h5 text-[var(--text-title)]">
            {"payment_set_up_billing_detail_title"}
          </h1>
          <p className="font-body2 text-[var(--text-title)]">
            {"payment_set_up_billing_detail_description"}
          </p>
        </div>
        <div>
          <RadioButton
            type="info"
            label={"payment_set_up_billing_detail_individual"}
            value="individual"
            checked={accountType === "individual"}
            onChange={() => {
              setAccountType("individual");
            }}
            suffixOnClick={() => {
              // dispatch(onOpenDrawerIndividualBillingInfo());
            }}
            hasInfo={individualCondition}
          />
          <RadioButton
            type="info"
            label={"payment_set_up_billing_detail_corporate"}
            value="corporate"
            checked={accountType === "corporate"}
            onChange={() => {
              setAccountType("corporate");
            }}
            suffixOnClick={() => {
              // dispatch(onOpenDrawerCorporateBillingInfo());
            }}
            hasInfo={corporateCondition}
          />
        </div>
      </div>
      <BaseButton
        className="!h-[38.8px] !w-full !mt-[31.2px] group"
        disabled={
          (accountType === "individual" &&
            !(hasIndividualInfo && individualCondition)) ||
          (accountType === "corporate" &&
            !(hasCorporateInfo && corporateCondition))
        }
        onClick={async () => {
          if (accountType === "individual" && hasIndividualInfo) {
            setBillingType("individual");
            // dispatch(setBillingDefault("individual"));
            // if (corporate && hasCorporateInfo) {
            //   await axiosAuthInstance.patch("/v1/billing-information", {
            //     billing_default: "individual",
            //     individual: individual,
            //     corporate: corporate,
            //   });
            // } else {
            //   await axiosAuthInstance.patch("/v1/billing-information", {
            //     billing_default: "individual",
            //     individual: individual,
            //   });
            // }
            // console.log("individual clicked!");
          } else if (accountType === "corporate" && hasCorporateInfo) {
            setBillingType("corporate");
            // dispatch(setBillingDefault("corporate"));
            // if (individual && hasIndividualInfo) {
            //   await axiosAuthInstance.patch("/v1/billing-information", {
            //     billing_default: "corporate",
            //     individual: individual,
            //     corporate: corporate,
            //   });
            // } else {
            //   await axiosAuthInstance.patch("/v1/billing-information", {
            //     billing_default: "corporate",
            //     corporate: corporate,
            //   });
            // }
            // console.log("corporate clicked!");
          }
        }}
      >
        <span className="font-button2 text-[var(--gray-1)] group-disabled:text-[var(--gray-5)]">
          {"payment_set_up_billing_detail_button"}
        </span>
      </BaseButton>
    </>
  );
};

export default SetUpBillingDetail;

// const RadioWrapper = styled.div`
//   border-bottom: 1px solid var(--gray-5);
//   padding: 0 12px;
// `;
