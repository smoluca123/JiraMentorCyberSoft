import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MenuItem } from '@/modules/home/components/Project/Actions/ActionsDropdownMenu';
import { Edit, Ellipsis } from 'lucide-react';
import { useProjectContext } from '@/hooks/useProjectContext';
import { ITaskDetailDataType } from '@/lib/types/interfaces';

export default function TasksSettingDropdown({
  taskDetail,
}: {
  taskDetail: ITaskDetailDataType;
}) {
  const { setUpdateTaskState } = useProjectContext();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Ellipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Task Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <MenuItem
          Icon={Edit}
          onClick={() => setUpdateTaskState({ isOpen: true, data: taskDetail })}
        >
          Update
        </MenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
