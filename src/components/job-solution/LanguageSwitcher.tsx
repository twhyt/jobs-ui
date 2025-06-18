import { ChevronDownIcon } from "@/assets/job-solution/icons/directional-groups";
import { CheckedIcon } from "@/assets/job-solution/icons/suggested-groups/outline";
// import useTranslation from "@/hooks/useTranslation";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";

export default function LanguageSwitcher() {
  const router = useRouter();
  const { locale } = useRouter();
  // const { t } = useTranslation("common");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const changeLanguage = (locale: string) => {
    // console.log("locale", locale);

    router.push(
      { pathname: router.pathname, query: { ...router.query } },
      undefined,
      { locale }
    );
    setIsDropdownOpen(false);
  };

  return (
    <LanguageSwitcherContainer>
      <div
        className="p-[16px] font-h10 flex items-center justify-between cursor-pointer"
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      >
        {"menu_language"}
        <div className="flex items-center gap-[4px]">
          {!isDropdownOpen && (
            <span>
              {[
                { lang: "en", label: "menu_language_en" },
                { lang: "th", label: "menu_language_th" },
              ].map(({ lang, label }) => {
                const isSelected = locale === lang;
                return (
                  <span
                    className="font-button4 text-[var(--blue-6)]"
                    key={lang}
                  >
                    {isSelected && label}
                  </span>
                );
              })}
            </span>
          )}
          <span id="chevron-toggle" className="w-[16px] h-[16px]">
            {isDropdownOpen ? (
              <ChevronUp />
            ) : (
              <ChevronDownIcon width={16} height={16} fill="var(--blue-6)" />
            )}
          </span>
        </div>
      </div>
      {isDropdownOpen && (
        <div className="flex flex-col">
          {[
            { lang: "en", label: "menu_language_en" },
            { lang: "th", label: "menu_language_th" },
          ].map(({ lang, label }) => {
            const isSelected = locale === lang;
            return (
              <button
                key={lang}
                onClick={() => changeLanguage(lang)}
                className={` ${
                  isSelected
                    ? "font-button3 bg-[var(--blue-1)]"
                    : "font-button4"
                } !text-[var(--text-title)] flex items-center justify-between py-[8px] px-[16px] cursor-pointer
                `}
              >
                {label}
                {isSelected && (
                  <CheckedIcon
                    fill="var(--blue-6)"
                    width={16}
                    height={16}
                    minWidth={16}
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </LanguageSwitcherContainer>
  );
}

const LanguageSwitcherContainer = styled.div`
  #chevron-toggle {
    cursor: pointer;
  }
`;

const ChevronUp = () => (
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
      d="M3.86128 10.4712C4.12163 10.7316 4.54374 10.7316 4.80409 10.4712L8.33268 6.94265L11.8613 10.4712C12.1216 10.7316 12.5437 10.7316 12.8041 10.4712C13.0644 10.2109 13.0644 9.78878 12.8041 9.52843L8.80409 5.52843C8.54374 5.26808 8.12163 5.26808 7.86128 5.52843L3.86128 9.52843C3.60093 9.78878 3.60093 10.2109 3.86128 10.4712Z"
      fill="#1A34FF"
    />
  </svg>
);
