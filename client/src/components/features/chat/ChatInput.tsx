import SendIcon from '@/components/icons/SendIcon';
import { Button, Input } from '@/components/ui';

const ChatInput = () => {
  return (
    <div className="h-14 flex items-center justify-center bg-white p-2 gap-2">
      <Input
        type="text"
        placeholder="Write a message..."
        className="bg-yellow-50 focus-visible:ring-yellow-400  "
      />
      <Button className="w-6 h-6 p-5">
        <div className="w-6 h-6 text-white">
          <SendIcon />
        </div>
      </Button>
    </div>
  );
};

export default ChatInput;
