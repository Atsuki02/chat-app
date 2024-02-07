import Chat from '@/components/features/chat/Chat';
import FriendList from '@/components/features/friendList/FriendList';
import SideBar from '@/components/features/sideBar/SideBar';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

function Home() {
  const { currentScreen } = useSelector((state: RootState) => state.chat);
  const isDesktop: boolean = useMediaQuery({ query: '(min-width: 768px)' });

  return (
    <>
      {isDesktop ? (
        // Desktop view
        <div className="flex w-screen h-screen font-main">
          <div className="hidden sm:block ">
            <SideBar />
          </div>
          <div className="hidden sm:block w-3/12 sm:min-w-72 bg-slate-500">
            <FriendList />
          </div>
          <div className="w-full sm:max-w-9/12 ">
            <Chat />
          </div>
        </div>
      ) : (
        // Mobile view
        <>
          <div className="flex w-screen h-screen font-main">
            <div className="hidden sm:block ">
              <SideBar />
            </div>
            {currentScreen === 'friendList' ? (
              <div className="sm:block w-full sm:min-w-72 bg-slate-500">
                <FriendList />
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
