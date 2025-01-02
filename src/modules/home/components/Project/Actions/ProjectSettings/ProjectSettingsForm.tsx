import LoadingButton from '@/components/LoadingButton';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useProjectContext } from '@/hooks/useProjectContext';
import {
  projectSettingsSchema,
  ProjectSettingsValues,
} from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormReturn } from 'react-hook-form';
import { lazy, memo, Suspense } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetProjectCategories } from '@/modules/home/components/Project/querys';
import { Skeleton } from '@/components/ui/skeleton';
import { useUpdateProjectSettings } from '@/modules/home/components/Project/Actions/ProjectSettings/mutations';
import { useAppSelector } from '@/redux/hooks';
import { selectAuth } from '@/redux/slices/authSlice';
import { useToast } from '@/hooks/use-toast';
// import TiptapEditor from '@/components/TiptapEditor';
const TiptapEditor = lazy(() => import('@/components/TiptapEditor'));

const FormFields = memo(
  ({ form }: { form: UseFormReturn<ProjectSettingsValues> }) => {
    const { data: projectCategories, isLoading: isLoadingProjectCategories } =
      useGetProjectCategories();

    return (
      <>
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project ID</FormLabel>
              <FormControl>
                <Input placeholder="Ex: 123" {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="projectName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project name</FormLabel>
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
                  <Select
                    defaultValue={projectCategories[0].id.toString()}
                    onValueChange={field.onChange}
                  >
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Suspense fallback={<Skeleton className="w-full h-32" />}>
                  <TiptapEditor
                    content={field.value}
                    onChange={field.onChange}
                  />
                </Suspense>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </>
    );
  }
);

export default memo(function ProjectSettingsForm() {
  const { toast } = useToast();
  const { user } = useAppSelector(selectAuth);
  const { setProjectSettingsState, projectSettingsState } = useProjectContext();

  const { isLoading: isLoadingProjectCategories } = useGetProjectCategories();

  const {
    mutate: updateProjectSettings,
    isPending: isUpdatingProjectSettings,
  } = useUpdateProjectSettings();

  const form = useForm<ProjectSettingsValues>({
    defaultValues: {
      id: projectSettingsState.data?.id || 1234,
      categoryId: projectSettingsState.data?.categoryId || 1234,
      projectName: projectSettingsState.data?.projectName || '',
      description: projectSettingsState.data?.description || '',
    },
    resolver: zodResolver(projectSettingsSchema),
    mode: 'onTouched',
  });

  const handleClose = () => {
    setProjectSettingsState({
      isOpen: false,
      data: null,
    });
  };

  const handleUpdateProjectSettings = (values: ProjectSettingsValues) => {
    if (!user || !projectSettingsState.data) return;
    // Not update project id
    updateProjectSettings(
      { ...values, id: projectSettingsState.data.id, creator: user.userId },
      {
        onSuccess: () => {
          toast({
            title: 'Successfully',
            description: 'Update project settings successfully',
            duration: 3000,
          });
          handleClose();
        },
        onError: (error) => {
          toast({
            title: 'Error',
            description: error.message,
            duration: 3000,
            variant: 'destructive',
          });
        },
      }
    );
  };

  return (
    <div className="overflow-hidden">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleUpdateProjectSettings)}
          className="px-1 space-y-4"
        >
          <FormFields form={form} />

          <div className="flex justify-end gap-2">
            <Button variant="destructive" type="button" onClick={handleClose}>
              Close
            </Button>
            <LoadingButton
              type="submit"
              loading={isUpdatingProjectSettings}
              className="text-foreground"
              disabled={isLoadingProjectCategories}
            >
              Save
            </LoadingButton>
          </div>
        </form>
      </Form>
    </div>
  );
});
