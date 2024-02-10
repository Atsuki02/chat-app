import Check from '@/components/icons/Check';
import ChevronLeft from '@/components/icons/ChevronLeft';
import {
  setCurrentSettingScreen,
  setSettingsOpen,
} from '@/redux/slices/settingsSlice';
import { AppDispatch } from '@/redux/store';
import { useDispatch } from 'react-redux';

const SettingSelection = () => {
  const dispatch: AppDispatch = useDispatch();
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
        className="absolute w-5 h-5 top-6 left-6 sm:top-4 sm:left-4 text-yellow-500 text-xs"
        onClick={handleChangeCurrentScreen}
      >
        <ChevronLeft />
      </div>
      <span
        className="absolute top-6 right-6 sm:top-4 sm:right-4 text-yellow-500 text-xs"
        onClick={handleCancel}
      >
        Done
      </span>
      <div className="flex flex-col">
        <p className="font-semibold text-sm">Dark mode</p>
      </div>

      <div className="flex flex-col w-full px-3 mt-6 bg-white rounded-lg divide-y divide-gray-100">
        <div className="flex justify-between items-center w-full text-sm sm:py-2 py-3 ">
          <div className="flex items-center gap-2">
            <span className="text-xs">On</span>
          </div>
          <div className="flex items-center">
            <div className="h-4 w-4 font text-yellow-400">
              <Check />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center w-full text-sm sm:py-2 py-3 ">
          <div className="flex items-center gap-2">
            <span className="text-xs">Off</span>
          </div>
          <div className="flex items-center">
            <div className="h-4 w-4 font text-yellow-400">
              {/* <Check /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingSelection;
