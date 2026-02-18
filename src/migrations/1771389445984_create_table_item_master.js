module.exports = {
  "up": `
    CREATE TABLE IF NOT EXISTS item_master (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      comp_id BIGINT NOT NULL,
      qty BIGINT NOT NULL,
      price BIGINT NOT NULL,
      gst_price BIGINT NOT NULL,
      created_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_on DATETIME NULL,
      updated_by BIGINT NULL,
      is_deleted TINYINT NOT NULL DEFAULT 0,
      deleted_on DATETIME NULL,
      deleted_by BIGINT NULL
    );
  `,

  "down": `
    DROP TABLE IF EXISTS item_master;
  `
};
