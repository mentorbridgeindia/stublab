import { ModelTypes } from "@/types";
import { IModelEntity } from "@entities/Model";
import { IVariableEntity } from "@entities/Variable";

export const transformData = (data: IModelEntity) => {
  const transformType = (type: ModelTypes, indentLevel: number = 0): string => {
    const indentation = "  ".repeat(indentLevel);

    if (typeof type === "string") {
      return `"${type}"`;
    }

    if (typeof type === "object" && type.variables) {
      return `{
${type.variables
  .map(
    (variable) =>
      `${indentation}  "${variable.name}": ${transformType(
        variable.type,
        indentLevel + 1
      )}`
  )
  .join(",\n")}
${indentation}}`;
    }

    return `"unknown"`;
  };

  const processVariables = (variables: IVariableEntity[]) => {
    return variables.reduce<Record<string, string>>((acc, variable) => {
      acc[variable.name] = transformType(variable.type, 1);
      return acc;
    }, {});
  };

  const transformed = processVariables(data.variables);

  return JSON.parse(
    JSON.stringify(
      `{
${Object.entries(transformed)
  .map(([key, value]) => `  "${key}": ${value}`)
  .join(",\n")}
}`,
      null,
      2
    )
  );
};
