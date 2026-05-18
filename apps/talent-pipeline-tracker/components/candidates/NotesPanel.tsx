"use client";

import { useCallback, useEffect, useState } from "react";
import { createNote, deleteNote, getNotes } from "@/lib/api";
import type { Note } from "@/types/note";
import { AsyncFeedback, type AsyncState } from "@/components/ui/AsyncFeedback";

interface NotesPanelProps {
  recordId: string;
}

export function NotesPanel({ recordId }: NotesPanelProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [content, setContent] = useState("");
  const [listState, setListState] = useState<AsyncState>("loading");
  const [submitState, setSubmitState] = useState<AsyncState>("idle");
  const [deleteState, setDeleteState] = useState<AsyncState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const loadNotes = useCallback(async () => {
    setListState("loading");
    setErrorMessage("");
    try {
      const response = await getNotes(recordId);
      setNotes(response.data);
      setListState("success");
    } catch (err) {
      setListState("error");
      setErrorMessage(
        err instanceof Error ? err.message : "No se pudieron cargar las notas.",
      );
    }
  }, [recordId]);

  useEffect(() => {
    void loadNotes();
  }, [loadNotes]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setSubmitState("loading");
    try {
      await createNote(recordId, { content: content.trim() });
      setContent("");
      setSubmitState("success");
      await loadNotes();
    } catch (err) {
      setSubmitState("error");
      setErrorMessage(
        err instanceof Error ? err.message : "No se pudo añadir la nota.",
      );
    }
  };

  const handleDelete = async (noteId: string) => {
    setDeleteState("loading");
    try {
      await deleteNote(recordId, noteId);
      setDeleteState("success");
      await loadNotes();
    } catch (err) {
      setDeleteState("error");
      setErrorMessage(
        err instanceof Error ? err.message : "No se pudo eliminar la nota.",
      );
    }
  };

  return (
    <section className="rounded-xl border border-[var(--brasa)]/15 bg-white p-4 shadow-sm">
      <h2 className="mb-1 text-lg font-semibold text-[var(--carbon)]">
        Notas internas
      </h2>
      <p className="mb-4 text-sm text-stone-600">
        Solo visibles en este detalle. Registra llamadas y entrevistas.
      </p>

      {listState === "loading" && (
        <AsyncFeedback state="loading" loadingMessage="Cargando notas…" />
      )}
      {listState === "error" && (
        <AsyncFeedback state="error" errorMessage={errorMessage} />
      )}

      {listState === "success" && notes.length === 0 && (
        <p className="mb-4 text-sm text-stone-500">Aún no hay notas para este candidato.</p>
      )}

      {notes.length > 0 && (
        <ul className="mb-4 space-y-3">
          {notes.map((note) => (
            <li
              key={note.id}
              className="rounded-lg border border-stone-200 bg-[var(--crema)]/50 px-4 py-3"
            >
              <p className="text-sm text-[var(--carbon)]">{note.content}</p>
              <div className="mt-2 flex items-center justify-between gap-2">
                <time className="text-xs text-stone-500" dateTime={note.created_at}>
                  {new Date(note.created_at).toLocaleString("es-ES")}
                </time>
                <button
                  type="button"
                  onClick={() => void handleDelete(note.id)}
                  disabled={deleteState === "loading"}
                  className="text-xs font-medium text-red-600 hover:underline disabled:opacity-50"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={(e) => void handleAdd(e)} className="space-y-3">
        <AsyncFeedback
          state={submitState}
          loadingMessage="Añadiendo nota…"
          successMessage="Nota añadida."
          errorMessage={submitState === "error" ? errorMessage : undefined}
        />
        <label htmlFor="note-content" className="block text-sm font-medium">
          Nueva nota
        </label>
        <textarea
          id="note-content"
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Ej. Buena entrevista telefónica, confirmar disponibilidad…"
          className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-[var(--brasa)] focus:outline-none focus:ring-2 focus:ring-[var(--brasa)]/20"
        />
        <button
          type="submit"
          disabled={!content.trim() || submitState === "loading"}
          className="rounded-lg bg-[var(--carbon)] px-4 py-2 text-sm font-medium text-[var(--crema)] hover:bg-[var(--humo)] disabled:opacity-50"
        >
          Añadir nota
        </button>
      </form>
    </section>
  );
}
