import { Candidate, Vote, Election } from "../packages/shared/types/index";
import { validateRequiredFields, validateConsistency } from "./utils/validations";
import { sumBy, avgBy, maxBy, reportCountsByCategory } from "./utils/transformations";
import { searchLinear, binarySearch } from "./utils/search";

// Demo data
const candidates: Candidate[] = [
  { id: "1", name: "Alice García", party: "Partido Verde", votes: 1500 },
  { id: "2", name: "Bob López", party: "Partido Azul", votes: 2100 },
  { id: "3", name: "Carol Martínez", party: "Partido Rojo", votes: 1200 },
];

const votes: Vote[] = [
  { id: "v1", candidateId: "1", voterRegion: "Madrid", timestamp: "2026-04-29T10:00:00Z" },
  { id: "v2", candidateId: "2", voterRegion: "Barcelona", timestamp: "2026-04-29T10:05:00Z" },
  { id: "v3", candidateId: "1", voterRegion: "Valencia", timestamp: "2026-04-29T10:10:00Z" },
];

const election: Election = {
  id: "e1",
  name: "Elecciones Generales 2026",
  startDate: "2026-04-29",
  endDate: "2026-04-30",
  isActive: true,
};

console.log("=== DEMO SISTEMA DE ELECCIONES ===\n");

// Validaciones
console.log("1. Validación de campos requeridos:");
const validationErrors = validateRequiredFields(election, ["id", "name", "startDate", "endDate"]);
console.log(validationErrors.length === 0 ? "✓ Elección válida" : "✗ Errores detectados", "\n");

// Consistencia
console.log("2. Validación de consistencia:");
console.log(validateConsistency(election) ? "✓ Fechas consistentes" : "✗ Fechas inconsistentes", "\n");

// Análisis de votos
console.log("3. Análisis de candidatos:");
console.log(`Total de votos: ${sumBy(candidates, c => c.votes)}`);
console.log(`Promedio de votos: ${avgBy(candidates, c => c.votes).toFixed(2)}`);
const topCandidate = maxBy(candidates, c => c.votes);
console.log(`Candidato con más votos: ${topCandidate?.name} (${topCandidate?.votes} votos)\n`);

// Reporte por partido
console.log("4. Reporte por partido:");
const byParty = reportCountsByCategory(candidates, c => c.party);
console.log(byParty, "\n");

// Búsqueda lineal
console.log("5. Búsqueda lineal:");
const idx = searchLinear(candidates, c => c.name === "Bob López");
console.log(`Índice de 'Bob López': ${idx >= 0 ? idx : "no encontrado"}\n`);

console.log("=== FIN DEMO ===");
