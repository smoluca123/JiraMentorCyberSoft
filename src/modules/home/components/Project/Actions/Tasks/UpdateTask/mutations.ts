import { updateTaskAPI } from '@/apis/projectApis';
import { UpdateTaskValues } from '@/lib/validations';
import { getProjectDetailQueryKey } from '@/modules/home/components/Project/querys';
import {
  QueryFilters,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

export function useUpdateTask() {
  const queryClient = useQueryClient();

  const updateTask = async (
    values: UpdateTaskValues & {
      projectId: number;
      taskId: number;
    }
  ) => {
    try {
      const { content } = await updateTaskAPI(values);
      return content;
    } catch (error) {
      console.log(error);
      throw new Error(error as string);
    }
  };

  const mutation = useMutation({
    mutationFn: updateTask,
    onSuccess: (_, variables) => {
      const queryFilter: QueryFilters = {
        queryKey: getProjectDetailQueryKey(variables.projectId),
      };

      queryClient.invalidateQueries(queryFilter);
    },
  });

  return mutation;
}
