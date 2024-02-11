import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/components/ui/use-toast';
import { useDeleteUserMutation } from '@/redux/services/authService';
import { resetState } from '@/redux/slices/reducer';
import { setAlertDeleteDialogOpen } from '@/redux/slices/settingsSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AlertDeleteDialog = () => {
  const dispatch: AppDispatch = useDispatch();

  const { isAlertDeleteDialogOpen } = useSelector(
    (state: RootState) => state.settings,
  );

  const { user } = useSelector((state: RootState) => state.auth);

  const [deleteUser, { isLoading }] = useDeleteUserMutation();

  const { toast } = useToast();
  const navigate = useNavigate();

  const handleOpenChange = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    dispatch(setAlertDeleteDialogOpen(false));
  };

  const handleDelete = async (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    try {
      const userId = user?.id;
      await deleteUser(userId).unwrap();
      toast({
        duration: 2000,
        title: 'Account has been successfully deleted.',
      });
      dispatch(resetState());
      navigate('/auth');
    } catch (err) {
      toast({
        duration: 2000,
        variant: 'destructive',
        title: 'Failed to delete the account',
      });
      console.error('Failed to delete the account:', err);
    }
  };

  return (
    <AlertDialog
      open={isAlertDeleteDialogOpen}
      onOpenChange={(isAlertDeleteDialogOpen) =>
        dispatch(setAlertDeleteDialogOpen(isAlertDeleteDialogOpen))
      }
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleOpenChange}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isLoading}>
            {isLoading ? (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {isLoading ? 'Please wait...' : 'Continue'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDeleteDialog;
