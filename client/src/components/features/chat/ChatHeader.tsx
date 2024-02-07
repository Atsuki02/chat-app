import ChevronDown from '@/components/icons/ChevronDown';
import ChevronLeft from '@/components/icons/ChevronLeft';
import SearchIcon from '@/components/icons/SearchIcon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { setCurrentScreen } from '@/redux/slices/chatSlice';
import { AppDispatch } from '@/redux/store';
import { useDispatch } from 'react-redux';

const ChatHeader = () => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <div className="h-14 w-full bg-white flex justify-between items-center px-6  ">
      <div className="flex gap-3 items-center">
        <div
          className="sm:hidden"
          onClick={() => dispatch(setCurrentScreen('friendList'))}
        >
          <ChevronLeft />
        </div>
        <div className="relative">
          <Avatar className="w-9 h-9 cursor-pointer">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="absolute bottom-0 right-0 bg-green-400 w-3 h-3 rounded-full border-2 border-white"></div>
        </div>
        <div className="flex flex-col justify-center gap-0">
          <p className="font-medium text-sm">Atsuki</p>
          <p className="text-xs">Online</p>
        </div>
      </div>
      <div className="flex justify-between items-center gap-4 ">
        <div className="cursor-pointer w-4 h-4">
          <SearchIcon />
        </div>
        <div className="border-l-[1px] pl-4 cursor-pointer w-8 h-8">
          <ChevronDown />
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
