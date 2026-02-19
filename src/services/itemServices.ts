import { sequelize } from "../database/db";
import { eReturnCodes } from "../enums/commonEnums";
import logger from "../logger";
import RequestModel from "../models/common/requestModel";
import { CompanyMaster } from "../models/companyMaster";
import CommonUtils from "../utils/common";
import { ItemMaster, itemMasterModelDTO } from "../models/itemMaster";

class ItemManagement {
    public async getItem(req: RequestModel): Promise<itemMasterModelDTO> {
        const itemDTO: itemMasterModelDTO = new itemMasterModelDTO(
            CommonUtils.getDataResponse(eReturnCodes.R_DB_ERROR)
        );
        try {
            let result;
            if (req.data.id === "0") {
                result = await ItemMaster.findAndCountAll({
                    where: {
                        isDeleted: 0,
                    },
                    include: [
                        {
                            model: CompanyMaster,
                            as: "company",

                        },
                    ],
                });
            }
            else {
                result = await ItemMaster.findAndCountAll({
                    where: {
                        isDeleted: 0,
                        compId: req.data.id
                    }
                });
            }
            const totalCount = await ItemMaster.count({
                where: {
                    isDeleted: 0,
                    compId: req.data.id
                },
            });

            CommonUtils.setResponse(itemDTO, result.rows);
            return itemDTO;
        } catch (error: any) {
            logger.error(
                `Error Occured in itemService : getItem API - ${(error as Error).message}`
            );
            CommonUtils.setResponse(itemDTO, [], eReturnCodes.R_DB_ERROR);
            return itemDTO;
        }
    }

    public async getSpecificItem(req: RequestModel): Promise<itemMasterModelDTO> {
        const itemDTO: itemMasterModelDTO = new itemMasterModelDTO(
            CommonUtils.getDataResponse(eReturnCodes.R_DB_ERROR)
        );
        try {
            const result = await ItemMaster.findOne({
                where: {
                    isDeleted: 0,
                    id: req.data.id
                }
            });

            CommonUtils.setResponse(itemDTO, result);
            return itemDTO;
        } catch (error: any) {
            logger.error(
                `Error Occured in itemService : getSpecificItem API - ${(error as Error).message}`
            );
            CommonUtils.setResponse(itemDTO, [], eReturnCodes.R_DB_ERROR);
            return itemDTO;
        }
    }


    public async editItemDetails(req: RequestModel): Promise<itemMasterModelDTO> {
        const itemDTO: itemMasterModelDTO = new itemMasterModelDTO(
            CommonUtils.getDataResponse(eReturnCodes.R_DB_ERROR)
        );
        const t = await sequelize.transaction();
        try {
            const id = req?.data?.id;
            let newItem;
            const existingCompany = await CompanyMaster.findOne({
                where: { id: req.data.compId, isDeleted: 0 },
                transaction: t
            })
            if (!existingCompany) {
                await t.rollback();
                CommonUtils.setResponse(itemDTO, [], eReturnCodes.R_NOT_FOUND);
                return itemDTO;
            }
            await existingCompany.update(
                {
                    name: req.data.compName,
                    updatedOn: new Date(),
                },
                { transaction: t }
            );


            const existingItem = await ItemMaster.findOne({
                where: { id, isDeleted: 0 },
                transaction: t
            });
            if (!existingItem) {
                await t.rollback();
                CommonUtils.setResponse(itemDTO, [], eReturnCodes.R_NOT_FOUND);
                return itemDTO;
            }
            newItem = await existingItem.update(
                {
                    name: req.data.itemName,
                    qty: req.data.qty,
                    price: req.data.price,
                    gstPrice: req.data.price,
                    updatedOn: new Date(),
                },
                { transaction: t }
            );
            await t.commit();
            CommonUtils.setResponse(itemDTO, newItem);
            return itemDTO;
        } catch (error: any) {
            await t.rollback();
            logger.error(
                `Error Occured in itemService : addEditItem API- ${(error as Error).message}`
            );
            CommonUtils.setResponse(itemDTO, [], eReturnCodes.R_DB_ERROR);
            return itemDTO;
        }
    }
    public async addEditItem(req: RequestModel): Promise<itemMasterModelDTO> {
        const itemDTO: itemMasterModelDTO = new itemMasterModelDTO(
            CommonUtils.getDataResponse(eReturnCodes.R_DB_ERROR)
        );
        const t = await sequelize.transaction();
        try {
            const id = req?.data?.id;
            let newItem;
            let newCompany;
            if (id !== "0") {
                const existingItem = await ItemMaster.findOne({
                    where: { id, isDeleted: 0 },
                });
                if (!existingItem) {
                    await t.rollback();
                    CommonUtils.setResponse(itemDTO, [], eReturnCodes.R_NOT_FOUND);
                    return itemDTO;
                }
                newItem = await existingItem.update(
                    {
                        qty: Number(existingItem.qty) + Number(req.data.qty),
                        price: req.data.price,
                        gstPrice: req.data.price,
                        updatedOn: new Date(),
                    },
                    { transaction: t }
                );

            } else {
                let compId = req.data.compId;
                console.log("compId", compId)
                if (id === "0") {
                    const dupItem = await ItemMaster.findOne({
                        where: {
                            name: req.data.itemName,
                            compId: compId,
                            isDeleted: 0
                        }
                    })
                    if (dupItem) {
                        await t.rollback();
                        logger.error(
                            `An Item with same name already exists in {$compId}(try using a different name).`
                        );
                        CommonUtils.setResponse(itemDTO, [], eReturnCodes.R_DB_ERROR);
                        return itemDTO;
                    }
                    newCompany = await CompanyMaster.create(
                        {
                            name: req.data.compName,
                            createdOn: new Date(),
                        },
                        { transaction: t }

                    );
                    compId = newCompany.id;
                }
                const dupCompany = await CompanyMaster.findOne({
                    where: {
                        name: req.data.compName,
                        isDeleted: 0
                    }
                })
                if (dupCompany) {
                    await t.rollback();
                    logger.error(
                        "A Company with same name already exists (try using a different name)."
                    );
                    CommonUtils.setResponse(itemDTO, [], eReturnCodes.R_DB_ERROR);
                    return itemDTO;
                }
                newItem = await ItemMaster.create(
                    {
                        name: req.data.itemName,
                        compId: compId,
                        qty: req.data.qty,
                        price: req.data.price,
                        gstPrice: req.data.gstPrice,
                        createdOn: new Date(),
                    },
                    { transaction: t }
                );

            }
            await t.commit();
            CommonUtils.setResponse(itemDTO, newItem);
            return itemDTO;
        } catch (error: any) {
            await t.rollback();
            logger.error(
                `Error Occured in itemService : addEditItem API- ${(error as Error).message}`
            );
            CommonUtils.setResponse(itemDTO, [], eReturnCodes.R_DB_ERROR);
            return itemDTO;
        }
    }
}
export default new ItemManagement();
