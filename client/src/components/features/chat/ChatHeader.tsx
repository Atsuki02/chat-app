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

  const getLastSeenText = (lastOnlineAt: Date | string): string => {
    const date = new Date(lastOnlineAt);

    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);
    const diffHours = Math.round(diffMs / 3600000);
    const diffDays = Math.round(diffMs / 86400000);

    if (diffMins < 60) {
      return `Last seen ${diffMins} mins ago`;
    } else if (diffHours < 24) {
      return `Last seen ${diffHours} hours ago`;
    } else {
      return `Last seen ${diffDays} days ago`;
    }
  };

  <p className="text-xs">
    {chatRoom?.partnerUserInfo?.isOnline ||
    !chatRoom?.partnerUserInfo?.lastOnlineAt
      ? 'Online'
      : getLastSeenText(chatRoom?.partnerUserInfo?.lastOnlineAt)}
  </p>;

  return (
    <>
      {isFetchingChatRoom ? null : (
        <div
          className={`min-h-14  dark:text-foreground text-foreground  w-full bg-background ${isShowGroupMemberList ? 'bg-secondary' : ''} flex opacity-100 justify-between items-center px-6`}
        >
          <div className="flex gap-3 items-center ">
            <div
              className="sm:hidden h-6 w-6"
              onClick={() => dispatch(setCurrentScreen('chatsList'))}
            >
              <ChevronLeft />
            </div>
            <div className="relative" onClick={handleOpenProfile}>
              {chatRoom?.isDirectMessage && (
                <Avatar className="w-9 h-9 cursor-pointer dark:border border dark:text-foreground text-foreground">
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
                <div className="absolute bottom-0.5 right-0.5 w-2 h-2 rounded-full border bg-green-400"></div>
              )}
            </div>
            <>
              {!chatRoom?.isDirectMessage && (
                <div
                  className="flex items-center justify-center gap-0 cursor-pointer"
                  onClick={() => dispatch(setGroupProfileOpen(true))}
                >
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
                    {chatRoom?.partnerUserInfo?.isOnline ||
                    !chatRoom?.partnerUserInfo?.lastOnlineAt
                      ? 'Online'
                      : getLastSeenText(
                          chatRoom?.partnerUserInfo?.lastOnlineAt,
                        )}
                  </p>
                </div>
              )}
            </>
          </div>

          <div className="flex justify-between items-center gap-4">
            <div
              className="cursor-pointer w-4 h-4"
              onClick={() => {
                dispatch(setSearchDrawerOpen(true)),
                  dispatch(setShowGroupMemberList(false));
              }}
            >
              <SearchIcon />
            </div>
            {!chatRoom?.isDirectMessage && (
              <div
                className="border-l-[1px] pl-4 cursor-pointer w-8 h-8"
                onClick={() =>
                  dispatch(setShowGroupMemberList(!isShowGroupMemberList))
                }
              >
                {isShowGroupMemberList ? <ChevronDown /> : <ChevronRight />}
              </div>
            )}
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
