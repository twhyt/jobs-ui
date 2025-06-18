
interface TopUpDetail {
  credit: number;
  price: number;
  top_up_id: number;
}
interface PackageDetail {
  credit: number;
  member: number;
  package: string;
  package_id: string;
  price: number;
}
  
export interface PackageData {
  package_details: PackageDetail[];
  topup_details: TopUpDetail[];
}

export interface AccountPackageType {
  packages: string;
  is_team_owner: boolean;
  pockets: PocketAccountType[];
}

export interface PocketAccountType {
  expire_date: string;
  is_owner: boolean;
  total_credit: number;
  type: "my pocket" | "team pocket";
}
  
export interface PocketType {
  pocket_owner_type: 'account' | 'team'
  remaining_credit: number
  can_deduct_credit: boolean
}

export enum EFeatureName {
  // Generate Button:
  RESUME_EXTRACTION_SHORT = "Resume Extraction (short summary)",
  JD_CD_SHORT = "JD-CD (short summary)",
  JD_CDCD_SHORT = "JD-CDCD (short summary)",
  JD_CDPOOL_SHORT = "JDCDPool (short summary)",
  JDPOOL_CD_SHORT = "JDPool-CD (short summary)",
  JD_GENERETOR_GENERATE = "Smart JD Generator (generate)",
  JC_GENERETOR_GENERATE = "Job Caption Generator (generate)",
  
  // Full Summary:
  RESUME_EXTRACTION_FULL = "Resume Extraction (full summary)",
  JD_CD_FULL = "JD-CD (full summary)",
  JD_CDCD_FULL = "JD-CDCD (full summary)",
  JD_CDPOOL_FULL = "JDCDPool (full summary)",
  JDPOOL_CD_FULL = "JDPool-CD (full summary)",
  
  // Regenerate:
  JD_GENERATE_REGENERATE = "Smart JD Generator (regenerate)",
  JC_GENERETE_REGENERATE = "Job Caption Generator (regenerate)",
  
  // Translation:
  RESUME_EXTRACTION_TRANSLATE_SHORT = "Resume Extraction (translate short summary)",
  JD_CD_TRANSLATE_SHORT = "JD-CD (translate short summary)",
  JD_CDCD_TRANSLATE_SHORT = "JD-CDCD (translate short summary)",
  JD_CDPOOL_TRANSLATE_SHORT = "JD-CDPool (translate short summary)",
  JDPOOL_CD_TRANSLATE_SHORT = "JDPool-CD (translate short summary)",

  RESUME_EXTRACTION_TRANSLATE_FULL = "Resume Extraction (translate full summary)",
  JD_CD_TRANSLATE_FULL = "JD-CD (translate)",
  JD_CDCD_TRANSLATE_FULL = "JD-CDCD (translate full summary)",
  JD_CDPOOL_TRANSLATE_FULL = "JDCDPool (translate full summary)",
  JDPOOL_CD_TRANSLATE_FULL = "JDPool-CD (translate full summary)"
}