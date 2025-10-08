import type { TimetableYear } from "../models/TimetableYear";
import { OnlineTimetableFileEntry } from "./OnlineTimetableFileEntry";

export class OnlineTimetable {
  public static readonly HOST = "https://edt-iut-info.unilim.fr/edt";

  public static async getLatestTimetableEntry(from: TimetableYear): Promise<OnlineTimetableFileEntry> {
    const entries = await OnlineTimetable.getTimetableEntries(from);

    // Since the entries are sorted by week number, the last one is the latest.
    return entries[entries.length - 1];
  }

  public static async getTimetableEntries(from: TimetableYear): Promise<OnlineTimetableFileEntry[]> {
    const response = await fetch(`${OnlineTimetable.HOST}/${from}`);
    const html = await response.text();

    const regex = /<td><a href="(.*)">(.*)<\/a><\/td><td align="right">(.*)\s<\/td>/g;
    const matches = html.matchAll(regex);

    const entries: OnlineTimetableFileEntry[] = [];
    for (const match of matches) {
      const entry = new OnlineTimetableFileEntry(match[1], match[3].trim(), from);
      entries.push(entry);
    }

    entries.sort((a, b) => a.weekNumber - b.weekNumber);
    return entries;
  }
}
