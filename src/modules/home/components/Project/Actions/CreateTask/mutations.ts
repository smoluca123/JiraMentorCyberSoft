import { createTaskAPI } from '@/apis/projectApis';
import { CreateTaskValues } from '@/lib/validations';
import { getProjectDetailQueryKey } from '@/modules/home/components/Project/querys';
import {
  QueryFilters,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

export function useCreateTask() {
  const queryClient = useQueryClient();

  const createTask = async (data: CreateTaskValues & { projectId: number }) => {
    try {
      const response = await createTaskAPI(data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error as string);
    }
  };

  const mutation = useMutation({
    mutationFn: createTask,
    onSuccess: (_, variables) => {
      const queryFilter: QueryFilters = {
        queryKey: getProjectDetailQueryKey(variables.projectId),
      };

      queryClient.invalidateQueries(queryFilter);
    },
  });

  return mutation;
}
