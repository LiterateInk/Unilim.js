import type { Module } from "./Module";

export interface TeachingUnit {
  average: null | number;
  code: string;
  coefficient: number;
  modules: Array<Module>;
  name: string;
}
