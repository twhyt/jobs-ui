import React from "react";
import Button from "../button/Button";
import { useRouter } from "next/router";
// import useTranslation from "@/hooks/useTranslation";

const CreditHistoryCTA = () => {
  const router = useRouter();
  // const { t } = useTranslation("creditHistory");
  return (
    <div className="flex gap-[16px]">
      <Button
        size="large"
        variant="secondary"
        className="w-full cursor-pointer"
        onClick={() => {
          router.push("/settings/package#upgrade-package");
        }}
      >
        {"credit_history_button_upgrade_package"}
      </Button>
      <Button
        size="large"
        variant="primary"
        className="w-full cursor-pointer"
        onClick={() => {
          router.push("/settings/package#more-credits");
        }}
      >
        {"credit_history_button_more_credits"}
      </Button>
    </div>
  );
};

export default CreditHistoryCTA;
