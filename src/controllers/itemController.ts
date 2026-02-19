import { Request, Response } from "express";
import itemServices from "../services/itemServices";

export const getItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    res.json(await itemServices.getItem(req.body));

  } catch (err) {
    console.error((err as Error).message);
    res.status(500);
  }
};

export const getSpecificItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    res.json(await itemServices.getSpecificItem(req.body));

  } catch (err) {
    console.error((err as Error).message);
    res.status(500);
  }
};

export const addEditItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    res.json(await itemServices.addEditItem(req.body));

  } catch (err) {
    console.error((err as Error).message);
    res.status(500);
  }
};



