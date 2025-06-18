import { ChevronDownIcon } from "@/assets/job-solution/icons/directional-groups";
import {
  CalendarIcon,
  FilterIcon,
  SearchIcon,
} from "@/assets/job-solution/icons/suggested-groups/outline";
import Button from "@/components/job-solution/button/Button";
import { PaymentHistoryStatus } from "@/components/job-solution/drawer/DrawerPaymentHistoryStatus";
import TextField from "@/components/job-solution/input/TextField";
import { PaymentHistoryStatusOptions } from "@/types/job-solution/global";
// import useTranslation from "@/hooks/useTranslation";
// import { PaymentHistoryStatusOptions } from "@/pages/settings/payment-history";
// import { useAppDispatch } from "@/store/redux-hook";
// import { onOpenDrawerPaymentHistoryStatus } from "@/store/slices/drawerSlice";
import { DatePicker, Select } from "antd";
import dayjs from "dayjs";
import React from "react";

const SearchAndFilter = ({
  searchValue,
  setSearchValue,
  filterOpen,
  setFilterOpen,
  isLoading,
  selectedDateFrom,
  setSelectedDateFrom,
  selectedDateTo,
  setSelectedDateTo,
  selectedStatus,
}: {
  searchValue: string | undefined;
  setSearchValue: React.Dispatch<React.SetStateAction<string | undefined>>;
  filterOpen: boolean;
  setFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  selectedDateFrom: dayjs.Dayjs | null;
  setSelectedDateFrom: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>;
  selectedDateTo: dayjs.Dayjs | null;
  setSelectedDateTo: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>;
  selectedStatus: PaymentHistoryStatus;
}) => {
  // const dispatch = useAppDispatch();
  // const { t } = useTranslation("paymentHistory");
  return (
    <>
      <div className="h-[51px] flex gap-[8px] items-center">
        <div className="w-full">
          <TextField
            // value={tempSearchValue}
            value={searchValue}
            label={"payment_history_search_placeholder"}
            prefixIcon={<SearchIcon />}
            // onChange={(e) => setTempSearchValue(e.target.value)}
            // handleEnter={(value) => setSearchValue(value)}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        {!filterOpen && (
          <div
            className="flex min-w-[40px] h-[40px] justify-center items-center cursor-pointer"
            onClick={() => {
              setFilterOpen(true);
            }}
          >
            <FilterIcon />
          </div>
        )}
      </div>
      {filterOpen && (
        <>
          <div className="flex flex-col gap-[8px]">
            <div className="font-h10">
              {"payment_history_filter_from_label"}
            </div>
            <div className="relative">
              <DatePicker
                format="DD MMM YYYY"
                className={`w-full h-[51px] !px-[16px] ${
                  isLoading
                    ? "!bg-transparent !border-[var(--gray-6)]"
                    : "!border-[var(--gray-7)]"
                } `}
                prefix={
                  <CalendarIcon
                    fill={isLoading ? "var(--gray-6)" : "var(--gray-7)"}
                  />
                }
                suffixIcon={undefined}
                name="date"
                value={selectedDateFrom}
                // onChange={(date: dayjs.Dayjs | null) => {

                //   setSelectedDateFrom(date);
                // }}
                onChange={(date: dayjs.Dayjs | null) => {
                  setSelectedDateFrom(date);
                  if (selectedDateTo && date && date.isAfter(selectedDateTo)) {
                    // setSelectedDateTo(date); // Ensure to-date is always after from-date
                    setSelectedDateTo(null);
                  }
                }}
                disabled={isLoading}
                allowClear={false}
                placeholder={"payment_history_filter_from_placeholder"}
                inputReadOnly
              />
            </div>
          </div>
          <div className="flex flex-col gap-[8px]">
            <div className="font-h10">{"payment_history_filter_to_label"}</div>
            <div className="relative">
              <DatePicker
                format="DD MMM YYYY"
                className={`w-full h-[51px] !px-[16px] ${
                  isLoading
                    ? "!bg-transparent !border-[var(--gray-6)]"
                    : "!border-[var(--gray-7)]"
                } `}
                prefix={
                  <CalendarIcon
                    fill={isLoading ? "var(--gray-6)" : "var(--gray-7)"}
                  />
                }
                suffixIcon={undefined}
                name="date"
                value={selectedDateTo}
                // onChange={(date: dayjs.Dayjs | null) => {
                //   setSelectedDateTo(date);
                // }}
                onChange={(date: dayjs.Dayjs | null) => {
                  if (
                    selectedDateFrom &&
                    date &&
                    date.isBefore(selectedDateFrom)
                  ) {
                    // setSelectedDateTo(selectedDateFrom); // Prevent to-date from being before from-date
                    setSelectedDateTo(null);
                  } else {
                    setSelectedDateTo(date);
                  }
                }}
                disabled={isLoading}
                allowClear={false}
                placeholder={"payment_history_filter_to_placeholder"}
                inputReadOnly
              />
            </div>
          </div>
          <div className="flex flex-col gap-[8px]">
            <div className="font-h10">
              {"payment_history_filter_status_label"}
            </div>
            <Select
              value={selectedStatus}
              style={{
                minWidth: "100%",
                height: 51,
              }}
              suffixIcon={<ChevronDownIcon />}
              labelRender={(props) => {
                return (
                  <span className="font-body2 w-[60px] h-[22px]">
                    {props.label}
                  </span>
                );
              }}
              options={PaymentHistoryStatusOptions()}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // dispatch(onOpenDrawerPaymentHistoryStatus());
              }}
              onMouseDown={(e) => {
                e.preventDefault();
              }}
              tabIndex={-1}
              onFocus={undefined}
              // options={undefined}
              open={false}
            />
          </div>
          <Button
            variant="quiet"
            size="large"
            onClick={() => {
              setFilterOpen(false);
            }}
            className=" !mt-[8px]"
          >
            {"payment_history_button_hide_filter"}
          </Button>
        </>
      )}
    </>
  );
};

export default SearchAndFilter;
