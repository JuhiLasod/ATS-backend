import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";
import BaseResponse from "./common/baseResponse";
import CommonRequestModel from "./common/commonRequestModel";

export class billMasterModelDTO extends BaseResponse {
    public filterModel: CommonRequestModel | undefined;
}

export class BillMaster extends Model {
    public id!: number;
    public billId!: number;
    public custId!: number;
    public itemId!: number;
    public qty!: string;
    public price!: string;
    public createdOn?: Date;
    public updatedOn?: Date;
    public updatedBy?: number;
    public isDeleted!: number;
    public deletedOn?: Date;
    public deletedBy?: number;
}

BillMaster.init(
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        billId: {
            type: DataTypes.BIGINT,
            allowNull: false,
            field: "bill_id",
        },
        custId: {
            type: DataTypes.BIGINT,
            allowNull: false,
            field: "cust_id",
        },
        itemId: {
            type: DataTypes.BIGINT,
            allowNull: true,
            field: "item_id",
        },
        qty: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "qty",
        },
        price: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "price",
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
        modelName: "BillMaster",
        tableName: "bill_master",
        timestamps: false,
    }
);
