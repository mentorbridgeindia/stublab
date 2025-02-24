import * as yup from "yup";

export const orgSchema = yup.object().shape({
  name: yup.string().trim().required("Organization name is required"),
  website: yup
    .string()
    .trim()
    .required("Website is required")
    .matches(
      /^(https?:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d{1,5})?(\/.*)?$/,
      "Invalid website URL"
    ),
  subDomain: yup
    .string()
    .required("Sub Domain is required")
    .max(10, "Sub Domain must be less than 10 characters")
    .matches(/^[a-z0-9-]+$/, "Only lowercase letters, numbers, and hyphens allowed"),
});
