import { FindAttributeOptions, Includeable, Model, Order, WhereOptions } from "sequelize";

/**
 * Generic Where Condition type for Sequelize queries
 */
export interface WhereCondition {
  [key: string]: any;
  isDeleted?: number;
  isdeleted?: number;
  id?: number | { [key: string]: any };
}

/**
 * Count Where Condition - used for total count queries
 */
export interface CountWhereCondition extends WhereCondition {
  // Add specific fields that are commonly used in count queries
}

/**
 * Generic Query Options for Sequelize findAll/findAndCountAll
 */
export interface QueryOptions<T extends Model = any> {
  where?: WhereOptions<T> | WhereCondition;
  include?: Includeable[];
  attributes?: FindAttributeOptions;
  order?: Order;
  limit?: number;
  offset?: number;
  distinct?: boolean;
  raw?: boolean;
  group?: string | string[];
}

/**
 * User Query Options
 */
export interface UserQueryOptions extends QueryOptions {
  where?: WhereCondition;
}

/**
 * User Where Condition
 */
export interface UserWhereCondition extends WhereCondition {
  id?: number | { [key: string]: any };
  fullName?: { [key: string]: any };
  emailId?: { [key: string]: any };
  empCode?: { [key: string]: any };
  roleId?: number | { [key: string]: any };
  department_id?: number;
  designation_id?: number;
}
/**
 * customer Query Options
 */
export interface CustomerQueryOptions extends QueryOptions {
  where?: WhereCondition;
}

/**
 * customer Where Condition
 */
export interface CustomerWhereCondition extends WhereCondition {
  id?: number | { [key: string]: any };
  name?: { [key: string]: any };
}

/**
 * Ticket Where Condition
 */
export interface TicketWhereCondition extends WhereCondition {
  currentStatus?: number;
  ticketType?: number;
  serviceCategoryId?: number;
  subServiceCategoryId?: number;
  currentAssigneeId?: number;
  createdBy?: number;
  [key: string]: any; // For Op.or and other dynamic operators
}

/**
 * Ticket Assignment Mapping Where Condition
 */
export interface TicketAssignmentWhereCondition extends WhereCondition {
  ticketType?: number;
  subServiceCategoryId?: number;
  assigneeId?: number;
}

/**
 * Ticket Approval Mapping Where Condition
 */
export interface TicketApprovalWhereCondition extends WhereCondition {
  ticketType?: number;
  subServiceCategoryId?: number;
  approverId?: number;
}

/**
 * Ticket Category Where Condition
 */
export interface TicketCategoryWhereCondition extends WhereCondition {
  ticketType?: number;
  categoryType?: number;
  parentCategoryId?: number;
}

/**
 * Ticket Category Mapping Where Condition
 */
export interface TicketCategoryMappingWhereCondition extends WhereCondition {
  ticketType?: number;
  serviceCategoryId?: number;
  subServiceCategoryId?: number;
}

/**
 * Config Where Condition
 */
export interface ConfigWhereCondition extends WhereCondition {
  groupId?: number;
  paramKey?: string;
}

/**
 * Mapping Where Condition - for user unit mapping and other junction tables
 */
export interface MappingWhereCondition extends WhereCondition {
  userId?: number;
  unitId?: number;
  roleId?: number;
}

/**
 * Ticket Update Payload
 */
export interface TicketUpdatePayload {
  currentStatus?: number;
  currentAssigneeId?: number;
  updatedBy?: number;
  updatedOn?: Date;
  [key: string]: any;
}

/**
 * Ticket Reply Options
 */
export interface TicketReplyQueryOptions extends QueryOptions {
  where?: WhereCondition & {
    ticketId?: number;
  };
}
