import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { setCurrentList, setSideBarDrawerOpen } from '@/redux/slices/chatSlice';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Settings from '@/components/icons/Settings';
import Chat from '@/components/icons/Chat';
import People from '@/components/icons/People';
import { setSettingsOpen } from '@/redux/slices/settingsSlice';
import { useGetUserQuery } from '@/redux/services/userService';
import Loading from '@/components/ui/Loading';

const SideBar = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isSideBarDrawerOpen, currentList } = useSelector(
    (state: RootState) => state.chat,
  );

  const { user } = useSelector((state: RootState) => state.auth);

  const { data, isLoading } = useGetUserQuery(user?.id, {
    skip: !user?.id,
  });

  const handleOpenChange = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    dispatch(setSideBarDrawerOpen(isSideBarDrawerOpen));
  };

  const handleChangeListToChat = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    dispatch(setCurrentList('chats'));
    dispatch(setSideBarDrawerOpen(false));
  };

  const handleChangeListToFriends = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    dispatch(setCurrentList('friends'));
    dispatch(setSideBarDrawerOpen(false));
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Drawer
          direction="left"
          open={isSideBarDrawerOpen}
          onOpenChange={(isSideBarDrawerOpen) =>
            dispatch(setSideBarDrawerOpen(isSideBarDrawerOpen))
          }
        >
          <DrawerContent onClick={handleOpenChange}>
            <div className="flex flex-col mx-auto w-full max-w-sm font-main text-sm">
              <div className="flex justify-between items-center mb-4 p-4  ">
                <div className="flex justify-start items-center">
                  <Avatar className="w-7 h-7 cursor-pointer mr-2 ">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <span className="font-medium  text-sm text-slate-800 truncate max-w-32 break-words">
                    {data?.username}
                  </span>
                </div>
                <div
                  className="h-6 w-6 text-yellow-500"
                  onClick={() => dispatch(setSettingsOpen(true))}
                >
                  <Settings />
                </div>
              </div>
              <div className="flex flex-col px-2.5 gap-1.5">
                <div
                  className={`flex justify-start items-center gap-3 p-1.5 rounded-lg hover:bg-gray-200 ${currentList === 'chats' ? 'bg-gray-200' : 'bg-white'}`}
                  onClick={handleChangeListToChat}
                >
                  <div className="h-7 w-7 border-1 p-1.5 rounded-lg bg-gray-200">
                    <Chat />
                  </div>
                  <p>Chats</p>
                </div>
                <div
                  className={`flex justify-start items-center gap-3 p-1.5 rounded-lg hover:bg-gray-200 ${currentList === 'friends' ? 'bg-gray-200' : 'bg-white'}`}
                  onClick={handleChangeListToFriends}
                >
                  <div className="h-7 w-7 border-1 p-1.5 rounded-lg bg-gray-200">
                    <People />
                  </div>
                  <p>Friends</p>
                </div>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default SideBar;
