import { MethodTypes, ModelTypes } from "@/types";
import { IStatusCodeEntity } from "../StatusCode";

export interface ICustomAPIEntity {
  id: string;
  applicationId: string;
  createdAt: string;
  createdBy: string;
  method: MethodTypes;
  requestBody: ModelTypes;
  statusCodes: IStatusCodeEntity[];
  url: string;
  updatedAt: string;
  updatedBy: string;
}

export interface ICustomAPIMutation {
  id?: string;
  applicationId: string;
  method: MethodTypes;
  requestBody: ModelTypes;
  statusCodes: IStatusCodeEntity[];
  url: string;
}

export interface IGetCustomAPIsResult {
  data: ICustomAPIEntity[];
}
