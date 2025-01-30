import { IModelEntity } from "@entities/Model/Model.types";

export type MethodTypes = "GET" | "POST" | "PUT" | "DELETE";

export type ModelTypes = "string" | "number" | "boolean" | IModelEntity;

export type ResponseTypes = "string" | "number" | "boolean" | "object" | "list";

export type HTTPStatusCodes =
  | "200"
  | "201"
  | "300"
  | "301"
  | "302"
  | "303"
  | "400"
  | "401"
  | "403"
  | "404"
  | "500"
  | "501"
  | "503";
