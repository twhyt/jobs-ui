import { SVGProps } from "react"

interface IconProps extends SVGProps<SVGSVGElement> {
  active?: string
  minWidth?: number
}

export { 
  type IconProps 
}

export type JobTitle = {
  title: string;
  include: string[] | null;
  exclude: string[] | null;
};

export const PaymentHistoryStatusOptions = () => {

  return [
    { key: 1, value: "all", label: ("payment_history_table_status_all") },
    {
      key: 2,
      value: "pending",
      label: ("payment_history_table_status_pending"),
    },
    {
      key: 3,
      value: "verifying",
      label: ("payment_history_table_status_verifying"),
    },
    { key: 4, value: "paid", label: ("payment_history_table_status_paid") },
    {
      key: 5,
      value: "reject",
      label: ("payment_history_table_status_reject"),
    },
    {
      key: 6,
      value: "expired",
      label: ("payment_history_table_status_expired"),
    },
  ];
};

export type FormValues = {
  projectName?: string;
  selections: string[];
  selectAll: boolean;
  selectedLanguage: string;
  jobTitle: JobTitle;
  jobOverview: string;
  selectedJobTitleId: string;
  selectedJobDescriptionId: string;
};

export type Step =
  | "user_input"
  | "jd_generated"
  | "user_select_options"
  | "confirm_options";