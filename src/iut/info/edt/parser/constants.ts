/**
 * Colors we'll use to extract data from the PDF.
 * Since they're constant, we can easily use them to extract the data we want.
 */
export const COLORS = {
  CM: "#ffff0c",
  DS: "#f23ea7",
  HEADER: "#64ccff",
  RULERS: "#ffffa7",
  SAE: "#9fff9f",

  TD: "#ffbab3",
  TP: "#b3ffff"
};

/**
 * Days are hardcoded in the PDF.
 * Since we can't really find the day index from the PDF,
 * we just hardcode it in this enumeration.
 *
 * Should be used with a **+1** offset in `luxon.DateTime` since 0 means Sunday for them.
 */
export const DAYS = {
  JEUDI: 3,
  LUNDI: 0,
  MARDI: 1,
  MERCREDI: 2,
  SAMEDI: 5,
  VENDREDI: 4
};

export enum LESSON_TYPES {
  CM = "CM",
  DS = "DS",
  OTHER = "OTHER",
  SAE = "SAE",
  TD = "TD",
  TP = "TP"
}

/**
 * To differentiate between the two subgroups.
 */
export enum SUBGROUPS {
  A = 0,
  B = 1
}
