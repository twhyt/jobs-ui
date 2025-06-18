// import useTranslation from "@/hooks/useTranslation";
// import { FormValues } from "@/pages/smart-jd-generator";
// import { collectAllIds, collectAllIdsFromTree } from "@/utils/checkbox";
import { FormValues } from "@/types/job-solution/global";
import clsx from "clsx";
import { FC, useCallback, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import styled from "styled-components";

export interface TreeItem {
  id: string;
  label: string;
  keyValue: string;
  children?: TreeItem[];
}

interface Props {
  treeData: TreeItem[];
  disabledInput: boolean;
}

// const findNodeById = (nodes: TreeItem[], id: string): TreeItem | null => {
//   for (const node of nodes) {
//     if (node.id === id) return node;
//     if (node.children) {
//       const found = findNodeById(node.children, id);
//       if (found) return found;
//     }
//   }
//   return null;
// };

const TreeCheckbox: FC<Props> = ({ treeData, disabledInput }): JSX.Element => {
  // const { t } = useTranslation("jdGen");
  const form = useFormContext<FormValues>();
  const selectAll = form.watch("selectAll");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    2: true,
    ["2-3"]: true,
  });

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelectAllChange = (checked: boolean) => {
    form.setValue("selectAll", checked);
  };

  // const handSelectAllParent = (checked: boolean) => {
  //   form.setValue("selectAll", checked);
  //   // if (checked) {
  //   //   form.setValue("selections", collectAllIdsFromTree(treeData ?? []));
  //   // }
  //   if (!checked) {
  //     form.setValue("selections", []);
  //   }
  // };

  const renderTree = useCallback(
    (
      nodes: typeof treeData,
      selected: string[],
      onChange: (val: string[]) => void,
      handleSelectAllChange: (checked: boolean) => void,
      parentMap?: Record<string, string>
    ) => {
      // const handleCheck = () => {
      //   let newSelected: string[] = Array.from(new Set([...selected]));
      //   // const allNodeIds = collectAllIds(node);

      //   // if (checked) {
      //   //   newSelected = Array.from(new Set([...newSelected, ...allNodeIds]));
      //   // } else {
      //   //   newSelected = newSelected.filter((id) => !allNodeIds.includes(id));
      //   // }

      //   // Update parent nodes based on children state
      //   if (parentMap) {
      //     const updateParents = (childId: string) => {
      //       const parentId = parentMap[childId];

      //       if (!parentId) return;

      //       const parent = findNodeById(treeData, parentId);
      //       if (!parent) return;

      //       const childIds = parent.children?.map((child) => child.id) || [];

      //       const allChildrenSelected = childIds.every((id) =>
      //         newSelected.includes(id)
      //       );

      //       if (allChildrenSelected) {
      //         newSelected = Array.from(new Set([...newSelected, parentId]));
      //       } else {
      //         newSelected = newSelected.filter((id) => id !== parentId);
      //       }

      //       updateParents(parentId);
      //     };

      //     // allNodeIds.forEach((id) => updateParents(id));
      //   }

      //   onChange(newSelected);

      //   // if (newSelected.length === collectAllIdsFromTree(treeData).length) {
      //   //   handleSelectAllChange(true);
      //   // } else
      //   if (newSelected.length === 0) {
      //     handleSelectAllChange(false);
      //   } else {
      //     handleSelectAllChange(false);
      //   }
      // };
      return (
        <ul
          style={{
            listStyleType: "none",
            paddingLeft: !parentMap ? 0 : 16,
            paddingRight: !parentMap ? 0 : 16,
          }}
        >
          {nodes.map((node) => {
            const hasChildren = !!node.children?.length;

            const isExpanded = expanded[node.id];

            return (
              <li key={node.id}>
                <div className="flex items-center justify-between gap-3">
                  <label className="flex items-center gap-3 p-2">
                    <StyledCheckboxInput
                      type="checkbox"
                      checked={selected.includes(node.id)}
                      onChange={() => {
                        if (disabledInput) return;
                        // handleCheck(node, e.target.checked);
                      }}
                      disabled={disabledInput}
                    />

                    <span
                      className={clsx(
                        disabledInput && "text-[var(--black-25)]"
                      )}
                    >
                      {node.label}
                    </span>
                  </label>

                  {hasChildren && (
                    <button
                      type="button"
                      onClick={() => {
                        if (disabledInput) return;
                        toggleExpand(node.id);
                      }}
                      style={{
                        cursor: "pointer",
                        userSelect: "none",
                        fontWeight: "bold",
                      }}
                    >
                      {isExpanded ? (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M3.86225 10.4727C4.1226 10.7331 4.54471 10.7331 4.80506 10.4727L8.33366 6.94411L11.8623 10.4727C12.1226 10.7331 12.5447 10.7331 12.8051 10.4727C13.0654 10.2124 13.0654 9.79025 12.8051 9.5299L8.80506 5.5299C8.54471 5.26955 8.1226 5.26955 7.86225 5.5299L3.86225 9.5299C3.6019 9.79025 3.6019 10.2124 3.86225 10.4727Z"
                            fill={disabledInput ? "#BFBFBF" : "#8C8C8C"}
                          />
                        </svg>
                      ) : (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M3.86323 5.52729C4.12358 5.26694 4.54569 5.26694 4.80604 5.52729L8.33464 9.05589L11.8632 5.52729C12.1236 5.26694 12.5457 5.26694 12.806 5.52729C13.0664 5.78764 13.0664 6.20975 12.806 6.4701L8.80604 10.4701C8.54569 10.7305 8.12358 10.7305 7.86323 10.4701L3.86323 6.4701C3.60288 6.20975 3.60288 5.78764 3.86323 5.52729Z"
                            fill={disabledInput ? "#BFBFBF" : "#8C8C8C"}
                          />
                        </svg>
                      )}
                    </button>
                  )}
                </div>

                {node.children &&
                  isExpanded &&
                  renderTree(
                    node.children,
                    selected,
                    onChange,
                    handleSelectAllChange,
                    {
                      ...parentMap,
                      ...Object.fromEntries(
                        node.children.map((child) => [child.id, node.id])
                      ),
                    }
                  )}
              </li>
            );
          })}
        </ul>
      );
    },
    [expanded, disabledInput]
  );

  return (
    <div className="w-full">
      <div>
        <label className="flex items-center gap-3 p-2 bg-[var(--gray-3)] rounded-[4px]">
          <StyledCheckboxInput
            type="checkbox"
            checked={selectAll}
            onChange={() => {
              if (disabledInput) return;
              // handSelectAllParent(e.target.checked, treeData);
            }}
            disabled={disabledInput}
          />
          <span className={clsx(disabledInput && "text-[var(--black-25)]")}>
            {"jd_gen_step4_checkbox_all"}
          </span>
        </label>
      </div>

      <Controller
        name="selections"
        control={form.control}
        render={({ field }) =>
          renderTree(
            treeData,
            field.value,
            field.onChange,
            handleSelectAllChange
          )
        }
      />
    </div>
  );
};

const StyledCheckboxInput = styled.input.attrs({ type: "checkbox" })`
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default TreeCheckbox;
