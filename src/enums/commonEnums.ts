// Enums for Table Type
export enum eReturnCodes {
  R_SUCCESS = 0,
  R_DB_ERROR = 1,
  R_NOT_FOUND = 2,
  R_AUTHENTICATION_FAILED = 3,
  R_DUPLICATE_DATA = 4,
  R_UNAUTHORIZED = 5,
  R_CREATED = 6,
}

export enum eDurationType {
  R_DAYS = 1,
  R_HOURS = 2,
  R_MINUTES = 3,
  R_SECONDS = 4,
  R_ALL = 5,
}

export enum eUNIQUE_MODULE_ID {
  AUTH_HUB = 1,
  GATE_MANAGEMENT = 2,
  SUPPLIER_MANAGEMENT = 3,
  IT_TICKET_MANAGEMENT = 4,
}

export enum eTicketType {
  SERVICE_REQUEST = 1,
  SUB_SERVICE_REQUEST = 2,
}

export enum eTicketStatus {
  NEW = 1,
  APPROVAL_PENDING = 2,
  ASSIGNED = 3,
  RE_ASSIGNED = 4,
  IN_PROGRESS = 5,
  ON_HOLD = 6,
  RESOLVED = 7,
  CLOSED = 8,
  APPROVED = 9,
  REJECTED = 10,
  REOPEN = 11,
}

export const TicketStatusLabels: Record<eTicketStatus, string> = {
  [eTicketStatus.NEW]: "New",
  [eTicketStatus.APPROVAL_PENDING]: "Approval Pending",
  [eTicketStatus.ASSIGNED]: "Assigned",
  [eTicketStatus.RE_ASSIGNED]: "Re-assigned",
  [eTicketStatus.IN_PROGRESS]: "In Progress",
  [eTicketStatus.ON_HOLD]: "On Hold",
  [eTicketStatus.RESOLVED]: "Resolved",
  [eTicketStatus.CLOSED]: "Closed",
  [eTicketStatus.APPROVED]: "Approved",
  [eTicketStatus.REJECTED]: "Rejected",
  [eTicketStatus.REOPEN]: "Re-opened",
};

export enum UserRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN_ADMIN = "ADMIN_ADMIN",
  HR_ADMIN = "HR_ADMIN",
  IT_ADMIN = "IT_ADMIN",
  IT_AGENT = "IT_AGENT",
  HR_AGENT = "HR_AGENT",
  ADMIN_AGENT = "ADMIN_AGENT",
  EMPLOYEE = "EMPLOYEE",
}

export enum eDepartment {
  IT_ADMIN = 1,
  ADMIN_ADMIN = 2,
  HR_ADMIN = 3,
  EMPLOYEE = 4,
}

export enum AssetStatus {
  NEW = 1, // Recently added to inventory
  AVAILABLE = 2, // Ready to assign
  REQUESTED = 3, // User has requested the asset
  UNDER_APPROVAL = 4, // Request pending approval
  ASSIGNED = 5, // Assigned to a user/department
  IN_USE = 6, // Currently being used
  NOT_WORKING = 7, // Not functioning properly
  DAMAGED = 8, // Broken or damaged
  UNDER_REPAIR = 9, // Sent for repair/service
  UNDER_MAINTENANCE = 10, // Scheduled maintenance
  REPAIRED = 11, // Fixed and ready to use
  RETURNED = 12, // Returned by user
  LOST = 13, // Missing/lost
  RETIRED = 14, // Removed from active inventory
  SCRAPPED = 15, // Permanently discarded
}

export enum InvoiceType {
  NEWPROCUREMENT = 1,
  JOBWORK = 2,
  SERVICE = 3,
}

export enum ETicketType {
  IT = 1,
  ADMIN = 2,
  HR = 3,
}

export enum eTicketPriority{
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3,
  CRITICAL = 4,
}

export enum EXPORT_TYPE {
  DOMESTIC = 1,
  EXPORT = 2
}

export enum CONTINENT_TYPE {
  INDONESIA = 1,
  MIDDLE_EAST = 2,
  RUSSIA = 3,
  AFRICA = 4,
  AMERICA = 5,
  EUROPE = 6,
}

