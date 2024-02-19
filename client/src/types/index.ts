export type Friend = {
  id: string;
  name: string;
  profileImageUrl: string;
  isOnline: boolean;
  lastOnlineAt: Date | undefined;
  updatedAt: Date;
  username: string;
};

export type Message = {
  chatRoomId: string;
  content: string;
  createdAt: Date;
  userId: string;
  id: string;
  user: {
    id: string;
    username: string;
  };
};

export type ChatRoom = {
  isPinned: boolean;
  chatRoomMembership: {
    profileImageUrl: string | undefined;
    chatRoomId: string;
    userId: string;
    user: Friend;
  }[];
  chatRoomImageUrl: string;
  id: string;
  isDirectMessage: boolean;
  messages: Message[];
  name?: string;
  partnerUserInfo?: Friend;
};
