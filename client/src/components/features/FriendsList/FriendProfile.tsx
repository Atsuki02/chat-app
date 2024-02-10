import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setFriendProfileOpen } from '@/redux/slices/friendSlice';
import FriendProfileModal from './FriendProfileModal';

const FriendProfile = () => {
  const dispatch: AppDispatch = useDispatch();

  const { isFriendProfileOpen } = useSelector(
    (state: RootState) => state.friend,
  );

  const handleOpenChange = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    dispatch(setFriendProfileOpen(isFriendProfileOpen));
  };

  return (
    <Drawer
      modal={true}
      direction="bottom"
      open={isFriendProfileOpen}
      onOpenChange={(isFriendProfileOpen) =>
        dispatch(setFriendProfileOpen(isFriendProfileOpen))
      }
    >
      <DrawerContent
        className="flex bg-gradient-to-b from-yellow-400 via-yellow-300 to-yellow-400 font-main inset-x-0 top-auto sm:inset-0 m-auto w-full h-full sm:min-w-96 sm:w-[300px] sm:h-[350px] rounded-tl-lg  rounded-tr-lg sm:rounded-lg after:hidden"
        onClick={handleOpenChange}
      >
        <FriendProfileModal />
      </DrawerContent>
    </Drawer>
  );
};

export default FriendProfile;
