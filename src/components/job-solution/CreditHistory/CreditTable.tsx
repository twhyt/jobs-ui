import { Pagination, Select, Spin, Table, TableProps } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "dayjs/locale/th";
import CreditIcon from "@/assets/job-solution/icons/credit";
import DrawerPaginationSelection, {
  PaginationOptions,
} from "../drawer/DrawerPaginationSelection";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/assets/job-solution/icons/directional-groups";
// import { useAppDispatch } from "@/store/redux-hook";
// import { onOpenDrawerPaginationSelection } from "@/store/slices/drawerSlice";
// import axiosAuthInstance from "@/utils/axiosAuthInstance";
import Empty from "../empty";
import { LoadingOutlined } from "@ant-design/icons";
// import useTranslation from "@/hooks/useTranslation";
import { useRouter } from "next/router";
// import pluralize from "pluralize";
// import { CreditHistoryTableItemType } from "@/types/job-solution/creditHistory";

export interface CreditHistoryDataType {
  key?: string;
  action: string;
  feature: string;
  credit_remaining: number;
  credit_change: number;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
}
const CreditTable = ({
  pocket = "account",
  // setRemainingCredit,
  isTeamMember,
}: {
  pocket: "account" | "team";
  setRemainingCredit: React.Dispatch<React.SetStateAction<number>>;
  remainingCredit: number;
  isTeamMember?: boolean;
}) => {
  // const dispatch = useAppDispatch();
  const router = useRouter();
  // const { t } = useTranslation("creditHistory");
  // const { t: tCommon } = useTranslation("common");
  const [isLoading, setIsLoading] = useState(false);

  const [tableData] = useState<CreditHistoryDataType[]>([]);
  const [total] = useState(0);
  const [perPageSize, setPerPageSize] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = parseInt(perPageSize, 10);
  const options = PaginationOptions();

  const columns: TableProps<CreditHistoryDataType>["columns"] = [
    {
      title: "credit_history_table_col_feature",
      dataIndex: "feature",
      key: "feature",
      fixed: "left",
      className: "table__feature",
      render: (text) => {
        let texting;
        if (text === "Free") {
          texting = "credit_history_table_feature_free";
        } else if (text === "Individual") {
          texting = "credit_history_table_feature_individual";
        } else if (text === "Growing team") {
          texting = "credit_history_table_feature_team";
        } else if (text === "Top up") {
          texting = "credit_history_table_feature_top_up";
        } else if (
          text === "Resume Extraction (full summary)" ||
          text === "Resume Extraction (short summary)"
        ) {
          texting = "credit_history_table_feature_resume";
        } else if (
          text === "JD-CD (full summary)" ||
          text === "JD-CD (short summary)" ||
          text === "JD-CDCD (short summary)" ||
          text === "JD-CDCD (full summary)"
        ) {
          texting = "credit_history_table_feature_candidate";
        } else if (text === "Smart JD Generator (generate)") {
          texting = "credit_history_table_feature_jd_gen";
        }
        // else if (text === "") {
        //   texting = ("credit_history_table_feature_job_caption")
        // }
        return <div className="font-body6 font-semibold">{texting ?? "-"}</div>;
      },
    },
    {
      title: "credit_history_table_col_credit",
      dataIndex: "credit_change",
      key: "credit_change",
      className: "table__credit_change",
      render: (text, { action }) => {
        return (
          <div id="credits" className="flex gap-[4px] items-center justify-end">
            <span
              className={`font-body6 flex gap-[4px] ${
                action === "use"
                  ? "text-[var(--error)]"
                  : "text-[var(--green-6)]"
              }`}
            >
              <span className={``}>{action === "use" ? "-" : "+"}</span>
              {text.toLocaleString("en-US")}
            </span>
            <span>
              <CreditIcon fill="var(--green-5)" />
            </span>
          </div>
        );
      },
    },
    {
      title: "credit_history_table_col_remaining",
      dataIndex: "credit_remaining",
      key: "credit_remaining",
      className: "table__credit_remaining",
      render: (text) => {
        return (
          <div id="credits" className="flex gap-[4px] items-center justify-end">
            <span className="font-body5 text-[var(--text-title)]">
              {text.toLocaleString("en-US")}
            </span>
            <span>
              <CreditIcon fill="var(--green-5)" />
            </span>
          </div>
        );
      },
    },
    {
      title: "credit_history_table_col_used_by",
      dataIndex: "used_by",
      key: "used_by",
      className: "table__used_by",
      render: (_, { first_name, last_name, email }) => {
        return (
          <div className="items-center justify-start font-body5 text-[var(--text-title)]">
            {first_name && last_name ? `${first_name} ${last_name}` : email}
          </div>
        );
      },
    },
    {
      title: "credit_history_table_col_date",
      dataIndex: "created_at",
      key: "created_at",
      className: "table__created_at",
      render: (text) => {
        dayjs.locale(router.locale);
        return (
          <div className="font-body5">
            {text === "-"
              ? "No expiration"
              : dayjs(text).format("DD MMM YYYY HH:mm")}
          </div>
        );
      },
    },
  ];

  //   const data: CreditHistoryDataType[] = [
  //     {
  //       key: "1",
  //       action: "use",
  //       feature: "Resume Extractor",
  //       credit_change: 10,
  //       credit_remaining: 920,
  //       first_name: "Tony",
  //       last_name: "Stark",
  //       email: "test@email.com",
  //       created_at: "2025-04-28T02:24:45.676Z",
  //     },
  //     {
  //       key: "2",
  //       action: "use",
  //       feature: "Clovers expired",
  //       credit_change: 80,
  //       credit_remaining: 930,
  //       first_name: "",
  //       last_name: "",
  //       email: "test@email.com",
  //       created_at: "2025-04-28T02:24:45.676Z",
  //     },
  //     {
  //       key: "3",
  //       action: "use",
  //       feature: "Job Caption Creator",
  //       credit_change: 10,
  //       credit_remaining: 1010,
  //       first_name: "Peter",
  //       last_name: "Parker",
  //       email: "test@email.com",
  //       created_at: "2025-04-28T02:24:45.676Z",
  //     },
  //     {
  //       key: "4",
  //       action: "use",
  //       feature: "Smart JD Generator",
  //       credit_change: 10,
  //       credit_remaining: 1020,
  //       first_name: "Peter",
  //       last_name: "Parker",
  //       email: "test@email.com",
  //       created_at: "2025-04-28T02:24:45.676Z",
  //     },
  //     {
  //       key: "5",
  //       action: "Top-up",
  //       feature: "Top-up",
  //       credit_change: 100,
  //       credit_remaining: 1030,
  //       first_name: "Nick",
  //       last_name: "Fury",
  //       email: "test@email.com",
  //       created_at: "2025-04-28T02:24:45.676Z",
  //     },
  //     {
  //       key: "6",
  //       action: "use",
  //       feature: "Candidate Checker",
  //       credit_change: 25,
  //       credit_remaining: 930,
  //       first_name: "Steve",
  //       last_name: "Rogers",
  //       email: "test@email.com",
  //       created_at: "2025-04-28T02:24:45.676Z",
  //     },
  //     {
  //       key: "7",
  //       action: "use",
  //       feature: "Candidate Checker",
  //       credit_change: 25,
  //       credit_remaining: 955,
  //       first_name: "Steve",
  //       last_name: "Rogers",
  //       email: "test@email.com",
  //       created_at: "2025-04-28T02:24:45.676Z",
  //     },
  //     {
  //       key: "8",
  //       action: "use",
  //       feature: "Candidate Checker",
  //       credit_change: 25,
  //       credit_remaining: 980,
  //       first_name: "Steve",
  //       last_name: "Rogers",
  //       email: "test@email.com",
  //       created_at: "2025-04-28T02:24:45.676Z",
  //     },
  //     {
  //       key: "9",
  //       action: "use",
  //       feature: "Candidate Checker",
  //       credit_change: 25,
  //       credit_remaining: 1005,
  //       first_name: "Steve",
  //       last_name: "Rogers",
  //       email: "test@email.com",
  //       created_at: "2025-04-28T02:24:45.676Z",
  //     },
  //     {
  //       key: "10",
  //       action: "Team Package",
  //       feature: "Team Package purchase",
  //       credit_change: 1000,
  //       credit_remaining: 1030,
  //       first_name: "Nick",
  //       last_name: "Fury",
  //       email: "test@email.com",
  //       created_at: "2025-04-28T02:24:45.676Z",
  //     },
  //   ];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // const { data } = await axiosAuthInstance.get(
        //   "/v1/credit-history/view",
        //   {
        //     params: {
        //       limit: pageSize,
        //       page: currentPage,
        //       pocket: pocket,
        //     },
        //   }
        // );
        // setTableData(
        //   data.items.map((item: CreditHistoryTableItemType, index: number) => ({
        //     ...item,
        //     key: index.toString(), // fall back to index if no ID
        //   }))
        // );
        // setTotal(data.count);
        // setRemainingCredit(data.items[0].credit_remaining);
      } catch (err) {
        console.error("Error fetching payment history:", err);
      } finally {
        setIsLoading(false); // stop loading
      }
    };

    fetchData();
  }, [pageSize, currentPage, pocket]);

  useEffect(() => {
    setCurrentPage(1);
  }, [perPageSize]);

  return (
    <div className="flex flex-col gap-[16px]">
      <div className="font-h7">{"credit_history_table_header"}</div>
      {!isTeamMember ? (
        <TableBox>
          <div className="scroll-container">
            {tableData.length > 0 ? (
              <div className="relative">
                <Table<CreditHistoryDataType>
                  columns={columns}
                  dataSource={tableData}
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
            ) : (
              <Empty title={"You don't have any orders <br> at the moment"} />
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
              showTotal={() => (
                <span className="font-body2 block h-[24px] w-[140px] px-[8px]">
                  {
                    "table_pagination_text"
                    // .replace(
                    //   "{{range}}",
                    //   tableData.length > 0 ? range[0] + "-" + range[1] : "0"
                    // )
                    // .replace("{{total_records}}", total.toString())
                    // .replace("{{record*}}", pluralize("record", total))
                  }
                </span>
              )}
              pageSize={pageSize}
              showSizeChanger={false}
              disabled={isLoading}
            />
          </div>
        </TableBox>
      ) : (
        <Empty
          type="locked"
          title={"credit_history_empty_locked_team_member_title"}
          description={"credit_history_empty_locked_team_member_description"}
        />
      )}
      <DrawerPaginationSelection
        select={perPageSize}
        onSelect={(value: string) => {
          setPerPageSize(value);
        }}
      />
    </div>
  );
};

export default CreditTable;

const TableBox = styled.div`
  margin: 0 0 32px;
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
          border-top: 1px solid var(--gray-5) !important ;
          border-bottom: 1px solid var(--gray-5) !important ;
          border-inline-end: 1px solid var(--gray-5) !important;

          padding: 8px;
          &:first-child {
            border-inline-start: 1px solid var(--gray-5) !important;
          }
          &.table {
            &__feature {
              min-width: 168px;
              max-width: 168px;
            }
            &__credit_change,
            &__credit_remaining {
              min-width: 104px;
              max-width: 104px;
              text-align: center;
            }
            &__used_by {
              min-width: 128px;
              max-width: 128px;
              text-align: center;
            }
            &__created_at {
              min-width: 156px;
              max-width: 156px;
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
            &__credit_change {
              text-align: end;
            }
            &__used_by {
              overflow-wrap: anywhere;
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

  #credits {
    svg {
      width: 16px;
      height: 16px;
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
