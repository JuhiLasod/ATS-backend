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
    CompanyMaster.hasMany(BillMaster, {
      foreignKey: "cust_id",
      as: "bill",
    });
  });
  addAssociationOnce(BillMaster, "customer", () => {
    ItemMaster.belongsTo(CustomerMaster, {
      foreignKey: "comp_id",
      as: "customer",
    });
  });
  
};
export default setupAssociations;
