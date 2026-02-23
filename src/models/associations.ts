import { bindAll } from "express-validator/lib/utils";
import { BillMaster } from "./billMaster";
import { CompanyMaster } from "./companyMaster";
import { CustomerMaster } from "./customerMaster";
import {ItemMaster } from "./itemMaster";


const addAssociationOnce = (
  model: any,
  assocName: string,
  createFn: () => void
) => {
  if (!model.associations[assocName]) {
    createFn();
  }
};

const setupAssociations = () => {

  addAssociationOnce(CompanyMaster, "items", () => {
    CompanyMaster.hasMany(ItemMaster, {
      foreignKey: "comp_id",
      as: "items",
    });
  });
  addAssociationOnce(ItemMaster, "company", () => {
    ItemMaster.belongsTo(CompanyMaster, {
      foreignKey: "comp_id",
      as: "company",
    });
  });
  addAssociationOnce(CustomerMaster, "bill", () => {
    CustomerMaster.hasMany(BillMaster, {
      foreignKey: "cust_id",
      as: "bill",
    });
  });
  addAssociationOnce(BillMaster, "customer", () => {
    BillMaster.belongsTo(CustomerMaster, {
      foreignKey: "cust_id",
      as: "customer",
    });
  });
  addAssociationOnce(BillMaster, "item", () => {
    BillMaster.belongsTo(ItemMaster, {
      foreignKey: "item_id",
      as: "item",
    });
  });
  addAssociationOnce(ItemMaster, "itemBill", () => {
    ItemMaster.hasMany(BillMaster, {
      foreignKey: "item_id",
      as: "itemBill",
    });
  });
  
};
export default setupAssociations;
