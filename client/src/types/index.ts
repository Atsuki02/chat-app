export type Friend = {
  id: string;
  name: string;
  profileImageUrl: string;
  isOnline: boolean;
  lastOnlineAt: boolean;
  updatedAt: Date;
  username: string;
};

export type Message = {
  chatRoomId: string;
  content: string;
  createdAt: Date;
  id: string;
  user: {
    id: string;
    username: string;
  };
};

export type ChatRoom = {
  isPinned: boolean;
  chatRoomImageUrl?: string;
  id: string;
  isDirectMessage: boolean;
  messages: Message[];
  name?: string;
  partnerUserInfo?: Friend;
};
