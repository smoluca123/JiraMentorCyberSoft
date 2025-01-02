import LoadingButton from '@/components/LoadingButton';

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
import { toast } from '@/hooks/use-toast';
import { createProjectSchema, CreateProjectValues } from '@/lib/validations';
import { useCreateProject } from '@/modules/home/components/Project/CreateProject/mutations';
import { useGetProjectCategories } from '@/modules/home/components/Project/querys';
import { zodResolver } from '@hookform/resolvers/zod';
import { lazy, Suspense, useEffect } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import slugify from 'slugify';
const TiptapEditor = lazy(() => import('@/components/TiptapEditor'));

export default function CreateProjectForm({
  onClose,
}: {
  onClose: () => void;
}) {
  const form = useForm<CreateProjectValues>({
    defaultValues: {
      projectName: '',
      description: '',
      categoryId: 0,
      alias: '',
    },
    resolver: zodResolver(createProjectSchema),
    mode: 'onTouched',
  });
  const { isLoading: isLoadingProjectCategories } = useGetProjectCategories();

  const { mutate: createProject, isPending: isCreatingProject } =
    useCreateProject();

  const handleCreateProject = (values: CreateProjectValues) => {
    createProject(values, {
      onSuccess: () => {
        toast({
          title: 'Success',
          description: 'Project created successfully',
          duration: 3000,
        });
        onClose();
      },
      onError: (error) => {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
          duration: 3000,
        });
      },
    });
  };

  useEffect(() => {
    form.setValue(
      'alias',
      slugify(form.getValues('projectName'), {
        lower: true,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch('projectName')]);

  return (
    <div className="overflow-x-hidden">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleCreateProject)}
          className="px-1 space-y-4"
        >
          <FormFields form={form} />
          <LoadingButton
            type="submit"
            loading={isCreatingProject}
            disabled={isCreatingProject || isLoadingProjectCategories}
            className="ml-auto w-fit text-foreground"
          >
            Create
          </LoadingButton>
        </form>
      </Form>
    </div>
  );
}

function FormFields({ form }: { form: UseFormReturn<CreateProjectValues> }) {
  const { data: projectCategories, isLoading: isLoadingProjectCategories } =
    useGetProjectCategories();

  return (
    <>
      <FormField
        control={form.control}
        name="projectName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Project Name</FormLabel>
            <FormControl>
              <Input placeholder="Ex: Project 1" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {isLoadingProjectCategories && <Skeleton className="w-full h-10" />}

      {!isLoadingProjectCategories && projectCategories && (
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category ID</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {projectCategories?.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.id.toString()}
                      >
                        {category.projectCategoryName}
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

      <FormField
        control={form.control}
        name="alias"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Alias</FormLabel>
            <FormControl>
              <Input placeholder="Ex: project-1" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

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
