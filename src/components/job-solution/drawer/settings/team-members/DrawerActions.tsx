import { FC } from "react";
import DrawerDrag from "../../DrawerDrag";

interface Props {
  isOpen?: boolean;
  onClose: () => void;
  title?: string;
  items: {
    id: string;
    button: JSX.Element;
    hidden?: boolean;
  }[];
}

const DrawerActions: FC<Props> = ({
  isOpen = false,
  onClose,
  title,
  items,
}): JSX.Element => {
  return (
    <DrawerDrag open={isOpen} onClose={onClose}>
      <div className="flex flex-col p-[16px] gap-[32px]">
        {title && (
          <div className="flex flex-col gap-[12px]">
            <h4 className="font-h7 text-[var(--black-85)]">{title}</h4>
          </div>
        )}

        <div className="flex flex-col gap-[12px]">
          {items.map((item) => {
            if (item.hidden) return;
            return (
              <div key={item.id} className="flex items-center">
                {item.button}
              </div>
            );
          })}
        </div>
      </div>
    </DrawerDrag>
  );
};

export default DrawerActions;
