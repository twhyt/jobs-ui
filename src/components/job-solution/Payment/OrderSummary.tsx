import { ChevronRightIcon } from "@/assets/job-solution/icons/directional-groups";
import { Divider } from "antd";
import React from "react";
import BaseButton from "../BaseButton";
import dayjs from "dayjs";
// import axiosAuthInstance from "@/utils/axiosAuthInstance";
import { useRouter } from "next/router";
import {
  IndividualInformationType,
  OrderDetailType,
  PackageInfoType,
  TopupInfoType,
} from "@/types/job-solution/payment";
// import useTranslation from "@/hooks/useTranslation";
import "dayjs/locale/th";
// import pluralize from "pluralize";

const OrderSummary = ({
  billingType,
  setBillingType,
  IndividualBillingInformation,
  CorporateBillingInformation,
  setSummaryComplete,
  packageInfo,
  topupInfo,
  // setOrderId,
  orderId,
  orderData,
}: {
  billingType: string | undefined;
  setBillingType: (type: "individual" | "corporate" | undefined) => void;
  IndividualBillingInformation: IndividualInformationType | false;
  CorporateBillingInformation: any;
  setSummaryComplete: (type: boolean) => void;
  packageInfo: PackageInfoType | undefined;
  topupInfo: TopupInfoType | undefined;
  setOrderId: (id: string) => void;
  orderId: string;
  orderData: OrderDetailType;
}) => {
  const { locale } = useRouter();
  // const { t } = useTranslation("payment");
  dayjs.locale(locale === "th" ? "th" : "en");

  const billingInfo =
    billingType === "individual" && IndividualBillingInformation
      ? {
          name: `${IndividualBillingInformation.information?.title} ${IndividualBillingInformation.information?.first_name} ${IndividualBillingInformation.information?.last_name}`,
          id: IndividualBillingInformation.information?.id_number,
          address: IndividualBillingInformation.address,
          phone: IndividualBillingInformation.contact?.phone_number,
          email: IndividualBillingInformation.contact?.email,
        }
      : // billingType === "corporate" && CorporateBillingInformation
        // ?
        {
          name: `${
            CorporateBillingInformation.information?.organization_name
          } ${
            CorporateBillingInformation.information?.branch &&
            `(${CorporateBillingInformation.information?.branch})`
          }
          `,
          id: CorporateBillingInformation.information?.tax_id,
          address: CorporateBillingInformation.address,
          phone: CorporateBillingInformation.contact?.phone_number,
          email: CorporateBillingInformation.contact?.email,
        };
  // : undefined;

  return (
    <>
      <div className="flex flex-col gap-[32px]">
        <div className="flex flex-col gap-[4px]">
          <h1 className="font-h5 text-[var(--text-title)]">
            {"payment_order_summary_title"}
          </h1>
          <p className="font-body2 text-[var(--text-title)]">
            {"payment_order_summary_description"}
          </p>
        </div>
        <div>
          <div id="Billing" className="flex flex-col gap-[8px]">
            <div className="flex">
              <h3 className="font-h9 text-[var(--text-title)] w-full">
                {"payment_order_summary_header_text"}
              </h3>
              <button
                onClick={() => {
                  setBillingType(undefined);
                }}
                className="flex items-center cursor-pointer"
              >
                <span className="text-[var(--blue-6)] font-button2">
                  {"payment_order_summary_button_change"}
                </span>{" "}
                <ChevronRightIcon fill="var(--blue-6)" />
              </button>
            </div>
            <div>
              <div className="font-body2 text-[var(--text-title)] no-underline">
                {billingInfo.name}
              </div>
              <div className="font-body2 text-[var(--text-title)] no-underline">
                {billingInfo.id}
              </div>
              <div className="font-body2 text-[var(--text-title)] no-underline">
                {billingInfo.address}
              </div>
              <div className="font-body2 text-[var(--text-title)] no-underline">
                {billingInfo.phone}
              </div>
              <div className="font-body2 text-[var(--text-title)] no-underline">
                {billingInfo.email}
              </div>
            </div>
          </div>
          <Divider
            style={{
              margin: "16px 0",
              backgroundColor: "var(--gray-5)",
            }}
          />
          <div id="Order Details" className="flex flex-col gap-[8px]">
            <h3 className="font-h9 text-[var(--text-title)] w-full">
              {"payment_order_summary_order_detail"}
            </h3>
            <div>
              {(orderData || orderId) && (
                <div className="flex gap-[4px]">
                  <div className="font-body4 text-[var(--text-title)] min-w-[60px]">
                    {"payment_order_summary_order_id"}
                  </div>
                  <span className="font-body2 text-[var(--text-title)]">
                    {orderData ? orderData.public_order_id : orderId}
                  </span>
                </div>
              )}
              <div className="flex gap-[4px]">
                <div className="font-body4 text-[var(--text-title)] min-w-[60px]">
                  {"payment_order_summary_date"}
                </div>
                <span className="font-body2 text-[var(--text-title)]">
                  {orderData
                    ? dayjs(orderData.created_at).format("DD MMM YYYY")
                    : dayjs().format("DD MMM YYYY")}
                </span>
              </div>
              <div className="py-[12px]">
                {packageInfo && (
                  <>
                    <div className="font-body5 text-[var(--text-title)]">
                      {packageInfo?.package_name}
                    </div>
                    <div className="font-body2 text-[var(--gray-7)]">
                      {packageInfo?.account > 1
                        ? "payment_order_summary_5_members".replace(
                            "{{member}}",
                            String(packageInfo?.account)
                          )
                        : "payment_order_summary_account".replace(
                            "{{account_counts}}",
                            String(packageInfo?.account)
                          )}
                    </div>
                    <div className="font-body2 text-[var(--gray-7)]">
                      {"payment_order_summary_credits".replace(
                        "{{credit_counts}}",
                        packageInfo?.credit.toLocaleString("en-US")
                      )}
                    </div>
                  </>
                )}
                {topupInfo && (
                  <>
                    <div className="font-body5 text-[var(--text-title)]">
                      {"payment_order_summary_topup".replace(
                        "{{credit_counts}}",
                        topupInfo?.top_up_amount.toLocaleString("en-US")
                      )}
                    </div>
                    {/* <div className="font-body2 text-[var(--gray-7)]">
                      ฿ {topupInfo?.cost}
                    </div> */}
                  </>
                )}
              </div>
              <div className="flex gap-[4px]">
                <div className="font-body4 text-[var(--text-title)] min-w-[60px]">
                  {"payment_order_summary_subtotal"}
                </div>
                <span className="font-body2 text-[var(--text-title)]">
                  ฿{" "}
                  {packageInfo
                    ? packageInfo?.cost.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    : topupInfo?.cost.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                </span>
              </div>
              <div className="flex gap-[4px]">
                <div className="font-body4 text-[var(--text-title)] min-w-[60px]">
                  {"payment_order_summary_total"}
                </div>
                <span className="font-body2 text-[var(--blue-6)]">
                  ฿{" "}
                  {packageInfo
                    ? packageInfo?.cost.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    : topupInfo?.cost.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                </span>
              </div>
            </div>
          </div>
          <Divider
            style={{
              margin: "16px 0",
              backgroundColor: "var(--gray-5)",
            }}
          />
        </div>
      </div>
      <BaseButton
        className="!h-[38.8px] !w-full !mt-[31.2px]"
        onClick={async () => {
          // if have public order id then
          // else if not have public order id then?
          if (orderData) {
          } else {
            // if (query.package) {
            //   const res = await axiosAuthInstance.post(
            //     "/v1/package-topup/change",
            //     {
            //       package_id: query.package,
            //       billing_type: billingType,
            //     }
            //   );
            //   setOrderId(res.data.public_order_id);
            // }
            // if (query.topup) {
            //   const res = await axiosAuthInstance.post(
            //     "/v1/package-topup/change",
            //     {
            //       top_up_id: query.topup,
            //       billing_type: billingType,
            //     }
            //   );
            //   setOrderId(res.data.public_order_id);
            // }
            // console.log("public_id", res.data.public_order_id);
          }
          setSummaryComplete(true);
        }}
      >
        <span className="font-button2 text-[var(--gray-1)]">
          {"payment_order_summary_button_proceed"}
        </span>
      </BaseButton>
    </>
  );
};

export default OrderSummary;
