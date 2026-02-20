import { Request, Response } from "express";
import billService from "../services/billService";

// export const getBill = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     res.json(await billService.getCompany(req.body));

//   } catch (err) {
//     console.error((err as Error).message);
//     res.status(500);
//   }
// };

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



