import { Fragment, ReactNode } from "react";
// import { motion, useDragControls } from "framer-motion";
import { clsx } from "clsx";

type DrawerDragProps = {
  open: boolean;
  children: ReactNode;
  onClose: () => void;
  hidden?: boolean;
  height?: string;
  disabledDrag?: boolean;
};

const DrawerDrag = ({
  open,
  children,
  onClose,
  hidden = false,
  // height,
  disabledDrag = false,
}: DrawerDragProps) => {
  // const controls = useDragControls();

  function closeDrawer() {
    onClose();
  }

  if (hidden) {
    return <></>;
  }

  return (
    <Fragment>
      <div
        className={clsx("wrapper-mark-drawer-dragger", { ["active"]: open })}
        onClick={(e) => {
          e.stopPropagation();
          closeDrawer();
        }}
      />
      {/* <motion.div
        initial={{ y: "100%" }}
        animate={{ y: open ? "0%" : "100%" }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        drag="y"
        dragListener={false}
        dragControls={controls}
        dragConstraints={{ top: 0, bottom: 300 }} // top:0 -> ลากขึ้นได้สูงสุดแค่จุดเริ่มต้น
        dragElastic={{ top: 0 }} // ป้องกันการลากขึ้น
        onDragEnd={(_, info) => {
          if (info.offset.y > 0) {
            closeDrawer();
          }
        }}
        className="fixed bottom-0 left-0 right-0 bg-white pb-[8px] rounded-t-2xl"
        style={{ height: height ?? "fit-content", zIndex: open ? 999 : 0 }}
      > */}
      {/* แถบสำหรับลาก */}
      <div
        className="min-h-[10px] rounded-t-2xl overflow-hidden py-[8px]"
        onPointerDown={() => {
          if (disabledDrag) return;
          // controls.start(event);
        }}
      >
        <div className="w-[24px] h-[3px] bg-[var(--gray-5)] rounded-full mx-auto mb-[8px]" />
      </div>
      {children}
      {/* </motion.div> */}
    </Fragment>
  );
};

export default DrawerDrag;
