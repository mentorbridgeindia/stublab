import { CUSTOM_APIS_ENDPOINT, IMutationParams, MutationResponse, updateData } from '@/api'
import { useMutation } from '@tanstack/react-query'
import { ICustomAPIMutation } from './CustomAPI.types'

const updateStatusCode = async (data: ICustomAPIMutation) => {
    return await updateData<ICustomAPIMutation>(CUSTOM_APIS_ENDPOINT + "/" + data.id, data);
}
export const useUpdateStatusCode = (params: IMutationParams = {}) => 
    useMutation<MutationResponse, Error, ICustomAPIMutation>({
        mutationFn: updateStatusCode,
        ...params,
})
