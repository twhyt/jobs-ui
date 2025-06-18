import { Divider, Spin } from "antd";
import dayjs from "dayjs";
import { FC, useMemo, useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";
import SlideList from "./SlideList";
// import { CreateJdResponse } from "@/hooks/useJdGen";
// import { Step } from "@/pages/smart-jd-generator";
import { LoadingOutlined } from "@ant-design/icons";
import { SuccessFillIcon } from "@/assets/job-solution/icons/suggested-groups/filled";
// import useTranslation from "@/hooks/useTranslation";
import clsx from "clsx";
import "dayjs/locale/th";
import { useRouter } from "next/router";
import { Step } from "@/types/job-solution/global";
// import pluralize from "pluralize";

interface HeaderProps {
  title: string;
  numberOfOption: number;
  slideVariants: "select" | "read";
  credit: number;
  isRegenerating: boolean;
  onRegenerate: () => void;
  disabled: boolean;
  isShare?: boolean;
}

const Header = ({
  title,
  numberOfOption,
  slideVariants,
  credit,
  isRegenerating,
  onRegenerate,
  disabled,
  isShare,
}: HeaderProps) => {
  // const { t } = useTranslation("jdGen");
  const creditString = credit.toLocaleString();
  const useCreditMessage = "jd_gen_credits"
    .replace("{{credits_required}}", "1")
    .replace("{{credit_remaining}}", creditString);
  // .replace("{{credit*}}", pluralize("credit", credit));
  return (
    <div className="flex flex-col">
      <div className="flex justify-between ">
        <h1 className="font-h10">{title}</h1>
        {slideVariants === "read" && !isShare && (
          <div className="flex items-center gap-2">
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
                d="M10.2342 13.1608C9.81531 12.93 9.4736 12.5721 9.19509 12.15C9.18314 12.6536 9.08336 13.1384 8.85084 13.5606C8.29279 14.5738 7.02036 14.9418 6.00914 14.3838C5.5619 14.1364 5.23934 13.7505 5.06718 13.3073C4.60214 13.3983 4.10345 13.333 3.65424 13.0876C2.64104 12.5296 2.27297 11.2571 2.83102 10.2459C3.06203 9.82712 3.42028 9.48546 3.84282 9.20695C3.33887 9.1951 2.85372 9.09534 2.43134 8.86268C1.41814 8.30463 1.05007 7.0322 1.60812 6.02098C1.85548 5.57375 2.24137 5.25118 2.68464 5.07902C2.59361 4.61398 2.65892 4.11529 2.9043 3.66608C3.46235 2.65288 4.73479 2.28481 5.74601 2.84286C6.16485 3.07368 6.50654 3.43153 6.78505 3.85362C6.797 3.35 6.89678 2.86518 7.12929 2.44306C7.68735 1.42986 8.95978 1.06179 9.971 1.61984C10.4182 1.8672 10.7408 2.25309 10.913 2.69636C11.378 2.60533 11.8767 2.67063 12.3259 2.91602C13.3391 3.47407 13.7072 4.7465 13.1491 5.75772C12.9183 6.17658 12.5604 6.51827 12.1383 6.79677C12.6419 6.80873 13.1267 6.90851 13.5489 7.14101C14.562 7.69906 14.9301 8.9715 14.3721 9.98272C14.1247 10.43 13.7388 10.7525 13.2956 10.9247C13.3866 11.3897 13.3213 11.8884 13.0759 12.3376C12.5178 13.3508 11.2454 13.7189 10.2342 13.1608ZM9.69122 8.72262H8.81335C8.80161 8.89486 8.76344 9.03873 8.69885 9.15421C8.63621 9.26969 8.5452 9.3568 8.4258 9.41552C8.3064 9.47424 8.15471 9.5036 7.97072 9.5036C7.81413 9.5036 7.68005 9.47521 7.56848 9.41845C7.45887 9.35973 7.36884 9.27361 7.29837 9.16008C7.22987 9.0446 7.17897 8.90367 7.1457 8.7373C7.11243 8.56897 7.09579 8.37421 7.09579 8.15303V7.85063C7.09579 7.62357 7.1134 7.42588 7.14864 7.25755C7.18583 7.08726 7.24161 6.94634 7.31599 6.83477C7.39037 6.7232 7.48236 6.64001 7.59197 6.58521C7.70158 6.5304 7.82979 6.503 7.97659 6.503C8.17232 6.503 8.32891 6.53432 8.44635 6.59695C8.56575 6.65763 8.65481 6.74864 8.71353 6.87C8.77225 6.9894 8.8065 7.13522 8.81629 7.30746H9.69709C9.66969 7.01778 9.58748 6.75941 9.45046 6.53236C9.31541 6.30531 9.12457 6.12719 8.87794 5.99801C8.63328 5.86882 8.33282 5.80423 7.97659 5.80423C7.70843 5.80423 7.46572 5.85218 7.24846 5.94809C7.0312 6.044 6.84427 6.18102 6.68768 6.35913C6.53305 6.53725 6.41366 6.75354 6.32949 7.00799C6.24728 7.26049 6.20618 7.54332 6.20618 7.8565V8.15303C6.20618 8.46621 6.2463 8.74904 6.32655 9.00154C6.40681 9.25403 6.52327 9.46934 6.67594 9.64746C6.83057 9.82558 7.01652 9.96259 7.23378 10.0585C7.45104 10.1525 7.69669 10.1994 7.97072 10.1994C8.32108 10.1994 8.62055 10.1368 8.86913 10.0115C9.11967 9.88626 9.31443 9.71205 9.4534 9.48892C9.59433 9.26578 9.6736 9.01035 9.69122 8.72262Z"
                fill="#3DD15B"
              />
            </svg>
            <p className="font-subtitle5">{useCreditMessage}</p>
            {isRegenerating ? (
              <Spin
                indicator={
                  <LoadingOutlined
                    style={{ fontSize: 16, color: "var(--blue-6)" }}
                    spin
                  />
                }
              />
            ) : (
              <button
                className="flex gap-1 items-center cursor-pointer"
                type="button"
                disabled={disabled}
                onClick={onRegenerate}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.0013 13.3307C6.51241 13.3307 5.2513 12.8141 4.21797 11.7807C3.18464 10.7474 2.66797 9.48628 2.66797 7.9974C2.66797 6.50851 3.18464 5.2474 4.21797 4.21406C5.2513 3.18073 6.51241 2.66406 8.0013 2.66406C8.76797 2.66406 9.5013 2.8224 10.2013 3.13906C10.9013 3.45573 11.5013 3.90851 12.0013 4.4974V3.33073C12.0013 3.14184 12.0652 2.98351 12.193 2.85573C12.3207 2.72795 12.4791 2.66406 12.668 2.66406C12.8569 2.66406 13.0152 2.72795 13.143 2.85573C13.2707 2.98351 13.3346 3.14184 13.3346 3.33073V6.66406C13.3346 6.85295 13.2707 7.01128 13.143 7.13906C13.0152 7.26684 12.8569 7.33073 12.668 7.33073H9.33463C9.14575 7.33073 8.98741 7.26684 8.85963 7.13906C8.73186 7.01128 8.66797 6.85295 8.66797 6.66406C8.66797 6.47517 8.73186 6.31684 8.85963 6.18906C8.98741 6.06128 9.14575 5.9974 9.33463 5.9974H11.468C11.1124 5.37517 10.6263 4.88628 10.0096 4.53073C9.39297 4.17517 8.72352 3.9974 8.0013 3.9974C6.89019 3.9974 5.94575 4.38628 5.16797 5.16406C4.39019 5.94184 4.0013 6.88628 4.0013 7.9974C4.0013 9.10851 4.39019 10.053 5.16797 10.8307C5.94575 11.6085 6.89019 11.9974 8.0013 11.9974C8.75686 11.9974 9.44852 11.8057 10.0763 11.4224C10.7041 11.0391 11.1902 10.5252 11.5346 9.88073C11.6235 9.72517 11.7485 9.61684 11.9096 9.55573C12.0707 9.49462 12.2346 9.49184 12.4013 9.5474C12.5791 9.60295 12.7069 9.71962 12.7846 9.8974C12.8624 10.0752 12.8569 10.2418 12.768 10.3974C12.3124 11.2863 11.6624 11.9974 10.818 12.5307C9.97352 13.0641 9.03464 13.3307 8.0013 13.3307Z"
                    fill={disabled ? "var(--black-25)" : "#1A34FF"}
                  />
                </svg>
                <span
                  className={clsx(
                    "text-[var(--blue-6)]",
                    disabled && "!text-[var(--black-25)]"
                  )}
                >
                  {"jd_gen_result_button_retry"}
                </span>
              </button>
            )}
          </div>
        )}
      </div>
      <p className="font-body5 text-[var(--black-45)]">
        {"jd_gen_result_job_title_description".replace(
          "{{count}}",
          numberOfOption.toString()
        )}
      </p>
    </div>
  );
};

interface Props {
  result: any;
  step: Step;
  isLoading: boolean;
  isRegenerating: boolean;
  isSaved: boolean;
  credit: number;
  onRegenerateWithSection: (section: "job_description" | "job_title") => void;
  regeneratedSection: "job_description" | "job_title" | null;
  savedJobDescriptionId: string[];
  savedJobTitleId: string[];
  projectId: string;
  isShare?: boolean;
}

const SelectJdGenForm: FC<Props> = ({
  result,
  step,
  isLoading,
  isSaved,
  credit,
  isRegenerating,
  onRegenerateWithSection,
  regeneratedSection,
  savedJobDescriptionId,
  savedJobTitleId,
  projectId,
  isShare,
}): JSX.Element => {
  // const { t: commonT } = useTranslation("common");
  // const { t } = useTranslation("jdGen");
  const router = useRouter();
  const [expands, setExpands] = useState(true);

  const slideVariants = useMemo(() => {
    if (step === "user_select_options") {
      return "select";
    }
    return "read";
  }, [step]);

  const isRegenerateJobTitle =
    isRegenerating && regeneratedSection === "job_title";

  const isRegenerateJobDescription =
    isRegenerating && regeneratedSection === "job_description";

  dayjs.locale(router.locale);

  return (
    <Spin
      style={{ top: 100 }}
      spinning={isLoading}
      indicator={
        <LoadingOutlined
          style={{ fontSize: 24, color: "var(--blue-6)" }}
          spin
        />
      }
    >
      <div className="flex flex-col bg-[var(--gray-2)] rounded-[8px] relative w-full ">
        <div className="flex justify-between  p-4  items-center">
          <div className="flex flex-col">
            <div className="flex gap-2">
              <h1 className="font-h10">{"jd_gen_result_header"}</h1>
              <div>
                {/* <AnimatePresence> */}
                {isSaved && (
                  // <motion.div
                  //   initial={{ opacity: 0 }}
                  //   animate={{ opacity: 1 }}
                  //   exit={{ opacity: 0 }}
                  //   transition={{ duration: 0.3 }}
                  // >
                  <div className="flex items-center gap-[4px] ">
                    <SuccessFillIcon
                      width={16}
                      height={16}
                      fill="var(--green-6)"
                    />
                    <span className="font-body5 text-[var(--green-6)]">
                      {"saved"}
                    </span>
                  </div>
                  // {/* </motion.div> */}
                )}
                {/* </AnimatePresence> */}
              </div>
            </div>
            <div>
              <p className="font-body2 text-[var(--black-45)]">
                {dayjs(result?.updated_at).format("DD MMM YYYY")}
                {", "}
                <span>{dayjs(result?.updated_at).format("HH:mm")}</span>
              </p>
            </div>
          </div>

          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={
              expands
                ? { transition: "transform 0.2s ease-in-out" }
                : {
                    transform: "rotate(180deg)",
                    transition: "transform 0.2s ease-in-out",
                  }
            }
            onClick={() => setExpands(!expands)}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.79289 15.7071C6.18342 16.0976 6.81658 16.0976 7.20711 15.7071L12.5 10.4142L17.7929 15.7071C18.1834 16.0976 18.8166 16.0976 19.2071 15.7071C19.5976 15.3166 19.5976 14.6834 19.2071 14.2929L13.2071 8.29289C12.8166 7.90237 12.1834 7.90237 11.7929 8.29289L5.79289 14.2929C5.40237 14.6834 5.40237 15.3166 5.79289 15.7071Z"
              fill="#8C8C8C"
            />
          </svg>
        </div>

        {expands && <Divider className="!m-0 !bg-[var(--gray-5)]" />}

        {result?.job_titles?.length > 0 && (
          <div className="relative">
            {/* <AnimatePresence initial={false}> */}
            {expands && (
              // <motion.div
              //   key="content"
              //   initial="collapsed"
              //   animate="open"
              //   exit="collapsed"
              //   variants={{
              //     open: { height: "auto", opacity: 1 },
              //     collapsed: { height: 0, opacity: 0 },
              //   }}
              //   transition={{ duration: 0.1, ease: "easeInOut" }}
              //   style={{ overflow: "hidden", padding: "1rem" }}
              // >
              <div
                className={clsx(
                  "min-h-[108px] h-full w-full flex flex-col gap-3"
                )}
              >
                <Header
                  title={"jd_gen_result_job_title_header"}
                  numberOfOption={result.job_titles.length}
                  slideVariants={slideVariants}
                  credit={credit}
                  isRegenerating={isRegenerateJobTitle}
                  onRegenerate={() => {
                    onRegenerateWithSection("job_title");
                  }}
                  disabled={isRegenerating}
                  isShare={isShare}
                />
                <SlideList
                  type="title"
                  variants={slideVariants}
                  result={result}
                  isRegenerating={isRegenerating}
                  savedJobDescriptionId={savedJobDescriptionId}
                  savedJobTitleId={savedJobTitleId}
                  jdGenId={result.jd_generate_id}
                  projectId={projectId}
                  isShare={isShare}
                />
              </div>
              // </motion.div>
            )}
            {/* </AnimatePresence> */}
          </div>
        )}

        {result?.job_descriptions?.length > 0 && (
          <div className="relative">
            {/* <AnimatePresence initial={false}> */}
            {expands && (
              // <motion.div
              //   key="content"
              //   initial="collapsed"
              //   animate="open"
              //   exit="collapsed"
              //   variants={{
              //     open: { height: "auto", opacity: 1 },
              //     collapsed: { height: 0, opacity: 0 },
              //   }}
              //   transition={{ duration: 0.1, ease: "easeInOut" }}
              //   style={{ overflow: "hidden", padding: "1rem" }}
              // >
              <div
                className={clsx(
                  "min-h-[108px] h-full w-full flex flex-col gap-3"
                )}
              >
                <Header
                  title={"jd_gen_result_job_description_header"}
                  numberOfOption={result.job_descriptions.length}
                  slideVariants={slideVariants}
                  credit={credit}
                  isRegenerating={isRegenerateJobDescription}
                  onRegenerate={() => {
                    onRegenerateWithSection("job_description");
                  }}
                  disabled={isRegenerating}
                  isShare={isShare}
                />
                <SlideList
                  type="description"
                  variants={slideVariants}
                  result={result}
                  isRegenerating={isRegenerating}
                  savedJobDescriptionId={savedJobDescriptionId}
                  savedJobTitleId={savedJobTitleId}
                  jdGenId={result.jd_generate_id}
                  projectId={projectId}
                  isShare={isShare}
                />
              </div>
              // </motion.div>
            )}
            {/* </AnimatePresence> */}
          </div>
        )}

        {result?.job_titles?.length === 0 &&
          result?.job_descriptions?.length === 0 && (
            <div className="flex justify-center items-center min-h-[200px]">
              No results.
            </div>
          )}
      </div>
    </Spin>
  );
};

export default SelectJdGenForm;
