export type Profile = Readonly<{
  /**
   * base64 encoded image
   */
  avatar: string;
  bio: string;

  contact: {
    assignment: Array<{
      additionalDetails: string;
      address: string;
      city: string;
      department: string;
      zip: string;
    }>;
    fax: null | string;
    internalTel: null | string;

    mail: string;
    mobilePro: string;
    otherTel: string;
    tel: string;
    unilimXivoSync: boolean;
    /** Website URL */
    web: null | string;
  };

  firstname: string;

  /** can be empty string */
  gender: string;
  ine: string;
  interests: Array<{
    id: number;
  }>;

  lastname: string;

  matricule: null; // TODO

  mfa: boolean;

  options: {
    cguCam: boolean;
    cguNet: boolean;
    cguPc: boolean;
    imageRights: boolean;
    localMailCopy: boolean;
    mailingLists: {
      newsletterFondation: boolean;
      newsletterUniversity: boolean;
    };
    private: boolean;
    redirectEmail: string;
    teamlim: boolean;
    unilimValidationCGU: string;
    unlistedPhoneNumber: boolean;
  };
  personalInformations: {
    emergencyTel: null | string;
    iban: null | string;
    mail: string;
    postalAddress: {
      address: string;
      city: string;
      country: string;
      zip: string;
    };
    tel: string;
  };
  ppn: string;
  signature: null; // TODO
  socialNetwork: Array<{
    icon: unknown; // TODO
    refId: { id: number };
    url: string;
  }>;
  studentNumber: string;
  title: string;
  username: string;
  yearRegistration: number;
}>;
