import type { RecordStage, RecordStatus } from "@/types/record";
import { getStageLabel, getStatusLabel } from "@/lib/labels";

const statusStyles: Record<RecordStatus, string> = {
  received: "bg-slate-100 text-slate-800",
  in_progress: "bg-amber-100 text-amber-900",
  selected: "bg-emerald-100 text-emerald-900",
  discarded: "bg-red-100 text-red-900",
};

const stageStyles: Record<RecordStage, string> = {
  pending: "bg-slate-100 text-slate-700",
  review: "bg-blue-100 text-blue-900",
  personal_interview: "bg-violet-100 text-violet-900",
  technical_interview: "bg-indigo-100 text-indigo-900",
  offer_presented: "bg-emerald-100 text-emerald-800",
};

export function StatusBadge({ status }: { status: RecordStatus }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[status]}`}
    >
      {getStatusLabel(status)}
    </span>
  );
}

export function StageBadge({ stage }: { stage: RecordStage }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${stageStyles[stage]}`}
    >
      {getStageLabel(stage)}
    </span>
  );
}
