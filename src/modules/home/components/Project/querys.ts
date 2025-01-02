import {
  getAllProjectsAPI,
  getPrioritiesAPI,
  getProjectCategoriesAPI,
  getProjectDetailAPI,
  getTaskStatusesAPI,
  getTaskTypesAPI,
} from '@/apis/projectApis';
import { getUsersAPI } from '@/apis/userApis';
import { useQuery } from '@tanstack/react-query';

export const getAllProjectsQueryKey = (keywords: string = '') => {
  return ['projects', { keywords }];
};

export function useGetAllProjects({ keyword }: { keyword?: string }) {
  const getAllProjects = async () => {
    try {
      const { content } = await getAllProjectsAPI({ keyword });
      return content;
    } catch (error) {
      console.log(error);
      throw new Error(error as string);
    }
  };

  const query = useQuery({
    queryKey: getAllProjectsQueryKey(keyword),
    queryFn: getAllProjects,
    staleTime: 1000 * 60 * 5, // 5 minutes
    placeholderData: (previousData) => previousData,
  });

  return query;
}

export const getProjectDetailQueryKey = (projectId: number) => {
  return ['projectDetail', { projectId }];
};

export function useGetProjectDetail({ projectId }: { projectId: number }) {
  const getProjectDetail = async () => {
    try {
      const { content } = await getProjectDetailAPI({ projectId });
      return content;
    } catch (error) {
      throw new Error(error as string);
    }
  };

  const query = useQuery({
    queryKey: getProjectDetailQueryKey(projectId),
    queryFn: getProjectDetail,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return query;
}

export const getProjectCategoriesQueryKey = ['projectCategories'];

export function useGetProjectCategories() {
  const getProjectCategories = async () => {
    const { content } = await getProjectCategoriesAPI();
    return content;
  };

  const query = useQuery({
    queryKey: getProjectCategoriesQueryKey,
    queryFn: getProjectCategories,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return query;
}

export const getTaskTypesQueryKey = ['taskTypes'];

export function useGetTaskTypes() {
  const getTaskTypes = async () => {
    const { content } = await getTaskTypesAPI();
    return content;
  };

  const query = useQuery({
    queryKey: getTaskTypesQueryKey,
    queryFn: getTaskTypes,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return query;
}

export const getPrioritiesQueryKey = ['priorities'];

export function useGetPriorities() {
  const getPriorities = async () => {
    const { content } = await getPrioritiesAPI();
    return content;
  };

  const query = useQuery({
    queryKey: getPrioritiesQueryKey,
    queryFn: getPriorities,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return query;
}

export const getStatusesQueryKey = ['statuses'];

export function useGetStatuses() {
  const getStatuses = async () => {
    const { content } = await getTaskStatusesAPI();
    return content;
  };

  const query = useQuery({
    queryKey: getStatusesQueryKey,
    queryFn: getStatuses,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return query;
}

export const getUsersQueryKey = (projectId?: number) => {
  return ['users', { projectId }];
};

export function useGetUsers({ projectId }: { projectId?: number }) {
  const getUsers = async () => {
    const { content } = await getUsersAPI({ projectId });
    return content;
  };

  const query = useQuery({
    queryKey: getUsersQueryKey(projectId),
    queryFn: getUsers,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
  });

  return query;
}
