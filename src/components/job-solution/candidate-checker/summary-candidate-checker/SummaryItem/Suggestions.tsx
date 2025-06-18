// import useTranslation from "@/hooks/useTranslation";
import { FC, useMemo } from "react";
import { v4 } from "uuid";

interface Props {
  items: { id: string; title: string; content: string }[];
}

const Suggestions: FC<Props> = ({ items }): JSX.Element => {
  // const { t } = useTranslation("candidateChecker");
  const order = [
    "recommendation",
    "suggestion_for_interview",
    "alternative_role",
    "alternative_role_reason",
  ];

  const sorted = items.toSorted((a, b) => {
    return order.indexOf(a.title) - order.indexOf(b.title);
  });

  const suggestionForInterview = useMemo(() => {
    return sorted[1]?.content?.split("\n").filter((item) => item !== "") ?? [];
  }, [sorted]);

  const alternativeRole = useMemo(() => {
    return sorted[2]?.content?.split("\n").filter((item) => item !== "") ?? [];
  }, [sorted]);

  return (
    <div className="p-3 pl-0 gap-3 flex flex-col">
      <h1 className="font-subtitle4 text-[var(--blue-6)]">
        {"header_text__23"}
      </h1>

      <div className="flex flex-col">
        <h1 className="font-subtitle4 text-[var(--black-85)]">
          {"header_text__34"}
        </h1>
        <p className="font-body5 text-[var(--black-85)]">
          {sorted[0]?.content}
        </p>
      </div>

      <div className="flex flex-col">
        <h1 className="font-subtitle4 text-[var(--black-85)]">
          {"header_text__35"}
        </h1>
        <ul style={{ listStyle: "outside" }}>
          {suggestionForInterview.map((content) => {
            const id = v4();
            return (
              <li key={id} className="ml-8">
                <p className="font-body5 text-[var(--black-85)]">{content}</p>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex flex-col">
        <h1 className="font-subtitle4 text-[var(--black-85)]">
          {"header_text__36"}
        </h1>
        <ul style={{ listStyle: "outside" }}>
          {alternativeRole.map((content) => {
            const id = v4();
            return (
              <li key={id} className="ml-8">
                <p className="font-body5 text-[var(--black-85)]">{content}</p>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex flex-col">
        <h1 className="font-subtitle4 text-[var(--black-85)]">
          {"header_text__37"}
        </h1>
        <p className="font-body5 text-[var(--black-85)]">
          {sorted[3]?.content}
        </p>
      </div>
    </div>
  );
};

export default Suggestions;
