import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useProjectContext } from '@/hooks/useProjectContext';
import ProjectSettingsForm from '@/modules/home/components/Project/Actions/ProjectSettings/ProjectSettingsForm';
import { memo } from 'react';

export default memo(function ProjectSettingsDialog() {
  const { projectSettingsState, setProjectSettingsState } = useProjectContext();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setProjectSettingsState({
        isOpen: false,
        data: null,
      });
    }
  };


  return (
    <Dialog open={projectSettingsState.isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className='overflow-hidden '>
        <DialogHeader>
          <DialogTitle>Project Settings</DialogTitle>
          <DialogDescription>
            Manage your project settings here.
          </DialogDescription>
        </DialogHeader>
        <ProjectSettingsForm />
      </DialogContent>
    </Dialog>
  );
})
