import { IProjectDataType, ITaskDetailDataType } from '@/lib/types/interfaces';
import { createContext, PropsWithChildren, useState } from 'react';

interface ProjectSettingsState {
  isOpen: boolean;
  data: IProjectDataType | null;
}

interface AssignMembersState {
  isOpen: boolean;
  data: IProjectDataType | null;
}

interface CreateTaskState {
  isOpen: boolean;
  data: IProjectDataType | null;
}

interface TasksState {
  isOpen: boolean;
  data: IProjectDataType | null;
}

interface UpdateTaskState {
  isOpen: boolean;
  data: ITaskDetailDataType | null;
}

interface ProjectContextType {
  projectSettingsState: ProjectSettingsState;
  setProjectSettingsState: (state: ProjectSettingsState) => void;
  assignMembersState: AssignMembersState;
  setAssignMembersState: (state: AssignMembersState) => void;
  createTaskState: CreateTaskState;
  setCreateTaskState: (state: CreateTaskState) => void;
  tasksState: TasksState;
  setTasksState: (state: TasksState) => void;
  updateTaskState: UpdateTaskState;
  setUpdateTaskState: (state: UpdateTaskState) => void;
  projectFilters: {
    projectName: string;
  };
  setProjectFilters: (state: { projectName: string }) => void;
}

export const ProjectContext = createContext<ProjectContextType | null>(null);

export default function ProjectProvider({ children }: PropsWithChildren) {
  const [projectFilters, setProjectFilters] = useState<{
    projectName: string;
  }>({
    projectName: '',
  });

  const [projectSettingsState, setProjectSettingsState] =
    useState<ProjectSettingsState>({
      isOpen: false,
      data: null,
    });

  const [assignMembersState, setAssignMembersState] =
    useState<AssignMembersState>({
      isOpen: false,
      data: null,
    });

  const [createTaskState, setCreateTaskState] = useState<CreateTaskState>({
    isOpen: false,
    data: null,
  });

  const [updateTaskState, setUpdateTaskState] = useState<UpdateTaskState>({
    isOpen: false,
    data: null,
  });

  const [tasksState, setTasksState] = useState<TasksState>({
    isOpen: false,
    data: null,
  });

  return (
    <ProjectContext.Provider
      value={{
        projectFilters,
        setProjectFilters,
        projectSettingsState,
        setProjectSettingsState,
        assignMembersState,
        setAssignMembersState,
        createTaskState,
        setCreateTaskState,
        tasksState,
        setTasksState,
        updateTaskState,
        setUpdateTaskState,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}
