import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";
import BaseResponse from "./common/baseResponse";
import CommonRequestModel from "./common/commonRequestModel";

export class itemMasterModelDTO extends BaseResponse {
  public filterModel: CommonRequestModel | undefined;
}

export class ItemMaster extends Model {
  public id!: number;
  public name!: string;
  public compId!: number;
  public qty!: number;
  public price!: number;
  public gstPrice!: number;
  public createdOn?: Date;
  public updatedOn?: Date;
  public updatedBy?: number;
  public isDeleted!: number;
  public deletedOn?: Date;
  public deletedBy?: number;
}

ItemMaster.init(
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
    compId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: "comp_id",
    },
   qty: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: "qty",
    },
    price: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: "price",
    },
    gstPrice: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: "gst_price",
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
    modelName: "ItemMaster",
    tableName: "item_master",
    timestamps: false,
  }
);
