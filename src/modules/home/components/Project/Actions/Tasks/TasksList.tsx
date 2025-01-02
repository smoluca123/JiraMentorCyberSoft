import { Skeleton } from '@/components/ui/skeleton';
import { IProjectDataType } from '@/lib/types/interfaces';
import TaskItem from '@/modules/home/components/Project/Actions/Tasks/TaskItem';
import { useGetProjectDetail } from '@/modules/home/components/Project/querys';

export default function TasksList({
  projectData,
}: {
  projectData: IProjectDataType;
}) {
  const { data: projectDetail, isLoading } = useGetProjectDetail({
    projectId: projectData.id,
  });

  return (
    <div className="space-y-4">
      {isLoading &&
        Array.from({ length: 5 }, (_, i) => (
          <Skeleton key={i + '_skeleton'} className="w-full h-10" />
        ))}
      {projectDetail &&
        projectDetail.lstTask.map((task) =>
          task.lstTaskDeTail.map((taskDetail) => (
            <TaskItem key={taskDetail.taskId} taskDetail={taskDetail} />
          ))
        )}
    </div>
  );
}
