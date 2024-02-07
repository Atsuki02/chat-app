// import { Button } from '@/components/ui';
// import { useState } from 'react';
// import io, { Socket } from 'socket.io-client';
import ChatHeader from './ChatHeader';
import ChatBody from './ChatBody';
import ChatInput from './ChatInput';

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
  return (
    <div className="sm:border-l-[1px]">
      <ChatHeader />
      <div className="h-[calc(100vh-112px)] bg-yellow-50 overflow-auto">
        <ChatBody />
      </div>
      <div className="h-1/8">
        <ChatInput />
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
  );
};

export default Chat;
