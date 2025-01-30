import * as yup from "yup";
import { dropdownData } from "./dropdownData";

export const schema = yup.object().shape({
  url: yup.string().url("Please enter a valid URL").required("URL is required"),
  method: yup
    .string()
    .oneOf(["POST", "GET", "PUT", "DELETE"], "Invalid HTTP Method")
    .required("Method is required"),
  requestBodyType: yup
    .string()
    .oneOf(
      dropdownData.contentTypes.map((item) => item.value),
      "Invalid Request Body Type"
    )
    .required("Request Body Type is required"),
  requestBody: yup.string().required("Request Body is required"),
  responseStatusCodes: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.string().required(),
        name: yup.string().required("Name is required"),
        description: yup.string(),
        statusCode: yup
          .string()
          .oneOf(
            dropdownData.statusCodes.map((item) => item.value),
            "Invalid Status Code"
          )
          .required("Status Code is required"),
        responseBodyType: yup
          .string()
          .oneOf(
            dropdownData.contentTypes.map((item) => item.value),
            "Invalid Response Body Type"
          )
          .required("Response Body Type is required"),
        responseBody: yup.string().when("responseBodyType", ([value]) => {
          if (["list", "object"].includes(value)) {
            return yup.string().required("Response Body is required");
          }
          return yup.string().nullable();
        }),
        listCount: yup.number().when("responseBodyType", ([value]) => {
          if (value === "list") {
            return yup
              .number()
              .min(0, "List Count must be at least 0")
              .required("List Count is required");
          }
          return yup.number().nullable();
        }),
        primitiveResponse: yup.string().when("responseBodyType", ([value]) => {
          if (["string", "number", "boolean"].includes(value)) {
            return yup.string().required("Response is required");
          }
          return yup.string().nullable();
        }),
        isPrimitiveResponseStatic: yup.boolean(),
      })
    )
    .required("Responses are required"),
});
