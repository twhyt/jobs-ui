import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/assets/job-solution/icons/directional-groups";
import styled from "styled-components";
import {
  CarryOutIcon,
  GroupIcon,
  PersonIcon,
} from "@/assets/job-solution/icons/suggested-groups/outline";
import CreditIcon from "@/assets/job-solution/icons/credit";
import BaseButton from "@/components/job-solution/BaseButton";
import { useRouter } from "next/router";
// import useTranslation from "@/hooks/useTranslation";

const UpgradePlan = ({
  currentPlan,
  expired,
  data,
}: {
  currentPlan: "free" | "individual" | "team";
  expired: boolean;
  data: any;
}) => {
  const router = useRouter();
  const swiperRef = useRef<any>(null);
  // const { t } = useTranslation("buypack");
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const PlanCards = [
    {
      id: "individual",
      package_id: data.package_details[0].package_id,
      title: "buy_pack_upgrade_plan_individual_text",
      cost: data.package_details[0].price, //"1,790.00",
      account_ammount: data.package_details[0].member, //1,
      clover: data.package_details[0].credit, //1000,
      duration: 12,
    },
    {
      id: "team",
      package_id: data.package_details[1].package_id,
      title: "buy_pack_upgrade_plan_team_text",
      cost: data.package_details[1].price, //"3,590.00",
      account_ammount: data.package_details[1].member, //5,
      clover: data.package_details[1].credit, //3000,
      duration: 12,
    },
  ];
  if (!data?.package_details?.length) return null;
  const initialIndex = PlanCards.findIndex((card) => card.id === currentPlan);

  return (
    <UpgradePlanBox>
      <Swiper
        key={initialIndex}
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={1.2}
        centeredSlides
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        initialSlide={initialIndex >= 0 ? initialIndex : 0}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        style={{ padding: "0 0 32px" }}
      >
        {PlanCards.map((card) => {
          let action = card.id === currentPlan ? "renew" : "upgrade";

          // Disable "Individual" plan action when the current plan is "team"
          if (currentPlan === "team" && card.id === "individual") {
            if (expired) {
              action = "change";
            } else {
              action = "disable";
            }
          }
          return (
            <SwiperSlide key={card.id}>
              <div className="bg-[var(--gray-1)] shadow-md rounded-[16px] p-[16px]">
                <div className="border-gradient">
                  <div className="flex flex-col gap-[4px]">
                    <h3 className="font-h5 text-[var(--green-6)]">
                      {card.title}
                    </h3>
                    <p className="font-h10 text-[var(--text-title)]">
                      ฿{" "}
                      {card.cost.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="flex flex-col gap-[8px]">
                      <div className="flex gap-[4px]">
                        {card.account_ammount > 1 ? (
                          <>
                            <GroupIcon fill="var(--blue-6)" />
                            <span className="font-body5 text-[var(--text-title)]">
                              {"buy_pack_upgrade_plan_team_account".replace(
                                "{{member}}",
                                card.account_ammount
                              )}
                            </span>
                          </>
                        ) : (
                          <>
                            <PersonIcon fill="var(--blue-6)" />
                            <span className="font-body5 text-[var(--text-title)]">
                              {card.account_ammount}{" "}
                              {"buy_pack_upgrade_plan_individual_account"}
                            </span>
                          </>
                        )}
                      </div>
                      <div className="flex gap-[4px]" id="credits">
                        <CreditIcon fill="var(--green-5)" />
                        <span className="font-body5 text-[var(--text-title)]">
                          {new Intl.NumberFormat("en-US").format(card.clover)}{" "}
                          {"buy_pack_upgrade_plan_credit"}
                        </span>
                      </div>
                      <div className="flex gap-[4px]">
                        <CarryOutIcon fill="var(--blue-6)" />
                        <span className="font-body5 text-[var(--text-title)]">
                          {card.duration} {"buy_pack_upgrade_plan_month"}
                        </span>
                      </div>
                    </div>
                    {/* {planSwitch} */}
                    <BaseButton
                      className="w-fit px-[10px] py-[4px]"
                      disabled={action === "disable"}
                      onClick={() => {
                        // router.push(`/payment?package=${card.id}`);
                        sessionStorage.removeItem("orderSummaryComplete");
                        sessionStorage.removeItem("QR");
                        router.push(`/payment?package=${card.package_id}`);
                      }}
                    >
                      <span className="font-button4">
                        {action === "renew"
                          ? "buy_pack_upgrade_plan_button_renew"
                          : action === "disable"
                          ? "buy_pack_upgrade_plan_button_change"
                          : action === "change"
                          ? "buy_pack_upgrade_plan_button_change"
                          : "buy_pack_upgrade_plan_button_upgrade"}
                      </span>
                    </BaseButton>
                  </div>
                  {action === "disable" && (
                    <p className="font-body2 text-[var(--error)]">
                      {"buy_pack_upgrade_plan_error_message"}
                    </p>
                  )}
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className={`absolute top-1/2 left-[8px] -translate-y-1/2 bg-[var(--gray-1)] w-[32px] h-[32px] rounded-full shadow-md z-10 pl-[2px] ${
          isBeginning ? "hidden" : ""
        } !mt-[-16px]`}
      >
        <ChevronLeftIcon fill="var(--gray-11)" />
      </button>
      <button
        onClick={() => swiperRef.current?.slideNext()}
        className={`absolute top-1/2 right-[8px] -translate-y-1/2 bg-[var(--gray-1)] w-[32px] h-[32px] rounded-full shadow-md z-10 pl-[5px] ${
          isEnd ? "hidden" : ""
        } !mt-[-16px] `}
      >
        <ChevronRightIcon fill="var(--gray-11)" width={24} height={24} />
      </button>
    </UpgradePlanBox>
  );
};

export default UpgradePlan;

const UpgradePlanBox = styled.div`
  margin: 0 -16px;
  width: calc(100% + 32px);
  position: relative;

  .border-gradient {
    position: relative;
    padding: 16px; /* Adjust padding if needed */
    border-radius: 8px; /* Rounded corners */
    display: flex;
    flex-direction: column;
    gap: 16px;

    &::before {
      content: "";
      position: absolute;
      inset: 0;
      padding: 2px; /* Border thickness */
      border-radius: 8px; /* Ensure border follows the shape */
      background: var(--gradient-bg-hero-card);
      -webkit-mask: linear-gradient(white 0 0) content-box,
        linear-gradient(white 0 0);
      mask: linear-gradient(white 0 0) content-box, linear-gradient(white 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      pointer-events: none;
    }
  }

  #credits {
    svg {
      width: 24px;
      height: 24px;
    }
  }
`;
