import type { Page } from "@literate.ink/pdf-inspector";
import type { TimetableGroup } from "~iut/info/timetable/parser/groups";
import type { TimetableHeader } from "~iut/info/timetable/parser/header";
import type { DateTime, WeekdayNumbers } from "luxon";

import { getFillBounds, getTextsInFillBounds } from "~iut/info/timetable/parser/bounds";
import { COLORS, LESSON_TYPES, SUBGROUPS } from "~iut/info/timetable/parser/constants";
import { round } from "~iut/info/timetable/utils/numbers";
import { BUT_INFO_REF } from "~iut/info/timetable/utils/references";

export type TimetableLesson = {
  end_date: DateTime;
  start_date: DateTime;
} & (
  | TimetableLessonCM
  | TimetableLessonDS
  | TimetableLessonOTHER
  | TimetableLessonSAE
  | TimetableLessonTD
  | TimetableLessonTP
);

export interface TimetableLessonCM {
  content: {
    lesson_from_reference?: string;
    raw_lesson: string;
    room: string;
    teacher: string;
    type: string;
  }

  type: LESSON_TYPES.CM;
}

export interface TimetableLessonDS {
  content: {
    lesson_from_reference?: string
    room: string;
    teacher: string;
    type: string;
  }

  group: {
    main: number;
  }

  type: LESSON_TYPES.DS;
}

export interface TimetableLessonOTHER {
  content: {
    description: string;
    room: string;
    teacher: string;
  }

  type: LESSON_TYPES.OTHER;
}

export interface TimetableLessonSAE {
  content: {
    lesson_from_reference?: string;
    raw_lesson?: string;
    room: string;
    teacher: string;
    type: string;
  }

  /** When `undefined`, it means that it's for every groups. */
  group: {
    main: number;
    /** When `undefined`, it means that it's for the whole group. */
    sub?: SUBGROUPS;
  } | undefined

  type: LESSON_TYPES.SAE;
}

export interface TimetableLessonTD {
  content: {
    lesson_from_reference?: string
    room: string;
    teacher: string;
    type: string;
  }

  group: {
    main: number;
  }

  type: LESSON_TYPES.TD;
}

export interface TimetableLessonTP {
  content: {
    lesson_from_reference?: string
    room: string;
    teacher: string;
    type: string;
  }

  group: {
    main: number;
    sub: SUBGROUPS;
  }

  type: LESSON_TYPES.TP;
}

