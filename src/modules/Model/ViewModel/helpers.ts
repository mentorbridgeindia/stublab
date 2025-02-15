import { ModelTypes } from "@/types";
import { IModelEntity } from "@entities/Model";
import { IVariableEntity } from "@entities/Variable";

export const transformData = (data: IModelEntity) => {
  const transformType = (
    type: ModelTypes,
    typeDetails: IModelEntity,
    indentLevel: number = 0
  ): string => {
    const indentation = "  ".repeat(indentLevel);

    if (type === "string" || type === "number" || type === "boolean") {
      return `"${type}"`;
    }

    return `{
      ${typeDetails.variables
        .map(
          (variable) =>
            `${indentation}  "${variable.name}": ${transformType(
              variable.type,
              variable.typeDetails,
              indentLevel + 1
            )}`
        )
        .join(",\n")}
      ${indentation}
  }
    `;
  };

  const processVariables = (variables: IVariableEntity[]) => {
    return variables.reduce<Record<string, string>>((acc, variable) => {
      acc[variable.name] = transformType(
        variable.type,
        variable.typeDetails,
        1
      );
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
