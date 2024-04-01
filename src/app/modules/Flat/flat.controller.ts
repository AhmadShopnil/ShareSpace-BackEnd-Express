import { Application, Request, Response } from "express";
import { flatServices } from "./flat.services";
import pick from "../../shared/pick";

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
  const filters = pick(req.query, [
    "location",
    "utilitiesDescription",
    "description",
    "availability",
  ]);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  try {
    const result = await flatServices.getFlatFromDB(filters, options);
    res.send({
      status: "success",
      message: "Flats retrieved successfully",
      result,
    });
  } catch (error) {}
};

const updateFlat = async (req: Request, res: Response) => {
  const { flatId } = req.params;

  const updatedFlatData = req.body;
  // console.log(flatId);
  try {
    const updatedFlat = await flatServices.updateFlatIntoDB(
      flatId,
      updatedFlatData
    );
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Flat information updated successfully",
      data: updatedFlat,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const flatController = {
  addFlat,
  getFlat,
  updateFlat,
};
