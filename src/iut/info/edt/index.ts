export { getLatestTimetableEntry, getTimetableEntries } from "./downloader";
export { YEARS } from "./downloader/constants";
export { TimetableEntry } from "./downloader/entry";

export { getTimetableFromBuffer, type Timetable } from "./parser";
export { LESSON_TYPES, SUBGROUPS } from "./parser/constants";
export type { TimetableLesson, TimetableLessonCM, TimetableLessonDS, TimetableLessonOTHER, TimetableLessonSAE, TimetableLessonTD, TimetableLessonTP } from "./parser/lessons";
