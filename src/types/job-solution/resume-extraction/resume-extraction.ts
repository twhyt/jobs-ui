interface ResponseResumeExtraction {
  project_id: string | null
  candidate_id: string | null
  extraction_id: string | null
  short_summary: string | null
  first_name: string | null;
  last_name: string | null;
  nickname: string | null;
  age: number | null;
  district: string | null;
  province: string | null;
  education_level: string | null;
  education_major: string | null;
  total_experience_duration: number | null;
  overall_expertises: string[];
  latest_job_title: string | null;
  latest_company: string | null;
  latest_experience_duration: number | null;
  latest_expertises: string[];
  work_experiences: WorkExperiencesType[];
  tools: string[];
  phone_number: string;
  email: string;
  resume_file_name?: string;
  created_at?: string;
}

interface WorkExperiencesType {
  company: string | null;
  job_title: string | null;
  duration: number | null;
  start: string | null;
  end: string | null;
  expertises: string[] | null;
}

interface ResumeInput {
  resume_id: string;
  resume_file_name: string;
}

interface ResumeOutput {
  created_at: string;
  updated_at: string;
  candidate_id: string;
  has_full_summary: boolean;
}

interface ResumeItem {
  input: ResumeInput;
  output: ResumeOutput;
}

interface ProjectData {
  type: string;
  project_name: string;
  project_id: string;
  page: number;
  limit: number;
  count: number;
  last_page: number;
  items: ResumeItem[];
}
export { type ResponseResumeExtraction, type WorkExperiencesType, type ProjectData };
