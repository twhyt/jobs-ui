
export type PackageInfoType = {
    package_name: string;
    account: number;
    credit: number;
    cost: number;
} | undefined

export type TopupInfoType = {
    top_up_amount: number;
    cost: number;
}

export type OrderDetailType = {
    public_order_id: string;
    package_id: string;
    top_up_id: string | null;
    package_snapshort: {
      created_at: string; // ISO Date string
      updated_at: string; // ISO Date string
      is_active: boolean;
      package_id: string;
      package: number;
      credit: number;
      member: number;
      price: number;
      is_display: boolean;
    };
    status: string;
    slip_detail: {
      total_amount: number | null;
      date_on_slip: string | null; // Can be null or a date string
    };
    sub_total: number;
    vat_total: number;
    total_amount: number;
    billing_information: {
      type: "individual" | "corporate";
      billing: {
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
    };
    created_at: string; // ISO Date string
    updated_at: string; // ISO Date string
  } | undefined;
  
export type IndividualInformationType = {
  address: string;
  contact: {
    phone_number: string;
    email: string;
  };
  information: {
    first_name: string;
    last_name: string;
    id_number: string;
    title: string;
  };
}

export type CorporateInformationType = {
  address: string;
  contact: {
    phone_number: string;
    email: string;
  };
  information: {
    branch: string;
    organization_name: string;
    tax_id: string;
  };
}