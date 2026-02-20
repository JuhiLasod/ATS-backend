import { sequelize } from "../database/db";
import { eReturnCodes } from "../enums/commonEnums";
import logger from "../logger";
import RequestModel from "../models/common/requestModel";
import { CompanyMaster } from "../models/companyMaster";
import CommonUtils from "../utils/common";
import { companyMasterModelDTO } from "../models/companyMaster";
import { BillMaster, billMasterModelDTO } from "../models/billMaster";
import { CustomerMaster } from "../models/customerMaster";
import { v4 as uuidv4 } from "uuid";

class BillManagement {
    // public async getComp(req: RequestModel): Promise<companyMasterModelDTO> {
    //     const companyDTO: companyMasterModelDTO = new companyMasterModelDTO(
    //         CommonUtils.getDataResponse(eReturnCodes.R_DB_ERROR)
    //     );
    //     try {
    //         const result = await CompanyMaster.findAndCountAll();

    //         const totalCount = await CompanyMaster.count({
    //             where: { isDeleted: 0 },
    //         });

    //         CommonUtils.setResponse(companyDTO, result.rows);
    //         // companyDTO.filterModel = CommonUtils.formatFilterModel(
    //         //     // filterModel,
    //         //     // totalCount
    //         // );
    //         return companyDTO;
    //     } catch (error: any) {
    //         logger.error(
    //             `Error Occured in companyService : getCompany API - ${(error as Error).message}`
    //         );
    //         CommonUtils.setResponse(companyDTO, [], eReturnCodes.R_DB_ERROR);
    //         return companyDTO;
    //     }
    // }
    
    public async addBill(req: RequestModel): Promise<billMasterModelDTO> {
        const billDTO: billMasterModelDTO = new billMasterModelDTO(
            CommonUtils.getDataResponse(eReturnCodes.R_DB_ERROR)
        );
        const t = await sequelize.transaction();
        try {
            const newCust = await CustomerMaster.create(
                {
                    name: req.data.customerName,
                    location: req.data.cutomerLocation,
                    mobile: req.data.customerMobile,
                    createdOn : new Date(),
                }, 
                {   
                    transaction: t
                }
            )
            const custId= newCust.id;
            const billId = Date.now()
            const newBill = await BillMaster.bulkCreate(
                req.data.items.map((item: any) => ({
                    billId: billId,
                    custId: custId,
                    itemId: item.itemId,
                    qty: item.qty,
                    price: item.price,
                    createdOn: new Date(),
                })),
                    { transaction: t }
            );
            await t.commit();
            CommonUtils.setResponse(billDTO, newBill);
            return billDTO;
        } catch (error: any) {
            await t.rollback();
            logger.error(
                `Error Occured in billService : addEditBill API- ${(error as Error).message}`
            );
            CommonUtils.setResponse(billDTO, [], eReturnCodes.R_DB_ERROR);
            return billDTO;
        }
    } 
}
export default new BillManagement();
