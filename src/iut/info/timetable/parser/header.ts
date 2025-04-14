import type { Page } from "@literate.ink/pdf-inspector";

import { type FillBounds, getFillBounds, getTextsInFillBounds } from "~iut/info/edt/parser/bounds";
import { COLORS } from "~iut/info/edt/parser/constants";
import { DATE_TIME_OPTIONS } from "~iut/info/edt/utils/date";
import { DateTime } from "luxon";

export interface TimetableHeader {
  bounds: FillBounds

  data: {
    end_date: DateTime;
    start_date: DateTime;

    week_number: number;
    week_number_in_year: number;
  },
}

// Format for the date in the header.
const DATE_TIME_HEADER_FORMAT = "dd/MM/yyyy";

export const getTimetableHeader = (page: Page): TimetableHeader => {
  const header_fill = page.Fills.find((fill) => fill.oc === COLORS.HEADER);
  if (!header_fill) throw new Error("Can't find header fill.");

  const header_fill_bounds = getFillBounds(header_fill);
  const header_texts = getTextsInFillBounds(page, header_fill_bounds);
  if (header_texts.length === 0) throw new Error("Can't find header texts.");

  // Under the format: "EMPLOI DU TEMPS - Semaine X (Y) : du dd/MM/yyyy au dd/MM/yyyy        -- Date et heure de création : dd/MM/yyyy -- HH:mm:ss --"
  const header_text = decodeURIComponent(header_texts[0].R[0].T);

  // We only care about the part "Semaine X (Y) : du dd/MM/yyyy au dd/MM/yyyy"
  const header_week_text = header_text.split("-")[1].trim();
  const header_text_matches = header_week_text.match(/Semaine (\d+) \((\d+)\) : du (\d{2}\/\d{2}\/\d{4}) au (\d{2}\/\d{2}\/\d{4})/);
  if (!header_text_matches) throw new Error("Can't parse header text.");

  // Parse the dates.
  const week_start_date = DateTime.fromFormat(header_text_matches[3], DATE_TIME_HEADER_FORMAT, DATE_TIME_OPTIONS);
  const week_end_date = DateTime.fromFormat(header_text_matches[4], DATE_TIME_HEADER_FORMAT, DATE_TIME_OPTIONS);

  return {
    bounds: header_fill_bounds,

    data: {
      end_date: week_end_date,
      start_date: week_start_date,

      week_number: parseInt(header_text_matches[1]),
      week_number_in_year: parseInt(header_text_matches[2])
    }
  };
};