export enum PARAMETER_UNIQUE_CODE {
  TERMINATION_STYLE = 1,
  JUNCTION_STYLE = 2,
  THERMOCOUPLE_ELEMENT = 3,
  OUTER_SHEET_OD = 4,
  OUTER_SHEET_MATERIAL = 5,
  ADJ_COMPONENT = 6,
  NOMINAL_LENGTH_TCL = 7,
  TIP_LENGTH_TL = 8,
  TIP_DIAMETER_OD1 = 9,
  CABLE_WITH_COUNDUIT_LENGTH_MM = 10,
  WELD_PAD_MATERIAL = 11,
  WELD_PAD_PROCESS = 12,
  PROCESS_CONNECTION = 13,
  EXTENSION_LENGTH_EL_MM = 14,
  FITTING_TYPE = 15,
  CABLE_TYPE = 16,
  CABLE_LENGTH_MM = 17,
  SHEATH_DIAMETER_OD = 18,
  SPRING_LENGTH = 19,
  INSERTION_LENGTH_L2_MM = 20,
  STABILIZING_TUBE_MATERIAL_T_MM = 21,
  NOMINAL_LENGTH_BELOW_BLOCK_TCB = 22,
  NOMINAL_LENGTH_BELOW_L = 23,
  MOC = 24,
  INSULATION_MATERIAL = 25,


  THERMOWELL_OD_MM = 28,
  THERMOWELL_ID_MM = 29,
  PLANT_MATERIAL = 30,
  CABLE_LENGTH_METER = 31,
  INSERTION_LENGTH_T_MM = 32,
  TOTAL_LENGTH_TMM = 33,
  THERMOWELL_MATERIAL = 34,
  INSERTION_LENGTH_IL_MM = 35,
  NIPPLE = 36,
  TAPERED_LENGTH_L1_MM = 37,
  SHEATH_OD = 38,
  FITTING_NU_N_ID_MM = 39,
  PROTECTION_TUBE_LENGTH_L1_MM = 40,
  ELEMENT_DIAMETER = 41,
  INSULATING_TUBE_OD = 42,
  INSULATING_TUBE_MATERIAL = 43,
  OUTER_TUBE_OD_X_ID = 44,
  OUTER_TUBE_MATERIAL = 45,
  SEAL_POT_LENGTH_L1_MM = 46,
  HOLDING_TUBE = 47,
  HOLDING_TUBE_OD_MM = 48,
  HOLDING_TUBE_MATERIAL = 49,
  HOLDING_TUBE_LENGTH_L1_MM = 50,
  INSULATING_TUBE_OD_IN = 51,
  PT_THIMBLE_OD_MM = 52,
  MOUNTING_ARRANGEMENT = 53,
  WT_MM = 54,
  ELEMENT_LENGTH_FROM_TIP_BMT = 55,
  WALL_THICKNESS_MM = 56,
  SEALING_STOPPER_AT_TW_NECK = 57,
  COATING = 58,
  OUTER_TUBE_LENGTH_L2 = 59,
  INNER_TUBE_OD_X_ID = 60,
  INNER_TUBE_MATERIAL = 61,
  SENSOR_TIP_OD_X_ID = 62,
  ELEMENT_WIRE_DIAMETER = 63,
  HOT_END_ID_MM = 64,
  HOT_END_OD_MM = 65,
  THERMOWELL_MATERIAL_HOT_END = 66,
  COLD_END_ID_MM = 67,
  COLD_END_OD_MM = 68,
  THERMOWELL_MATERIAL_COLD_END = 69,
  LENGTH_L1_MM = 70,
  LENGTH_L2_MM = 71,
  LENGTH_L3_MM = 72,
  LENGTH_L4_MM = 73,
  LENGTH_L5_MM = 74,
  LENGTH_L6_MM = 75,
  CERAMIC_BEADS = 76,
  STUB_LENGTH_T_MM = 77,
  INST_CONNECTION = 78
}


export enum INPUT_TYPE {
  SELECTION = 1,
  NUMERIC = 2,
  TEXT = 3,
}