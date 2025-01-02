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
import { IProjectDataType } from '@/lib/types/interfaces';
import { createTaskSchema, CreateTaskValues } from '@/lib/validations';
import { useCreateTask } from '@/modules/home/components/Project/Actions/CreateTask/mutations';
import {
  useGetPriorities,
  useGetStatuses,
  useGetTaskTypes,
} from '@/modules/home/components/Project/querys';
import { zodResolver } from '@hookform/resolvers/zod';
import { Suspense } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';

export default function CreateTaskForm({
  projectData,
}: {
  projectData: IProjectDataType;
}) {
  const form = useForm<CreateTaskValues>({
    defaultValues: {
      taskName: '',
      description: '',
      statusId: 0,
      originalEstimate: 50,
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
      typeId: 0,
      priorityId: 0,
    },
    resolver: zodResolver(createTaskSchema),
    mode: 'onTouched',
  });

  const { mutate: createTask, isPending: isCreatingTask } = useCreateTask();
  const { setCreateTaskState } = useProjectContext();

  const handleCreateTask = (values: CreateTaskValues) => {
    createTask(
      { ...values, projectId: projectData.id },
      {
        onSuccess: () => {
          form.reset();
          toast({
            title: 'Success',
            description: 'Task created successfully',
            duration: 3000,
          });
          setCreateTaskState({
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
    <div className="px-1 overflow-hidden">
      <Form {...form}>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit(handleCreateTask)}
        >
          <FormFields form={form} />

          <LoadingButton
            type="submit"
            loading={isCreatingTask}
            className="ml-auto w-fit text-foreground"
          >
            Create task
          </LoadingButton>
        </form>
      </Form>
    </div>
  );
}

function FormFields({ form }: { form: UseFormReturn<CreateTaskValues> }) {
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
                <Select onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses?.map((status) => (
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
                <Select onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {taskTypes?.map((taskType) => (
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
                <Select onValueChange={field.onChange}>
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
