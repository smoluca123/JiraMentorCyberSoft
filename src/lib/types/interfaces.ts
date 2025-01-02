export type PropsWithClassName = {
  className?: string;
};

export interface IApiResponseWrapper<T> {
  message: string;
  content: T;
  statusCode: number;
  dateTime: string;
}

export interface IApiPaginationResponseWrapper<T> {
  message: string;
  content: {
    items: T[];
    total: number;
    currentPage: number;
    totalPages: number;
    limit: number;
  };
  statusCode: number;
  dateTime: string;
}

export interface IUserDataType {
  userId: number;
  email: string;
  avatar: string;
  phoneNumber: string;
  name: string;
}

export interface IUserWithAccessTokenType extends IUserDataType {
  accessToken: string;
}

export interface IProjectDataType {
  members: Pick<IUserDataType, 'name' | 'avatar' | 'userId'>[];
  creator: Pick<IUserDataType, 'name'> & { id: number };
  id: number;
  projectName: string;
  description: string;
  categoryId: number;
  categoryName: string;
  alias: string;
  deleted: boolean;
}

export interface IProjectMemberDataType
  extends Pick<IUserDataType, 'name' | 'avatar'> {
  userId: number;
}

export interface IProjectCategoryDataType {
  id: number;
  projectCategoryName: string;
}

export interface IProjectDetailDataType {
  lstTask: ITaskDataType[];
  members: IUserDataType[];
  creator: Pick<IUserDataType, 'name'> & { id: number };
  id: number;
  projectName: string;
  description: string;
  projectCategory: IProjectCategoryDataType;
  alias: string;
}

export interface ITaskDataType {
  lstTaskDeTail: ITaskDetailDataType[];
  statusId: string;
  statusName: string;
  alias: string;
}

export interface ITaskDetailDataType {
  priorityTask: Pick<PriorityTaskDataType, 'priorityId' | 'priority'>;
  taskTypeDetail: TaskTypeDetail;
  assigness: Pick<IUserDataType, 'name' | 'avatar'> &
    {
      id: number;
      alias: string;
    }[];
  lstComment: ICommentDataType[];
  taskId: number;
  taskName: string;
  alias: string;
  description: string;
  statusId: string;
  originalEstimate: number;
  timeTrackingSpent: number;
  timeTrackingRemaining: number;
  typeId: number;
  priorityId: number;
  projectId: number;
}

export interface ICommentDataType {
  id: number;
  idUser: number;
  name: string;
  avatar: string;
  commentContent: string;
}

export interface TaskStatusDataType {
  statusId: number;
  statusName: string;
  alias: string;
  deleted: boolean;
}

export interface TaskTypeDetail {
  id: number;
  taskType: string;
}

export interface PriorityTaskDataType {
  priorityId: number;
  priority: string;
  alias: string;
  deleted: boolean;
  description: string;
}

// export interface PriorityTask {
//   priorityId: number;
//   priority: string;
// }
