import ChevronDown from '@/components/icons/ChevronDown';
import ChevronLeft from '@/components/icons/ChevronLeft';
import SearchIcon from '@/components/icons/SearchIcon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  setCurrentScreen,
  setSearchDrawerOpen,
} from '@/redux/slices/chatSlice';
import { AppDispatch } from '@/redux/store';
import { ChatRoom } from '@/types';
import { useDispatch } from 'react-redux';

const ChatHeader = ({
  chatRoom,
  isFetchingChatRoom,
}: {
  chatRoom: ChatRoom;
  isFetchingChatRoom: boolean;
}) => {
  const dispatch: AppDispatch = useDispatch();

  console.log(chatRoom);

  return (
    <>
      {isFetchingChatRoom ? null : (
        <div className="min-h-14 w-full bg-white flex justify-between items-center px-6  ">
          <div className="flex gap-3 items-center">
            <div
              className="sm:hidden h-6 w-6"
              onClick={() => dispatch(setCurrentScreen('chatsList'))}
            >
              <ChevronLeft />
            </div>
            <div className="relative">
              <Avatar className="w-9 h-9 cursor-pointer">
                <AvatarImage
                  src={
                    chatRoom?.isDirectMessage
                      ? chatRoom?.partnerUserInfo?.profileImageUrl
                      : chatRoom?.chatRoomImageUrl
                  }
                />
                <AvatarFallback>
                  {chatRoom?.isDirectMessage
                    ? chatRoom?.partnerUserInfo?.username
                        .substring(0, 2)
                        .toUpperCase()
                    : chatRoom?.name?.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {!chatRoom?.isDirectMessage ? null : (
                <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white bg-green-400"></div>
              )}
            </div>
            <div className="flex flex-col justify-center gap-0">
              <p className="font-medium text-sm">
                {chatRoom?.isDirectMessage
                  ? chatRoom?.partnerUserInfo?.username
                  : chatRoom?.name}
              </p>
              {chatRoom?.isDirectMessage && (
                <p className="text-xs">
                  {chatRoom?.partnerUserInfo?.isOnline
                    ? 'Online'
                    : `Last seen at ${chatRoom?.partnerUserInfo?.lastOnlineAt}`}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-between items-center gap-4 ">
            <div
              className="cursor-pointer w-4 h-4"
              onClick={() => dispatch(setSearchDrawerOpen(true))}
            >
              <SearchIcon />
            </div>
            <div className="border-l-[1px] pl-4 cursor-pointer w-8 h-8">
              <ChevronDown />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatHeader;
