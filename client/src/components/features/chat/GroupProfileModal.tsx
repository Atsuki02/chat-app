import Cancel from '@/components/icons/Cancel';

import Pin from '@/components/icons/Pin';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import {
  useGetChatRoomByIdAndUserIdQuery,
  useLeaveChatRoomMutation,
  usePinChatRoomMutation,
  useUnPinChatRoomMutation,
} from '@/redux/services/userService';
import {
  setCurrentList,
  setCurrentScreen,
  setGroupProfileOpen,
  setSelectedChatRoom,
} from '@/redux/slices/chatSlice';

import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import Leave from './Leave';

const GroupProfileModal = () => {
  const dispatch: AppDispatch = useDispatch();

  const { selectedChatRoom } = useSelector((state: RootState) => state.chat);
  const { user } = useSelector((state: RootState) => state.auth);

  const { data: chatRoom } = useGetChatRoomByIdAndUserIdQuery(
    {
      userId: user?.id,
      chatRoomId: selectedChatRoom,
    },
    {
      skip: !user?.id || !selectedChatRoom,
    },
  );

  const userId = user?.id;

  const [pinChatRoom] = usePinChatRoomMutation();
  const [unPinChatRoom] = useUnPinChatRoomMutation();

  const handleCloseModal = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    dispatch(setGroupProfileOpen(false));
  };

  const [leaveChatRoom] = useLeaveChatRoomMutation();

  const handleLeaveChatRoom = async () => {
    try {
      await leaveChatRoom({
        userId: userId,
        chatRoomId: selectedChatRoom,
      }).unwrap();

      dispatch(setCurrentScreen('chatsList'));
      dispatch(setCurrentList('chats'));
      dispatch(setSelectedChatRoom(''));
      dispatch(setGroupProfileOpen(false));
      console.log('Direct message chat room created successfully.');
    } catch (err) {
      console.error('Failed to create a direct message chat room.');
    }
  };

  const handleTogglePinned = async () => {
    if (!chatRoom?.isPinned) {
      try {
        console.log({
          userId: userId,
          chatRoomId: selectedChatRoom,
        });
        await pinChatRoom({
          userId: userId,
          chatRoomId: selectedChatRoom,
        }).unwrap();
      } catch (error) {
        console.error('Failed to pin the chatRoom:', error);
      }
    } else {
      try {
        await unPinChatRoom({
          userId: userId,
          chatRoomId: selectedChatRoom,
        }).unwrap();
      } catch (error) {
        console.error('Failed to unPin the chatRoom:', error);
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center py-6 px-4 sm:p-4 sm:h-auto h-screen relative ">
      <div
        className="absolute w-8 h-8 sm:w-5 sm:h-5 top-6 left-6 sm:top-4 sm:left-4 text-foreground  text-xs"
        onClick={handleCloseModal}
      >
        <Cancel />
      </div>
      <div
        className="absolute w-8 h-8 sm:w-5 sm:h-5 top-6 right-6 sm:top-4 sm:right-4 text-foreground  text-xs"
        onClick={handleTogglePinned}
      >
        <Pin isFilled={chatRoom?.isPinned} />
      </div>
      <div className="flex flex-col items-center justify-center mt-56 sm:mt-28">
        <div className="mt-2">
          <Avatar className="sm:w-11 sm:h-11 w-20 h-20 text-foreground bg-background">
            <AvatarImage src={chatRoom?.chatRoomImageUrl} />
            <AvatarFallback>
              {chatRoom?.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
        <p className="sm:text-sm text-2xl font-semibold mt-4 sm:mt-2">
          {chatRoom?.name}
        </p>
        <div className="sm:mt-8 mt-14 flex flex-col items-center">
          <div
            className="sm:h-7 sm:w-7 h-14 w-14  text-foreground"
            onClick={handleLeaveChatRoom}
          >
            <Leave />
          </div>
          <p className="sm:text-xs font-semibold text-lg pt-2">Leave</p>
        </div>
      </div>
    </div>
  );
};

export default GroupProfileModal;
