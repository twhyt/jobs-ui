import {
  CandidateCheckerItem,
  CandidateCheckerOutput,
  EProjectType,
} from "@/types/job-solution/project";
import { FC } from "react";
import { useParams } from "next/navigation";
import ResultJdCdCdItem from "@/components/job-solution/candidate-checker/summary-candidate-checker/jd-cdcd/ResultJdCdCdItem";
import ResultJdCdItem from "@/components/job-solution/candidate-checker/summary-candidate-checker/jd-cd/ResultJdCdItem";

interface Props {
  allItems: CandidateCheckerItem[];
  projectName: string;
  openResults: {
    [id: string]: boolean;
  };
  toggleOpenResults: (id: string) => void;
}

const ResultList: FC<Props> = ({
  allItems,
  projectName,
  openResults,
  toggleOpenResults,
}): JSX.Element => {
  const params = useParams();

  return (
    <div className="flex flex-col px-[16px] gap-[24px]">
      {allItems.map((item) => {
        if (
          Array.isArray(item.output.candidates) &&
          item.type === EProjectType.JDCDCD
        ) {
          return (
            <ResultJdCdCdItem
              toggleOpenResults={toggleOpenResults}
              isOpen={openResults[item.id]}
              resultId={item.id}
              key={item.id}
              result={{
                candidates: item.output.candidates ?? [],
                summary: item.output.summary ?? "",
                jd_gen_id: "",
                project_id: params.project_id as string,
                project_name: projectName,
                updated_at: item.output.updated_at ?? "",
                created_at: item.output.created_at ?? "",
                resume_file_names: item.input.resume_file_name as string[],
              }}
              type={EProjectType.JDCDCD}
            />
          );
        }

        const candidate = item.output.candidates?.[0] as CandidateCheckerOutput;
        return (
          <ResultJdCdItem
            isOpen={openResults[item.id]}
            toggleOpenResults={toggleOpenResults}
            resultId={item.id}
            key={item.id}
            result={{
              input: item.input,
              output: {
                alert: candidate?.alert,
                candidate_id: candidate?.candidate_id,
                jd_cd_id: candidate.jd_cd_id,
                comparative_analysis: candidate.comparative_analysis,
                flag: candidate.flag,
                has_full_summary: candidate.has_full_summary,
                match_score: candidate.match_score,
                missing_points: candidate.missing_points,
                name: candidate.name,
                updated_at: candidate.updated_at,
                created_at: candidate.created_at,
                ranking: candidate.ranking,
                short_summary: candidate.short_summary,
                strengths: candidate.strengths,
                suitability_level: candidate.suitability_level,
                summary_suggestions: candidate.summary_suggestions,
                thumb: candidate.thumb,
                summary: candidate.summary,
              },
              id: item.id,
            }}
            type={EProjectType.JDCD}
          />
        );
      })}
    </div>
  );
};

export default ResultList;
