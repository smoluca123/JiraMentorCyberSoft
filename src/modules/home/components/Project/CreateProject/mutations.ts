import { createProjectAPI } from '@/apis/projectApis';
import { CreateProjectValues } from '@/lib/validations';
import { getAllProjectsQueryKey } from '@/modules/home/components/Project/querys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  const createProject = async (values: CreateProjectValues) => {
    try {
      const { content } = await createProjectAPI(values);
      return content;
    } catch (error) {
      console.log(error);
      throw new Error(error as string);
    }
  };
  const mutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getAllProjectsQueryKey(),
      });
    },
  });

  return mutation;
};
