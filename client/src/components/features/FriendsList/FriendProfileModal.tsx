import Cancel from '@/components/icons/Cancel';
import ChatBubbleEllipsis from '@/components/icons/ChatBubbleEllipsis';
import Favorite from '@/components/icons/Favorite';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  useAddFavoriteUserMutation,
  useGetFavoriteUsersQuery,
  useGetUserQuery,
  useRemoveFavoriteUserMutation,
} from '@/redux/services/userService';
import { setCurrentList, setCurrentScreen } from '@/redux/slices/chatSlice';
import { setFriendProfileOpen } from '@/redux/slices/friendSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { Friend } from '@/types';
import { useDispatch, useSelector } from 'react-redux';

const FriendProfileModal = () => {
  const dispatch: AppDispatch = useDispatch();

  const { selectedFriendId } = useSelector((state: RootState) => state.friend);

  const { data: friend } = useGetUserQuery(selectedFriendId, {
    skip: !selectedFriendId,
  });

  const { user } = useSelector((state: RootState) => state.auth);

  const userId = user?.id;

  const { data: favoriteFriends } = useGetFavoriteUsersQuery(user?.id, {
    skip: !user?.id,
  });

  const [addFavoriteUser] = useAddFavoriteUserMutation();
  const [removeFavoriteUser] = useRemoveFavoriteUserMutation();

  const isFavorite = favoriteFriends?.some(
    (favFriend: Friend) => favFriend.id === friend?.id,
  );

  const handleCloseModal = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    dispatch(setFriendProfileOpen(false));
  };

  const handleCreateGroup = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    dispatch(setFriendProfileOpen(false));
    dispatch(setCurrentScreen('chatsList'));
    dispatch(setCurrentList('chats'));
  };

  const handleToggleFavorites = async () => {
    if (isFavorite) {
      try {
        await removeFavoriteUser({
          userId: userId,
          favoriteUserId: selectedFriendId,
        }).unwrap();
      } catch (error) {
        console.error('Failed to remove from favorites:', error);
      }
    } else {
      try {
        await addFavoriteUser({
          userId: userId,
          favoriteUserId: selectedFriendId,
        }).unwrap();
      } catch (error) {
        console.error('Failed to add to favorites:', error);
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center py-6 px-4 sm:p-4 sm:h-auto h-screen relative text-white">
      <div
        className="absolute w-8 h-8 sm:w-5 sm:h-5 top-6 left-6 sm:top-4 sm:left-4 text-white text-xs"
        onClick={handleCloseModal}
      >
        <Cancel />
      </div>
      <div
        className="absolute w-8 h-8 sm:w-5 sm:h-5 top-6 right-6 sm:top-4 sm:right-4 text-white text-xs"
        onClick={handleToggleFavorites}
      >
        <Favorite fill={isFavorite ? 'rgb(0 185 129)' : 'none'} />
      </div>
      <div className="flex flex-col items-center justify-center mt-56 sm:mt-28">
        <div className="mt-2">
          <Avatar className="sm:w-11 sm:h-11 w-20 h-20 text-slate-800">
            <AvatarImage src={friend?.profileImageUrl} />
            <AvatarFallback>
              {friend?.username.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
        <p className="sm:text-sm text-2xl font-semibold mt-4 sm:mt-2">
          {friend?.username}
        </p>
        <div className="sm:mt-8 mt-14">
          <div
            className="sm:h-7 sm:w-7 h-14 w-14 text-yellow-400"
            onClick={handleCreateGroup}
          >
            <ChatBubbleEllipsis />
          </div>
          <p className="sm:text-xs font-semibold text-lg pt-2 sm:pt-1">Chat</p>
        </div>
      </div>
    </div>
  );
};

export default FriendProfileModal;
