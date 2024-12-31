import { Request, Response, NextFunction } from "express";
import { validate, ValidationError } from "class-validator";
import { plainToInstance } from "class-transformer";
import { ClassConstructor } from "class-transformer/types/interfaces";
import { ParsedQs } from "qs";

type ValidationSource = "body" | "query" | "params";

export const validateRequest = <T extends object>(
  dto: ClassConstructor<T>,
  source: ValidationSource = "body",
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (source === "query") {
      const queryParams: Record<string, any> = { ...req.query };
      
      ["skip", "take", "rating"].forEach((key) => {
        if (key in queryParams && queryParams[key] !== undefined) {
          queryParams[key] = Number(queryParams[key]);
        }
      });

      req.query = queryParams as ParsedQs;
    }

    const dtoInstance = plainToInstance(dto, req[source], {
      excludeExtraneousValues: false,
      exposeDefaultValues: true
    });

    const errors = await validate(dtoInstance, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      const errorMessages = formatValidationErrors(errors);
      return res.status(400).json({ success: false, error: errorMessages });
    }

    req[source] = dtoInstance;
    next();
  };
};

const formatValidationErrors = (errors: ValidationError[]): string[] => {
  return errors.map((error) => Object.values(error.constraints || {})).flat();
};