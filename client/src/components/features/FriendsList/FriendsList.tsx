import Hamburger from '@/components/icons/Hamburger';
import Pencil from '@/components/icons/Pencil';
import SearchIcon from '@/components/icons/SearchIcon';
import { Input } from '@/components/ui';
import Loading from '@/components/ui/Loading';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  useGetAllUsersQuery,
  useGetFavoriteUsersQuery,
} from '@/redux/services/userService';
import { setSideBarDrawerOpen } from '@/redux/slices/chatSlice';
import { setCreateDrawerOpen } from '@/redux/slices/createGroupSlice';
import {
  setFriendProfileOpen,
  setSelectedFriendId,
} from '@/redux/slices/friendSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { Friend } from '@/types';
import { useDispatch, useSelector } from 'react-redux';

const FriendsList = () => {
  const dispatch: AppDispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.auth);

  const { data: friends, isLoading: isFetchingFriends } = useGetAllUsersQuery(
    {},
  );
  const { data: favoriteFriends, isLoading: isFetchingFavoriteFriends } =
    useGetFavoriteUsersQuery(user?.id, {
      skip: !user?.id,
    });

  const handleClick = (friendId: string) => {
    dispatch(setSelectedFriendId(friendId));
    dispatch(setFriendProfileOpen(true));
  };

  return (
    <>
      {isFetchingFriends || isFetchingFavoriteFriends ? (
        <Loading />
      ) : (
        <div className="p-4 bg-white h-screen flex flex-col gap-2 overflow-auto hide-scrollbar">
          <div className="flex justify-between items-center mb-4">
            <div
              className="text-blue-500 h-6 w-6 cursor-pointer"
              onClick={() => dispatch(setSideBarDrawerOpen(true))}
            >
              <Hamburger />
            </div>
            <h2 className="text-lg font-semibold  text-slate-800">Friends</h2>
            <div
              className="text-blue-500 h-5 w-5 cursor-pointer"
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
              className="pl-9 bg-blue-50 focus-visible:ring-blue-400 rounded-lg h-8"
            />
          </div>

          <span className="font-semibold pb-2 text-slate-800">Favorites</span>
          <ul className="list-none m-0 pb-2">
            {favoriteFriends?.map((friend: Friend) => (
              <li
                key={friend.id}
                className={`flex items-center mb-1 last:mb-0 cursor-pointer p-2 rounded-xl`}
                onClick={() => handleClick(friend.id)}
              >
                <div className="flex gap-3 items-center">
                  <div className="relative">
                    <Avatar className="w-9 h-9 cursor-pointer">
                      <AvatarImage src={friend?.profileImageUrl} />
                      <AvatarFallback>
                        {friend?.username.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex justify-between max-w-32">
                    <div className="flex-1 max-w-28">
                      <p className="font-medium text-sm truncate">
                        {friend?.username}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <span className="font-semibold pb-2 text-slate-800">All friends</span>
          <ul className="list-none m-0 pb-2">
            {friends
              ?.filter((friend: { id: string }) => friend.id !== user?.id)
              .map((friend: Friend) => (
                <li
                  key={friend.id}
                  className={`flex items-center mb-1 last:mb-0 cursor-pointer p-2 rounded-xl`}
                  onClick={() => handleClick(friend.id)}
                >
                  <div className="flex gap-3 items-center">
                    <div className="relative">
                      <Avatar className="w-9 h-9 cursor-pointer">
                        <AvatarImage src={friend?.profileImageUrl} />
                        <AvatarFallback>
                          {friend?.username.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex justify-between max-w-32">
                      <div className="flex-1 max-w-28">
                        <p className="font-medium text-sm truncate">
                          {friend?.username}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default FriendsList;
