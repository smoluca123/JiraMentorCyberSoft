import LoadingButton from '@/components/LoadingButton';
import TiptapEditor from '@/components/TiptapEditor';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import MultipleSelector, { Option } from '@/components/ui/multiselect';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Slider } from '@/components/ui/slider';
import { toast } from '@/hooks/use-toast';
import { useProjectContext } from '@/hooks/useProjectContext';
import { ITaskDetailDataType } from '@/lib/types/interfaces';
import { updateTaskSchema, UpdateTaskValues } from '@/lib/validations';
import { useUpdateTask } from '@/modules/home/components/Project/Actions/Tasks/UpdateTask/mutations';
import {
  useGetPriorities,
  useGetStatuses,
  useGetTaskTypes,
  useGetUsers,
} from '@/modules/home/components/Project/querys';
import { zodResolver } from '@hookform/resolvers/zod';
import { memo, Suspense } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';

export default memo(function UpdateTaskForm({
  taskDetail,
}: {
  taskDetail: ITaskDetailDataType;
}) {
  const { setUpdateTaskState } = useProjectContext();

  const form = useForm<UpdateTaskValues>({
    defaultValues: {
      taskName: taskDetail.taskName,
      originalEstimate: taskDetail.originalEstimate,
      timeTrackingSpent: taskDetail.timeTrackingSpent,
      timeTrackingRemaining: taskDetail.timeTrackingRemaining,
      statusId: +taskDetail.statusId,
      typeId: taskDetail.taskTypeDetail.id,
      priorityId: taskDetail.priorityTask.priorityId,
      description: taskDetail.description,
      listUserAsign: taskDetail.assigness.map((assigness) => assigness.id),
    },
    resolver: zodResolver(updateTaskSchema),
    mode: 'onTouched',
  });

  const { mutate: updateTask, isPending: isUpdatingTask } = useUpdateTask();

  const handleUpdateTask = (values: UpdateTaskValues) => {
    updateTask(
      {
        ...values,
        projectId: taskDetail.projectId,
        taskId: taskDetail.taskId,
      },
      {
        onSuccess: () => {
          toast({
            title: 'Success',
            description: 'Task updated successfully',
            duration: 3000,
          });
          form.reset();
          setUpdateTaskState({
            isOpen: false,
            data: null,
          });
        },
        onError: (error) => {
          toast({
            title: 'Error',
            description: error.message,
            variant: 'destructive',
            duration: 3000,
          });
        },
      }
    );
  };

  return (
    <div className="px-1 overflow-x-hidden">
      <Form {...form}>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit(handleUpdateTask)}
        >
          <FormFields form={form} taskDetail={taskDetail} />
          <LoadingButton type="submit" loading={isUpdatingTask}>
            Update Task
          </LoadingButton>
        </form>
      </Form>
    </div>
  );
});

function FormFields({
  form,
  taskDetail,
}: {
  form: UseFormReturn<UpdateTaskValues>;
  taskDetail: ITaskDetailDataType;
}) {
  const { data: statuses, isLoading: isLoadingStatuses } = useGetStatuses();

  const { data: taskTypes, isLoading: isLoadingTaskTypes } = useGetTaskTypes();

  const { data: priorities, isLoading: isLoadingPriorities } =
    useGetPriorities();

  return (
    <>
      <FormField
        control={form.control}
        name="taskName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Task Name</FormLabel>
            <FormControl>
              <Input placeholder="Ex: Task 1" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="originalEstimate"
        render={({ field }) => (
          <FormItem className="space-y-4">
            <FormLabel className="flex justify-between">
              Original Estimate
              <output className="block ml-auto text-sm font-medium w-fit tabular-nums">
                {field.value}
              </output>
            </FormLabel>
            <FormControl>
              <Slider
                min={0}
                max={300}
                defaultValue={[field.value ?? 0]}
                onValueChange={field.onChange}
                aria-label="Slider with output"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="timeTrackingSpent"
        render={({ field }) => (
          <FormItem className="space-y-4">
            <FormLabel className="flex justify-between">
              Time Tracking Spent
              <output className="block ml-auto text-sm font-medium w-fit tabular-nums">
                {field.value}
              </output>
            </FormLabel>
            <FormControl>
              <Slider
                min={0}
                max={form.watch('originalEstimate') ?? 0}
                defaultValue={[field.value ?? 0]}
                onValueChange={field.onChange}
                aria-label="Slider with output"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="timeTrackingRemaining"
        render={({ field }) => (
          <FormItem className="space-y-4">
            <FormLabel className="flex justify-between">
              Time Tracking Remaining
              <output className="block ml-auto text-sm font-medium w-fit tabular-nums">
                {field.value}
              </output>
            </FormLabel>
            <FormControl>
              <Slider
                min={0}
                max={
                  (form.watch('originalEstimate') ?? 0) -
                  (form.watch('timeTrackingSpent') ?? 0)
                }
                defaultValue={[field.value ?? 0]}
                onValueChange={field.onChange}
                aria-label="Slider with output"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Status */}
      {isLoadingStatuses && <Skeleton className="w-full h-10" />}

      {!isLoadingStatuses && statuses && (
        <FormField
          control={form.control}
          name="statusId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value.toString()}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem
                        key={status.statusId}
                        value={status.statusId.toString()}
                      >
                        {status.statusName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <AsignUserToTaskSelect form={form} projectId={taskDetail.projectId} />

      {/* Task Type */}
      {isLoadingTaskTypes && <Skeleton className="w-full h-10" />}
      {!isLoadingTaskTypes && taskTypes && (
        <FormField
          control={form.control}
          name="typeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task Type</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value.toString()}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {taskTypes.map((taskType) => (
                      <SelectItem
                        key={taskType.id}
                        value={taskType.id.toString()}
                      >
                        {taskType.taskType}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {/* Priority */}
      {isLoadingPriorities && <Skeleton className="w-full h-10" />}
      {!isLoadingPriorities && priorities && (
        <FormField
          control={form.control}
          name="priorityId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value.toString()}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {priorities.map((priority) => (
                      <SelectItem
                        key={priority.priorityId}
                        value={priority.priorityId.toString()}
                      >
                        {priority.priority}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {/* Description */}
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Suspense fallback={<Skeleton className="w-full h-32" />}>
                <TiptapEditor content={field.value} onChange={field.onChange} />
              </Suspense>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}

function AsignUserToTaskSelect({
  projectId,
  form,
}: {
  projectId: number;
  form: UseFormReturn<UpdateTaskValues>;
}) {
  const { data: users, isLoading: isLoadingUsers } = useGetUsers({
    projectId,
  });

  const options: Option[] =
    users?.map((user) => ({
      value: user.userId.toString(),
      label: user.name,
    })) || [];
  return (
    <>
      {isLoadingUsers && <Skeleton className="w-full h-10" />}

      {users && (
        <FormField
          control={form.control}
          name="listUserAsign"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assignees</FormLabel>
              <FormControl>
                <MultipleSelector
                  commandProps={{
                    label: 'Assignees',
                  }}
                  value={
                    field.value?.map((value: number) => ({
                      value: value.toString(),
                      label:
                        users.find((user) => user.userId === value)?.name || '',
                    })) || []
                  }
                  onChange={(value) => {
                    field.onChange(value.map((item) => +item.value));
                  }}
                  defaultOptions={options}
                  placeholder="Select Assignees"
                  hideClearAllButton
                  hidePlaceholderWhenSelected
                  emptyIndicator={
                    <p className="text-sm text-center">No results found</p>
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </>
  );
}
