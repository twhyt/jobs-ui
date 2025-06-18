import { JdCdCdItem } from "../candidate-checker";

type IconType =
  | "resume_extractor"
  | "candidate checker"
  | "jd_generator"
  | "job_post_generator";

export interface Pagination {
  count: number;
  last_page: number;
  limit: number;
  page: number;
}

export interface Project {
  project_id: string;
  public_id: string;
  project_name: string;
  updated_at: string;
  type: EProjectType;
  updated_by: string;
  is_team_project: boolean;
  is_share: boolean;
}

export interface ProjectsResponse extends Pagination {
  items: Project[];
}

export interface ShareProjectResponse extends Pagination {
  project_id: string;
}

export interface WorkExperience {
  company: string;
  job_title: string;
  duration: number;
  start: string; // ISO date string
  end: string | null; // ISO date string or null
  expertises: string[] | null; // Assuming it's an array of strings or null
}

export interface ResumeExtractionItem {
  id: string;
  project_id: string | null;
  candidate_id: string | null;
  short_summary: string | null;
  extraction_id: string | null;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  first_name: string;
  last_name: string;
  nickname: string;
  age: number | null;
  district: string;
  province: string;
  education_level: string; // Consider using an enum if there's a fixed set of levels
  education_major: string;
  total_experience_duration: number;
  overall_expertises: string[];
  latest_job_title: string;
  latest_company: string;
  latest_experience_duration: number;
  latest_expertises: string[];
  work_experiences: WorkExperience[];
  tools: string[];
  phone_number: string;
  email: string;
  resume_file_name: string;
}

export interface SummarySuggestions {
  description: string;
  recommendation: string;
  suggestion_for_interview: string;
  alternative_role: string;
  alternative_role_reason: string;
  interview_recommend: string;
  interview_recommend_type: string;
  alternative_positions: string[];
}

export interface ComparativeAnalysis {
  education: string;
  experience: string;
  skill: string;
  competency: string;
  tools: string;
  language: string;
}

export interface SharePublicResponse {
  is_shared: boolean;
  share_id: string;
  public_id: string;
}

export enum EProjectType {
  RESUME_EXTRACTION = "resume extraction",
  JDCD = "JD CD",
  JDCDCD = "JD CDCD",
  CANDIDATE_CHECKER = "candidate checker",
  JD_GENERATOR = "JD genarator",
  JOB_POST_GENERATOR = "job post genarator",
}

// Project Candidate Checker After Refactor
export interface CandidateCheckerInput {
  resume_id: string[];
  job_scope: string;
  duties_and_responsibilities: string;
  education: string;
  work_experience: string;
  behavior_competencies: string;
  skills: string;
  tool: string;
  language: string;
  other_characteristics: string;
  preferred_qualifications: string[];
  disqualifications: string[];
  resume_file_name: string | string[];
}

export interface CandidateCheckerOutput {
  jd_cd_id: string;
  candidate_id: string;
  short_summary: string;
  has_full_summary: boolean;
  ranking: number;
  name: string;
  match_score: number;
  flag: {
    green: {
      count: number;
      keywords: string[];
    };
    red: { count: number; keywords: string[] };
  };
  thumb: {
    up: { count: number; keywords: string[] };
    down: { count: number; keywords: string[] };
  };
  alert: {
    first_jobber: boolean;
    job_hopper: boolean;
    unemployed: boolean;
    word_counting: boolean;
  };

  // Detailed Analysis
  suitability_level: number;

  // Strengths
  strengths: string[];
  // Gaps
  missing_points: string[];

  // Suggestions
  summary_suggestions: SummarySuggestions;
  // Candidate Profile
  comparative_analysis: ComparativeAnalysis;

  candidates?: JdCdCdItem[];
  summary?: string;
  created_at?: string;
  updated_at?: string;
}
export interface CandidateCheckerItem {
  id: string;
  input: CandidateCheckerInput;
  output: CandidateCheckerOutput;
  type?: string;
}

export interface ProjectDetail extends Pagination {
  count: number;
  items: ResumeExtractionItem[] | CandidateCheckerItem[];
  type: EProjectType;
  project_name: string;
  project_id: string;
}

export interface JdCdItem {
  summary_suggestions: {
    recommendation: string;
    suggestion_for_interview: string;
    alternative_role: string;
    alternative_role_reason: string;
  };
  missing_points: string[] | string;
  match_score: number;
  suitability_level: number;
  strengths: string[] | string;
  comparative_analysis: ComparativeAnalysis;
  updated_at: string;
  flag: {
    green: {
      count: number;
      keywords: string[];
    };
    red: { count: number; keywords: string[] };
  };
  thumb: {
    up: { count: number; keywords: string[] };
    down: { count: number; keywords: string[] };
  };
  alert: {
    first_jobber: boolean;
    job_hopper: boolean;
    unemployed: boolean;
    word_counting: boolean;
  };
  short_summary: string;
}

export interface ProjectShareDetail extends Pagination {
  items: ResumeExtractionItem[] | CandidateCheckerItem[];
  project_name: string;
  public_id: string;
  // project_id: string;
  type: EProjectType;
}

export interface JdGenPublicResponse {
  job_title: string;
  job_title_keywords_include: string[];
  job_title_keywords_exclude: string[];
  job_overview: string;
  output_language: string;
  count_output: {
    job_title: number;
    job_description: number;
  };
  has_output_job_scope: boolean;
  has_output_duties_and_responsibilities: boolean;
  has_output_knowledge: boolean;
  has_output_education: boolean;
  has_output_work_experience: boolean;
  has_output_skills: boolean;
  has_output_behavior: boolean;
  has_output_other_qualifications: boolean;
}

export type { IconType };
