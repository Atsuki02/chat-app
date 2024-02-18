import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import GroupProfileModal from './GroupProfileModal';
import { setGroupProfileOpen } from '@/redux/slices/chatSlice';

const GroupProfile = () => {
  const dispatch: AppDispatch = useDispatch();

  const { isGroupProfileOpen } = useSelector((state: RootState) => state.chat);

  const handleOpenChange = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    dispatch(setGroupProfileOpen(isGroupProfileOpen));
  };

  return (
    <Drawer
      modal={true}
      direction="bottom"
      open={isGroupProfileOpen}
      onOpenChange={(isGroupProfileOpen) =>
        dispatch(setGroupProfileOpen(isGroupProfileOpen))
      }
    >
      <DrawerContent
        className="flex bg-gradient-to-b from-blue-400 via-blue-300 to-blue-400 font-main inset-x-0 top-auto sm:inset-0 m-auto w-full h-full sm:min-w-96 sm:w-[300px] sm:h-[350px] rounded-tl-lg  rounded-tr-lg sm:rounded-lg after:hidden"
        onClick={handleOpenChange}
      >
        <GroupProfileModal />
      </DrawerContent>
    </Drawer>
  );
};

export default GroupProfile;
