import { ProjectContext } from '@/contexts/ProjectContext';
import { useContext } from 'react';

export function useProjectContext() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjectContext must be used within a ProjectProvider');
  }
  return context;
}
