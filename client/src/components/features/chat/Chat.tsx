import { Button } from '@/components/ui';
import { useState } from 'react';
import io, { Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:8000');

interface Message {
  message: string;
}

const Chat = () => {
  const [message, setMessage] = useState('');
  const [list, setList] = useState<Message[]>([]);
  const handleSendMessage = () => {
    socket.emit('send_message', {
      message: message,
    });
  };

  // receive from server
  socket.on('received_message', (data) => {
    console.log(data);
    setList([...list, data]);
  });
  return (
    <div className="">
      <h2>chat Home</h2>
      <div>
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
      ))}
    </div>
  );
};

export default Chat;
