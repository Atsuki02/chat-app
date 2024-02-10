import { Drawer, DrawerContent } from '@/components/ui/drawer';

import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';

import SetUpGroupProfile from './SetUpGroupProfile';
import { setCreateDrawerOpen } from '@/redux/slices/createGroupSlice';
import CreateGroup from './CreateGroup';

const Create = () => {
  const dispatch: AppDispatch = useDispatch();

  const { isCreateDrawerOpen, currentScreen } = useSelector(
    (state: RootState) => state.createGroup,
  );

  const handleOpenChange = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    dispatch(setCreateDrawerOpen(isCreateDrawerOpen));
  };

  return (
    <Drawer
      modal={true}
      direction="bottom"
      open={isCreateDrawerOpen}
      onOpenChange={(isCreateDrawerOpen) =>
        dispatch(setCreateDrawerOpen(isCreateDrawerOpen))
      }
      onClose={() => dispatch(setCreateDrawerOpen(false))}
    >
      <DrawerContent
        onClick={handleOpenChange}
        className="flex   bg-white font-main inset-x-0 top-auto sm:inset-0 m-auto w-full h-[600px] sm:min-w-96 sm:w-[300px] sm:h-[350px] rounded-tl-lg  rounded-tr-lg sm:rounded-lg after:hidden"
      >
        {currentScreen === 'selectMembers' ? (
          <CreateGroup />
        ) : (
          <SetUpGroupProfile />
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default Create;
