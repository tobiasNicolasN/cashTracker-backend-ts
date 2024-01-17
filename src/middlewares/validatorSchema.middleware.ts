import { NextFunction, Request, Response } from "express";
import z, { AnyZodObject } from "zod";

export const validatorSchema =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError)
        return res
          .status(400)
          .json({ error: error.issues.map((e) => e.message) });
    }
  };
