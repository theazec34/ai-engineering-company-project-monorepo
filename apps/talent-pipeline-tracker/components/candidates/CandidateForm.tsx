"use client";

import { useState } from "react";
import type { Record, RecordFormValues } from "@/types/record";
import { AsyncFeedback, type AsyncState } from "@/components/ui/AsyncFeedback";
import { hasErrors, validateRecordForm, type FieldErrors } from "@/lib/validation";

const emptyValues: RecordFormValues = {
  full_name: "",
  email: "",
  phone: "",
  position: "Asistente de Dirección",
  linkedin_url: "",
  cv_url: "",
  experience_years: 0,
};

function recordToFormValues(record: Record): RecordFormValues {
  return {
    full_name: record.full_name,
    email: record.email,
    phone: record.phone,
    position: record.position,
    linkedin_url: record.linkedin_url ?? "",
    cv_url: record.cv_url ?? "",
    experience_years: record.experience_years,
  };
}

interface CandidateFormProps {
  mode: "create" | "edit";
  initialRecord?: Record;
  onSubmit: (values: RecordFormValues) => Promise<void>;
  onCancel?: () => void;
}

export function CandidateForm({
  mode,
  initialRecord,
  onSubmit,
  onCancel,
}: CandidateFormProps) {
  const [values, setValues] = useState<RecordFormValues>(
    initialRecord ? recordToFormValues(initialRecord) : emptyValues,
  );
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [asyncState, setAsyncState] = useState<AsyncState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    field: keyof RecordFormValues,
    value: string | number,
  ) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateRecordForm(values);
    if (hasErrors(errors)) {
      setFieldErrors(errors);
      return;
    }

    setAsyncState("loading");
    setErrorMessage("");
    try {
      await onSubmit({
        ...values,
        full_name: values.full_name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        position: values.position.trim(),
        linkedin_url: values.linkedin_url?.trim() || null,
        cv_url: values.cv_url?.trim() || null,
        experience_years: Number(values.experience_years),
      });
      setAsyncState("success");
      if (mode === "create") {
        setValues(emptyValues);
      }
    } catch (err) {
      setAsyncState("error");
      setErrorMessage(
        err instanceof Error ? err.message : "No se pudo guardar la candidatura.",
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <AsyncFeedback
        state={asyncState}
        loadingMessage="Guardando candidatura…"
        successMessage={
          mode === "create"
            ? "Candidatura registrada correctamente."
            : "Datos actualizados correctamente."
        }
        errorMessage={errorMessage}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Nombre completo"
          id="full_name"
          required
          value={values.full_name}
          error={fieldErrors.full_name}
          onChange={(v) => handleChange("full_name", v)}
        />
        <Field
          label="Correo electrónico"
          id="email"
          type="email"
          required
          value={values.email}
          error={fieldErrors.email}
          onChange={(v) => handleChange("email", v)}
        />
        <Field
          label="Teléfono"
          id="phone"
          required
          value={values.phone}
          error={fieldErrors.phone}
          onChange={(v) => handleChange("phone", v)}
        />
        <Field
          label="Puesto"
          id="position"
          required
          value={values.position}
          error={fieldErrors.position}
          onChange={(v) => handleChange("position", v)}
        />
        <Field
          label="LinkedIn (opcional)"
          id="linkedin_url"
          value={values.linkedin_url ?? ""}
          onChange={(v) => handleChange("linkedin_url", v)}
        />
        <Field
          label="Enlace al CV (opcional)"
          id="cv_url"
          value={values.cv_url ?? ""}
          onChange={(v) => handleChange("cv_url", v)}
        />
        <Field
          label="Años de experiencia"
          id="experience_years"
          type="number"
          required
          min={0}
          value={String(values.experience_years)}
          error={fieldErrors.experience_years}
          onChange={(v) => handleChange("experience_years", Number(v))}
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={asyncState === "loading"}
          className="rounded-lg bg-[var(--brasa)] px-5 py-2.5 text-sm font-medium text-white hover:bg-[var(--brasa-dark)] disabled:opacity-60"
        >
          {mode === "create" ? "Registrar candidatura" : "Guardar cambios"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-stone-300 px-5 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  id,
  value,
  onChange,
  error,
  required,
  type = "text",
  min,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  type?: string;
  min?: number;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-[var(--carbon)]">
        {label}
        {required && <span className="text-[var(--brasa)]"> *</span>}
      </label>
      <input
        id={id}
        type={type}
        min={min}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brasa)]/20 ${
          error ? "border-red-400 focus:border-red-500" : "border-stone-300 focus:border-[var(--brasa)]"
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
