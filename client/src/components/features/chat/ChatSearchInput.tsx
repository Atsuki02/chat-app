import Close from '@/components/icons/Close';
import { Input } from '@/components/ui';
import { setSearchInput } from '@/redux/slices/chatSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';

const ChatSearchInput = () => {
  const dispatch: AppDispatch = useDispatch();

  const { searchInput } = useSelector((state: RootState) => state.chat);

  return (
    <div className="w-full flex items-center justify-center bg-white p-2 gap-2 relative">
      <Input
        value={searchInput}
        onChange={(e) => dispatch(setSearchInput(e.target.value))}
        placeholder="Search in conversation"
        className="w-full pr-10 bg-blue-50  focus-visible:ring-blue-400 resize-none border-none rounded-md overflow-auto "
      />
      {searchInput.length >= 1 && (
        <div
          className="absolute top-4 right-4 h-6 w-6 text-white"
          onClick={() => dispatch(setSearchInput(''))}
        >
          <Close fill="gray" />
        </div>
      )}
    </div>
  );
};

export default ChatSearchInput;
