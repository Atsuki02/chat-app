import Hamburger from '@/components/icons/Hamburger';
import Pencil from '@/components/icons/Pencil';
import SearchIcon from '@/components/icons/SearchIcon';
import { Input } from '@/components/ui';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { setSideBarDrawerOpen } from '@/redux/slices/chatSlice';
import { setCreateDrawerOpen } from '@/redux/slices/createGroupSlice';
import { setFriendProfileOpen } from '@/redux/slices/friendSlice';
import { AppDispatch } from '@/redux/store';
import { useDispatch } from 'react-redux';

const friends = [
  {
    id: '1',
    name: 'Alice',
    status: 'Online',
    message: 'How are youuuuuuuuuuuuuuuuu?',
    image: 'path/to/alice.jpg',
    createdAt: '10: 41 am',
    selected: true,
  },
  {
    id: '2',
    name: 'Bob',
    status: 'Online',
    message: "I'm fine",
    image: 'path/to/bob.jpg',
    createdAt: 'Dec 17, 2023',
  },
  {
    id: '3',
    name: 'Bob',
    status: 'Online',
    message: "I'm fine",
    image: 'path/to/bob.jpg',
    createdAt: 'Dec 17, 2023',
  },
];

const FriendsList = () => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <div className="p-4 bg-white h-screen flex flex-col gap-2 overflow-auto ">
      <div className="flex justify-between items-center mb-4">
        <div
          className="text-yellow-500 h-6 w-6 cursor-pointer"
          onClick={() => dispatch(setSideBarDrawerOpen(true))}
        >
          <Hamburger />
        </div>
        <h2 className="text-lg font-semibold  text-slate-800">Friends</h2>
        <div
          className="text-yellow-500 h-5 w-5 cursor-pointer"
          onClick={() => dispatch(setCreateDrawerOpen(true))}
        >
          <Pencil />
        </div>
      </div>
      <div className="pb-4 relative">
        <div className="absolute top-0 left-0 translate-x-1/2 translate-y-1/2 w-4 h-4">
          <SearchIcon />
        </div>
        <Input
          type="text"
          placeholder="Search..."
          className="pl-9 bg-yellow-50 focus-visible:ring-yellow-400 rounded-lg h-8"
        />
      </div>

      <span className="font-semibold pb-2 text-slate-800">Favorites</span>
      <ul className="list-none m-0 pb-2">
        {friends.map((friend) => (
          <li
            key={friend.id}
            className={`flex items-center mb-1 last:mb-0 cursor-pointer p-2 rounded-xl`}
            onClick={() => dispatch(setFriendProfileOpen(true))}
          >
            <div className="flex gap-3 items-center">
              <div className="relative">
                <Avatar className="w-9 h-9 cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex justify-between max-w-32">
                <div className="flex-1 max-w-28">
                  <p className="font-medium text-sm truncate">{friend.name}</p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <span className="font-semibold pb-2 text-slate-800">All friends</span>
      <ul className="list-none m-0 pb-2">
        {friends.map((friend) => (
          <li
            key={friend.id}
            className={`flex items-center mb-1 last:mb-0 cursor-pointer p-2 rounded-xl`}
            onClick={() => dispatch(setFriendProfileOpen(true))}
          >
            <div className="flex gap-3 items-center">
              <div className="relative">
                <Avatar className="w-9 h-9 cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex justify-between max-w-32">
                <div className="flex-1 max-w-28">
                  <p className="font-medium text-sm truncate">{friend.name}</p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendsList;
