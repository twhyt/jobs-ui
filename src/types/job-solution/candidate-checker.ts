export interface FileResumeType {
  inputId: string;
  resume: ResponseFileListItem | null;
}

interface CandidateCheckerFormType {
  job_scope: string | undefined;
  duties_and_responsibilities: string | undefined;
  education: string | undefined;
  work_experience: string | undefined;
  behavior_competencies: string | undefined;
  skills: string | undefined;
  tool: string | undefined;
  language: string | undefined;
  other_characteristics: string | undefined;
  highlighted_criteria: CriteriaItemType[];
  excluded_criteria: CriteriaItemType[];
  files: FileResumeType[];
}

interface CandidateCheckerPublic extends CandidateCheckerFormType {
  preferred_qualifications: string[];
  disqualifications: string[];
}

interface CriteriaItemType {
  value: string | undefined;
}

interface ComparativeAnalysisType {
  competency: string;
  education: string;
  experience: string;
  language?: string;
  skill: string;
  tools: string;
}

interface SummarySuggestionsType {
  recommendation: string;
  suggestion_for_interview: string;
  alternative_role: string;
  alternative_role_reason: string;
}

interface ResponseJdCdType {
  project_id: string;
  project_name: string;
  jd_cd_id: string;
  jd_gen_id: string;
  resume_file_name: string;
  name?: string;
  created_at: string;
  updated_at: string;
  has_full_summary: boolean;
  match_score: number;
  suitability_level: number;
  strengths: string[];
  missing_points: string[];
  flag: {
    green: {
      count: number;
      keywords: string[];
    };
    red: {
      count: number;
      keywords: string[];
    };
  };
  thumb: {
    up: {
      count: number;
      keywords: string[];
    };
    down: {
      count: number;
      keywords: string[];
    };
  };
  alert: {
    first_jobber: boolean;
    job_hopper: boolean;
    unemployed: boolean;
    word_counting: boolean;
  };
  summary_suggestions: SummarySuggestionsType;
  comparative_analysis: ComparativeAnalysisType;
  short_summay: string;
}

interface JdCdCdCandidates {
  candidate_id: string;
  has_full_summary: boolean;
  jd_cd_id: string;
  match_score: number;
  name: string;
  ranking: number;
  short_summary: string;

  flag?: {
    green: FlagItemType;
    red: FlagItemType;
  };
  thumb?: {
    up: FlagItemType;
    down: FlagItemType;
  };
  alert?: {
    first_jobber: boolean;
    job_hopper: boolean;
    unemployed: boolean;
    word_counting: boolean;
  };
  suitability_level?: { title: string; content: string }[];
  strengths?: string[];
  missing_points?: string[];
  summary_suggestions?: {
    recommendation: string;
    suggestion_for_interview: string;
    alternative_role: string;
    alternative_role_reason: string;
  };
  comparative_analysis?: {
    education: string;
    experience: string;
    skill: string;
    competency: string;
    tools: string;
    language: string;
  };
}

interface FlagItemType {
  count: number;
  keywords: string[];
}

interface ResponseJdCdCdType {
  //JdCdCdAllSummary
  candidates: JdCdCdCandidates[];
  created_at?: string;
  // jd_cd_id: string | undefined;
  jd_gen_id: string | undefined;
  project_id: string | undefined;
  project_name: string | undefined;
  summary: string | undefined;
  updated_at: string | undefined;
}

interface ResponseJdCdCdTrans extends ResponseJdCdCdType {
  lang: "en" | "th";
}

interface ResponseFileListItem {
  exec_type: string;
  file_id: string;
  original_name: string;
}

export type CandidateSummary = {
  project_id: string;
  project_name: string;
  jd_cd_id: string;
  jd_gen_id: string;
  resume_file_name: string;
  created_at: string;
  updated_at: string;
  candidate_id: string;
  ranking: number;
  match_score: number;
  name: string;
  has_full_summary: boolean;
  suitability_level: number;
  strengths: string[] | string;
  missing_points: string[] | string;
  summary_suggestions: {
    recommendation: string;
    suggestion_for_interview: string;
    alternative_role: string;
    alternative_role_reason: string;
  };
  comparative_analysis: {
    education: string;
    experience: string;
    skill: string;
    competency: string;
    tools: string;
    language: string;
  };
  flag: {
    green: {
      count: number;
      keywords: string[];
    };
    red: {
      count: number;
      keywords: string[];
    };
  };
  thumb: {
    up: {
      count: number;
      keywords: string[];
    };
    down: {
      count: number;
      keywords: string[];
    };
  };
  alert: {
    first_jobber: boolean;
    job_hopper: boolean;
    unemployed: boolean;
    word_counting: boolean;
  };
};

