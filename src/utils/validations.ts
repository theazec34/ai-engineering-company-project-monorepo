import { ErrorDetail } from "../types/models";

export function validateRequiredFields<T>(
  obj: T,
  requiredFields: Array<keyof T>
): ErrorDetail[] {
  const errors: ErrorDetail[] = [];

  for (const field of requiredFields) {
    const value = obj[field];
    if (value === null || value === undefined || value === "") {
      errors.push({
        field: String(field),
        message: `El campo ${String(field)} es obligatorio`,
      });
    }
  }
  return errors;
}

export function validateConsistency(obj: any): boolean {
  // Validación de fechas si existen
  if (obj.startDate && obj.endDate) {
    if (new Date(obj.startDate) > new Date(obj.endDate)) return false;
  }
  
  // Validaciones numéricas (votos, stock, etc.) no negativos
  const numericFieldsToCheck = ['votes', 'stock', 'price'];
  for (const field of numericFieldsToCheck) {
    if (field in obj && obj[field] < 0) return false;
  }

  return true;
}
