import { ICustomAPIEntity } from "../CustomAPI";

export interface IApplicationEntity {
  id: string;
  createdAt: string;
  createdBy: string;
  description: string;
  name: string;
  path: string;
  updatedAt: string;
  updatedBy: string;
  apiCount?: number;
  apiDetails?: ICustomAPIEntity[];
  swaggerJson?: string;
}

export interface IApplicationMutation {
  id?: string;
  name: string;
  path: string;
  description: string;
}
