import {
  FlagIcon,
  PercentMatchIcon,
} from "@/assets/job-solution/icons/suggested-groups/outline";
import AlertContainer from "../SummaryItem/AlertContainer";

const DetailedAlertContainer = ({
  alert,
  flag,
  matchScore,
  thumb,
}: {
  matchScore?: number;
  thumb?: {
    up: {
      count: number;
    };
    down: {
      count: number;
    };
  };
  flag?: {
    green: {
      count: number;
      keywords: string[];
    };
    red: {
      count: number;
      keywords: string[];
    };
  };
  alert?: {
    first_jobber: boolean;
    job_hopper: boolean;
    unemployed: boolean;
    word_counting: boolean;
  };
}): JSX.Element => {
  return (
    <div className="flex flex-col py-3" id="alert-container">
      <div className="flex justify-between gap-4">
        <div className="flex items-center gap-2">
          <PercentMatchIcon />
          <p className="font-body5 text-[var(--black-85)]">Match Score:</p>
          <p className="font-body5 text-[var(--blue-6)]">
            {`${Math.round(Number(matchScore))}%`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 8.00156C21.5333 8.00156 22 8.20156 22.4 8.60156C22.8 9.00156 23 9.46823 23 10.0016V12.0016C23 12.1182 22.9833 12.2432 22.95 12.3766C22.9167 12.5099 22.8833 12.6349 22.85 12.7516L19.85 19.8016C19.7 20.1349 19.45 20.4182 19.1 20.6516C18.75 20.8849 18.3833 21.0016 18 21.0016H7V8.00156L13 2.05156C13.25 1.80156 13.5458 1.65573 13.8875 1.61406C14.2292 1.5724 14.5583 1.6349 14.875 1.80156C15.1917 1.96823 15.425 2.20156 15.575 2.50156C15.725 2.80156 15.7583 3.1099 15.675 3.42656L14.55 8.00156H21ZM9 8.85156V19.0016H18L21 12.0016V10.0016H12L13.35 4.50156L9 8.85156ZM4 21.0016C3.45 21.0016 2.97917 20.8057 2.5875 20.4141C2.19583 20.0224 2 19.5516 2 19.0016V10.0016C2 9.45156 2.19583 8.98073 2.5875 8.58906C2.97917 8.1974 3.45 8.00156 4 8.00156H7V10.0016H4V19.0016H7V21.0016H4Z"
              fill="#8C8C8C"
            />
          </svg>
          <div className="font-h10 text-[var(--blue-6)]">{thumb?.up.count}</div>
          <svg
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 13C1.46667 13 1 12.8 0.6 12.4C0.2 12 0 11.5333 0 11V9C0 8.88333 0.0166667 8.75833 0.05 8.625C0.0833333 8.49167 0.116667 8.36667 0.15 8.25L3.15 1.2C3.3 0.866667 3.55 0.583333 3.9 0.35C4.25 0.116667 4.61667 0 5 0H16V13L10 18.95C9.75 19.2 9.45417 19.3458 9.1125 19.3875C8.77083 19.4292 8.44167 19.3667 8.125 19.2C7.80833 19.0333 7.575 18.8 7.425 18.5C7.275 18.2 7.24167 17.8917 7.325 17.575L8.45 13H2ZM14 12.15V2H5L2 9V11H11L9.65 16.5L14 12.15ZM19 0C19.55 0 20.0208 0.195833 20.4125 0.5875C20.8042 0.979167 21 1.45 21 2V11C21 11.55 20.8042 12.0208 20.4125 12.4125C20.0208 12.8042 19.55 13 19 13H16V11H19V2H16V0H19Z"
              fill="#8C8C8C"
            />
          </svg>
          <div className="font-h10 text-[var(--blue-6)]">
            {thumb?.down.count}
          </div>
        </div>
      </div>
      <div className="flex flex-col  justify-start ">
        <div className="flex gap-2">
          <FlagIcon />
          <div className="font-h10 text-[var(--green-6)]">
            {flag?.green.count}
          </div>
          {flag?.green.keywords?.map((item, index: number) => (
            <span key={index} className="font-body5">
              {item}
            </span>
          ))}
        </div>

        <div className="flex gap-2">
          <FlagIcon fill="var(--error)" />
          <div className="font-h10 text-[var(--error)]">{flag?.red.count}</div>
          {flag?.green.keywords?.map((item, index: number) => (
            <span key={index} className="font-body5">
              {item}
            </span>
          ))}
        </div>
      </div>
      <AlertContainer alert={alert} />
    </div>
  );
};

export default DetailedAlertContainer;
