// import { Button } from '@/components/ui';
// import { useState } from 'react';
// import io, { Socket } from 'socket.io-client';
import ChatHeader from './ChatHeader';
import ChatBody from './ChatBody';
import ChatMessageInput from './ChatMessageInput';

import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchDrawerOpen, setSearchInput } from '@/redux/slices/chatSlice';
import ChatSearchInput from './ChatSearchInput';
import Cancel from '@/components/icons/Cancel';
import Loading from '@/components/ui/Loading';
import { useGetChatRoomByIdAndUserIdQuery } from '@/redux/services/userService';
// import { setSettingsOpen } from '@/redux/slices/settingsSlice';
// const socket: Socket = io('http://localhost:8000');

// interface Message {
//   message: string;
// }

const Chat = () => {
  // const [message, setMessage] = useState('');
  // const [list, setList] = useState<Message[]>([]);
  // const handleSendMessage = () => {
  //   socket.emit('send_message', {
  //     message: message,
  //   });
  // };

  // receive from server
  // socket.on('received_message', (data) => {
  //   console.log(data);
  //   setList([...list, data]);
  // });

  const dispatch: AppDispatch = useDispatch();
  const handleCancelInput = () => {
    dispatch(setSearchInput(''));
    dispatch(setSearchDrawerOpen(false));
  };

  const { user } = useSelector((state: RootState) => state.auth);

  const { isSearchDrawerOpen, selectedChatRoom } = useSelector(
    (state: RootState) => state.chat,
  );

  // const { data: chatRoom, isLoading: isFetchingChatRoom } =
  //   useGetChatRoomByIdQuery(selectedChatRoom || 'chatRoomId3');

  const { data: chatRoom, isLoading: isFetchingChatRoom } =
    useGetChatRoomByIdAndUserIdQuery(
      {
        userId: user?.id,
        chatRoomId: selectedChatRoom,
      },
      {
        skip: !user?.id || !selectedChatRoom,
      },
    );

  console.log(chatRoom);

  return (
    <>
      {isFetchingChatRoom ? (
        <Loading />
      ) : (
        <div className="sm:border-l-[1px] h-screen flex flex-col justify-center justify-items-stretch">
          {isSearchDrawerOpen ? (
            <div className="h-14 w-full bg-white flex justify-between items-center">
              <div className="w-full pr-2 cursor-pointer">
                <ChatSearchInput />
              </div>
              <div
                className="w-5 h-5 mr-4 cursor-pointer"
                onClick={handleCancelInput}
              >
                <Cancel />
              </div>
            </div>
          ) : (
            <ChatHeader
              chatRoom={chatRoom}
              isFetchingChatRoom={isFetchingChatRoom}
            />
          )}
          <div className="flex-grow overflow-auto bg-yellow-50 ">
            <ChatBody
              chatRoom={chatRoom}
              isFetchingChatRoom={isFetchingChatRoom}
            />
          </div>
          <div>
            <ChatMessageInput />
          </div>
          {/* <div>
        <input
          type="text"
          placeholder="chat..."
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <Button onClick={() => handleSendMessage()}>submit</Button>
      </div>
      {list.map((chat, i) => (
        <div key={i}>{chat.message}</div>
      ))} */}
        </div>
      )}
    </>
  );
};

export default Chat;
