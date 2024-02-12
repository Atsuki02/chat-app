import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RootState } from '@/redux/store';
import { ChatRoom } from '@/types';
import { useSelector } from 'react-redux';

const ChatBody = ({
  chatRoom,
  isFetchingChatRoom,
}: {
  chatRoom: ChatRoom;
  isFetchingChatRoom: boolean;
}) => {
  const { user } = useSelector((state: RootState) => state.auth);
  console.log(user);

  console.log(chatRoom);

  return (
    <>
      {isFetchingChatRoom ? null : (
        <div className="w-full p-4 bg-yellow-50  ">
          {chatRoom?.messages?.map((message) => (
            <div
              key={message?.id}
              className={`flex my-2  break-words   w-auto  ${
                message?.user.id === user?.id
                  ? ' ml-auto justify-end text-white'
                  : 'mr-auto justify-start'
              }`}
            >
              {message?.user.id !== user?.id && (
                <Avatar className="w-7 h-7 cursor-pointer mr-2">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>
                    {message?.user.username.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              )}
              <span
                className={`py-1.5 px-2 sm:max-w-xs max-w-56  break-words  rounded-lg ${
                  message?.user.id === user?.id
                    ? 'bg-yellow-500 text-white'
                    : 'bg-white'
                }`}
              >
                {message?.content}
              </span>
              <div className="text-xs flex items-end text-slate-500 pl-4 whitespace-nowrap">
                {new Date(message?.createdAt).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ChatBody;
