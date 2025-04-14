import { type Page, parsePDF } from "@literate.ink/pdf-inspector";
import { getTimetableGroups } from "~iut/info/timetable/parser/groups";
import { getTimetableHeader, type TimetableHeader } from "~iut/info/timetable/parser/header";
import { getTimetableLessons, TimetableLesson } from "~iut/info/timetable/parser/lessons";
import { getTimetableTimings } from "~iut/info/timetable/parser/timings";

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
