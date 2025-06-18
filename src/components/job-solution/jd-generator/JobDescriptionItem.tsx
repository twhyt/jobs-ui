import { FC, useMemo } from "react";
import styled from "styled-components";
import { v4 } from "uuid";

interface Item {
  key: string;
  label: string;
  value: string[] | string | null;
}
interface Props {
  result: {
    key: string;
    label: string;
    value: string[] | string | null;
    children?: Item[];
  };
  indexItem: number;
}

const JobDescriptionItem: FC<Props> = ({ result, indexItem }): JSX.Element => {
  const data = useMemo(() => {
    if (result.key === "job_overview") {
      return result.value;
    }

    if (typeof result.value === "string") {
      const stringArray = result.value
        .split("\n")
        .filter((item) => item.trim() !== "");
      return stringArray;
    }

    return result.value;
  }, [result.value, result.key]);

  if (typeof data === "string") {
    return (
      <div className="flex flex-col ">
        <h1 className="font-subtitle4 text-[var(--blue-6)]">
          {`${indexItem + 1}. ${result.label}:`}
        </h1>
        <p className="font-body5 text-[var(--black-85)]">{data}</p>
      </div>
    );
  }

  if (Array.isArray(data) && data.length > 0 && !result.children) {
    return (
      <div className="flex flex-col gap-3">
        <h1 className="font-subtitle4 text-[var(--blue-6)]">
          {`${indexItem + 1}. ${result.label}:`}
          <List className="pl-5">
            {data.map((item) => {
              const uuid = v4();
              return (
                <li key={uuid} className="font-body5 text-[var(--black-85)]">
                  {item}
                </li>
              );
            })}
          </List>
        </h1>
      </div>
    );
  }

  if (result.children) {
    return (
      <div className="flex flex-col gap-3">
        <h1 className="font-subtitle4 text-[var(--blue-6)]">
          {`${indexItem + 1}. ${result.label}:`}
        </h1>

        {result.children
          .filter((item) => item.value !== null)
          .map((childrenItem, index) => {
            if (typeof childrenItem.value === "string") {
              const stringArray = childrenItem.value
                .split("\n")
                .filter((item) => item.trim() !== "");

              if (stringArray.length > 0) {
                const uuid = v4();
                return (
                  <div key={uuid} className="flex flex-col">
                    <h1 className="font-subtitle4 text-[var(--blue-6)]">{`${
                      indexItem + 1
                    }.${index + 1} ${childrenItem.label}`}</h1>

                    <List className="pl-5">
                      {stringArray.map((text) => {
                        const uuid = v4();
                        return (
                          <li
                            key={uuid}
                            className="font-body5 text-[var(--black-85)]"
                          >
                            {text}
                          </li>
                        );
                      })}
                    </List>
                  </div>
                );
              }
            } else if (
              Array.isArray(childrenItem.value) &&
              childrenItem.value.length > 0
            ) {
              const uuid = v4();
              return (
                <div key={uuid} className="flex flex-col">
                  <h1 className="font-subtitle4 text-[var(--blue-6)]">{`${
                    indexItem + 1
                  }.${index + 1} ${childrenItem.label}`}</h1>

                  <List className="pl-5">
                    {childrenItem.value.map((text) => {
                      const uuid = v4();
                      return (
                        <li
                          key={uuid}
                          className="font-body5 text-[var(--black-85)]"
                        >
                          {text}
                        </li>
                      );
                    })}
                  </List>
                </div>
              );
            }
          })}
      </div>
    );
  }
  return <div className="flex flex-col gap-3">No results.</div>;
};

const List = styled.ul`
  list-style: outside !important;
  margin-bottom: 0;
`;

export default JobDescriptionItem;
