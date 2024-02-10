import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import PlusCircle from '@/components/icons/PlusCircle';
import Moon from '@/components/icons/Moon';
import ChevronRight from '@/components/icons/ChevronRight';
import Notifications from '@/components/icons/Notifications';
import {
  setCurrentSettingScreen,
  setSettingsOpen,
} from '@/redux/slices/settingsSlice';
import { AppDispatch } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

const SettingsList = () => {
  const dispatch: AppDispatch = useDispatch();
  const [avatarUrl, setAvatarUrl] = useState('https://github.com/shadcn.png');
  const handleCancel = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    dispatch(setSettingsOpen(false));
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const newAvatarUrl = URL.createObjectURL(file);
    setAvatarUrl(newAvatarUrl);
  };

  const handleChangeCurrentScreen = () => {
    dispatch(setCurrentSettingScreen('settingSelection'));
  };

  return (
    <div className="flex flex-col items-center py-6 px-4 sm:p-4 cursor-default  relative">
      <span
        className="absolute top-6 right-6 sm:top-4 sm:right-4 text-yellow-500 text-xs cursor-pointer"
        onClick={handleCancel}
      >
        Done
      </span>
      <div className="flex flex-col">
        <p className="font-semibold text-sm">Settings</p>
      </div>
      <div className="relative mt-2">
        <Avatar className="w-11 h-11">
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>CN</AvatarFallback>
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
          className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gray-100 border-[1px] border-gray-100 cursor-pointer"
        >
          <PlusCircle />
        </label>
      </div>
      <p className="text-sm font-semibold mt-2">Atsuki Kitada</p>
      <div className="flex flex-col w-full px-2 mt-6 bg-white rounded-lg divide-y divide-gray-100">
        <div
          className="flex justify-between items-center w-full  text-sm sm:py-2 py-3 cursor-pointer "
          onClick={handleChangeCurrentScreen}
        >
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 p-1 flex items-center justify-center rounded-full bg-black">
              <Moon />
            </div>
            <span className="text-xs">Dark mode</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600">Off</span>
            <div className="h-3 w-3 text-gray-600">
              <ChevronRight />
            </div>
          </div>
        </div>
        <div
          className="flex justify-between items-center w-full text-sm sm:py-2 py-3 cursor-pointer"
          onClick={handleChangeCurrentScreen}
        >
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 p-1 flex items-center justify-center rounded-full bg-yellow-400">
              <Notifications />
            </div>
            <span className="text-xs">Notifications</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600">Off</span>
            <div className="h-3 w-3 text-gray-600">
              <ChevronRight />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsList;