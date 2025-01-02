import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useProjectContext } from '@/hooks/useProjectContext';
import TasksList from '@/modules/home/components/Project/Actions/Tasks/TasksList';

export default function TasksDialog() {
  const { tasksState, setTasksState, setCreateTaskState } = useProjectContext();

  if (!tasksState.data) return null;

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setTasksState({ isOpen: false, data: null });
    }
  };

  return (
    <Dialog open={tasksState.isOpen} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tasks</DialogTitle>
          <DialogDescription>View all tasks for the project.</DialogDescription>
        </DialogHeader>
        <Button
          onClick={() =>
            setCreateTaskState({ isOpen: true, data: tasksState.data })
          }
        >
          Create Task
        </Button>
        <TasksList projectData={tasksState.data} />
      </DialogContent>
    </Dialog>
  );
}
