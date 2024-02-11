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
import { useLoginUserMutation } from '@/redux/services/authService';
import { EnvelopeOpenIcon, ReloadIcon } from '@radix-ui/react-icons';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

interface ErrorResponse {
  error: string;
}

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
});

const LoginForm = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const [loginUser, { isLoading, isError, error }] = useLoginUserMutation();

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      const response = await loginUser(data).unwrap();
      console.log('Registration successful:', response);
      if (response.sessionId) {
        localStorage.setItem('sessionId', response.sessionId);
      }
      toast({
        duration: 2000,
        title: 'Logged in successfully!',
      });
      navigate('/');
    } catch (error) {
      toast({
        duration: 2000,
        variant: 'destructive',
        title: 'Failed to log in',
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
                <EnvelopeOpenIcon className="mr-2 h-4 w-4" /> Login with Email
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
