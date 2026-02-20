module.exports = {
    "up": `
        
    CREATE TABLE IF NOT EXISTS customer_master (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      location VARCHAR(255) NULL,
      mobile VARCHAR(255) NULL,
      created_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_on DATETIME NULL,
      updated_by BIGINT NULL,
      is_deleted TINYINT NOT NULL DEFAULT 0,
      deleted_on DATETIME NULL,
      deleted_by BIGINT NULL
    );
    `,
    "down":  `
        DROP TABLE IF EXISTS customer_master;
    `
}