import ChevronDown from '@/components/icons/ChevronDown';
import ChevronLeft from '@/components/icons/ChevronLeft';
import ChevronRight from '@/components/icons/ChevronRight';
import SearchIcon from '@/components/icons/SearchIcon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  setCurrentScreen,
  setGroupProfileOpen,
  setSearchDrawerOpen,
  setShowGroupMemberList,
} from '@/redux/slices/chatSlice';
import {
  setFriendProfileOpen,
  setSelectedFriendId,
} from '@/redux/slices/friendSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { ChatRoom } from '@/types';
import { useDispatch, useSelector } from 'react-redux';
import GroupMemberList from './GroupMemberList';

const ChatHeader = ({
  chatRoom,
  isFetchingChatRoom,
}: {
  chatRoom: ChatRoom;
  isFetchingChatRoom: boolean;
}) => {
  const dispatch: AppDispatch = useDispatch();

  const { isShowGroupMemberList } = useSelector(
    (state: RootState) => state.chat,
  );

  const handleOpenProfile = () => {
    if (chatRoom.isDirectMessage) {
      dispatch(setSelectedFriendId(chatRoom?.partnerUserInfo?.id));
      dispatch(setFriendProfileOpen(true));
    } else {
      dispatch(setGroupProfileOpen(true));
    }
  };

  return (
    <>
      {isFetchingChatRoom ? null : (
        <div
          className={`min-h-14 w-full ${isShowGroupMemberList ? 'bg-white' : 'bg-blue-50'} flex opacity-80 justify-between items-center px-6`}
        >
          <div className="flex gap-3 items-center">
            <div
              className="sm:hidden h-6 w-6"
              onClick={() => dispatch(setCurrentScreen('chatsList'))}
            >
              <ChevronLeft />
            </div>
            <div className="relative" onClick={handleOpenProfile}>
              {chatRoom?.isDirectMessage && (
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
              )}
              {!chatRoom?.isDirectMessage ? null : (
                <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white bg-green-400"></div>
              )}
            </div>
            <>
              {!chatRoom?.isDirectMessage && (
                <div className="flex items-center justify-center gap-0">
                  <p className="font-bold text-sm">{chatRoom?.name} </p>
                  <span className="px-1">
                    ({chatRoom?.chatRoomMembership.length})
                  </span>
                </div>
              )}
              {chatRoom?.isDirectMessage && (
                <div className="flex flex-col justify-center gap-0">
                  <p className="font-bold text-sm">
                    {chatRoom?.partnerUserInfo?.username}
                  </p>
                  <p className="text-xs">
                    {chatRoom?.partnerUserInfo?.isOnline
                      ? 'Online'
                      : `Last seen at ${chatRoom?.partnerUserInfo?.lastOnlineAt}`}
                  </p>
                </div>
              )}
            </>
          </div>

          <div className="flex justify-between items-center gap-4 ">
            <div
              className="cursor-pointer w-4 h-4"
              onClick={() => dispatch(setSearchDrawerOpen(true))}
            >
              <SearchIcon />
            </div>
            <div
              className="border-l-[1px] pl-4 cursor-pointer w-8 h-8"
              onClick={() =>
                dispatch(setShowGroupMemberList(!isShowGroupMemberList))
              }
            >
              {isShowGroupMemberList ? <ChevronDown /> : <ChevronRight />}
            </div>
          </div>
        </div>
      )}
      {!chatRoom?.isDirectMessage && isShowGroupMemberList && (
        <GroupMemberList
          chatRoom={chatRoom}
          isFetchingChatRoom={isFetchingChatRoom}
        />
      )}
    </>
  );
};

export default ChatHeader;
