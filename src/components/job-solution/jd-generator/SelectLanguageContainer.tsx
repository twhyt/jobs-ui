import { ChevronDownIcon } from "@/assets/job-solution/icons/directional-groups";
import { FC } from "react";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import DrawerSelectLanguage from "../drawer/jd-smart-generator/DrawerSelectLanguage";
// import useTranslation from "@/hooks/useTranslation";

interface Props {
  disabled: boolean;
  openSelectLang: boolean;
  onChangeOpenSelectLang: () => void;
  onChangeSelectLanguage: (lang: string) => void;
}

const SelectLanguageContainer: FC<Props> = ({
  disabled,
  openSelectLang,
  onChangeOpenSelectLang,
  onChangeSelectLanguage,
}): JSX.Element => {
  const form = useFormContext<{ selectedLanguage: string }>();
  const selectedLanguage = form.watch("selectedLanguage");
  // const { t } = useTranslation("jdGen");
  // const { t: drawer } = useTranslation("drawer");

  return (
    <div className="flex flex-col w-full gap-3 px-4">
      <h1 className="font-h10">{"jd_gen_step3_header"}</h1>
      <StyledFakeSelect
        className="border border-[var(--gray-7)] pt-[13.5] px-4 justify-between"
        onClick={onChangeOpenSelectLang}
        disabled={disabled}
      >
        <p className="font-body5">
          {selectedLanguage === "English"
            ? "drawer_language_en"
            : "drawer_language_th"}
        </p>
        <ChevronDownIcon />
      </StyledFakeSelect>

      <DrawerSelectLanguage
        open={openSelectLang}
        onClose={onChangeOpenSelectLang}
        selected={selectedLanguage}
        onChange={onChangeSelectLanguage}
      />
    </div>
  );
};

interface StyledFakeSelectProps {
  disabled?: boolean;
}

const StyledFakeSelect = styled.div<StyledFakeSelectProps>`
  height: 51px;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0;
  padding: 16px 13.5px;

  border: 1px solid var(--gray-7);
  border-radius: 5px;
  transition: border-color 0.2s, box-shadow 0.2s;
  background-color: var(--white-100);

  &:hover {
    border-color: var(--blue-6);
  }

  &:focus-within {
    border-color: var(--blue-6);
    box-shadow: none;
  }

  /* --- Disabled Styles --- */
  ${({ disabled }) =>
    disabled &&
    `
      background-color: var(--white-100);
      border-color: var(--gray-6) !important;
      cursor: not-allowed;
  
      color: var(--black-25) !important;
      -webkit-text-fill-color: var(--black-25);
      opacity: 0.8 !important;
  
  
      
     svg {
        fill: var(--black-25);
        opacity: 0.5 !important;
      }
  
      &:hover {
       border-color: var(--gray-6) !important;
      }
  
      &:focus-within {
        border-color: var(--gray-5);
        box-shadow: none;
      }
    `}
`;

export default SelectLanguageContainer;
