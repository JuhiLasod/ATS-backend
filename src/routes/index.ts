import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import UserValidations from "../validations/uservalidation";
import { addEditCompany, getCompany } from "../controllers/companyController";
import { addEditItem, editItemDetails, getItem, getSpecificItem } from "../controllers/itemController";
import { addBill } from "../controllers/billController";

const router = Router();


router.post("/getCompany", getCompany);
router.post("/addEditCompany", addEditCompany);

router.post("/getItem", getItem)
router.post("/getSpecificItem", getSpecificItem)
router.post("/addEditItem", addEditItem);
router.post("/editItemDetails", editItemDetails);

router.post("/generate-bill", addBill);



export default router;
