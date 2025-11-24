import type { TeachingUnit } from "./TeachingUnit";

export interface Semester {
  name: string;
  units: Array<TeachingUnit>;
}
