// import { IMutationParams, MutationResponse } from "@/api/types";
// import { APPLICATIONS_ENDPOINT } from "@api/endpoints";
// import { sendData } from "@api/Post/sendData";
// import { useMutation } from "@tanstack/react-query";
// import { IApplicationMutation } from "./Application.types";

// const createApplication = async (data: IApplicationMutation) => {
//   return await sendData<IApplicationMutation>(APPLICATIONS_ENDPOINT, data);
// };

// export const useCreateApplication = (params: IMutationParams = {}) =>
//   useMutation<MutationResponse, Error, IApplicationMutation>({
//     mutationFn: createApplication,
//     ...params,
//   });


import { useMutation } from "@tanstack/react-query"; 
import { sendData } from "@api/Post/sendData"; 
import { APPLICATIONS_ENDPOINT } from "@api/endpoints"; 
import { IApplicationMutation } from "./Application.types"; 
import { MutationResponse } from "@/api/types"; 

const createApplication = async (data: IApplicationMutation) => {
  return await sendData<MutationResponse>(APPLICATIONS_ENDPOINT, data);
};

export const useCreateApplication = (params: any = {}) => 
  useMutation<MutationResponse, Error, IApplicationMutation>({
    mutationFn: createApplication, 
    ...params, 
  });
