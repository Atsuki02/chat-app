import Create from '@/components/features/Create/Create';
import FriendProfile from '@/components/features/FriendsList/FriendProfile';
import FriendsList from '@/components/features/FriendsList/FriendsList';
import Chat from '@/components/features/chat/Chat';
import EmptyChat from '@/components/features/chat/EmptyChat';
import ChatsList from '@/components/features/chatsList/ChatsList';
import Settings from '@/components/features/settings/Settings';
import SideBar from '@/components/features/sideBar/SideBar';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

function Home() {
  const { currentScreen, currentList, selectedChatRoom } = useSelector(
    (state: RootState) => state.chat,
  );
  const { isSettingsOpen } = useSelector((state: RootState) => state.settings);
  const { isCreateDrawerOpen } = useSelector(
    (state: RootState) => state.createGroup,
  );
  const { isFriendProfileOpen } = useSelector(
    (state: RootState) => state.friend,
  );
  const isDesktop: boolean = useMediaQuery({ query: '(min-width: 640px)' });
  const isTablet: boolean = useMediaQuery({
    query: '(min-width: 640px) and (max-width: 1024px)',
  });

  return (
    <>
      {isDesktop || isTablet ? (
        // Desktop view

        <div className="flex w-screen h-screen font-main">
          <div className="hidden sm:block h-full">
            <SideBar />
            {isSettingsOpen && <Settings />}
            {isCreateDrawerOpen && <Create />}
          </div>
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel
              minSize={isTablet ? 45 : 25}
              defaultSize={isTablet ? 45 : 25}
            >
              <div className="hidden sm:block w-full bg-slate-500">
                {currentList === 'chats' ? <ChatsList /> : <FriendsList />}
                {isFriendProfileOpen && <FriendProfile />}
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel
              minSize={isTablet ? 45 : 35}
              defaultSize={isTablet ? 55 : 75}
            >
              <div className="w-full h-full relative ">
                {currentList === 'chats' && selectedChatRoom ? (
                  <Chat />
                ) : (
                  <EmptyChat />
                )}
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      ) : (
        // Mobile view
        <>
          <div className="flex w-screen h-screen font-main">
            <div className="hidden sm:block ">
              <SideBar />
              {isSettingsOpen && <Settings />}
              {isCreateDrawerOpen && <Create />}
            </div>
            {currentScreen === 'chatsList' ? (
              <div className="sm:block w-full  sm:min-w-72 bg-slate-500">
                {currentList === 'chats' ? <ChatsList /> : <FriendsList />}
                {isFriendProfileOpen && <FriendProfile />}
              </div>
            ) : (
              <div className="w-full">
                <Chat />
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default Home;
