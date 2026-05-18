import type { RecordFormValues } from "@/types/record";

export type FieldErrors = Partial<Record<keyof RecordFormValues, string>>;

export function validateRecordForm(values: RecordFormValues): FieldErrors {
  const errors: FieldErrors = {};

  if (!values.full_name?.trim()) {
    errors.full_name = "El nombre completo es obligatorio.";
  }
  if (!values.email?.trim()) {
    errors.email = "El correo es obligatorio.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Introduce un correo válido.";
  }
  if (!values.phone?.trim()) {
    errors.phone = "El teléfono es obligatorio.";
  }
  if (!values.position?.trim()) {
    errors.position = "El puesto es obligatorio.";
  }
  if (
    values.experience_years === undefined ||
    values.experience_years === null ||
    Number.isNaN(Number(values.experience_years))
  ) {
    errors.experience_years = "Los años de experiencia son obligatorios.";
  } else if (Number(values.experience_years) < 0) {
    errors.experience_years = "Debe ser un número mayor o igual a 0.";
  }

  return errors;
}

export function hasErrors(errors: FieldErrors): boolean {
  return Object.keys(errors).length > 0;
}
