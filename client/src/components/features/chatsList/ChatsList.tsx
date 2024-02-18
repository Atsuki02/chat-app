import Hamburger from '@/components/icons/Hamburger';
import Pencil from '@/components/icons/Pencil';
import SearchIcon from '@/components/icons/SearchIcon';
import { Input } from '@/components/ui';
import Loading from '@/components/ui/Loading';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useGetUserChatRoomsQuery } from '@/redux/services/userService';
import {
  setCurrentScreen,
  setSelectedChatRoom,
  setSideBarDrawerOpen,
} from '@/redux/slices/chatSlice';
import { setCreateDrawerOpen } from '@/redux/slices/createGroupSlice';

import { AppDispatch, RootState } from '@/redux/store';
import { ChatRoom } from '@/types';
import { useDispatch, useSelector } from 'react-redux';

const ChatsList = () => {
  const dispatch: AppDispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.auth);
  const { selectedChatRoom } = useSelector((state: RootState) => state.chat);

  const { data: chatRooms, isLoading: isFetchingChatRooms } =
    useGetUserChatRoomsQuery(user?.id, {
      skip: !user?.id,
    });

  const sortChatRoomsByLastMessage = (chatRooms: ChatRoom[]) => {
    return chatRooms.sort((a, b) => {
      const lastMessageATime =
        a.messages.length > 0
          ? new Date(a.messages[a.messages.length - 1].createdAt).getTime()
          : 0;
      const lastMessageBTime =
        b.messages.length > 0
          ? new Date(b.messages[b.messages.length - 1].createdAt).getTime()
          : 0;

      return lastMessageBTime - lastMessageATime;
    });
  };

  const sortedChatRooms = chatRooms
    ? sortChatRoomsByLastMessage([...chatRooms])
    : [];

  const handleSelectChatRoom = (roomId: string) => {
    dispatch(setSelectedChatRoom(roomId));
    dispatch(setCurrentScreen('chats'));
  };

  return (
    <>
      {isFetchingChatRooms ? (
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
            <h2 className="text-lg font-semibold  text-slate-800">Chats</h2>
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

          <span className="font-semibold pb-2 text-slate-800">Pinned</span>
          <ul className="list-none m-0 pb-2">
            {sortedChatRooms
              ?.filter((chatRoom: ChatRoom) => chatRoom?.isPinned)
              ?.map((chatRoom: ChatRoom, i: number) => {
                const lastMessage =
                  chatRoom?.messages[chatRoom.messages.length - 1];
                console.log(selectedChatRoom, chatRoom?.id);
                return (
                  <li
                    key={i}
                    className={`flex items-center mb-4 last:mb-0 cursor-pointer p-3 rounded-xl hover:bg-blue-300 ${chatRoom?.id === selectedChatRoom ? 'bg-blue-400' : ''}`}
                    onClick={() => handleSelectChatRoom(chatRoom?.id)}
                  >
                    <div className="flex gap-3 items-center">
                      <div className="relative">
                        <Avatar className="w-9 h-9 cursor-pointer">
                          <AvatarImage
                            src={
                              !chatRoom.isDirectMessage
                                ? chatRoom.chatRoomImageUrl
                                : chatRoom?.partnerUserInfo?.profileImageUrl
                            }
                          />
                          <AvatarFallback>
                            {!chatRoom?.isDirectMessage
                              ? chatRoom?.name?.substring(0, 2).toUpperCase()
                              : chatRoom?.partnerUserInfo?.username
                                  .substring(0, 2)
                                  .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        {chatRoom.isDirectMessage && (
                          <div className="absolute bottom-0 right-0 bg-blue-400 w-3 h-3 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div className="flex justify-between max-w-32">
                        <div className="flex-1 max-w-28">
                          <p className="font-medium text-sm truncate">
                            {chatRoom.name}
                          </p>
                          <p className="text-xs text-slate-500 truncate w-full">
                            {lastMessage?.content}
                          </p>
                        </div>
                        <div className="text-xs flex items-end text-slate-500 pl-4 whitespace-nowrap">
                          {chatRoom?.isDirectMessage &&
                            new Date(lastMessage?.createdAt).toLocaleTimeString(
                              [],
                              {
                                hour: '2-digit',
                                minute: '2-digit',
                              },
                            )}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>

          <span className="font-semibold pb-2 text-slate-800">All chats</span>
          <ul className="list-none m-0 pb-2">
            {sortedChatRooms.map((chatRoom: ChatRoom, i: number) => {
              const lastMessage =
                chatRoom.messages[chatRoom.messages.length - 1];

              return (
                <li
                  key={i}
                  className={`flex items-center mb-4 last:mb-0 cursor-pointer p-3 rounded-xl hover:bg-blue-300 ${chatRoom?.id === selectedChatRoom ? 'bg-blue-300' : ''}`}
                  onClick={() => handleSelectChatRoom(chatRoom.id)}
                >
                  <div className="flex gap-3 items-center">
                    <div className="relative">
                      <Avatar className="w-9 h-9 cursor-pointer">
                        <AvatarImage
                          src={
                            !chatRoom.isDirectMessage
                              ? chatRoom.chatRoomImageUrl
                              : chatRoom?.partnerUserInfo?.profileImageUrl
                          }
                        />
                        <AvatarFallback>
                          {!chatRoom?.isDirectMessage
                            ? chatRoom?.name?.substring(0, 2).toUpperCase()
                            : chatRoom?.partnerUserInfo?.username
                                .substring(0, 2)
                                .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      {chatRoom.isDirectMessage && (
                        <div className="absolute bottom-0 right-0 bg-green-400 w-3 h-3 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex justify-between max-w-32">
                      <div className="flex-1 max-w-28">
                        <p className="font-medium text-sm truncate">
                          {!chatRoom.isDirectMessage
                            ? chatRoom.name
                            : chatRoom?.partnerUserInfo?.username}
                        </p>
                        <p className="text-xs text-slate-500 truncate w-full">
                          {lastMessage?.content}
                        </p>
                      </div>
                      <div className="text-xs flex items-end text-slate-500 pl-4 whitespace-nowrap">
                        {lastMessage &&
                          new Date(lastMessage?.createdAt).toLocaleTimeString(
                            [],
                            {
                              hour: '2-digit',
                              minute: '2-digit',
                            },
                          )}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default ChatsList;
