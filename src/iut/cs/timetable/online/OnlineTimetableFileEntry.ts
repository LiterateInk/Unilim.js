import type { TimetableYear } from "../models/TimetableYear";
import { DateTime } from "luxon";
import { DATE_TIME_OPTIONS } from "../utils/date";
import { OnlineTimetable } from "./OnlineTimetable";

export class OnlineTimetableFileEntry {
  /**
   * Full name of the file, including the `.pdf` extension.
   */
  public fileName: string;

  /**
   * Year of study for this timetable.
   */
  public fromYear: TimetableYear;

  /**
   * Date displayed on the directory listing,
   * should equals to the last time an update was made to the PDF file.
   */
  public lastUpdated: DateTime;

  /**
   * Direct link to access the timetable.
   */
  public url: URL;

  /**
   * Week since the beginning of the school year, starts at `1` and
   * in September, obviously.
   */
  public weekNumber: number;

  /**
   * Initialize a new timetable entry.
   *
   * @param fileName - Matched `fileName` from the directory listing
   * @param date - Matched `date` from the directory listing
   * @param fromYear - Year of study requested for the listing
   */
  public constructor(fileName: string, date: string, fromYear: TimetableYear) {
    this.fileName = fileName;
    this.lastUpdated = DateTime.fromFormat(date, "yyyy-MM-dd HH:mm", DATE_TIME_OPTIONS);
    this.weekNumber = parseInt(fileName.replace(/(A(.*)_S)|(.pdf)/g, ""));
    this.fromYear = fromYear;
    this.url = new URL(`${OnlineTimetable.HOST}/${fromYear}/${fileName}`);
  }
}
