export type RecordStatus = "received" | "in_progress" | "selected" | "discarded";

export type RecordStage =
  | "pending"
  | "review"
  | "personal_interview"
  | "technical_interview"
  | "offer_presented";

export interface Record {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  position: string;
  linkedin_url: string | null;
  cv_url: string | null;
  status: RecordStatus;
  stage: RecordStage;
  experience_years: number;
  notes_count?: number;
  applied_at: string;
  updated_at: string;
}

export interface RecordsListResponse {
  total: number;
  page: number;
  limit: number;
  data: Record[];
}

export interface RecordCreatePayload {
  full_name: string;
  email: string;
  phone: string;
  position: string;
  linkedin_url?: string | null;
  cv_url?: string | null;
  experience_years: number;
}

export interface RecordPatchPayload {
  status?: RecordStatus;
  stage?: RecordStage;
}

export type RecordFormValues = RecordCreatePayload;
