import { eReturnCodes } from "../enums/commonEnums";

export type TRequest = {
  orgId?: number;
  requestDateTime: Date;
  requestSource?: number;
  request: string;
  ipAddress: string;
  originName: string;
  isDeleted: number;
};

export type TResponse = {
  resultCode: eReturnCodes;
  responseDateTime: Date;
};

export type TAuthorizationModel = {
  userId: number;
  roleId: number;
  fullName: string;
  mobileNumber: string;
  emailId: string;
  // Department scoped access (from RoleMaster.departmentId). If null => superadmin (no dept filter)
  deptid?: number | null;
};

export type TEmailOptions = {
  receiverEmail?: string;
  password?: string;
  emailPurpose: string;
  approveUrl?: string;
  rejectUrl?: string;
  visitorName?: string;
  visitorEmail?: string;
  visitorMobile?: string;
  purpose?: string;
  from?: string;
  hostEmployeeName?: string;
  hostEmployeeEmail?: string;
  hostEmployeeMobileNumber?: string;
  visitDate?: string;
  visitTime?: string;
  tempPass?: string;
  poNumber?: Number;
  // Ticket-related fields
  ticketId?: string;
  ticketSubject?: string;
  ticketCategory?: string;
  userName?: string;
  createdDate?: string;
  ticketLink?: string;
  currentStatus?: string;
  statusColor?: string;
  statusMessage?: string;
  updatedDate?: string;
  approverName?: string;
  createdBy?: string;
  approvalLink?: string;
  approvalStatus?: string;
    bookingId?: string;     
  timeLeft?: number | string;  
  endTime?: string;           
  message?: string;        
  bookingLink?: string; 
  ticketType?: string; 
  priority?: string; 
  unitName?: string; 
  hallName?: string; 
};

export type TMenuHierarchy = {
  id: number;
  name: string;
  dispName: string;
  parentId: number;
  entityUrl: string;
  description: string;
  isActive: number;
  orgId: number;
  iconName: string;
  displayOrder: number;
  children: TMenuHierarchy[];
  privileges: TPrivilege[];
};

export type TPrivilege = {
  id?: number;
  name: string;
  groupId: string;
  menuId: number;
};

export type TRolePrivilege = {
  id?: number;
  roleId: number;
  privilegeId: number;
};
