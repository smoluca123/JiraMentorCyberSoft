import InfiniteScrollContainer from '@/components/InfiniteScrollContainer';
import LoadingButton from '@/components/LoadingButton';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import UserAvatar from '@/components/UserAvatar';
import { toast } from '@/hooks/use-toast';
import { useProjectContext } from '@/hooks/useProjectContext';
import { IProjectDataType } from '@/lib/types/interfaces';
import {
  useAssignMemberToProject,
  useRemoveUserFromProject,
} from '@/modules/home/components/Project/Actions/ProjectSettings/mutations';
import { useGetUsers } from '@/modules/home/components/Project/querys';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function AssignMembersDialog() {
  const { assignMembersState, setAssignMembersState } = useProjectContext();
  const { data: projectData } = assignMembersState;

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setAssignMembersState({
        isOpen: false,
        data: null,
      });
    }
  };

  if (!assignMembersState.data || !projectData) return null;

  return (
    <Dialog open={assignMembersState.isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Assign Members to{' '}
            <span className="font-bold text-accent">
              {assignMembersState.data.projectName}
            </span>
          </DialogTitle>
          <DialogDescription>Assign members to this project.</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          {/* All users */}

          <AllUsers projectData={projectData} />

          {/* Existed users in project */}
          <ExistedUsers projectData={projectData} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function AllUsers({ projectData }: { projectData: IProjectDataType }) {
  const [searchTerm, setSearchTerm] = useState('');
  // Add pagination state
  const [page, setPage] = useState(1);
  const USERS_PER_PAGE = 10;

  const { data: allUsers, isLoading: allUsersLoading } = useGetUsers({});

  const filteredUsers = allUsers?.filter((user) =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const {
    mutate: assignMemberToProject,
    isPending: assignMemberToProjectPending,
  } = useAssignMemberToProject();

  // Calculate paginated users
  const paginatedUsers = filteredUsers?.slice(0, page * USERS_PER_PAGE);
  const hasMore = allUsers ? allUsers.length > page * USERS_PER_PAGE : false;

  return (
    <div className="max-h-[600px] space-y-4 overflow-auto px-4">
      <h3 className="text-lg font-bold">All Users</h3>

      <Input
        placeholder="Search user"
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />

      {allUsersLoading ? (
        <Loader2 className="w-6 h-6 mx-auto my-4 animate-spin" />
      ) : (
        <InfiniteScrollContainer
          onBottomReached={() => {
            if (hasMore) {
              setPage((prev) => prev + 1);
            }
          }}
          isShowInViewElement={hasMore}
        >
          {/* Render paginated users */}
          {paginatedUsers &&
            paginatedUsers.map((user) => {
              return (
                <div
                  className="flex items-center gap-2 py-2 border-b"
                  key={user.userId}
                >
                  <UserAvatar
                    avatarUrl={user.avatar}
                    fallbackName={user.name || 'Noname'}
                  />
                  <div key={user.userId}>
                    <p className="font-bold truncate whitespace-nowrap max-w-[120px]">
                      {user.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ID : {user.userId}
                    </p>
                  </div>

                  {projectData.members.some(
                    (member) => member.userId === user.userId
                  ) ? (
                    <Button
                      className="ml-auto text-foreground"
                      variant={'outline'}
                      disabled
                    >
                      Assigned
                    </Button>
                  ) : (
                    <LoadingButton
                      className="ml-auto text-foreground"
                      loading={assignMemberToProjectPending}
                      onClick={() =>
                        assignMemberToProject(
                          {
                            userData: user,
                            projectId: projectData.id,
                          },
                          {
                            onSuccess: () => {
                              projectData.members.push(user);
                            },
                            onError: (error) => {
                              toast({
                                title: 'Error',
                                description: error.message,
                                variant: 'destructive',
                                duration: 3000,
                              });
                            },
                          }
                        )
                      }
                    >
                      Assign
                    </LoadingButton>
                  )}
                </div>
              );
            })}
        </InfiniteScrollContainer>
      )}
    </div>
  );
}

function ExistedUsers({ projectData }: { projectData: IProjectDataType }) {
  // Add pagination state
  const [page, setPage] = useState(1);
  const USERS_PER_PAGE = 10;

  const {
    data: existedUsersInProject,
    isLoading: existedUsersInProjectLoading,
  } = useGetUsers({
    projectId: projectData.id,
  });

  const {
    mutate: removeUserFromProject,
    isPending: removeUserFromProjectPending,
  } = useRemoveUserFromProject();

  // Calculate paginated users
  const paginatedUsers = existedUsersInProject?.slice(0, page * USERS_PER_PAGE);
  const hasMore = existedUsersInProject
    ? existedUsersInProject.length > page * USERS_PER_PAGE
    : false;

  return (
    <div className="space-y-4 max-h-[600px] overflow-auto px-4">
      <h3 className="text-lg font-bold">Existed Users</h3>
      {existedUsersInProjectLoading ? (
        <Loader2 className="w-6 h-6 mx-auto my-4 animate-spin" />
      ) : (
        <InfiniteScrollContainer
          onBottomReached={() => {
            if (hasMore) {
              setPage((prev) => prev + 1);
            }
          }}
          isShowInViewElement={hasMore}
        >
          {paginatedUsers &&
            paginatedUsers.map((user) => {
              return (
                <div
                  className="flex items-center gap-2 py-2 border-b"
                  key={user.userId}
                >
                  <UserAvatar
                    avatarUrl={user.avatar}
                    fallbackName={user.name || 'Noname'}
                  />
                  <div key={user.userId}>
                    <p className="font-bold truncate whitespace-nowrap max-w-[120px]">
                      {user.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ID : {user.userId}
                    </p>
                  </div>

                  <LoadingButton
                    className="ml-auto text-foreground"
                    variant={'destructive'}
                    loading={removeUserFromProjectPending}
                    onClick={() =>
                      removeUserFromProject(
                        {
                          userId: user.userId,
                          projectId: projectData.id,
                        },
                        {
                          onSuccess: () => {
                            toast({
                              title: 'Success',
                              description: 'User removed from project',
                              duration: 3000,
                            });
                            projectData.members = projectData.members.filter(
                              (member) => member.userId !== user.userId
                            );
                          },
                          onError: (error) => {
                            toast({
                              title: 'Error',
                              description: error.message,
                              variant: 'destructive',
                              duration: 3000,
                            });
                          },
                        }
                      )
                    }
                  >
                    Remove
                  </LoadingButton>
                </div>
              );
            })}
        </InfiniteScrollContainer>
      )}
    </div>
  );
}
