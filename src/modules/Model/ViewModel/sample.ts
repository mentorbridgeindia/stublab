import { IModelEntity } from "@entities/Model";

export const sampleModel: IModelEntity = {
  id: "3",
  name: "BusRouteDetails",
  variables: [
    {
      id: "1",
      name: "busNo",
      type: "string",
      isNullable: false,
      createdAt: new Date().toISOString(),
      createdBy: "1",
      updatedAt: new Date().toISOString(),
      updatedBy: "1",
    },
    {
      id: "2",
      name: "driverName",
      type: "number",
      isNullable: true,
      createdAt: new Date().toISOString(),
      createdBy: "1",
      updatedAt: new Date().toISOString(),
      updatedBy: "1",
    },
    {
      id: "3",
      name: "isActive",
      type: "boolean",
      isNullable: false,
      createdAt: new Date().toISOString(),
      createdBy: "1",
      updatedAt: new Date().toISOString(),
      updatedBy: "1",
    },
    {
      id: "4",
      name: "route",
      type: {
        id: "33",
        name: "BusRoute",
        variables: [
          {
            id: "1",
            name: "name",
            type: "string",
            isNullable: false,
          },
          {
            id: "2",
            name: "distance",
            type: "number",
            isNullable: false,
          },
          {
            id: "3",
            name: "time",
            type: "number",
            isNullable: false,
          },
          {
            id: "4",
            name: "start",
            type: {
              id: "331",
              name: "location",
              variables: [
                {
                  id: "1",
                  name: "latitude",
                  type: "number",
                  isNullable: false,
                },
                {
                  id: "2",
                  name: "longitude",
                  type: "number",
                  isNullable: false,
                },
              ],
            },
            isNullable: false,
          },
          {
            id: "5",
            name: "end",
            type: {
              id: "332",
              name: "location",
              variables: [
                {
                  id: "1",
                  name: "latitude",
                  type: "number",
                  isNullable: false,
                },
                {
                  id: "2",
                  name: "longitude",
                  type: "number",
                  isNullable: false,
                },
              ],
            },
            isNullable: false,
          },
        ],
      },
      isNullable: false,
      createdAt: new Date().toISOString(),
      createdBy: "1",
      updatedAt: new Date().toISOString(),
      updatedBy: "1",
    },
  ],
};
