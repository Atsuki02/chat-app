import SendIcon from '@/components/icons/SendIcon';
import { Button, Textarea } from '@/components/ui';
import { useRef } from 'react';

const ChatMessageInput = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  return (
    <div className="flex items-end justify-end bg-white p-2 gap-2 relative">
      <Textarea
        ref={textareaRef}
        maxLength={1000}
        placeholder="Enter a message"
        className="w-full bg-yellow-50 focus-visible:ring-yellow-400 resize-none border-none rounded-md overflow-auto p-2"
        onChange={adjustHeight}
      />
      <Button className="w-6 h-6  p-5 text-white absolute -bottom-1 right-0 -translate-x-1/2 -translate-y-1/2">
        <div>
          <SendIcon />
        </div>
      </Button>
    </div>
  );
};

export default ChatMessageInput;
