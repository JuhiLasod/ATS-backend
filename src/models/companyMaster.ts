import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";
import BaseResponse from "./common/baseResponse";
import CommonRequestModel from "./common/commonRequestModel";

export class companyMasterModelDTO extends BaseResponse {
  public filterModel: CommonRequestModel | undefined;
}

export class CompanyMaster extends Model {
  public id!: number;
  public name!: string;
  public createdOn?: Date;
  public updatedOn?: Date;
  public updatedBy?: number;
  public isDeleted!: number;
  public deletedOn?: Date;
  public deletedBy?: number;
}

CompanyMaster.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "name",
    },
    createdOn: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "created_on",
    },
    updatedOn: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "updated_on",
    },
    updatedBy: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: "updated_by",
    },
    isDeleted: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      field: "is_deleted",
    },
    deletedOn: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "deleted_on",
    },
    deletedBy: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: "deleted_by",
    }
  },
  {
    sequelize,
    modelName: "CompanyMaster",
    tableName: "company_master",
    timestamps: false,
  }
);
