import type { RecordStage, RecordStatus } from "@/types/record";

export const STATUS_LABELS: Record<RecordStatus, string> = {
  received: "Recibida",
  in_progress: "En proceso",
  selected: "Seleccionada",
  discarded: "Descartada",
};

export const STAGE_LABELS: Record<RecordStage, string> = {
  pending: "Pendiente de revisión",
  review: "En revisión",
  personal_interview: "Entrevista personal",
  technical_interview: "Entrevista técnica",
  offer_presented: "Oferta presentada",
};

export const ALL_STATUSES = Object.keys(STATUS_LABELS) as RecordStatus[];
export const ALL_STAGES = Object.keys(STAGE_LABELS) as RecordStage[];

export function getStatusLabel(status: RecordStatus): string {
  return STATUS_LABELS[status] ?? status;
}

export function getStageLabel(stage: RecordStage): string {
  return STAGE_LABELS[stage] ?? stage;
}
