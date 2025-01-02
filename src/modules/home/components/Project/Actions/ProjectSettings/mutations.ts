import {
  updateProjectSettingsAPI,
  removeUserFromProjectAPI,
  assignMemberToProjectAPI,
} from '@/apis/projectApis';
import { IProjectDataType, IUserDataType } from '@/lib/types/interfaces';
import { ProjectSettingsValues } from '@/lib/validations';
import {
  getAllProjectsQueryKey,
  getUsersQueryKey,
} from '@/modules/home/components/Project/querys';
import {
  QueryFilters,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

export function useUpdateProjectSettings() {
  const queryClient = useQueryClient();

  const updateProjectSettings = async (
    projectData: ProjectSettingsValues & {
      creator: number;
    }
  ) => {
    try {
      const { content } = await updateProjectSettingsAPI(projectData);
      return content;
    } catch (error) {
      console.log(error);
      throw new Error(error as string);
    }
  };

  const mutation = useMutation({
    mutationFn: updateProjectSettings,
    onSuccess: (data, variables) => {
      const queryFilter: QueryFilters = {
        queryKey: getAllProjectsQueryKey(),
      };
      queryClient.cancelQueries(queryFilter);

      data.description = variables.description;
      queryClient.setQueriesData(queryFilter, (oldData: IProjectDataType[]) => {
        if (!oldData) return;

        return oldData.map((project) =>
          project.id === data.id
            ? { ...project, ...data, creator: project.creator }
            : project
        );
      });
    },
  });
  return mutation;
}

export function useAssignMemberToProject() {
  const queryClient = useQueryClient();

  const assignMemberToProject = async ({
    userData,
    projectId,
  }: {
    userData: IUserDataType;
    projectId: number;
  }) => {
    try {
      const { data } = await assignMemberToProjectAPI({
        userId: userData.userId,
        projectId,
      });
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error as string);
    }
  };

  const mutation = useMutation({
    mutationFn: assignMemberToProject,
    onSuccess: (_, variables) => {
      const queryFilter: QueryFilters = {
        queryKey: getUsersQueryKey(variables.projectId),
      };

      queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData(queryFilter, (oldData: IUserDataType[]) => {
        return oldData
          ? [...oldData, variables.userData]
          : [variables.userData];
      });

      // update the project data to include the new member
      queryClient.setQueriesData(
        { queryKey: getAllProjectsQueryKey() },
        (oldData: IProjectDataType[]) => {
          if (!oldData) return;
          return oldData.map((project) =>
            project.id === variables.projectId
              ? {
                  ...project,
                  members: [...project.members, variables.userData],
                }
              : project
          );
        }
      );
    },
  });
  return mutation;
}

export function useRemoveUserFromProject() {
  const queryClient = useQueryClient();
  const removeUserFromProject = async ({
    userId,
    projectId,
  }: {
    userId: number;
    projectId: number;
  }) => {
    try {
      const { data } = await removeUserFromProjectAPI({ userId, projectId });
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error as string);
    }
  };

  const mutation = useMutation({
    mutationFn: removeUserFromProject,
    onSuccess: (_, variables) => {
      const queryFilter: QueryFilters = {
        queryKey: getUsersQueryKey(variables.projectId),
      };
      queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData(queryFilter, (oldData: IUserDataType[]) => {
        if (!oldData) return;
        return oldData.filter((user) => user.userId !== variables.userId);
      });

      queryClient.setQueriesData(
        { queryKey: getAllProjectsQueryKey() },
        (oldData: IProjectDataType[]) => {
          if (!oldData) return;
          return oldData.map((project) =>
            project.id === variables.projectId
              ? {
                  ...project,
                  members: project.members.filter(
                    (user) => user.userId !== variables.userId
                  ),
                }
              : project
          );
        }
      );
    },
  });
  return mutation;
}
