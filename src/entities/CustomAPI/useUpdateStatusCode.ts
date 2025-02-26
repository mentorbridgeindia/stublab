import { CUSTOM_APIS_ENDPOINT, IMutationParams, MutationResponse, updateData } from '@/api'
import { useMutation } from '@tanstack/react-query'
import { IChangeDefaultStatusCode } from './CustomAPI.types'

const updateStatusCode = async (data: IChangeDefaultStatusCode) => {
    return await updateData<IChangeDefaultStatusCode>(CUSTOM_APIS_ENDPOINT + "/" + data.id + "/updateStatusCode", data);
}
export const useUpdateStatusCode = (params: IMutationParams = {}) =>
    useMutation<MutationResponse, Error, IChangeDefaultStatusCode>({
        mutationFn: updateStatusCode,
        ...params,
    })
