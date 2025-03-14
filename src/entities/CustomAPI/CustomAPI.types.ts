import { MethodTypes, ModelTypes } from "@/types";
import { IResponseStatusCodeEntity } from "../ResponseStatusCode";

export interface ICustomAPIEntity {
  id: string;
  name: string;
  applicationId: string;
  createdAt: string;
  createdBy: string;
  method: MethodTypes;
  responseStatusCodes: IResponseStatusCodeEntity[];
  url: string;
  updatedAt: string;
  updatedBy: string;
  defaultStatusCodes: string;
}

export interface ICustomAPIMutation {
  id?: string;
  applicationId: string;
  name: string;
  method: MethodTypes;
  responseStatusCodes: IResponseStatusCodeEntity[];
  url: string;
}

export interface IChangeDefaultStatusCode {
  id: string;
  defaultStatusCode: string;
}

export interface IGetCustomAPIsResult {
  data: ICustomAPIEntity[];
}
