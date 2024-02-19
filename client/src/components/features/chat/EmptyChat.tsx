import ChatBubble from '@/components/icons/ChatBubble';

const EmptyChat = () => {
  return (
    <div className="h-28 w-28 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-muted-foreground opacity-10">
      <ChatBubble />
    </div>
  );
};

export default EmptyChat;
