export type Event = Readonly<{
  /** Same calendarID provided in request parameters. */
  calendarId: string

  title: string

  /**
   * @example
   * "2024-01-23" // if allDay is true
   * "2024-05-28T14:00:00.000+02:00" // if allDay is false
   */
  startDate: string

  /**
   * @example
   * "2024-01-23" // if allDay is true
   * "2024-05-28T14:00:00.000+02:00" // if allDay is false
   */
  endDate: string

  allDay: boolean
  location: string | null
  exDate: string
  description: string | null
  organizer: string | null
  url: string | null

  /**
   * Empty string if no recurrence.
   * @example "FREQ=WEEKLY;BYDAY=TU,FR"
   */
  rRule: string

  /**
   * In webmail or other.
   * @example "https://webmail.unilim.fr/cal/index.html#?date=20240527"
   */
  link: string
}>;
