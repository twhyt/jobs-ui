// import useTranslation from "@/hooks/useTranslation";
import React, { FC } from "react";

interface Props {
  items: { id: string; title: string; content: string[] }[];
}

const CandidateProfile: FC<Props> = ({ items }): JSX.Element => {
  // const { t } = useTranslation("candidateChecker");
  const order = [
    "education",
    "experience",
    "skill",
    "competency",
    "tools",
    "language",
  ];
  const sorted = items
    .toSorted((a, b) => order.indexOf(a.title) - order.indexOf(b.title))
    .filter((item) => {
      return item.title !== "language";
    });
  return (
    <div className="p-3 pl-0 flex flex-col gap-2">
      <h1 className="font-subtitle4 text-[var(--blue-6)]">
        {/* {t("header_text__33")} */}
        header_text__33
      </h1>
      <div className="flex flex-col gap-1 !m-0">
        {sorted.map((item) => {
          let title = "";

          switch (item.title) {
            case "experience":
              // title = t("header_text__26");
              title = "title";

              break;
            case "skill":
              // title = t("header_text__27");
              title = "title";

              break;
            case "competency":
              // title = t("header_text__28");
              title = "title";

              break;
            case "tools":
              // title = t("header_text__29");
              title = "title";

              break;
            case "language":
              // title = t("header_text__30");
              title = "title";

              break;
            default:
              // title = t("header_text__25");
              title = "title";
          }
          return (
            <div className="flex flex-col gap-1" key={item.id}>
              <h1 className="font-subtitle4">{title}</h1>
              <ul style={{ listStyle: "outside" }}>
                {item.content.map((content, index) => {
                  const score = /\((\d+\/\d+)\)/.exec(content);
                  const text = content.split(":")[1];

                  return (
                    <React.Fragment key={item.id + index}>
                      {score && (
                        <li className="ml-8">
                          <span className="font-body5">{score?.[1]}</span>
                        </li>
                      )}
                      <li className="ml-8">
                        {text ? (
                          <span className="font-body5">{text}</span>
                        ) : (
                          <span className="font-body5">{content}</span>
                        )}
                      </li>
                    </React.Fragment>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CandidateProfile;
