import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import UserValidations from "../validations/uservalidation";
import { addEditCompany, getCompany } from "../controllers/companyController";
import { addEditItem, getItem, getSpecificItem } from "../controllers/itemController";

const router = Router();


router.post("/getCompany", getCompany);
router.post("/addEditCompany", addEditCompany);
router.post("/getItem", getItem)
router.post("/getSpecificItem", getSpecificItem)
router.post("/addEditItem", addEditItem);



export default router;
