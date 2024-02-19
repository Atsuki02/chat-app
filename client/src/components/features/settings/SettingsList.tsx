import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import PlusCircle from '@/components/icons/PlusCircle';
import Moon from '@/components/icons/Moon';
import ChevronRight from '@/components/icons/ChevronRight';
import Notifications from '@/components/icons/Notifications';
import {
  setAlertDeleteDialogOpen,
  setCurrentSettingScreen,
  setSettingsOpen,
} from '@/redux/slices/settingsSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import Logout from '@/components/icons/Logout';
import Warn from '@/components/icons/Warn';
import AlertDeleteDialog from './AlertDeleteDialog';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { useLogoutUserMutation } from '@/redux/services/authService';
import { resetState } from '@/redux/slices/reducer';
import {
  useGetUserQuery,
  useUpdateLastOnlineMutation,
  useUpdateUserProfileImageMutation,
} from '@/redux/services/userService';
import { useUploadImageMutation } from '@/redux/services/cloudinaryService';

const SettingsList = () => {
  const dispatch: AppDispatch = useDispatch();
  const handleCancel = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    dispatch(setSettingsOpen(false));
  };

  const { isAlertDeleteDialogOpen } = useSelector(
    (state: RootState) => state.settings,
  );

  const { user } = useSelector((state: RootState) => state.auth);

  const { data } = useGetUserQuery(user?.id, {
    skip: !user?.id,
  });

  const [logoutUser] = useLogoutUserMutation({});
  const [uploadImage] = useUploadImageMutation();
  const [updateUserProfileImage] = useUpdateUserProfileImageMutation();

  const handleAvatarChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const form = new FormData();
    form.append('file', file);
    form.append(
      'upload_preset',
      import.meta.env.VITE_CLOUDINARY_PRESET_NAME as string,
    );

    try {
      const response = await uploadImage(form).unwrap();
      const result = await updateUserProfileImage({
        userId: data?.id,
        imageUrl: response.secure_url,
      }).unwrap();

      console.log(result);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const handleChangeCurrentScreen = (type: string) => {
    dispatch(setCurrentSettingScreen(type));
  };

  const handleOpenAlertDialog = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    dispatch(setAlertDeleteDialogOpen(true));
  };

  const [updateLastOnline] = useUpdateLastOnlineMutation();

  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = async (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    try {
      await logoutUser({}).unwrap();
      toast({
        duration: 2000,
        title: 'Successfully logged out.',
      });
      await updateLastOnline(data?.id).unwrap();
      localStorage.removeItem('sessionId');
      localStorage.removeItem('vite-ui-theme');
      dispatch(resetState());
      navigate('/auth');
    } catch (err) {
      toast({
        duration: 2000,
        variant: 'destructive',
        title: 'Failed to log out.',
      });
      console.error('Failed to log out.:', err);
    }
  };

  return (
    <div className="flex flex-col items-center py-6 px-4 sm:p-4 cursor-default relative text-foreground">
      <span
        className="absolute top-6 right-6 sm:top-4 sm:right-4 text-primary text-xs cursor-pointer"
        onClick={handleCancel}
      >
        Done
      </span>
      <div className="flex flex-col">
        <p className="font-semibold text-sm">Settings</p>
      </div>
      <div className="relative mt-6">
        <Avatar className="w-11 h-11">
          <AvatarImage src={data?.profileImageUrl} />
          <AvatarFallback className="bg-blue-200">
            {data?.username.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="avatarInput"
          onChange={handleAvatarChange}
        />
        <label
          htmlFor="avatarInput"
          className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-secondary border cursor-pointer"
        >
          <PlusCircle />
        </label>
      </div>
      <p className="text-sm font-semibold mt-2">{data.username}</p>
      <div className="flex flex-col w-full px-2 mt-6 bg-background text-foreground rounded-lg divide-y dark:divide-slate-800 divide-slate-200">
        <div
          className="flex justify-between items-center w-full  text-sm sm:py-2 py-3 cursor-pointer "
          onClick={() => handleChangeCurrentScreen('darkModeSelection')}
        >
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 p-1 flex items-center justify-center rounded-full bg-black">
              <Moon />
            </div>
            <span className="text-xs">Dark mode</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs dark:text-slate-200 text-gray-500">
              {data?.darkMode ? 'On' : 'Off'}
            </span>
            <div className="h-3 w-3">
              <ChevronRight />
            </div>
          </div>
        </div>
        <div
          className="flex justify-between items-center w-full text-sm sm:py-2 py-3 cursor-pointer"
          onClick={() => handleChangeCurrentScreen('notificationsSelection')}
        >
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 p-1 flex items-center justify-center rounded-full bg-yellow-400">
              <Notifications />
            </div>
            <span className="text-xs">Notifications</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs dark:text-slate-200 text-gray-500">
              {data?.notifications ? 'On' : 'Off'}
            </span>
            <div className="h-3 w-3">
              <ChevronRight />
            </div>
          </div>
        </div>
        <div
          className="flex justify-between items-center w-full text-sm sm:py-2 py-3 cursor-pointer"
          onClick={handleLogout}
        >
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 p-1 flex items-center justify-center rounded-full bg-slate-400 text-white">
              <Logout />
            </div>
            <span className="text-xs">Log out</span>
          </div>
        </div>
        <div
          className="flex justify-between items-center w-full text-sm sm:py-2 py-3 cursor-pointer"
          onClick={handleOpenAlertDialog}
        >
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 p-1 flex items-center justify-center rounded-full bg-destructive text-white">
              <Warn />
            </div>
            <span className="text-xs text-red-700">Delete account</span>
          </div>
        </div>
      </div>
      {isAlertDeleteDialogOpen && <AlertDeleteDialog />}
    </div>
  );
};

export default SettingsList;
