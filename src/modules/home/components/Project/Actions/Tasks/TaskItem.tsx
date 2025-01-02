import ContentWrapper from '@/components/ContentWrapper';
import { Badge } from '@/components/ui/badge';
import { ITaskDetailDataType } from '@/lib/types/interfaces';
import TasksSettingDropdown from '@/modules/home/components/Project/Actions/Tasks/TasksSettingDropdown';

export default function TaskItem({
  taskDetail,
}: {
  taskDetail: ITaskDetailDataType;
}) {
  return (
    <ContentWrapper key={taskDetail.taskId}>
      <div className="flex items-center justify-between">
        <div className="flex gap-2 font-medium text-md">
          {taskDetail.taskName}
          <Badge
            variant={`${
              taskDetail.priorityTask.priority === 'High'
                ? 'destructive'
                : taskDetail.priorityTask.priority === 'Medium'
                ? 'secondary'
                : taskDetail.priorityTask.priority === 'Low'
                ? 'outline'
                : 'default'
            }`}
          >
            {taskDetail.priorityTask.priority}
          </Badge>
        </div>
        <TasksSettingDropdown taskDetail={taskDetail} />
      </div>
    </ContentWrapper>
  );
}
