import type { Semester } from "./Semester";

export interface ReportCard {
  fullName: string;
  promotion: string;
  semesters: Array<Semester>;
}
