export interface Event {
  allDay: boolean;

  /** Same calendarID provided in request parameters. */
  calendarId: string;

  description: null | string;

  /**
   * @example
   * "2024-01-23" // if allDay is true
   * "2024-05-28T14:00:00.000+02:00" // if allDay is false
   */
  endDate: string;

  exDate: string;
  /**
   * In webmail or other.
   * @example "https://webmail.unilim.fr/cal/index.html#?date=20240527"
   */
  link: string;
  location: null | string;
  organizer: null | string;
  /**
   * Empty string if no recurrence.
   * @example "FREQ=WEEKLY;BYDAY=TU,FR"
   */
  rRule: string;
  /**
   * @example
   * "2024-01-23" // if allDay is true
   * "2024-05-28T14:00:00.000+02:00" // if allDay is false
   */
  startDate: string;

  title: string;

  url: null | string;
};
