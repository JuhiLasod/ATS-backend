import { CompanyMaster } from "./companyMaster";
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
  
};
export default setupAssociations;
