import baseApi from '@/apis/baseApi';
import {
  IApiResponseWrapper,
  IProjectCategoryDataType,
  IProjectDataType,
  IProjectDetailDataType,
  PriorityTaskDataType,
  TaskStatusDataType,
  TaskTypeDetail,
} from '@/lib/types/interfaces';
import {
  CreateProjectValues,
  CreateTaskValues,
  ProjectSettingsValues,
  UpdateTaskValues,
} from '@/lib/validations';

export const getAllProjectsAPI = async ({ keyword }: { keyword?: string }) => {
  try {
    const { data } = await baseApi.get<IApiResponseWrapper<IProjectDataType[]>>(
      '/Project/getAllProject',
      { params: { keyword } }
    );
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) throw error.response.data.message;
    throw error.message;
  }
};

export const getProjectDetailAPI = async ({
  projectId,
}: {
  projectId: number;
}) => {
  try {
    const { data } = await baseApi.get<
      IApiResponseWrapper<IProjectDetailDataType>
    >(`/Project/getProjectDetail/`, { params: { id: projectId } });
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) throw error.response.data.message;
    throw error.message;
  }
};

export const getProjectCategoriesAPI = async () => {
  try {
    const { data } = await baseApi.get<
      IApiResponseWrapper<IProjectCategoryDataType[]>
    >('/ProjectCategory');
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) throw error.response.data.message;
    throw error.message;
  }
};

export const getTaskTypesAPI = async () => {
  try {
    const { data } = await baseApi.get<IApiResponseWrapper<TaskTypeDetail[]>>(
      '/TaskType/getAll'
    );
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) throw error.response.data.message;
    throw error.message;
  }
};

export const getPrioritiesAPI = async () => {
  try {
    const { data } = await baseApi.get<
      IApiResponseWrapper<PriorityTaskDataType[]>
    >('/Priority/getAll');
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) throw error.response.data.message;
    throw error.message;
  }
};

export const getTaskStatusesAPI = async () => {
  try {
    const { data } = await baseApi.get<
      IApiResponseWrapper<TaskStatusDataType[]>
    >('/Status/getAll');
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) throw error.response.data.message;
    throw error.message;
  }
};

export const createProjectAPI = async (projectData: CreateProjectValues) => {
  try {
    const { data } = await baseApi.post<
      IApiResponseWrapper<
        Pick<
          IProjectDataType,
          | 'id'
          | 'projectName'
          | 'description'
          | 'categoryId'
          | 'alias'
          | 'deleted'
          | 'creator'
        >
      >
    >('/Project/createProjectAuthorize', projectData);
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) throw error.response.data.content;
    throw error.message;
  }
};

export const updateProjectSettingsAPI = async (
  projectData: ProjectSettingsValues
) => {
  try {
    const { data } = await baseApi.put<
      IApiResponseWrapper<
        Pick<
          IProjectDataType,
          | 'id'
          | 'projectName'
          | 'description'
          | 'categoryId'
          | 'alias'
          | 'deleted'
        > & {
          creator: number;
        }
      >
    >(`/Project/updateProject/?projectId=${projectData.id}`, projectData);
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) throw error.response.data.content;
    throw error.message;
  }
};

export const assignMemberToProjectAPI = async ({
  userId,
  projectId,
}: {
  userId: number;
  projectId: number;
}) => {
  try {
    const { data } = await baseApi.post(`/Project/assignUserProject`, {
      userId,
      projectId,
    });
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) throw error.response.data.message;
    throw error.message;
  }
};

export const removeUserFromProjectAPI = async ({
  userId,
  projectId,
}: {
  userId: number;
  projectId: number;
}) => {
  try {
    const { data } = await baseApi.post(`/Project/removeUserFromProject`, {
      userId,
      projectId,
    });
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) throw error.response.data.message;
    throw error.message;
  }
};

export const createTaskAPI = async (
  taskData: CreateTaskValues & { projectId: number }
) => {
  try {
    const { data } = await baseApi.post('/Project/createTask', taskData);
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) throw error.response.data.message;
    throw error.message;
  }
};

export const updateTaskAPI = async (
  taskData: UpdateTaskValues & {
    projectId: number;
    taskId: number;
  }
) => {
  try {
    const { data } = await baseApi.post('/Project/updateTask', taskData);
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) throw error.response.data.message;
    throw error.message;
  }
};
