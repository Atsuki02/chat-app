import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { setSettingsOpen } from '@/redux/slices/settingsSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';

import SettingSelection from './SettingSelection';
import SettingsList from './SettingsList';

const Settings = () => {
  const dispatch: AppDispatch = useDispatch();

  const { isSettingsOpen, currentSettingScreen } = useSelector(
    (state: RootState) => state.settings,
  );

  const handleOpenChange = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    dispatch(setSettingsOpen(isSettingsOpen));
  };

  const renderContent = () => {
    switch (currentSettingScreen) {
      case 'settingsList':
        return <SettingsList />;
      case 'darkModeSelection':
        return <SettingSelection type="darkModeSelection" />;
      case 'notificationsSelection':
        return <SettingSelection type="notificationsSelection" />;
      default:
        return null;
    }
  };

  return (
    <Drawer
      modal={true}
      direction="bottom"
      open={isSettingsOpen}
      onOpenChange={(isSettingsDrawerOpen) =>
        dispatch(setSettingsOpen(isSettingsDrawerOpen))
      }
    >
      <DrawerContent
        className="flex bg-gray-100 font-main inset-x-0 top-auto sm:inset-0 m-auto w-full h-[500px] sm:min-w-96 sm:w-[300px] sm:h-[350px] rounded-tl-lg rounded-tr-lg sm:rounded-lg after:hidden"
        onClick={handleOpenChange}
      >
        {renderContent()}
      </DrawerContent>
    </Drawer>
  );
};

export default Settings;
