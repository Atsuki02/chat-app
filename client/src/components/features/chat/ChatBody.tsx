import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const ChatBody = () => {
  // デモ用のメッセージリスト。実際にはこの部分はサーバーから取得したデータに置き換えるか、アプリケーションのステートから取得します。
  const messages = [
    { id: 1, text: 'Hi', sender: 'other' },
    { id: 2, text: 'How are you?', sender: 'me' },
    {
      id: 3,
      text: 'Good. How aboutddddddddddddddddddddddddddddddddddddddddddddddddd you?',
      sender: 'other',
    },
    {
      id: 4,
      text: "I'm good too",
      sender: 'me',
    },
    // {
    //   id: 5,
    //   text: "I'm good too",
    //   sender: 'me',
    // },
    // {
    //   id: 6,
    //   text: "I'm good too",
    //   sender: 'me',
    // },
    // {
    //   id: 7,
    //   text: "I'm good sssssssssssssssssssssstoo",
    //   sender: 'me',
    // },
    // {
    //   id: 8,
    //   text: "I'm good sssssssssssssssssssssstoo",
    //   sender: 'me',
    // },
    // {
    //   id: 9,
    //   text: "I'm good sssssssssssssssssssssstoo",
    //   sender: 'me',
    // },
    // {
    //   id: 10,
    //   text: "I'm good sssssssssssssssssssssstoo",
    //   sender: 'me',
    // },
    // {
    //   id: 11,
    //   text: "I'm good sssssssssssssssssssssstoo",
    //   sender: 'me',
    // },
    // {
    //   id: 12,
    //   text: "I'm good sssssssssssssssssssssstoo",
    //   sender: 'me',
    // },
    // {
    //   id: 13,
    //   text: "I'm good sssssssssssssssssssssstoo",
    //   sender: 'me',
    // },
    // {
    //   id: 14,
    //   text: "I'm good sssssssssssssssssssssstoo",
    //   sender: 'me',
    // },
  ];

  return (
    <div className="w-full p-4 bg-yellow-50  ">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex my-2  break-words   w-auto  ${
            message.sender === 'me'
              ? ' ml-auto justify-end text-white'
              : 'mr-auto justify-start'
          }`}
        >
          {message.sender !== 'me' && (
            <Avatar className="w-7 h-7 cursor-pointer mr-2">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          )}
          <span
            className={`py-1.5 px-2 sm:max-w-xs max-w-56  break-words  rounded-lg ${
              message.sender === 'me' ? 'bg-yellow-500 text-white' : 'bg-white'
            }`}
          >
            {message.text}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ChatBody;
