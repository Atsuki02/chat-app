import Chat from '@/components/features/chat/Chat';
import FriendList from '@/components/features/friendList/FriendList';
import SideBar from '@/components/features/sideBar/SideBar';

function Home() {
  return (
    <div className="flex w-screen h-screen">
      <div className="w-1/12 bg-slate-300">
        <SideBar />
      </div>
      <div className="w-3/12 bg-slate-500">
        <FriendList />
      </div>
      <div className="w-8/12 bg-neutral-700">
        <Chat />
      </div>
    </div>
  );
}

export default Home;
