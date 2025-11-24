import type { Exam } from "./Exam";

export interface Module {
  average: null | number;
  code: string;
  coefficient: number;
  exams: Array<Exam>;
  name: string;
}
