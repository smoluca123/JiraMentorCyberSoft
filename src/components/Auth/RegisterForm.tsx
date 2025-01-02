'use client';

import PasswordInput from '@/components/PasswordInput';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { registerSchema, RegisterValues } from '@/lib/validations';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { registerAPI } from '@/apis/userApis';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { login, selectAuth } from '@/redux/slices/authSlice';
import LoadingButton from '@/components/LoadingButton';

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { isLoading: loginLoading } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<RegisterValues>({
    defaultValues: {
      name: '',
      email: '',
      passWord: '',
      phoneNumber: '',
    },
    resolver: zodResolver(registerSchema),
    mode: 'onTouched',
  });

  const handleRegister = async (credentials: RegisterValues) => {
    try {
      setIsLoading(true);
      setError(null);
      const validCredentials = registerSchema.parse(credentials);

      const result = await registerAPI(validCredentials);

      await dispatch(
        login({
          email: validCredentials.email,
          passWord: validCredentials.passWord,
        })
      ).unwrap();

      toast({
        title: 'Congratulations!',
        description: result.message,
        duration: 3000,
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      {/* Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form className="space-y-4" onSubmit={form.handleSubmit(handleRegister)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ex: Luca Dev" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ex: lucadev1@gmail.com" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone number</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ex: 0987654321" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passWord"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput {...field} placeholder="Password" />
              </FormControl>
            </FormItem>
          )}
        />
        <LoadingButton
          className="w-full mt-3"
          loading={isLoading || loginLoading}
        >
          Register
        </LoadingButton>
      </form>
    </Form>
  );
}
