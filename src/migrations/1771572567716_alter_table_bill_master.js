module.exports = {
  "up": `
      ALTER TABLE bill_master
      ADD COLUMN bill_id BIGINT NOT NULL AFTER id;
  `,

  "down": `
      ALTER TABLE bill_master
      DROP COLUMN bill_id;
  `
}
