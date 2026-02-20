module.exports = {
    "up": `
        
    CREATE TABLE IF NOT EXISTS bill_master (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      cust_id BIGINT NOT NULL,
      item_id BIGINT NOT NULL,
      qty VARCHAR(255) NOT NULL,
      price VARCHAR(255) NOT NULL,
      created_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_on DATETIME NULL,
      updated_by BIGINT NULL,
      is_deleted TINYINT NOT NULL DEFAULT 0,
      deleted_on DATETIME NULL,
      deleted_by BIGINT NULL
    );
    `,
    "down":  `
        DROP TABLE IF EXISTS bill_master;
    `
}