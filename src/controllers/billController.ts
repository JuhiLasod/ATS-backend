import { Request, Response } from "express";
import billService from "../services/billService";

export const getBills = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    res.json(await billService.getBills(req));

  } catch (err) {
    console.error((err as Error).message);
    res.status(500);
  }
};

export const getSpecificBill = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    res.json(await billService.getSpecificBill(req));

  } catch (err) {
    console.error((err as Error).message);
    res.status(500);
  }
};

export const addBill = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    res.json(await billService.addBill(req.body));

  } catch (err) {
    console.error((err as Error).message);
    res.status(500);
  }
};



