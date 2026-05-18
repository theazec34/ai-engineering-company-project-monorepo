export interface Note {
  id: string;
  record_id: string;
  content: string;
  created_at: string;
}

export interface NotesListResponse {
  data: Note[];
  meta: { total: number };
}

export interface NoteCreatePayload {
  content: string;
}
