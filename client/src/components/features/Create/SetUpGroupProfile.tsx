import Cancel from '@/components/icons/Cancel';

import ChevronLeft from '@/components/icons/ChevronLeft';
import Plus from '@/components/icons/Plus';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  addSelectedMember,
  removeSelectedMember,
  resetCreateGroupState,
  setCurrentScreen,
  setError,
  setGroupImageUrl,
  setGroupNameInput,
} from '@/redux/slices/createGroupSlice';
import { RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import PlusCircle from '@/components/icons/PlusCircle';
import { Input } from '@/components/ui';
import Close from '@/components/icons/Close';
import { Friend } from '@/types';
import {
  useCreateChatRoomWithMembersMutation,
  useGetUserQuery,
} from '@/redux/services/userService';
import { useUploadImageMutation } from '@/redux/services/cloudinaryService';
import { setCurrentList, setSelectedChatRoom } from '@/redux/slices/chatSlice';
import React from 'react';

const SetUpGroupProfile = ({ friends }: { friends: Friend[] }) => {
  const dispatch = useDispatch();

  const { selectedMembers, groupNameInput, error, groupImageUrl } = useSelector(
    (state: RootState) => state.createGroup,
  );
  const { user } = useSelector((state: RootState) => state.auth);

  const { data: userData } = useGetUserQuery(user?.id, {
    skip: !user?.id,
  });

  const [createChatRoomWithMembers] = useCreateChatRoomWithMembersMutation();
  const [uploadGroupImage] = useUploadImageMutation();

  const handleSelectMember = (friendId: string) => {
    if (selectedMembers.includes(friendId)) {
      dispatch(removeSelectedMember(friendId));
    } else {
      dispatch(addSelectedMember(friendId));
    }
  };

  const handleCreate = async (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    if (groupNameInput.trim().length === 0) {
      dispatch(setError('Group name should be at least one character.'));
      return;
    }

    try {
      const selectedMembersWithUser = selectedMembers.includes(userData?.id)
        ? selectedMembers
        : [...selectedMembers, user?.id];

      const response = await createChatRoomWithMembers({
        name: groupNameInput,
        members: selectedMembersWithUser,
        chatRoomImageUrl: groupImageUrl,
      }).unwrap();
      dispatch(resetCreateGroupState());
      dispatch(setCurrentList('chats'));
      dispatch(setSelectedChatRoom(response.id));

      if (response.data) {
        const { id } = response.data;
        dispatch(resetCreateGroupState());
        dispatch(setCurrentList('chats'));
        dispatch(setSelectedChatRoom(id));

        console.log(response.data);
      }
    } catch (error) {
      console.error('Creating group failed:', error);
    }
  };

  const handleChangeScreen = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    dispatch(setCurrentScreen('selectMembers'));
    dispatch(setError(''));
  };

  const handleGroupNameInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.value.trim().length > 0) {
      dispatch(setError(''));
    }
    dispatch(setGroupNameInput(e.target.value));
  };

  const handleAvatarChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const form = new FormData();
    form.append('file', file);
    form.append(
      'upload_preset',
      import.meta.env.VITE_CLOUDINARY_PRESET_NAME as string,
    );

    try {
      const response = await uploadGroupImage(form).unwrap();
      dispatch(setGroupImageUrl(response.secure_url));
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <div className="flex flex-col py-6 px-4 sm:p-4 w-full relative cursor-default">
      <span
        className="absolute top-6 left-6 sm:top-4 sm:left-4 h-5 w-5 text-blue-500 text-xs cursor-pointer"
        onClick={handleChangeScreen}
      >
        <ChevronLeft />
      </span>
      <div className="flex flex-col sm:pb-4 pb-6">
        <p className="font-semibold text-sm">Set up group profile</p>
      </div>
      <span
        className="absolute top-6 right-6 sm:top-4 sm:right-4 text-blue-500 text-xs cursor-pointer"
        onClick={handleCreate}
      >
        Create
      </span>

      <div className="my-8 flex justify-start items-center">
        <div className="relative w-14 h-14 mr-2">
          <Avatar className="w-full h-full">
            <AvatarImage src={groupImageUrl} />
            <AvatarFallback>{'EX'}</AvatarFallback>
          </Avatar>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="avatarInput"
            onChange={handleAvatarChange}
          />
          <label
            htmlFor="avatarInput"
            className="absolute bottom-0 right-0 mb-[-4px] mr-[-4px] w-5 h-5 rounded-full bg-gray-100 border-[1px] border-gray-100 cursor-pointer flex justify-center items-center"
          >
            <PlusCircle />
          </label>
        </div>
        <div className="w-[300px] relative">
          <Input
            className="border-0 max-w-56 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 caret-blue-400 "
            value={groupNameInput}
            onChange={handleGroupNameInputChange}
            placeholder="Group name"
          />
          {error && (
            <div className="pl-3 text-left text-red-500 text-xxs">{error}</div>
          )}
          {groupNameInput.length >= 1 && (
            <div
              className="absolute top-2 right-1 h-6 w-6 text-white cursor-pointer"
              onClick={() => dispatch(setGroupNameInput(''))}
            >
              <Close fill="rgb(203 213 225)" />
            </div>
          )}
        </div>
      </div>

      <div className="flex text-left">
        <span className="font-semibold pb-6 sm:pb-2 text-slate-800 text-xs">
          Members: {selectedMembers.length + 1}
        </span>
      </div>
      <div className="flex w-full overflow-hidden">
        <div
          className="flex-shrink-0 sm:w-8 sm:h-8 w-10 h-10 mr-2 cursor-pointer border-[1px] rounded-full mt-1.5 p-1.5 py-2 sm:p-1.5"
          onClick={handleChangeScreen}
        >
          <Plus />
        </div>

        <ul
          className={`list-none flex flex-wrap  justify-start gap-1 overflow-y-auto hide-scrollbar ${
            selectedMembers.length === 0
              ? 'max-h-96 sm:max-h-48'
              : 'max-h-80 sm:max-h-36'
          }`}
        >
          <li className="flex items-center last:mb-0 cursor-pointer p-1.5 py-2 sm:p-1.5 rounded-xl">
            <div className="flex flex-col items-center justify-center relative">
              <div className="mb-0.5">
                <Avatar className="sm:w-8 sm:h-8 w-10 h-10">
                  <AvatarImage src={userData?.profileImageUrl} />
                  <AvatarFallback>
                    {userData?.username.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="flex items-center">
                <p className="font-medium text-xxs truncate">{userData.name}</p>
              </div>
            </div>
          </li>
          {friends
            ?.filter((friend) => selectedMembers.includes(friend.id))
            .map((friend) => (
              <li
                key={friend.id}
                className="flex items-center last:mb-0 cursor-pointer p-1.5 py-2 sm:p-1.5 rounded-xl"
                onClick={() => handleSelectMember(friend.id)}
              >
                <div className="flex flex-col items-center justify-center relative">
                  <div className="mb-0.5">
                    <Avatar className="sm:w-8 sm:h-8 w-10 h-10">
                      <AvatarImage src={friend.profileImageUrl} />
                      <AvatarFallback>
                        {friend?.username.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className="absolute -top-1 -right-1 w-5 h-5 sm:w-4 sm:h-4 rounded-full p-1 bg-slate-50 cursor-pointer"
                      onClick={() => dispatch(removeSelectedMember(friend.id))}
                    >
                      <Cancel />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <p className="font-medium text-xxs truncate">
                      {friend.name}
                    </p>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default SetUpGroupProfile;
