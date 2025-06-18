import { FC, useMemo, useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Swiper as SwiperType } from "swiper/types";
import clsx from "clsx";
// import {
//   CreateJdJobDescriptionResponse,
//   CreateJdJobTitleResponse,
//   CreateJdResponse,
// } from "@/hooks/useJdGen";
import { useFormContext } from "react-hook-form";

import SlideItem from "./SlideItem";
import { FormValues } from "@/types/job-solution/global";

interface Props {
  type: "title" | "description";
  variants: "read" | "select";
  result: any;
  isRegenerating: boolean;
  savedJobDescriptionId: string[];
  savedJobTitleId: string[];
  jdGenId: string;
  projectId: string;
  isShare?: boolean;
}

const SlideList: FC<Props> = ({
  type = "title",
  variants = "read",
  result,
  isRegenerating,
  savedJobDescriptionId,
  savedJobTitleId,
  jdGenId,
  projectId,
  isShare,
}): JSX.Element => {
  const form = useFormContext<FormValues>();
  const { watch } = form;
  const [swiperState, setSwiperState] = useState<SwiperType>();
  const [activeIndex, setActiveIndex] = useState(0);

  const slideItems: any = useMemo(() => {
    if (type === "title") {
      return result.job_titles;
    }

    return result.job_descriptions;
  }, [result, type]);

  const selectedJobTitleId = watch("selectedJobTitleId");
  const selectedJobDescriptionId = watch("selectedJobDescriptionId");

  const selectedId = useMemo(() => {
    if (type === "title") {
      return selectedJobTitleId;
    }

    return selectedJobDescriptionId;
  }, [selectedJobTitleId, type, selectedJobDescriptionId]);

  const onChangeSelectedId = (id: string) => {
    if (type === "title") {
      form.setValue("selectedJobTitleId", id);
    }

    if (type === "description") {
      form.setValue("selectedJobDescriptionId", id);
    }
  };

  return (
    <div
      className={clsx(
        "w-full",
        isRegenerating && "!opacity-50 !pointer-events-none"
      )}
    >
      <Swiper
        modules={[Navigation]} // enable navigation module
        slidesPerView={1.055}
        spaceBetween={10}
        onInit={(swiper) => {
          setSwiperState(swiper);
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.activeIndex);
        }}
      >
        {slideItems.map((item: any, index: any) => {
          if (type === "title") {
            const jobTitles = item as any;
            return (
              <SwiperSlide
                key={jobTitles.job_title_id}
                style={{ width: "90%" }}
              >
                <SlideItem
                  activeIndex={activeIndex}
                  item={item}
                  itemIndex={index}
                  onChangeSelectedId={onChangeSelectedId}
                  selectedId={selectedId}
                  type={type}
                  variants={variants}
                  savedJobDescriptionId={savedJobDescriptionId}
                  savedJobTitleId={savedJobTitleId}
                  jdGenId={jdGenId}
                  projectId={projectId}
                  isShare={isShare}
                />
              </SwiperSlide>
            );
          }

          if (type === "description") {
            const jodDescriptions = item as any;
            return (
              <SwiperSlide
                key={jodDescriptions.job_description_id}
                style={{ width: " 90%" }}
              >
                <SlideItem
                  activeIndex={activeIndex}
                  item={item}
                  itemIndex={index}
                  onChangeSelectedId={onChangeSelectedId}
                  selectedId={selectedId}
                  type={type}
                  variants={variants}
                  savedJobDescriptionId={savedJobDescriptionId}
                  savedJobTitleId={savedJobTitleId}
                  jdGenId={jdGenId}
                  projectId={projectId}
                  isShare={isShare}
                />
              </SwiperSlide>
            );
          }

          return <></>;
        })}
      </Swiper>

      {activeIndex > 0 && (
        <button
          type="button"
          className={clsx(
            "absolute left-[-8px]  -translate-y-1/2 bg-white text-white p-1 rounded-full drop-shadow-md z-10",
            type === "title" && "bottom-[10px]",
            type === "description" && "top-[35%]"
          )}
          onClick={() => {
            swiperState?.slidePrev();
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16.2071 5.29289C16.5976 5.68342 16.5976 6.31658 16.2071 6.70711L10.9142 12L16.2071 17.2929C16.5976 17.6834 16.5976 18.3166 16.2071 18.7071C15.8166 19.0976 15.1834 19.0976 14.7929 18.7071L8.79289 12.7071C8.40237 12.3166 8.40237 11.6834 8.79289 11.2929L14.7929 5.29289C15.1834 4.90237 15.8166 4.90237 16.2071 5.29289Z"
              fill="#1F1F1F"
            />
          </svg>
        </button>
      )}

      {activeIndex !== slideItems.length - 1 && (
        <button
          type="button"
          className={clsx(
            "absolute -translate-y-1/2 bg-white text-white p-1 rounded-full drop-shadow-md z-10 right-[10px]",
            type === "title" && "bottom-[10px]",
            type === "description" && "top-[35%]"
          )}
          onClick={() => {
            swiperState?.slideNext();
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.79289 5.29289C8.40237 5.68342 8.40237 6.31658 8.79289 6.70711L14.0858 12L8.79289 17.2929C8.40237 17.6834 8.40237 18.3166 8.79289 18.7071C9.18342 19.0976 9.81658 19.0976 10.2071 18.7071L16.2071 12.7071C16.5976 12.3166 16.5976 11.6834 16.2071 11.2929L10.2071 5.29289C9.81658 4.90237 9.18342 4.90237 8.79289 5.29289Z"
              fill="#1F1F1F"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SlideList;
