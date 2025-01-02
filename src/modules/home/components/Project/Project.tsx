import ProjectProvider from '@/contexts/ProjectContext';
import CreateProject from '@/modules/home/components/Project/CreateProject';
import { Projects } from '@/modules/home/components/Project/Projects';
import SearchInput from '@/modules/home/components/Project/SearchInput';

export default function Project() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center">Project List</h1>

      <ProjectProvider>
        <div className="flex items-center justify-between">
          <SearchInput />
          <CreateProject />
        </div>
        <Projects />
      </ProjectProvider>
    </div>
  );
}
