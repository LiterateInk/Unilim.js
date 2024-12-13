export type Profile = Readonly<{
  username: string
  studentNumber: string

  /**
   * base64 encoded image
   */
  avatar: string

  /** can be empty string */
  gender: string

  lastname: string
  firstname: string
  bio: string

  socialNetwork: Array<{
    url: string
    refId: { id: number }
    icon: unknown // TODO
  }>

  title: string

  interests: Array<{
    id: number
  }>

  contact: {
    mail: string
    tel: string
    /** Website URL */
    web: string | null

    assignment: Array<{
      department: string
      additionalDetails: string
      address: string
      zip: string
      city: string
    }>
    otherTel: string
    mobilePro: string
    internalTel: string | null
    fax: string | null
    unilimXivoSync: boolean
  }
  personalInformations: {
    mail: string
    iban: string | null
    postalAddress: {
      address: string
      zip: string
      city: string
      country: string
    }
    tel: string
    emergencyTel: string | null
  }
  options: {
    teamlim: boolean
    imageRights: boolean
    mailingLists: {
      newsletterUniversity: boolean
      newsletterFondation: boolean
    }
    private: boolean
    unilimValidationCGU: string
    cguPc: boolean
    cguCam: boolean
    cguNet: boolean
    unlistedPhoneNumber: boolean
    redirectEmail: string
    localMailCopy: boolean
  }
  ppn: string
  ine: string
  matricule: null // TODO
  yearRegistration: number
  signature: null // TODO
  mfa: boolean
}>;
