import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { setDrawerOpen } from '@/redux/slices/chatSlice';

const SideBar = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isDrawerOpen } = useSelector((state: RootState) => state.chat);

  return (
    <Drawer
      open={isDrawerOpen}
      onOpenChange={(isDrawerOpen) => dispatch(setDrawerOpen(isDrawerOpen))}
    >
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm"></div>
      </DrawerContent>
    </Drawer>
  );
};

export default SideBar;