export const getTimetableLessons = (page: Page, header: TimetableHeader, timings: Record<string, string>, groups: Record<string, TimetableGroup>): TimetableLesson[] => {
  const lessons: TimetableLesson[] = [];

  for (const fill of page.Fills) {
    // We only care about the fills that have a color.
    if (!fill.oc) continue;

    const color = fill.oc.toLowerCase();
    // We only care about the colors that are in our COLORS object.
    if (![COLORS.CM, COLORS.DS, COLORS.SAE, COLORS.TD, COLORS.TP].includes(color)) continue;

    const bounds = getFillBounds(fill);
    const contained_texts = getTextsInFillBounds(page, bounds, 4, color === COLORS.CM ? 6 : 4);

    const texts = contained_texts.map((text) => decodeURIComponent(text.R[0].T));

    const group = groups[round(bounds.start_y, 4)];
    if (!group) continue;

    const start_time = timings[bounds.start_x];
    if (!start_time) continue;
    const [start_hour, start_minutes] = start_time.split(":").map((n) => parseInt(n));
    const start_date = header.data.start_date.set({ hour: start_hour, minute: start_minutes, weekday: (group.day_index + 1) as WeekdayNumbers });

    const end_time = timings[bounds.end_x];
    if (!end_time) continue;
    const [end_hour, end_minutes] = end_time.split(":").map((n) => parseInt(n));
    const end_date = header.data.start_date.set({ hour: end_hour, minute: end_minutes, weekday: (group.day_index + 1) as WeekdayNumbers });

    switch (color) {
      case COLORS.CM: {
        let [type, ...text_from_after_separator] = texts.shift()!.split(" -");
        // Remove duplicate types.
        type = [...new Set(type.split(" "))].join(" ");

        const room = texts.pop();

        let teacher = texts.pop();
        // It can happen that for some reason, the room is duplicated.
        if (teacher === room) {
          teacher = texts.pop();
        }

        if (!type || !teacher || !room) continue;

        const lesson_name = [...text_from_after_separator, ...texts].map((text) => text.trim()).filter(Boolean).join(" ");
        const lesson: TimetableLesson = {
          content: { lesson_from_reference: BUT_INFO_REF[type as keyof typeof BUT_INFO_REF], raw_lesson: lesson_name, room, teacher, type },
          end_date, start_date,
          type: LESSON_TYPES.CM
        };

        lessons.push(lesson);
        break;
      }

      case COLORS.DS: {
        const [type, teacher, room] = texts[0].split("-").map((text) => text.trim());

        const lesson: TimetableLesson = {
          content: { lesson_from_reference: BUT_INFO_REF[type as keyof typeof BUT_INFO_REF], room, teacher, type },
          end_date, group: {
            main: group.main
          },

          start_date,

          type: LESSON_TYPES.DS
        };

        lessons.push(lesson);
        break;
      }

      case COLORS.SAE: {
        let lesson: TimetableLesson;

        /**
         * Numbers of groups that are inside the lesson bounds.
         */
        const groupsInsideBounds = Object.keys(groups).filter((rounded_start_y) => {
          const rounded_start_y_number = parseFloat(rounded_start_y);
          // Added a 2pt gap to make sure that the group checked
          // is really inside the bounds.
          return rounded_start_y_number > (bounds.start_y + 2) && rounded_start_y_number < (bounds.end_y - 2);
        }).length;


        // It's an SAE for a single group,
        // but in some cases can also be an SAE for a subgroup.
        if (texts.length === 1) {
          const [type, teacher, room] = texts[0].split(" - ");
          const lesson_from_reference = BUT_INFO_REF[type as keyof typeof BUT_INFO_REF];

          lesson = {
            content: {
              lesson_from_reference,
              room,
              teacher,
              type
            },
            end_date, group: {
              main: group.main,
              // When there's no group inside the bounds,
              // then it's for sure for a single subgroup.
              // Otherwise, it's for the full main group.
              sub: groupsInsideBounds === 0 ? group.sub : undefined
            },

            start_date,

            type: LESSON_TYPES.SAE
          };
        }
        else {
          const room = texts.pop()?.trim();;

          let teacher = texts.pop()?.trim();
          // It can happen that for some reason, the room is duplicated.
          if (teacher === room) {
            teacher = texts.pop()?.trim();
          }

          let description = texts.map((text) => text.trim()).join(" ");
          if (!teacher || !room || !description) continue;

          const first_word = description.split(" ")[0];
          const lesson_from_reference = BUT_INFO_REF[first_word as keyof typeof BUT_INFO_REF] as string | undefined;

          // When the lesson is in the reference, then we're sure it's an SAE.
          if (lesson_from_reference) {
            description = description.split(" - ").slice(1).join(" ");

            lesson = {
              content: {
                lesson_from_reference,
                raw_lesson: description,
                room,
                teacher,
                type: first_word
              },
              end_date, // Only full year lessons have more than one text in the bounds.
              group: undefined,

              start_date,

              type: LESSON_TYPES.SAE
            };
          }
          // If it's not in the reference, then we can't really know what it is.
          else {
            lesson = {
              content: { description, room, teacher },
              end_date, start_date,

              type: LESSON_TYPES.OTHER
            };
          }
        }

        lessons.push(lesson);
        break;
      }

      case COLORS.TD: {
        const [type, teacher, room] = texts[0].split("-").map((text) => text.trim());

        const lesson: TimetableLesson = {
          content: { lesson_from_reference: BUT_INFO_REF[type as keyof typeof BUT_INFO_REF], room, teacher, type },
          end_date, group: {
            main: group.main
          },

          start_date,

          type: LESSON_TYPES.TD
        };

        lessons.push(lesson);
        break;
      }

      case COLORS.TP: {
        const [type, teacher, room] = texts[0].split(" - ");

        const lesson: TimetableLesson = {
          content: { lesson_from_reference: BUT_INFO_REF[type as keyof typeof BUT_INFO_REF], room, teacher, type },
          end_date, group: {
            main: group.main,
            sub: group.sub
          },

          start_date,

          type: LESSON_TYPES.TP
        };

        lessons.push(lesson);
        break;
      }
    }
  }

  return lessons;
};
