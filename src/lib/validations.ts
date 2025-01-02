import { z } from 'zod';

const requiredString = (fieldName: string) =>
  z
    .string({
      required_error: `${fieldName} is required`,
      invalid_type_error: `${fieldName} must be string`,
    })
    .trim()
    .min(1, `${fieldName} is required`);

const requiredIntNumber = (fieldName: string) =>
  z.coerce
    .number({
      required_error: `${fieldName} is required`,
      invalid_type_error: `${fieldName} must be a number`,
    })
    .nonnegative(`${fieldName} must be a non-negative number`)
    .int(`${fieldName} must be an integer`)
    .min(1, `${fieldName} must be greater than 0`);

export const loginSchema = z.object({
  email: requiredString('Email').email('Invalid email address'),
  passWord: requiredString('Password'),
});

export const registerSchema = z.object({
  email: requiredString('Email').email('Invalid email address'),
  name: requiredString('Name'),
  passWord: requiredString('Password'),
  phoneNumber: z.optional(z.string().min(10, 'Invalid phone number')),
});

export const projectSettingsSchema = z.object({
  id: requiredIntNumber('Id'),
  categoryId: requiredIntNumber('Category Id'),
  projectName: requiredString('Project Name'),
  description: requiredString('Description'),
});

export const createProjectSchema = z.object({
  projectName: requiredString('Project Name'),
  description: requiredString('Description'),
  categoryId: requiredIntNumber('Category Id'),
  alias: requiredString('Alias'),
});

export const createTaskSchema = z
  .object({
    taskName: requiredString('Task Name'),
    description: requiredString('Description'),
    statusId: z.coerce.number().min(1, 'Status Id is required'),
    originalEstimate: z.coerce.number().optional(),
    timeTrackingSpent: z.coerce.number().optional(),
    timeTrackingRemaining: z.coerce.number().optional(),
    typeId: z.coerce.number().min(1, 'Type Id is required'),
    priorityId: z.coerce.number().min(1, 'Priority Id is required'),
  })
  .refine(
    (data) => (data.timeTrackingSpent ?? 0) <= (data.originalEstimate ?? 0),
    {
      message: 'Time tracking spent cannot exceed original estimate',
      path: ['timeTrackingSpent'],
    }
  )
  .refine(
    (data) =>
      (data.timeTrackingRemaining ?? 0) <=
      (data.originalEstimate ?? 0) - (data.timeTrackingSpent ?? 0),
    {
      message:
        'Time tracking remaining cannot exceed (original estimate - time spent)',
      path: ['timeTrackingRemaining'],
    }
  );

export const updateTaskSchema = z
  .object({
    taskName: requiredString('Task Name'),
    description: requiredString('Description'),
    statusId: z.coerce.number().min(1, 'Status Id is required'),
    originalEstimate: z.coerce.number().optional(),
    timeTrackingSpent: z.coerce.number().optional(),
    timeTrackingRemaining: z.coerce.number().optional(),
    typeId: z.coerce.number().min(1, 'Type Id is required'),
    priorityId: z.coerce.number().min(1, 'Priority Id is required'),
    listUserAsign: z.array(z.coerce.number()).optional(),
  })
  .refine(
    (data) => (data.timeTrackingSpent ?? 0) <= (data.originalEstimate ?? 0),
    {
      message: 'Time tracking spent cannot exceed original estimate',
      path: ['timeTrackingSpent'],
    }
  )
  .refine(
    (data) =>
      (data.timeTrackingRemaining ?? 0) <=
      (data.originalEstimate ?? 0) - (data.timeTrackingSpent ?? 0),
    {
      message:
        'Time tracking remaining cannot exceed (original estimate - time spent)',
      path: ['timeTrackingRemaining'],
    }
  );

export type LoginValues = z.infer<typeof loginSchema>;
export type RegisterValues = z.infer<typeof registerSchema>;
export type ProjectSettingsValues = z.infer<typeof projectSettingsSchema>;
export type CreateProjectValues = z.infer<typeof createProjectSchema>;
export type CreateTaskValues = z.infer<typeof createTaskSchema>;
export type UpdateTaskValues = z.infer<typeof updateTaskSchema>;
