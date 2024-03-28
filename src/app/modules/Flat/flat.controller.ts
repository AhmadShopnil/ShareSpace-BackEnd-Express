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
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Faild to add flat",
      error: error,
    });
  }
};

const getFlat = async (req: Request, res: Response) => {
  //   console.log(req.query);

  try {
    const result = await flatServices.getFlatFromDB(req.query);
    res.send({
      status: "success",
      result,
    });
  } catch (error) {}
};

export const flatController = { addFlat, getFlat };
