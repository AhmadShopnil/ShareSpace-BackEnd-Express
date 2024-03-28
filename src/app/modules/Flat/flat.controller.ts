import { Application, Request, Response } from "express";
import { flatServices } from "./flat.services";

const addFlat = async (req: Request, res: Response) => {
  try {
    const result = await flatServices.addFlatIntoDB(req.body);
    res.send({
      success: true,
      statusCode: 201,
      message: "Flat added successfully",
      data: result,
    });
  } catch (error) {}
};

const getFlat = async (req: Request, res: Response) => {
  try {
    const result = await flatServices.getFlatFromDB();
    res.send({
      status: "success",
      result,
    });
  } catch (error) {}
};

export const flatController = { addFlat, getFlat };
