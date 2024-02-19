import ChevronLeft from '@/components/icons/ChevronLeft';
import {
  useGetUserQuery,
  useUpdateUserDarkModeMutation,
  useUpdateUserNotificationsMutation,
} from '@/redux/services/userService';
import {
  setCurrentSettingScreen,
  setSettingsOpen,
} from '@/redux/slices/settingsSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import SelectionOption from './SelectionOption';
import { useTheme } from '@/layout/ThemeProvider';
import { useEffect } from 'react';

const SettingSelection = ({ type }: { type: string }) => {
  const dispatch: AppDispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.auth);

  const { data, isSuccess } = useGetUserQuery(user?.id, {
    skip: !user?.id,
  });

  const { setTheme } = useTheme();

  useEffect(() => {
    if (isSuccess && data) {
      const themePreference = data.darkMode ? 'dark' : 'light';
      setTheme(themePreference);
      localStorage.setItem('vite-ui-theme', themePreference);
    }
  }, [data, isSuccess, setTheme]);

  const [updateUserDarkMode] = useUpdateUserDarkModeMutation();
  const [updateUserNotifications] = useUpdateUserNotificationsMutation();

  const handleToggleToOff = async (type: string) => {
    if (type === 'darkModeSelection') {
      await updateUserDarkMode({ userId: data?.id, darkMode: false });
    } else if (type === 'notificationsSelection') {
      await updateUserNotifications({ userId: data?.id, notifications: false });
    }
  };

  const handleToggleToOn = async (type: string) => {
    if (type === 'darkModeSelection') {
      await updateUserDarkMode({ userId: data?.id, darkMode: true });
    } else if (type === 'notificationsSelection') {
      await updateUserNotifications({ userId: data?.id, notifications: true });
    }
  };

  const handleCancel = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    dispatch(setCurrentSettingScreen('settingsList'));
    dispatch(setSettingsOpen(false));
  };

  const handleChangeCurrentScreen = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    dispatch(setCurrentSettingScreen('settingsList'));
  };

  return (
    <div className="flex flex-col items-center py-6 px-4 sm:p-4  relative">
      <div
        className="absolute w-5 h-5 top-6 left-6 sm:top-4 sm:left-4 text-primary text-xs"
        onClick={handleChangeCurrentScreen}
      >
        <ChevronLeft />
      </div>
      <span
        className="absolute top-6 right-6 sm:top-4 sm:right-4 text-primary text-xs"
        onClick={handleCancel}
      >
        Done
      </span>
      <div className="flex flex-col">
        <p className="font-semibold text-sm">
          {type === 'darkModeSelection' ? 'Dark mode' : 'Notifications'}
        </p>
      </div>

      <div className="flex flex-col w-full px-4 mt-6 bg-background text-foreground rounded-lg divide-y dark:divide-slate-800 divide-slate-200">
        <SelectionOption
          onClick={() => handleToggleToOn(type)}
          label="On"
          isChecked={
            type === 'darkModeSelection'
              ? data?.darkMode === true
              : data?.notifications === true
          }
        />
        <SelectionOption
          onClick={() => handleToggleToOff(type)}
          label="Off"
          isChecked={
            type === 'darkModeSelection'
              ? data?.darkMode === false
              : data?.notifications === false
          }
        />
      </div>
    </div>
  );
};

export default SettingSelection;
