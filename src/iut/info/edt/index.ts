export { LESSON_TYPES, SUBGROUPS } from "./parser/constants";
export { getTimetableFromBuffer, type Timetable } from "./parser";
export type { TimetableLesson, TimetableLessonCM, TimetableLessonTD, TimetableLessonTP, TimetableLessonDS, TimetableLessonSAE, TimetableLessonOTHER } from "./parser/lessons";

export { YEARS } from "./downloader/constants";
export { TimetableEntry } from "./downloader/entry";
export { getTimetableEntries, getLatestTimetableEntry } from "./downloader";
