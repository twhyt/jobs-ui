import { FC } from "react";
// import { isJdCd, isJdCdCd } from "@/utils";
// import { CandidateCheckerResults } from "@/store/slices/projectSlice";
import ResultJdCdItem from "./summary-candidate-checker/jd-cd/ResultJdCdItem";
import ResultJdCdCdItem from "./summary-candidate-checker/jd-cdcd/ResultJdCdCdItem";

interface Props {
  // results: CandidateCheckerResults;
  openResults: {
    [id: string]: boolean;
  };
  toggleOpenResults: (id: string) => void;
}

const ResultList: FC<Props> = ({
  // results,
  openResults,
  toggleOpenResults,
}): JSX.Element => {
  const result: any = {};
  return (
    <>
      {/* {results.toReversed().map((result) => {
        if (isJdCd(result)) {
          return ( */}
      <ResultJdCdItem
        resultId={result.resultId}
        key={result.resultId}
        isOpen={openResults[result.resultId]}
        toggleOpenResults={toggleOpenResults}
        result={{
          alert: result.alert,
          flag: result.flag,
          jd_cd_id: result.jd_cd_id,
          match_score: result.match_score,
          name: result.name,
          created_at: result.created_at,
          has_full_summary: result.has_full_summary,
          comparative_analysis: result.comparative_analysis,
          jd_gen_id: result.jd_gen_id,
          project_id: result.project_id,
          project_name: result.project_name,
          resume_file_name: result.resume_file_name,
          missing_points: result.missing_points,
          strengths: result.strengths,
          suitability_level: result.suitability_level,
          summary_suggestions: result.summary_suggestions,
          short_summay: result.short_summary,
          thumb: result.thumb,
          updated_at: result.updated_at,
        }}
        from={"create"}
      />
      {/* );
        } */}

      {/* if (isJdCdCd(result)) {
          return ( */}
      <ResultJdCdCdItem
        resultId={result.resultId}
        key={result.resultId}
        isOpen={openResults[result.resultId]}
        toggleOpenResults={toggleOpenResults}
        result={{
          candidates: result.candidates,
          jd_gen_id: result.jd_gen_id,
          project_id: result.project_id,
          project_name: result.project_name,
          summary: result.summary,
          updated_at: result.updated_at,
          created_at: result.created_at,
        }}
      />
      {/* );
        } */}
      {/* })} */}
    </>
  );
};

export default ResultList;
