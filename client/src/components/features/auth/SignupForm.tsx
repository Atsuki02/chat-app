import { EnvelopeOpenIcon, ReloadIcon } from '@radix-ui/react-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui';
import { useRegisterUserMutation } from '@/redux/services/authService';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

interface ErrorResponse {
  error: string;
}

const signUpSchema = z
  .object({
    username: z.string().min(2, {
      message: 'Username must be at least 2 characters.',
    }),
    email: z.string().email(),
    password: z.string().min(4, {
      message: 'Password must be at least 4 characters.',
    }),
    passwordConfirm: z.string(),
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirm;
    },
    {
      message: 'Passwords do not match',
      path: ['passwordConfirm'],
    },
  );

const SignupForm = () => {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: 'test',
      email: 'test@test.com',
      password: 'test',
      passwordConfirm: 'test',
    },
  });

  const { toast } = useToast();

  const navigate = useNavigate();

  const [registerUser, { isLoading, isError, error }] =
    useRegisterUserMutation();

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    try {
      const response = await registerUser(data).unwrap();
      console.log('Registration successful:', response);
      if (response.sessionId) {
        localStorage.setItem('sessionId', response.sessionId);
      }
      toast({
        duration: 2000,
        title: 'Registration successful!',
      });
      navigate('/');
    } catch (error) {
      toast({
        duration: 2000,
        variant: 'destructive',
        title: 'Registration failed!',
      });
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="flex justify-center items-center w-full p-6 text-sm border-2 border-gray-100 rounded-md">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 max-w-md w-full flex flex-col gap-2 "
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="username" type="username" {...field} />
                </FormControl>
                <FormMessage />
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
                  <Input placeholder="email" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Confirm password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isError && error && (
            <div className="text-red-500">
              {'status' in error &&
              typeof error.data === 'object' &&
              (error.data as ErrorResponse).error
                ? (error.data as ErrorResponse).error
                : 'An error occurred during registration.'}
            </div>
          )}

          <Button
            type="submit"
            className="w-full flex justify-center items-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Please wait...
              </>
            ) : (
              <>
                <EnvelopeOpenIcon className="mr-2 h-4 w-4" /> Sign up with Email
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignupForm;
