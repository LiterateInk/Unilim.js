import { OnlineTimetable, TimetableYear } from "unilim/iut/cs/timetable";

const last = await OnlineTimetable.getLatestTimetableEntry(TimetableYear.A1);
const timetable = await last.getTimetable();

console.dir(timetable, { depth: Infinity });
