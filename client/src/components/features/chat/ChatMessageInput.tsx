import SendIcon from '@/components/icons/SendIcon';
import { Button, Textarea } from '@/components/ui';
import { useEffect, useRef } from 'react';
import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import io, { Socket } from 'socket.io-client';
import { setMessageInput } from '@/redux/slices/chatSlice';
import { useCreateMessageMutation } from '@/redux/services/userService';
const socket: Socket = io('http://localhost:3000');

const ChatMessageInput = () => {
  const dispatch: AppDispatch = useDispatch();
  const { messageInput, selectedChatRoom } = useSelector(
    (state: RootState) => state.chat,
  );
  const { user } = useSelector((state: RootState) => state.auth);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [createMessage] = useCreateMessageMutation();

  const adjustHeight = () => {
    const maxTextAreaHeight = 196;
    if (
      textareaRef.current &&
      textareaRef.current.scrollHeight < maxTextAreaHeight
    ) {
      textareaRef.current.style.height = 'inherit';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    socket.on('received_message', (message) => {
      console.log('Received message:', message);
    });

    return () => {
      socket.off('received_message');
    };
  }, []);

  const handleSendMessage = async () => {
    if (messageInput.trim()) {
      try {
        const messageData = {
          content: messageInput,
          userId: user?.id,
          chatRoomId: selectedChatRoom,
          createdAt: new Date().toISOString(),
        };
        await createMessage(messageData).unwrap();
        dispatch(setMessageInput(''));
        adjustHeight();
        if (textareaRef.current) {
          textareaRef.current.style.height = 'inherit';
        }
        socket.emit('send_message', messageData);
      } catch (error) {
        console.error('Message sending failed:', error);
      }
    }
  };

  return (
    <div className="flex items-end justify-end bg-white p-2 gap-2 relative">
      <Textarea
        ref={textareaRef}
        value={messageInput}
        maxLength={1000}
        placeholder="Enter a message"
        className="w-full bg-yellow-50 focus-visible:ring-yellow-400 resize-none border-none rounded-md overflow-auto p-2"
        onChange={(e) => {
          adjustHeight();
          dispatch(setMessageInput(e.target.value));
        }}
      />
      <Button className="w-6 h-6  p-5 text-white absolute -bottom-1 right-0 -translate-x-1/2 -translate-y-1/2">
        <div onClick={handleSendMessage}>
          <SendIcon />
        </div>
      </Button>
    </div>
  );
};

export default ChatMessageInput;
