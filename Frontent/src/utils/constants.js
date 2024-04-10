export const AuthType = {
  QR: "QR",
  FACE: "FACE",
};

export const UserRoles = {
  PATIENT: "Patient",
  ADMIN: "Admin",
  DOCTOR: "Doctor",
  LAB: "Lab",
  DISPATCHER: "MedicalDispatcher",
  COLLECTOR: "SampleCollectionExpert",
};

export const UserStatus = {
  PENDING: "Pending",
  ACTIVE: "Active",
  SUSPENDED: "Suspended",
  DELETED: "Deleted",
};

export const TestStatus = {
  PENDING: "Pending",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

export const TestType = {
  COVID: "Covid-19",
  MALARIA: "Malaria",
  HIV: "HIV",
  TYPHOID: "Typhoid",
  URINE: "Urine",
  BLOOD: "Blood",
};

export const TestResult = {
  POSITIVE: "Positive",
  NEGATIVE: "Negative",
  INCONCLUSIVE: "Inconclusive",
};

export const TestResultColor = {
  POSITIVE: "red",
  NEGATIVE: "green",
  INCONCLUSIVE: "yellow",
};
