import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RootState } from '@/redux/store';
import { ChatRoom } from '@/types';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

interface Message {
  id: string;
  content: string;
  userId: string;
  createdAt: Date;
  chatRoomId: string;
  user?: {
    id: string;
    username: string;
    profileImageUrl?: string;
  };
}

const ChatBody = ({
  chatRoom,
  isFetchingChatRoom,
}: {
  chatRoom: ChatRoom;
  isFetchingChatRoom: boolean;
}) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { selectedChatRoom } = useSelector((state: RootState) => state.chat);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<Message[]>(
    chatRoom.messages as unknown as Message[],
  );

  useEffect(() => {
    setMessages(chatRoom.messages as unknown as Message[]);
  }, [chatRoom.messages]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatRoom.messages, selectedChatRoom, messages]);

  useEffect(() => {
    const handleNewMessage = (newMessage: Message) => {
      console.log(newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    socket.on('received_message', handleNewMessage);

    return () => {
      socket.off('received_message', handleNewMessage);
    };
  }, [chatRoom.id, selectedChatRoom]);

  return (
    <>
      {isFetchingChatRoom ? null : (
        <div className="w-full p-4 bg-background text-foreground">
          {messages?.map((message, i) => (
            <div
              key={i}
              className={`flex my-2  break-words  w-auto  ${
                message?.userId === user?.id
                  ? ' ml-auto justify-end text-foreground'
                  : 'mr-auto justify-start'
              }`}
            >
              {message?.userId !== user?.id && (
                <Avatar className="w-7 h-7 cursor-pointer mr-2">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>
                    {message?.user?.username.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={`text-xxs flex items-end text-slate-500 pr-4 whitespace-nowrap ${message?.userId !== user?.id ? 'order-1 pl-4' : ''}`}
              >
                {new Date(message?.createdAt).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>

              <span
                className={`py-1.5 px-2 sm:max-w-xs max-w-56  break-words  rounded-lg ${
                  message?.userId === user?.id
                    ? 'bg-primary text-secondary'
                    : 'bg-secondary text-foreground'
                }`}
              >
                {message?.content}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}
    </>
  );
};

export default ChatBody;
