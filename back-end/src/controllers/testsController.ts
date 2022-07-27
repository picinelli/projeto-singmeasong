import { Request, Response } from "express";
import testsService from "../services/testsService.js";

export async function deleteAllData(req: Request, res: Response) {
  await testsService.deleteAllData();

  res.sendStatus(200);
}
