import { FC } from "react";
import DrawerDrag from "../DrawerDrag";
import styled from "styled-components";
import clsx from "clsx";
// import useDisabledScreenScroll from "@/hooks/useDisabledScreenScroll";
// import useTranslation from "@/hooks/useTranslation";

interface Props {
  open: boolean;
  onClose: () => void;
  selected?: string;
  onChange: (lang: string) => void;
}

const DrawerSelectLanguage: FC<Props> = ({
  onClose,
  open,
  onChange,
  selected,
}): JSX.Element => {
  // Handle screen scroll
  // useDisabledScreenScroll(open);
  // const { t } = useTranslation("drawer");
  const menus = [
    {
      id: "english",
      name: "drawer_language_en",
      icon: <></>,
      onClick: () => {
        onChange("English");
      },
    },
    {
      id: "thai",
      name: "drawer_language_th",
      icon: <></>,
      onClick: () => {
        onChange("Thai");
      },
    },
  ];

  return (
    <DrawerDrag open={open} onClose={onClose}>
      <div className="min-h-[110px]">
        <ListContent>
          {menus.map((menu) => {
            const isSelected = menu.id === selected?.toLowerCase();

            return (
              <Item
                key={menu.id}
                onClick={(e) => {
                  e.stopPropagation();
                  menu.onClick();
                }}
                className={clsx(isSelected && "bg-[#E6F7FF]")}
              >
                <div className="flex items-center justify-between w-full">
                  <p
                    className={clsx(
                      !isSelected && "font-button4",
                      isSelected && "font-button3"
                    )}
                  >
                    {menu.name}
                  </p>

                  {isSelected && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.40289 10.4843L4.10917 8.25765C3.85359 8.00954 3.44727 8.00954 3.19169 8.25765C2.9361 8.50576 2.9361 8.9002 3.19169 9.14831L5.93759 11.8139C6.19318 12.062 6.60605 12.062 6.86163 11.8139L13.8083 5.07674C14.0639 4.82863 14.0639 4.43419 13.8083 4.18608C13.5527 3.93797 13.1464 3.93797 12.8908 4.18608L6.40289 10.4843Z"
                        fill="#1A34FF"
                      />
                    </svg>
                  )}
                </div>
              </Item>
            );
          })}
        </ListContent>
      </div>
    </DrawerDrag>
  );
};

const Item = styled.li`
  width: 100%;
  min-height: 38px;
  cursor: pointer;
  display: flex;
  padding: 8px 16px;
`;

const ListContent = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export default DrawerSelectLanguage;
