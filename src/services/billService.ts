import { sequelize } from "../database/db";
import { eReturnCodes } from "../enums/commonEnums";
import logger from "../logger";
import qrcode from "qrcode";
import RequestModel from "../models/common/requestModel";
import { CompanyMaster } from "../models/companyMaster";
import CommonUtils from "../utils/common";
import { companyMasterModelDTO } from "../models/companyMaster";
import { BillMaster, billMasterModelDTO } from "../models/billMaster";
import { CustomerMaster } from "../models/customerMaster";
import { v4 as uuidv4 } from "uuid";
import { Model } from "sequelize";
import { ItemMaster } from "../models/itemMaster";

class BillManagement {
    public async getSpecificBill(req: any): Promise<billMasterModelDTO> {
        const billDTO: billMasterModelDTO = new billMasterModelDTO(
            CommonUtils.getDataResponse(eReturnCodes.R_DB_ERROR)
        );
        try {
            console.log("params", req.params.billId)
            const result = await BillMaster.findAll({
                where: {
                    isDeleted: 0,
                    billId: req.params?.billId
                },
                include: [
                    {
                        model: CustomerMaster,
                        as: "customer",
                    },
                    {
                        model: ItemMaster,
                        as: "item",
                        include: [
                            {
                                model: CompanyMaster,
                                as: "company",
                            },
                        ]
                    }
                ],

            });

            CommonUtils.setResponse(billDTO, result);
            return billDTO;
        } catch (error: any) {
            logger.error(
                `Error Occured in billService : getSpecificBill API - ${(error as Error).message}`
            );
            CommonUtils.setResponse(billDTO, [], eReturnCodes.R_DB_ERROR);
            return billDTO;
        }
    }

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
                    createdOn: new Date(),
                },
                {
                    transaction: t
                }
            )
            const custId = newCust.id;
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

// qrroutes.get("/generate",async(req,res)=>{
public async generateQr(req: any,res: any){
    const am= req.params?.am;
    const upilink=`upi://pay?pa=juhilasod29@okhdfcbank&pn=Juhi%20Lasod&am=${am}&cu=INR`;
    try {
        const qrDataURL = await qrcode.toDataURL(upilink, {
  color: {
    light: "#ffffff",   // QR code color (white)
    dark: "#1a0000"   // Background color (black)
  }
});
        console.log("qr generated");
        res.json({ qr: qrDataURL });
      } catch (err) {
        console.log("gen qr failed")
        res.status(500).json({ error: 'QR generation failed' });
      }
};

}
export default new BillManagement();
