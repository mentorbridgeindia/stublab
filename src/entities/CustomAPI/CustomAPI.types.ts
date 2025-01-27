import { MethodTypes, ModelTypes } from "@/types";
import { IResponseStatusCodeEntity } from "../ResponseStatusCode";

export interface ICustomAPIEntity {
  id: string;
  name: string;
  applicationId: string;
  createdAt: string;
  createdBy: string;
  method: MethodTypes;
  requestBody: ModelTypes;
  requestBodyType: string;
  responseStatusCodes: IResponseStatusCodeEntity[];
  url: string;
  updatedAt: string;
  updatedBy: string;
  defaultStatusCode?: number;
}

export interface ICustomAPIMutation {
  id?: string;
  applicationId: string;
  method: MethodTypes;
  requestBody: ModelTypes;
  requestBodyType: string;
  responseStatusCodes: IResponseStatusCodeEntity[];
  url: string;
}

export interface IGetCustomAPIsResult {
  data: ICustomAPIEntity[];
}
