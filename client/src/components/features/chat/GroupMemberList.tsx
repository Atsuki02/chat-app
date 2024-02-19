import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  setFriendProfileOpen,
  setSelectedFriendId,
} from '@/redux/slices/friendSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { ChatRoom } from '@/types';
import { useDispatch, useSelector } from 'react-redux';

const GroupMemberList = ({
  chatRoom,
  isFetchingChatRoom,
}: {
  chatRoom: ChatRoom;
  isFetchingChatRoom: boolean;
}) => {
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  function handleClick(memberId: string) {
    if (!memberId || memberId === user?.id) {
      return;
    } else {
      dispatch(setSelectedFriendId(memberId));
      dispatch(setFriendProfileOpen(true));
    }
  }

  return (
    <>
      {isFetchingChatRoom ? null : (
        <div className="min-h-12 w-full bg-secondary flex justify-between items-center px-8">
          <div className="flex gap-3 items-center">
            {chatRoom?.chatRoomMembership.map((member, index) => (
              <div
                key={index}
                className="relative"
                onClick={() => handleClick(member.user.id)}
              >
                <Avatar
                  className={`w-7 h-7 border ${member.user.id !== user?.id ? 'cursor-pointer' : ''}`}
                >
                  <AvatarImage src={member?.user?.profileImageUrl} />
                  <AvatarFallback>
                    {chatRoom?.name?.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default GroupMemberList;
