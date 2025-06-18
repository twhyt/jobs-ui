import { CheckedIcon } from "@/assets/job-solution/icons/suggested-groups/outline";
// import useTranslation from "@/hooks/useTranslation";
// import { AnimatePresence, motion } from "framer-motion";
import { FC } from "react";

interface Props {
  isVisible: boolean;
}

const CopyText: FC<Props> = (
  {
    // isVisible
  }
): JSX.Element => {
  // const { t } = useTranslation("jdGen");
  return (
    // <AnimatePresence initial={false}>
    // {isVisible && (
    // <motion.div
    //   key="content"
    //   initial="collapsed"
    //   animate="open"
    //   exit="collapsed"
    //   variants={{
    //     open: {
    //       opacity: 1,
    //       transition: { duration: 0.3, ease: "easeInOut" },
    //     },
    //     collapsed: { opacity: 0, transition: { duration: 0 } },
    //   }}
    // >
    <div className="flex items-center gap-1">
      <CheckedIcon fill="var(--blue-6)" />
      <p className="font-button4 text-[var(--blue-6)]">
        {"jd_gen_result_button_copied"}
      </p>
    </div>
    // {/* </motion.div> */}
    // )}
    // </AnimatePresence>
  );
};

export default CopyText;
