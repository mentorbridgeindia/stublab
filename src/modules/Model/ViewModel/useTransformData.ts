import { ModelTypes } from "@/types";
import { IModelEntity } from "@entities/Model";
import { IVariableEntity } from "@entities/Variable";
import { useMemo } from "react";

export const useTransformData = (data: IModelEntity | null) => {
  const transformType = useMemo(() => {
    const transform = (
      type: ModelTypes,
      typeDetails: IModelEntity | null,
      indentLevel = 0
    ): string | null => {
      if (!type) return null;
      const indentation = "  ".repeat(indentLevel);

      switch (type) {
        case "string":
        case "number":
        case "boolean":
          return `"${type}"`;

        case "array":
          if (typeDetails?.variables) {
            return `[
${indentation}  {
${typeDetails.variables
  .map((variable) => `${indentation}    "${variable.name}": "string"`)
  .join(",\n")}
${indentation}  }
${indentation}]`;
          }
          if (typeDetails?.variables?.length) {
            const [element] = typeDetails.variables;
            return `[
${transform(element.type, element.typeDetails, indentLevel + 1)}
${indentation}]`;
          }
          return "[]";

        case "object":
          if (typeDetails?.variables) {
            return `{
${typeDetails.variables
  .map(
    (variable) =>
      `${indentation}  "${variable.name}": ${transform(
        variable.type,
        variable.typeDetails,
        indentLevel + 1
      )}`
  )
  .join(",\n")}
${indentation}}`;
          }
          return "{}";

        default:
          return `"unknown"`;
      }
    };
    return transform;
  }, []);

  const processVariables = (variables: IVariableEntity[]) => {
    return variables.reduce<Record<string, string | null>>((acc, variable) => {
      acc[variable.name] = transformType(
        variable.type,
        variable.typeDetails,
        1
      );
      return acc;
    }, {});
  };

  const transformed = processVariables(data?.variables ?? []);

  const transformedData = useMemo(() => {
    if (!data) return null;
    return `{
${Object.entries(transformed)
  .map(([key, value]) => `  "${key}": ${value}`)
  .join(",\n")}
}`;
  }, [transformed, data]);

  return { transformedData };
};
