import React, { useEffect, useState } from "react";
import { Pagination, Select, Spin, Table, Tag } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import type { TableProps } from "antd";
import styled from "styled-components";
import dayjs from "dayjs";
import BaseButton from "@/components/job-solution/BaseButton";
import {
  ArrowOutwardIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/assets/job-solution/icons/directional-groups";
import "dayjs/locale/th";
// import { useAppDispatch } from "@/store/redux-hook";
// import { onOpenDrawerPaginationSelection } from "@/store/slices/drawerSlice";
import DrawerPaginationSelection, {
  PaginationOptions,
} from "@/components/job-solution/drawer/DrawerPaginationSelection";
// import axiosAuthInstance from "@/utils/axiosAuthInstance";
import Empty from "@/components/job-solution/empty";
import { useRouter } from "next/router";
// import DrawerPaymentHistoryReceipt from "@/components/drawer/_DrawerPaymentHistoryReceipt";
import VisibilityOnIcon from "@/assets/job-solution/icons/suggested-groups/outline/visibility-on";
// import useTranslation from "@/hooks/useTranslation";
// import pluralize from "pluralize";
import dynamic from "next/dynamic";

const PreviewAndDownload = dynamic(
  () => import("@/components/job-solution/preview/PreviewAndDownload"),
  { ssr: false }
);

interface DataType {
  key: string;
  status: "pending" | "verifying" | "reject" | "paid" | "expired";
  public_order_id: string;
  receipt: string | undefined;
  created_at: string;
  item: string;
  total_amount: number;
  receipt_url?: string | undefined;
}

// const data: DataType[] = [
//   {
//     key: "1",
//     status: "pending",
//     public_order_id: "OD395237",
//     receipt: undefined,
//     created_at: "2025-03-06",
//     item: "Team package",
//     total_amount: 500,
//   },
//   {
//     key: "2",
//     status: "verifying",
//     public_order_id: "OD395236",
//     receipt: "INV00012",
//     created_at: "2025-02-20",
//     item: "Individual package",
//     total_amount: 500,
//   },
//   {
//     key: "3",
//     status: "reject",
//     public_order_id: "OD395235",
//     receipt: "INV00011",
//     created_at: "2025-01-15",
//     item: "Top-up",
//     total_amount: 100,
//   },
//   {
//     key: "4",
//     status: "paid",
//     public_order_id: "OD395234",
//     receipt: "INV00010",
//     created_at: "2024-12-18",
//     item: "Top-up",
//     total_amount: 100,
//   },
//   {
//     key: "5",
//     status: "paid",
//     public_order_id: "OD395233",
//     receipt: "INV00009",
//     created_at: "2024-11-30",
//     item: "Individual package",
//     total_amount: 500,
//   },
//   {
//     key: "6",
//     status: "expired",
//     public_order_id: "OD395232",
//     receipt: "INV00008",
//     created_at: "2024-09-30",
//     item: "Individual package",
//     total_amount: 500,
//   },
//   {
//     key: "7",
//     status: "paid",
//     public_order_id: "OD395231",
//     receipt: "INV00007",
//     created_at: "2024-08-05",
//     item: "Top-up",
//     total_amount: 100,
//     receipt_url: "koo",
//   },
//   {
//     key: "8",
//     status: "paid",
//     public_order_id: "OD395230",
//     receipt: "INV00006",
//     created_at: "2024-07-20",
//     item: "Top-up",
//     total_amount: 100,
//   },
//   {
//     key: "9",
//     status: "paid",
//     public_order_id: "OD395229",
//     receipt: "INV00005",
//     created_at: "2024-06-28",
//     item: "Top-up",
//     total_amount: 100,
//   },
//   {
//     key: "10",
//     status: "paid",
//     public_order_id: "OD395228",
//     receipt: "INV00004",
//     created_at: "2024-05-10",
//     item: "Individual package",
//     total_amount: 500,
//   },
//   {
//     key: "11",
//     status: "paid",
//     public_order_id: "OD395227",
//     receipt: "INV00003",
//     created_at: "2024-04-18",
//     item: "Top-up",
//     total_amount: 100,
//   },
//   {
//     key: "12",
//     status: "reject",
//     public_order_id: "OD395226",
//     receipt: "INV00002",
//     created_at: "2024-03-09",
//     item: "Top-up",
//     total_amount: 100,
//   },
//   {
//     key: "13",
//     status: "paid",
//     public_order_id: "OD395225",
//     receipt: "INV00001",
//     created_at: "2024-02-14",
//     item: "Individual package",
//     total_amount: 500,
//   },
// ];

const PaymentHistoryTable = ({
  searchValue,
  orderStatus,
  receiptDateFrom,
  receiptDateTo,
  isLoading,
  setIsLoading,
}: {
  searchValue?: string;
  orderStatus?: string;
  receiptDateFrom?: string;
  receiptDateTo?: string;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // const dispatch = useAppDispatch();
  const router = useRouter();
  // const { t: tCommon } = useTranslation("common");
  // const { t } = useTranslation("paymentHistory");

  const [tableData] = useState<DataType[]>([]);
  const [total] = useState(0);
  const [perPageSize, setPerPageSize] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = parseInt(perPageSize, 10);
  const options = PaginationOptions();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filter = searchValue || orderStatus || receiptDateFrom || receiptDateTo;

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "payment_history_table_col_status",
      dataIndex: "status",
      key: "status",
      className: "table__status",
      render: (text) => {
        if (text === "pending") {
          return (
            <Tag
              color="gold"
              style={{
                borderRadius: "16px",
                borderColor: "var(--warning)",
                color: "var(--yellow-10)",
                padding: "1px 12px",
                margin: 0,
              }}
            >
              {"payment_history_table_status_pending"}
            </Tag>
          );
        } else if (text === "verifying") {
          return (
            <Tag
              color="blue"
              style={{
                borderRadius: "16px",
                borderColor: "var(--blue-6)",
                color: "var(--blue-6)",
                padding: "1px 12px",
                margin: 0,
              }}
            >
              {"payment_history_table_status_verifying"}
            </Tag>
          );
        } else if (text === "reject") {
          return (
            <Tag
              color="red"
              style={{
                borderRadius: "16px",
                borderColor: "var(--error)",
                color: "var(--error)",
                padding: "1px 12px",
                margin: 0,
              }}
            >
              {"payment_history_table_status_reject"}
            </Tag>
          );
        } else if (text === "paid") {
          return (
            <Tag
              color="green"
              style={{
                borderRadius: "16px",
                borderColor: "var(--success)",
                color: "var(--success)",
                padding: "1px 12px",
                margin: 0,
              }}
            >
              {"payment_history_table_status_paid"}
            </Tag>
          );
        } else if (text === "expired") {
          return (
            <Tag
              color="default"
              style={{
                borderRadius: "16px",
                borderColor: "var(--text-secondary)",
                color: "var(--text-secondary)",
                padding: "1px 12px",
                margin: 0,
              }}
            >
              {"payment_history_table_status_expired"}
            </Tag>
          );
        }
      },
    },
    {
      title: "payment_history_table_col_order_id",
      dataIndex: "public_order_id",
      key: "public_order_id",
      className: "table__order_id",
      render: (text) => <div className="font-body6 font-semibold">{text}</div>,
    },
    {
      title: "payment_history_table_col_receipt",
      dataIndex: "receipt",
      key: "receipt",
      className: "table__receipt",
      render: (_, { status, public_order_id, receipt_url }) => {
        if (status === "paid") {
          return (
            <>
              {receipt_url ? (
                <div
                  className="flex items-center gap-[4px]"
                  onClick={() => {
                    // handleOpenPreviewFile(true);
                    setIsModalOpen(true);
                  }}
                >
                  <VisibilityOnIcon />
                  <div className="font-body5 !text-[var(--blue-6)]">
                    {"payment_history_table_receipt_button_view"}
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-[4px]">
                  <div className="font-body5 text-[var(--gray-7)]">
                    {"payment_history_table_receipt_text_processing"}
                  </div>
                </div>
              )}
            </>
          );
        } else if (
          status === "verifying" ||
          status === "reject" ||
          status === "expired"
        ) {
          return <></>;
        } else if (status === "pending") {
          return (
            <BaseButton
              className="!px-[8px] !py-[1px] !h-[24px] flex items-center gap-[4px]"
              onClick={() => {
                router.push(`/payment?order=${public_order_id}`);
              }}
            >
              <span className="font-button4">
                {"payment_history_table_receipt_button_order_summary"}
              </span>
              <ArrowOutwardIcon fill="var(--white-100)" />
            </BaseButton>
          );
        }
      },
    },
    {
      title: "payment_history_table_col_payment_date",
      dataIndex: "created_at",
      key: "created_at",
      className: "table__created_at",
      render: (text) => {
        dayjs.locale(router.locale);
        return (
          <div className="font-body5">{dayjs(text).format("DD MMM YYYY")}</div>
        );
      },
    },
    {
      title: "payment_history_table_col_item_list",
      dataIndex: "item",
      key: "item",
      className: "table__item_list",
      render: (text, { total_amount }) => {
        let texting;
        if (text === "Top up") {
          texting = "payment_history_table_item_list_topup".replace(
            "{{credit_counts}}",
            total_amount.toLocaleString("en-US")
          );
        } else if (text === "Growing team") {
          texting = "payment_history_table_item_list_team";
        } else if (text === "Individual") {
          texting = "payment_history_table_item_list_individual";
        }
        return <div className="font-body5">{texting ?? "-"}</div>;
      },
    },
    {
      title: "payment_history_table_col_amount",
      dataIndex: "total_amount",
      key: "total_amount",
      className: "table__amount",
      render: (text) => (
        <div className="font-body6 font-semibold">
          ฿{" "}
          {text.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      // try {
      //   const { data } = await axiosAuthInstance.get(
      //     "/v1/payment-history/query",
      //     {
      //       params: {
      //         limit: pageSize,
      //         page: currentPage,
      //         search: Boolean(searchValue) ? searchValue : undefined,
      //         order_status: orderStatus,
      //         receipt_date_from: receiptDateFrom,
      //         receipt_date_to: receiptDateTo,
      //       },
      //     }
      //   );

      //   setTableData(
      //     data.items.map((item: any, index: number) => ({
      //       ...item,
      //       key: item.public_order_id || index.toString(), // fall back to index if no ID
      //     }))
      //   );
      //   setTotal(data.count);
      // } catch (err) {
      //   console.error("Error fetching payment history:", err);
      // } finally {
      setIsLoading(false); // stop loading
      // }
    };

    fetchData();
  }, [
    pageSize,
    currentPage,
    searchValue,
    receiptDateFrom,
    receiptDateTo,
    orderStatus,
    // isLoading,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [perPageSize]);

  return (
    <TableBox>
      <div className="scroll-container">
        {tableData.length > 0 ? (
          <div className="relative">
            <Table<DataType>
              columns={columns}
              dataSource={tableData}
              // dataSource={data}
              rootClassName="root_classname"
              className={`${isLoading ? "opacity-[50%]" : ""}`}
              pagination={false}
              bordered
            />
            {isLoading && (
              <div className="flex justify-center items-center w-full z-10 absolute top-0 left-0 h-full">
                <Spin
                  indicator={<LoadingOutlined spin color="var(--blue-6)" />}
                />
              </div>
            )}
          </div>
        ) : filter ? (
          <Empty
            title={"payment_history_table_empty_search_not_found_title"}
            description={
              "payment_history_table_empty_search_not_found_description"
            }
          />
        ) : (
          <Empty title={"payment_history_table_empty_no_orders_title"} />
        )}
      </div>

      <div className="pagination">
        <Select
          value={perPageSize}
          style={{ minWidth: 94, height: 24 }}
          suffixIcon={<ChevronDownIcon width={16} height={16} />}
          labelRender={(props) => {
            return (
              <span className="font-body2 w-[60px] h-[22px]">
                {props.label}
              </span>
            );
          }}
          options={options}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // dispatch(onOpenDrawerPaginationSelection());
          }}
          onMouseDown={(e) => {
            e.preventDefault();
          }}
          tabIndex={-1}
          onFocus={undefined}
          disabled={isLoading}
          open={false}
        />
        <Pagination
          simple={{ readOnly: true }}
          current={currentPage}
          total={total}
          onChange={(page) => setCurrentPage(page)}
          showLessItems
          showQuickJumper={false}
          itemRender={(page, type) => {
            if (type === "prev") {
              return (
                <a>
                  <ChevronLeftIcon />
                </a>
              );
            }
            if (type === "next") {
              return (
                <a>
                  <ChevronRightIcon />
                </a>
              );
            }
            return null; // hide page numbers
          }}
          showTotal={(total, range) => (
            <span className="font-body2 block h-[24px] w-[140px] px-[8px]">
              {"table_pagination_text"
                .replace(
                  "{{range}}",
                  tableData.length > 0 ? range[0] + "-" + range[1] : "0"
                )
                .replace("{{total_records}}", total.toString())}
            </span>
          )}
          pageSize={pageSize}
          showSizeChanger={false}
          disabled={isLoading}
        />
      </div>
      <DrawerPaginationSelection
        select={perPageSize}
        onSelect={(value: string) => {
          setPerPageSize(value);
        }}
      />
      {/* <DrawerPaymentHistoryReceipt /> */}

      <PreviewAndDownload
        fileName="example.pdf"
        fileId="mock-id"
        date="2000-01-01"
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </TableBox>
  );
};

export default PaymentHistoryTable;

const TableBox = styled.div`
  margin: 0 16px 48px;

  /* overflow-x: scroll; */

  .scroll-container {
    cursor: pointer;
    overflow-x: auto;
    overflow-y: hidden;
    padding-bottom: 16px;

    // Show scrollbar always (best effort; some browsers like Chrome need extra handling)
    &::-webkit-scrollbar {
      height: 4px;
    }
    &::-webkit-scrollbar-thumb {
      background: var(--gray-5);
      border-radius: 4px;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
  }

  .root_classname {
    .ant-table-container {
      border: none !important;
      .ant-table-thead {
        .ant-table-cell {
          /* background-color: red; */
          border-top: 1px solid var(--gray-5) !important ;
          border-bottom: 1px solid var(--gray-5) !important ;
          border-inline-end: 1px solid var(--gray-5) !important;

          padding: 8px;
          &:first-child {
            border-inline-start: 1px solid var(--gray-5) !important;
          }
          &.table {
            &__status {
              min-width: 100px;
              text-align: center;
            }
            &__order_id {
              min-width: 100px;
            }
            &__receipt {
              min-width: 168px;
            }
            &__created_at {
              min-width: 128px;
            }
            &__item_list {
              min-width: 128px;
            }
            &__amount {
              min-width: 128px;
              text-align: center;
            }
          }
        }
      }
      .ant-table-tbody {
        border-radius: 0 0 16px 16px;
        .ant-table-cell {
          border-bottom: 1px solid var(--gray-5) !important ;
          border-inline-end: 1px solid var(--gray-5) !important;
          padding: 8px;
          align-content: start;
          &:first-child {
            border-inline-start: 1px solid var(--gray-5) !important;
          }
          &.table {
            &__status {
              text-align: center;
            }
            &__amount {
              text-align: end;
            }
          }
        }
      }
    }

    &.ant-table-wrapper
      .ant-table-container
      table
      > tbody
      > tr:last-child
      > *:last-child {
      border-end-end-radius: 8px;
    }
    &.ant-table-wrapper
      .ant-table-container
      table
      > tbody
      > tr:last-child
      > *:first-child {
      border-end-start-radius: 8px;
    }
  }

  .pagination {
    display: flex;
    gap: 2px;
    margin-top: 16px;
    .ant-pagination {
      display: flex;
      /* justify-content: space-between; */
      /* flex-wrap: wrap; */

      li:nth-last-child(3) {
        margin-left: calc(100vw - 32px - 140px - 94px - 2px - 48px);
      }
      /* li:last-child {
        background-color: chartreuse;
      } */

      .ant-pagination-total-text {
        height: 24px;
        margin-inline-end: 0;
      }
      .ant-pagination-item,
      .ant-pagination-simple-pager {
        display: none !important;
      }

      .ant-pagination-next,
      .ant-pagination-prev {
        min-width: 24px;
        width: 24px;
        height: 24px;
        text-align: center;
        text-align: -webkit-center;
        margin-inline-end: 0;

        a {
          display: block;
          width: 24px;
          height: 24px;
        }
        svg {
          width: 16px;
          height: 16px;
          margin-top: 3px;
          path {
            fill: var(--icon-onlight);
          }
        }
      }

      .ant-pagination-disabled {
        svg {
          path {
            fill: var(--gray-5);
          }
        }
      }
    }

    .ant-select-selector {
      padding: 0 8px;
    }
    .ant-select-single.ant-select-show-arrow .ant-select-selection-item {
      padding-inline-end: 16px;
    }
    .ant-select-selection-search {
      padding-inline-end: 16px;
    }
    .ant-select .ant-select-arrow {
      inset-inline-end: 9px;
    }
  }
`;
