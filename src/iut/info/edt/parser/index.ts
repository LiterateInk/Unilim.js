import { type Page, parsePDF } from "@literate.ink/pdf-inspector";

import { type TimetableHeader, getTimetableHeader } from "~iut/info/edt/parser/header";
import { getTimetableLessons, TimetableLesson } from "~iut/info/edt/parser/lessons";
import { getTimetableTimings } from "~iut/info/edt/parser/timings";
import { getTimetableGroups } from "~iut/info/edt/parser/groups";

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
