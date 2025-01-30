import { MethodTypes } from "@/types";
import { FieldErrors, UseFormSetValue } from "react-hook-form";

export interface IResponseStatusesProps {
  responses: IResponsesForStatusCodes[];
  setResponses: UseFormSetValue<ICreateCustomAPIForm>;
  errors: FieldErrors<ICreateCustomAPIForm>;
  trigger: (field: keyof ICreateCustomAPIForm) => void;
}

export interface ICreateCustomAPIForm {
  method: MethodTypes;
  url: string;
  requestBodyType: string;
  requestBody: string;
  responseStatusCodes: IResponsesForStatusCodes[];
}

export interface IResponsesForStatusCodes {
  id: string;
  name: string;
  description?: string;
  statusCode: string;
  responseBodyType: string;
  responseBody?: string;
  listCount?: number;
  primitiveResponse?: string;
  isPrimitiveResponseStatic?: boolean;
}
