import Cancel from '@/components/icons/Cancel';
import ChatBubbleEllipsis from '@/components/icons/ChatBubbleEllipsis';
import Favorite from '@/components/icons/Favorite';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { setCurrentList, setCurrentScreen } from '@/redux/slices/chatSlice';
import { setFriendProfileOpen } from '@/redux/slices/friendSlice';
import { AppDispatch } from '@/redux/store';
import { useDispatch } from 'react-redux';

const FriendProfileModal = () => {
  const dispatch: AppDispatch = useDispatch();

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

  return (
    <div className="flex flex-col justify-center items-center py-6 px-4 sm:p-4 sm:h-auto h-screen relative text-white">
      <div
        className="absolute w-8 h-8 sm:w-5 sm:h-5 top-6 left-6 sm:top-4 sm:left-4 text-white text-xs"
        onClick={handleCloseModal}
      >
        <Cancel />
      </div>
      <div className="absolute w-8 h-8 sm:w-5 sm:h-5 top-6 right-6 sm:top-4 sm:right-4 text-white text-xs">
        <Favorite fill="rgb(133 77 14)" />
        {/* <Favorite fill={favorited ? 'yellow-500' : 'none'} /> */}
      </div>
      <div className="flex flex-col items-center justify-center mt-56 sm:mt-28">
        <div className="mt-2">
          <Avatar className="sm:w-11 sm:h-11 w-20 h-20">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <p className="sm:text-sm text-2xl font-semibold mt-4 sm:mt-2">
          Atsuki Kitada
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
