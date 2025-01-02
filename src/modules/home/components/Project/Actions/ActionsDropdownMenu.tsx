import {
  getPrioritiesAPI,
  getProjectCategoriesAPI,
  getTaskStatusesAPI,
  getTaskTypesAPI,
} from '@/apis/projectApis';
import { getUsersAPI } from '@/apis/userApis';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useProjectContext } from '@/hooks/useProjectContext';
import { IProjectDataType } from '@/lib/types/interfaces';
import {
  getPrioritiesQueryKey,
  getProjectCategoriesQueryKey,
  getStatusesQueryKey,
  getTaskTypesQueryKey,
  getUsersQueryKey,
} from '@/modules/home/components/Project/querys';
import { useQueryClient } from '@tanstack/react-query';

import { Ellipsis, LucideProps, Plus, Settings, UserPlus } from 'lucide-react';
import {
  ForwardRefExoticComponent,
  PropsWithChildren,
  RefAttributes,
} from 'react';

export default function ActionsDropdownMenu({
  projectData,
}: {
  projectData: IProjectDataType;
}) {
  const { setProjectSettingsState, setAssignMembersState, setTasksState } =
    useProjectContext();

  const queryClient = useQueryClient();

  const getProjectCategories = async () => {
    try {
      const { content } = await getProjectCategoriesAPI();
      return content;
    } catch (error) {
      console.log(error);
      throw new Error(error as string);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          onMouseEnter={() => {
            queryClient.prefetchQuery({
              queryKey: getProjectCategoriesQueryKey,
              queryFn: getProjectCategories,
              staleTime: 1000 * 60 * 5, // 5 minutes
            });

            // Get existed users in project
            queryClient.prefetchQuery({
              queryKey: getUsersQueryKey(projectData.id),
              queryFn: async () =>
                (await getUsersAPI({ projectId: projectData.id })).content,
              staleTime: 1000 * 60 * 5, // 5 minutes
            });

            // Get task types
            queryClient.prefetchQuery({
              queryKey: getTaskTypesQueryKey,
              queryFn: async () => (await getTaskTypesAPI()).content,
              staleTime: 1000 * 60 * 5, // 5 minutes
            });

            // Get priorities
            queryClient.prefetchQuery({
              queryKey: getPrioritiesQueryKey,
              queryFn: async () => (await getPrioritiesAPI()).content,
              staleTime: 1000 * 60 * 5, // 5 minutes
            });

            // Get statuses
            queryClient.prefetchQuery({
              queryKey: getStatusesQueryKey,
              queryFn: async () => (await getTaskStatusesAPI()).content,
              staleTime: 1000 * 60 * 5, // 5 minutes
            });
          }}
        >
          <Ellipsis />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Project Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <MenuItem
            Icon={Settings}
            onClick={() => {
              setProjectSettingsState({
                isOpen: true,
                data: projectData,
              });
            }}
          >
            Project Settings
          </MenuItem>
          <MenuItem
            Icon={UserPlus}
            onClick={() => {
              setAssignMembersState({
                isOpen: true,
                data: projectData,
              });
            }}
          >
            Assign Members
          </MenuItem>

          <MenuItem
            Icon={Plus}
            onClick={() => {
              setTasksState({
                isOpen: true,
                data: projectData,
              });
            }}
          >
            Tasks
          </MenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

// MenuItem component
interface MenuItemProps extends PropsWithChildren {
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;
  onClick?: () => void;
}
export function MenuItem({ Icon, children, onClick }: MenuItemProps) {
  return (
    <DropdownMenuItem
      className="flex items-center h-10 cursor-pointer gap-x-4"
      onClick={onClick}
    >
      <Icon className="!size-5 text-primary" />
      {children}
    </DropdownMenuItem>
  );
}
