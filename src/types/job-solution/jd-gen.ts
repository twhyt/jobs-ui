export interface JDGeneratorItem {
    created_at: string;
    updated_at: string;
    job_titles: Array<{
      job_title_id: string;
      is_thumped_up: boolean;
      is_copied: boolean;
      is_saved: boolean;
      title: string;
    }>;
    job_descriptions: Array<{
      job_description_id: string;
      is_thumped_up: boolean;
      is_copied: boolean;
      is_saved: boolean;
      job_scope: string;
      duties_and_responsibilities: string;
      education: string;
      work_experience: string;
      knowledges: string;
      skills: string;
      preferred_qualifications: string[];
      behavior_competencies: string;
    }>;
  }
  
  export interface JDGeneratorProject {
    type: string;
    project_name?: string;
    project_id?: string;
    page: number;
    limit: number;
    count: number;
    last_page: number;
    items: JDGeneratorItem[];
  }
  