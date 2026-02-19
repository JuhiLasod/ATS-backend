import { sequelize } from "../database/db";
import { eReturnCodes } from "../enums/commonEnums";
import logger from "../logger";
import RequestModel from "../models/common/requestModel";
import { CompanyMaster } from "../models/companyMaster";
import CommonUtils from "../utils/common";
import { companyMasterModelDTO } from "../models/companyMaster";

class CompanyManagement {
    public async getCompany(req: RequestModel): Promise<companyMasterModelDTO> {
        const companyDTO: companyMasterModelDTO = new companyMasterModelDTO(
            CommonUtils.getDataResponse(eReturnCodes.R_DB_ERROR)
        );
        try {
            const result = await CompanyMaster.findAndCountAll();

            const totalCount = await CompanyMaster.count({
                where: { isDeleted: 0 },
            });

            CommonUtils.setResponse(companyDTO, result.rows);
            // companyDTO.filterModel = CommonUtils.formatFilterModel(
            //     // filterModel,
            //     // totalCount
            // );
            return companyDTO;
        } catch (error: any) {
            logger.error(
                `Error Occured in companyService : getCompany API - ${(error as Error).message}`
            );
            CommonUtils.setResponse(companyDTO, [], eReturnCodes.R_DB_ERROR);
            return companyDTO;
        }
    }
    
    public async addEditCompany(req: RequestModel): Promise<companyMasterModelDTO> {
        const companyDTO: companyMasterModelDTO = new companyMasterModelDTO(
            CommonUtils.getDataResponse(eReturnCodes.R_DB_ERROR)
        );
        const t = await sequelize.transaction();
        try {
            const id = req.data.id;
            // const userId = req.auth_token?.userId || 1;
            let newCompany;
            if (id) {
                // const existingCurrency = await Currency.findOne({
                //     where: { id, isDeleted: 0 },
                // });
                // if (!existingCurrency) {
                //     await t.rollback();
                //     CommonUtils.setResponse(currencyDTO, [], eReturnCodes.R_NOT_FOUND);
                //     return currencyDTO;
                // }
                // newCurrency = await existingCurrency.update(
                //     {
                //         conversionRate: req.data.conversionRate,
                //         updatedBy: userId,
                //         updatedOn: new Date(),
                //     },
                //     { transaction: t }
                // );

            } else {
                newCompany = await CompanyMaster.create(
                    {
                        name: req.data.name,
                        createdOn: new Date(),
                    },
                    { transaction: t }
                );
            }
            await t.commit();
            CommonUtils.setResponse(companyDTO, newCompany);
            return companyDTO;
        } catch (error: any) {
            await t.rollback();
            logger.error(
                `Error Occured in companyService : addEditCompany API- ${(error as Error).message}`
            );
            CommonUtils.setResponse(companyDTO, [], eReturnCodes.R_DB_ERROR);
            return companyDTO;
        }
    }
   
    
}
export default new CompanyManagement();