export interface JdCdCdItem {
  candidate_id: string;
  jd_cd_id: string;
  ranking: number;
  match_score: number;
  name: string;
  has_full_summary: boolean;
  short_summary: string;
  flag: {
    green: {
      count: number;
      keywords: string[];
    };
    red: {
      count: number;
      keywords: string[];
    };
  };
  thumb: {
    up: {
      count: number;
      keywords: string[];
    };
    down: {
      count: number;
      keywords: string[];
    };
  };
  alert: {
    first_jobber: boolean;
    job_hopper: boolean;
    unemployed: boolean;
    word_counting: boolean;
  };
  suitability_level?: number;
}

export interface JdCdCdAllSummary {
  project_id: string;
  project_name: string;
  jd_gen_id: string;
  created_at?: string; // ISO 8601 format
  updated_at: string; // ISO 8601 format
  resume_file_names?: string[];
  summary: string;
  candidates: JdCdCdItem[];
}

interface AdjustCriteriaPayload {
  pocket_owner_type: string;
  project_name: string;
  resume_id: string | string[];
  job_scope: string;
  behavior_competencies: string;
  duties_and_responsibilities: string;
  education: string;
  language: string;
  other_characteristics: string;
  skills: string;
  tool: string;
  work_experience: string;
  preferred_qualifications: string[];
  disqualifications: string[];
  project_id: string;
}

interface AdjustCriteriaResponseJdCd {
  project_id: string;
  project_name: string;
  jd_cd_id: string;
  jd_gen_id: string;
  resume_file_name: string;
  created_at: string;
  updated_at: string;
  has_full_summary: boolean;
  name: string;
  short_summary: string;
  match_score: number;
  suitability_level: number;
  strengths: string[];
  missing_points: string[];
  flag: {
    green: {
      count: number;
      keywords: string[];
    };
    red: {
      count: number;
      keywords: string[];
    };
  };
  thumb: {
    up: {
      count: number;
      keywords: string[];
    };
    down: {
      count: number;
      keywords: string[];
    };
  };
  alert: {
    first_jobber: boolean;
    job_hopper: boolean;
    unemployed: boolean;
    word_counting: boolean;
  };
  summary_suggestions: {
    recommendation: string;
    suggestion_for_interview: string;
    alternative_role: string;
    alternative_role_reason: string;
  };
  comparative_analysis: {
    education: string;
    experience: string;
    skill: string;
    competency: string;
    tools: string;
  };
}

interface AdjustCriteriaResponseJdCdCd {
  project_id: string;
  project_name: string;
  jd_gen_id: string;
  created_at: string;
  updated_at: string;
  resume_file_names: string[];
  summary: string;
  candidates: {
    candidate_id: string;
    jd_cd_id: string;
    has_full_summary: boolean;
    ranking: number;
    match_score: number;
    name: string;
    short_summary: string;
    flag: {
      green: {
        count: number;
        keywords: string[];
      };
      red: {
        count: number;
        keywords: string[];
      };
    };
    thumb: {
      up: {
        count: number;
        keywords: string[];
      };
      down: {
        count: number;
        keywords: string[];
      };
    };
    alert: {
      first_jobber: boolean;
      job_hopper: boolean;
      unemployed: boolean;
      word_counting: boolean;
    };
  }[];
}

export {
  type CandidateCheckerFormType,
  type CriteriaItemType,
  type ResponseJdCdType,
  type ResponseFileListItem,
  type ResponseJdCdCdType,
  type JdCdCdCandidates,
  type ResponseJdCdCdTrans,
  type CandidateCheckerPublic,
  type AdjustCriteriaPayload,
  type AdjustCriteriaResponseJdCd,
  type AdjustCriteriaResponseJdCdCd,
};
