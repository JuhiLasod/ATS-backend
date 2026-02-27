module.exports = {
    "up": `ALTER TABLE bill_master
      ADD COLUMN upi TINYINT NOT NULL DEFAULT 0 AFTER PRICE;`,
    "down": 
    `
      ALTER TABLE bill_master
      DROP COLUMN upi;
  `
}