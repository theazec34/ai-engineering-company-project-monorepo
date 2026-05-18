import type { Note, NoteCreatePayload, NotesListResponse } from "@/types/note";
import type {
  Record,
  RecordCreatePayload,
  RecordPatchPayload,
  RecordsListResponse,
} from "@/types/record";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "https://playground.4geeks.com/tracker/api/v1";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function parseErrorMessage(res: Response): Promise<string> {
  try {
    const body = await res.json();
    if (Array.isArray(body.detail)) {
      return body.detail.map((d: { msg?: string }) => d.msg).filter(Boolean).join(". ") || `Error ${res.status}`;
    }
    if (typeof body.detail === "string") return body.detail;
    if (body.message) return body.message;
  } catch {
    /* ignore */
  }
  return `Error ${res.status}: ${res.statusText}`;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (!res.ok) {
    throw new ApiError(res.status, await parseErrorMessage(res));
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json() as Promise<T>;
}

export interface RecordsQuery {
  status?: string;
  stage?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export function getRecords(params: RecordsQuery = {}): Promise<RecordsListResponse> {
  const query = new URLSearchParams();
  if (params.status) query.set("status", params.status);
  if (params.stage) query.set("stage", params.stage);
  if (params.search) query.set("search", params.search);
  query.set("page", String(params.page ?? 1));
  query.set("limit", String(params.limit ?? 100));

  const qs = query.toString();
  return request<RecordsListResponse>(`/records?${qs}`);
}

export function getRecord(id: string): Promise<Record> {
  return request<Record>(`/records/${id}`);
}

export function createRecord(payload: RecordCreatePayload): Promise<Record> {
  return request<Record>("/records", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateRecord(
  id: string,
  payload: RecordCreatePayload,
): Promise<Record> {
  return request<Record>(`/records/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function patchRecord(
  id: string,
  payload: RecordPatchPayload,
): Promise<Record> {
  return request<Record>(`/records/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export function getNotes(recordId: string): Promise<NotesListResponse> {
  return request<NotesListResponse>(`/records/${recordId}/notes`);
}

export function createNote(
  recordId: string,
  payload: NoteCreatePayload,
): Promise<Note> {
  return request<Note>(`/records/${recordId}/notes`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function deleteNote(recordId: string, noteId: string): Promise<void> {
  return request<void>(`/records/${recordId}/notes/${noteId}`, {
    method: "DELETE",
  });
}
