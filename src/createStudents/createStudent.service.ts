import { Request, Response } from "express";
import Joi from "joi";
import { validateStudentDetailDTO } from "./createStudent.dto";
import { AppDataSource } from "../core/db";
import { StudentDetails } from "./createStudent.model";

export const addNewStudent = async (req: Request, res: Response) => {
  try {
    console.log(req.body, "test");
    const payload = req.body;
    const validationResponse = validateStudentDetailDTO.validate(payload);
    console.log(
      validationResponse?.error?.details[0].message,
      "any error by suman"
    );
    if (validationResponse.error?.details) {
      throw new Error(validationResponse.error.details[0].message);
    }

    const studentDetailRepo = AppDataSource.getRepository(StudentDetails);
    await studentDetailRepo.save(payload);
    res.status(200).send({
      result: "student added successfully",
    });
  } catch (error: any) {
    console.log(error, "i");

    res.status(400).send({
      Result: error.message,
    });
  }
};
