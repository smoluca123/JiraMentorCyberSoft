import ActionsDropdownMenu from '@/modules/home/components/Project/Actions/ActionsDropdownMenu';
import { IProjectDataType } from '@/lib/types/interfaces';

export default function DisplayActionsCell({ projectData }: { projectData: IProjectDataType }) {

  return (
    <div>
      <ActionsDropdownMenu projectData={projectData} />
    </div>
  );
}
