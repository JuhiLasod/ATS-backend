const db = require("../database/dbAccess");
const path = require("path");

export async function getAllAuditLogs(req: any, res: any, next: any) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const search = req.query.search?.trim();

    let whereClause = "WHERE is_deleted = 0";
    const queryParams: any[] = [];

    if (search) {
      whereClause += `
        AND (
          model LIKE ?
          OR action LIKE ?
          OR created_by LIKE ?
        )
      `;
      queryParams.push(
        `%${search}%`,
        `%${search}%`,
        `%${search}%`
      );
    }

    // 🔢 Count
    const countResult = await db.query(
      `
      SELECT COUNT(*) AS total
      FROM audit_logs
      ${whereClause}
      `,
      queryParams
    );

    const total = countResult[0]?.total || 0;
    const logs = await db.query(
      `
      SELECT 
        id,
        model,
        action,
        created_by,
        created_on
      FROM audit_logs
      ${whereClause}
      ORDER BY created_on DESC
      LIMIT ? OFFSET ?
      `,
      [...queryParams, limit, offset]
    );

    return res.status(200).json({
      success: true,
      data: logs,
      pagination: {
        totalRecords: total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        limit
      }
    });

  } catch (error) {
    next(error);
  }
}

export async function auditLogs(req:any, modelRec:any, logMessage:any) {
  try {
    const model = modelRec;
    const auth = req?.auth_token;    
    const user = auth?.fullName ||
      auth?.emailId ||
      auth?.userId?.toString() ||
      "unkonown";
    const created_on =  new Date();
    let message = logMessage;
    const log = await db.query(
      `INSERT INTO audit_logs(model, action, created_by ,created_on, is_deleted) VALUES (?,?,?,?,?)`,
      [model, message, user, created_on, 0]
    );
    return log;
  } catch (error) {
    throw error;
  }
}
