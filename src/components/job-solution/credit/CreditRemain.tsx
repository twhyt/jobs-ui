import CreditIcon from "@/assets/job-solution/icons/credit";
// import useTranslation from "@/hooks/useTranslation";
// import { fetchCreditCost } from "@/services/point-analytic/get";
// import { useAppSelector } from "@/store/redux-hook";
import { EFeatureName } from "@/types/job-solution/package";
import { Row } from "antd";
// import pluralize from "pluralize";
import { useCallback, useEffect } from "react";

export default function CreditRemain({ feature }: { feature: EFeatureName }) {
  // const { credit } = useAppSelector((state) => state.user);
  // const { t } = useTranslation("common");
  // const [cost, setCost] = useState(0);

  const fetchCost = useCallback(async () => {
    try {
      // const res = await fetchCreditCost({ query: feature });
      // // const current = res.find(({name}) => name === feature)?.credit_cost ?? 0
      // setCost(res.credit_cost ?? 0);
      // console.log("res fetchCost", res);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    if (feature) {
      fetchCost();
    }
  }, [feature, fetchCost]);

  return (
    <Row align={"middle"} justify={"center"} className="gap-[4px]">
      <CreditIcon fill="var(--green-5)" />
      <p className="font-sub-title-5 text-[var(--text-title)]">
        {"credit_remain_description"}
      </p>
      {/* <p className="font-button4 text-[var(--blue-6)]">Upgrade for more</p> */}
    </Row>
  );
}
