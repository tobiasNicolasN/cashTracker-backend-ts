import { NextFunction, Request, Response } from "express";
import z, { AnyZodObject } from "zod";

/**
 * Valida los datos recibidos desde el Request por un esquema creado utilizando Zod
 * @param AnyZodObject
 */

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
          .json({ error: error.issues.map((e) => e.message).join(" ") });
    }
  };
