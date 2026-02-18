import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import UserValidations from "../validations/uservalidation";
import { addEditCompany, getCompany } from "../controllers/companyController";

const router = Router();


router.post("/getCompany", getCompany);
router.post("/addEditCompany", addEditCompany);


export default router;
