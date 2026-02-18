import { Request, Response } from "express";
import companyServices from "../services/companyServices";

export const getCompany = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    res.json(await companyServices.getCompany(req.body));

  } catch (err) {
    console.error((err as Error).message);
    res.status(500);
  }
};

export const addEditCompany = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    res.json(await companyServices.addEditCompany(req.body));

  } catch (err) {
    console.error((err as Error).message);
    res.status(500);
  }
};



