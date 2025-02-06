import { ModelTypes } from "@/types";
import { IResponsesForStatusCodes } from "../../modules/CustomAPI/CreateCustomAPIForm.types";

export interface IResponseStatusCodeEntity {
  id: string;
  name: string;
  statusCode: StatusCodes;
  createdAt?: string;
  createdBy?: string;
  responseType: ResponseTypes;
  updatedAt?: string;
  updatedBy?: string;
  listCount?: number;
  isPrimitiveResponseStatic?: boolean;
  primitiveResponse?: string;
  responseBody?: ModelTypes;
}

export type ResponseTypes = "string" | "number" | "boolean" | "list" | "object";

export type StatusCodes =
  | "200"
  | "201"
  | "202"
  | "204"
  | "400"
  | "401"
  | "403"
  | "404"
  | "405"
  | "409"
  | "410"
  | "415"
  | "422"
  | "500"
  | "501"
  | "502"
  | "503"
  | "504";

export type IResponseStatusCodeMutation = Omit<
  IResponsesForStatusCodes,
  "createdAt" | "createdBy" | "updatedAt" | "updatedBy"
>;
