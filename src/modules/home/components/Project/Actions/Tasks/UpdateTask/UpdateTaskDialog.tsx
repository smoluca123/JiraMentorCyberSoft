import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useProjectContext } from '@/hooks/useProjectContext';
import UpdateTaskForm from '@/modules/home/components/Project/Actions/Tasks/UpdateTask/UpdateTaskForm';
import { memo } from 'react';

export default memo(function UpdateTaskDialog() {
  const { updateTaskState, setUpdateTaskState } = useProjectContext();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setUpdateTaskState({ isOpen: false, data: null });
    }
  };
  return (
    <Dialog open={updateTaskState.isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto scrollbar-hide">
        <DialogHeader>
          <DialogTitle>Update Task</DialogTitle>
          <DialogDescription>
            Update the task details here
          </DialogDescription>
        </DialogHeader>
        {updateTaskState.data && (
          <UpdateTaskForm taskDetail={updateTaskState.data} />
        )}
      </DialogContent>
    </Dialog>
  );
});
