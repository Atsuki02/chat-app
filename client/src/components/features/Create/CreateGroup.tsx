import Cancel from '@/components/icons/Cancel';
import Check from '@/components/icons/Check';
import SearchIcon from '@/components/icons/SearchIcon';
import { Input } from '@/components/ui';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  addSelectedMember,
  removeSelectedMember,
  setCreateDrawerOpen,
  setCurrentScreen,
  setSelectedMember,
} from '@/redux/slices/createGroupSlice';
import { RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';

export const friends = [
  {
    id: '1',
    name: 'Alice',
    status: 'Online',
    image: 'path/to/alice.jpg',
    selected: true,
  },
  {
    id: '2',
    name: 'Bob',
    status: 'Online',
    image: 'path/to/bob.jpg',
  },
  {
    id: '3',
    name: 'Bob',
    status: 'Online',
    image: 'path/to/bob.jpg',
  },
  {
    id: '4',
    name: 'Bob',
    status: 'Online',
    image: 'path/to/bob.jpg',
  },
  {
    id: '5',
    name: 'Bob',
    status: 'Online',
    image: 'path/to/bob.jpg',
  },
  {
    id: '6',
    name: 'Bob',
    status: 'Online',
    image: 'path/to/bob.jpg',
  },
  {
    id: '7',
    name: 'Bob',
    status: 'Online',
    image: 'path/to/bob.jpg',
  },
  {
    id: '8',
    name: 'Bob',
    status: 'Online',
    image: 'path/to/bob.jpg',
  },
  {
    id: '9',
    name: 'Bob',
    status: 'Online',
    image: 'path/to/bob.jpg',
  },
  {
    id: '10',
    name: 'Bob',
    status: 'Online',
    image: 'path/to/bob.jpg',
  },
  {
    id: '11',
    name: 'Bob',
    status: 'Online',
    image: 'path/to/bob.jpg',
  },
  {
    id: '12',
    name: 'Bob',
    status: 'Online',
    image: 'path/to/bob.jpg',
  },
  {
    id: '13',
    name: 'Bob',
    status: 'Online',
    image: 'path/to/bob.jpg',
  },
  {
    id: '14',
    name: 'Bob',
    status: 'Online',
    image: 'path/to/bob.jpg',
  },
];

const CreateGroup = () => {
  const dispatch = useDispatch();

  const { selectedMembers } = useSelector(
    (state: RootState) => state.createGroup,
  );

  const handleSelectMember = (friendId: string) => {
    if (selectedMembers.includes(friendId)) {
      dispatch(removeSelectedMember(friendId));
    } else {
      dispatch(addSelectedMember(friendId));
    }
  };

  const handleCancel = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    dispatch(setSelectedMember([]));
    dispatch(setCreateDrawerOpen(false));
  };

  const handleNext = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    event.stopPropagation();
    dispatch(setCurrentScreen('setUpGroupProfile'));
  };

  return (
    <div className="flex flex-col py-6 px-4 sm:p-4 w-full relative cursor-default">
      <span
        className="absolute top-6 left-6 sm:top-4 sm:left-4 text-yellow-500 text-xs cursor-pointer"
        onClick={handleCancel}
      >
        Cancel
      </span>
      <div className="flex flex-col sm:pb-4 pb-6">
        <p className="font-semibold text-sm">
          {selectedMembers.length === 0
            ? 'New message'
            : `${selectedMembers.length} selected`}
        </p>
      </div>
      <span
        className="absolute top-6 right-6 sm:top-4 sm:right-4 text-yellow-500 text-xs cursor-pointer"
        onClick={handleNext}
      >
        Next
      </span>
      <div className="sm:pb-4 pb-6 relative w-full">
        <div className="absolute top-0 left-0 translate-x-1/2 translate-y-1/2 sm:w-3 sm:h-3 w-4 h-4">
          <SearchIcon />
        </div>
        <Input
          type="text"
          placeholder="Search by name"
          className=" pl-8 sm:pl-7 bg-yellow-50 focus-visible:ring-yellow-400 rounded-md sm:rounded-lg h-8 sm:h-6 text-xs"
        />
      </div>
      <ul className="list-none w-full flex mb-6 sm:mb-4 gap-1 overflow-y-auto hide-scrollbar  ">
        {friends
          .filter((friend) => selectedMembers.includes(friend.id))
          .map((friend) => (
            <li
              key={friend.id}
              className={`flex items-center last:mb-0 p-1.5 rounded-xl`}
            >
              <div className="flex flex-col items-center justify-center relative">
                <div className="mb-0.5">
                  <Avatar className="sm:w-6 sm:h-6 w-10 h-10">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div
                    className="absolute -top-1 -right-1 w-5 h-5 sm:w-4 sm:h-4 rounded-full p-1 bg-slate-50 cursor-pointer"
                    onClick={() => dispatch(removeSelectedMember(friend.id))}
                  >
                    <Cancel />
                  </div>
                </div>
                <p className=" font-extralight text-slate-600 text-xxs max-w-5 truncate">
                  {friend.name}
                </p>
              </div>
            </li>
          ))}
      </ul>
      <div className="flex text-left">
        <span className="font-semibold pb-6 sm:pb-2 text-slate-800 text-xs">
          Friends
        </span>
      </div>
      <ul
        className={`list-none w-full overflow-y-auto hide-scrollbar  ${
          selectedMembers.length === 0
            ? 'max-h-96 sm:max-h-48'
            : 'max-h-80 sm:max-h-36'
        }`}
      >
        {friends.map((friend) => (
          <li
            key={friend.id}
            className="flex items-center last:mb-0 cursor-pointer p-1.5 py-2 sm:p-1.5 rounded-xl"
            onClick={() => handleSelectMember(friend.id)}
          >
            <div className="flex justify-start items-center w-full">
              <div className="sm:mr-3 mr-4">
                <Avatar className="sm:w-6 sm:h-6 w-10 h-10 cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex justify-between">
                <div className="flex-1">
                  <p className="font-medium text-sm truncate">{friend.name}</p>
                </div>
              </div>
            </div>
            <div
              className={`p-1 w-8 h-8 sm:w-5 sm:h-5 flex items-center border-[1px] rounded-full ${selectedMembers.includes(friend.id) ? 'bg-green-400' : ''}`}
            >
              <div className="text-white">
                {selectedMembers.includes(friend.id) && <Check />}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreateGroup;
