import type { TimetableLesson } from "./lessons";
import { type Page, parsePDF } from "@literate.ink/pdf-inspector";
import { getTimetableGroups } from "./groups";
import { getTimetableHeader, type TimetableHeader } from "./header";
import { getTimetableLessons } from "./lessons";
import { getTimetableTimings } from "./timings";

export interface Timetable {
  header: TimetableHeader["data"];
  lessons: TimetableLesson[];
}

export const getTimetable = (page: Page): Timetable => {
  const header = getTimetableHeader(page);
  const timings = getTimetableTimings(page, header.bounds);
  const groups = getTimetableGroups(page, header.bounds);
  const lessons = getTimetableLessons(page, header, timings, groups);

  return {
    header: header.data,
    lessons
  };
};

export const getTimetableFromBuffer = async (buffer: ArrayBuffer | ArrayBufferLike | Buffer): Promise<Timetable> => {
  const pages = await parsePDF(buffer);
  return getTimetable(pages[0]);
};
