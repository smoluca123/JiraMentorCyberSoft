import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useProjectContext } from '@/hooks/useProjectContext';
import CreateTaskForm from '@/modules/home/components/Project/Actions/CreateTask/CreateTaskForm';

export default function CreateTaskDialog() {
  const { createTaskState, setCreateTaskState } = useProjectContext();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setCreateTaskState({
        isOpen: false,
        data: null,
      });
    }
  };

  if (!createTaskState.data) return null;

  return (
    <Dialog open={createTaskState.isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto scrollbar-hide">
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
          <DialogDescription>
            Create a new task for the project.
          </DialogDescription>
        </DialogHeader>
        <CreateTaskForm projectData={createTaskState.data} />
      </DialogContent>
    </Dialog>
  );
}
