import prisma from "../prisma/PrismaClient";

interface UserCreateData {
    email: string;
    username: string;
    passwordHash: string;
}
  
interface UserFindData {
    email: string;
}

  

async function createUser(data: UserCreateData) {
    return prisma.user.create({data})
}

async function findUserByEmail( email: string) {
    return prisma.user.findUnique({where: { email } })
}

async function createSession(userId: string) {
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    return prisma.session.create({ data: { userId, expiresAt }})
}

async function findSessionById(sessionId: string) {
    return prisma.session.findUnique({ where: { id: sessionId } });
}

async function findUserById(userId: string) {
    return prisma.user.findUnique({ 
        where: { id: userId }, 
        select: {
            id: true,
            username: true,
            email: true,
            isOnline: true,
            lastOnlineAt: true,
            profileImageUrl: true,
            darkMode: true,
            notifications: true,
            createdAt: true,
            updatedAt: true,
        } 
    });
}

async function deleteUserById(userId: string) {
    await prisma.session.deleteMany({
        where: {
            userId: userId,
        },
    });
    return prisma.user.delete({
        where: {
            id: userId,
        },
    });
}

async function deleteSessionById(sessionId: string) {
    return prisma.session.delete({
        where: {
            id: sessionId,
        },
    });
}

async function toggleDarkMode(userId: string, darkMode: boolean) {
    return prisma.user.update({
      where: { id: userId },
      data: { darkMode },
    });
}

async function toggleNotifications(userId: string, notifications: boolean) {
    return prisma.user.update({
      where: { id: userId },
      data: { notifications },
    });
}

async function updateUserProfileImage(userId: string, imageUrl: string) {
    return prisma.user.update({
      where: { id: userId },
      data: { profileImageUrl: imageUrl },
    });
}

async function findAllUsers() {
    return prisma.user.findMany({
        select: {
            id: true,
            username: true,
            isOnline: true,
            lastOnlineAt: true,
            profileImageUrl: true,
            createdAt: true,
            updatedAt: true,
        }
    });
}

async function findFavoriteUsers(userId: string) {
    return prisma.favorite.findMany({
        where: {
            userId: userId
        },
        include: {
            favoriteUser: {
                select: {
                    id: true,
                    username: true,
                    isOnline: true,
                    lastOnlineAt: true,
                    profileImageUrl: true,
                    createdAt: true,
                    updatedAt: true,
                }
            }
        }
    });
}

async function addFavorite (userId: string, favoriteUserId: string) {
    return prisma.favorite.create({
        data: {
            userId,
            favoriteUserId,
        },
    });
}

async function removeFavorite (userId: string, favoriteUserId: string) {
    return prisma.favorite.deleteMany({
        where: {
            userId: userId,
            favoriteUserId: favoriteUserId,
        },
    });
}

async function findUserChatRooms(userId: string) {
    return prisma.chatRoomMembership.findMany({
        where: {
            userId: userId
        },
        include: {
            chatRoom: {
              include: {
                messages: true, 
                chatRoomMembership: {
                    include: {
                      user: true
                    }
                  }, 
                pinnedByUsers: true,
              }
            }
          }
    });
}

async function findPinnedChatRoomsByUser(userId: string) {
    return prisma.pinnedChatRoom.findMany({
      where: {
        userId: userId,
      },
      include: {
        chatRoom: {
          include: {
            messages: true,
            chatRoomMembership: true,
          }
        }
      }
    });
}


async function findChatRoomByIdAndUserId(userId: string, chatRoomId: string) {
    const chatRoom = await prisma.chatRoom.findUnique({
        where: { id: chatRoomId },
        include: {
            chatRoomMembership: true, 
            messages: true,
        }
    });

    if (chatRoom && chatRoom.isDirectMessage) {
        const otherUserId = chatRoom.chatRoomMembership
            .map(membership => membership.userId)
            .find(id => id !== userId);

        if (!otherUserId) {
            console.error('Other user ID not found for direct message chat room.');
            return chatRoom; 
        }
            
        const partnerUserInfo = await prisma.user.findUnique({
            where: { id: otherUserId }
        });

        return {
            ...chatRoom,
            partnerUserInfo: partnerUserInfo ? partnerUserInfo : null,
        };
    }

    return chatRoom;
}

async function createDirectMessageChatRoom(userId1: string, userId2: string) {
    const existingRoom = await prisma.chatRoom.findFirst({
      where: {
        isDirectMessage: true,
        AND: [
          {
            chatRoomMembership: {
              some: {
                userId: userId1,
              },
            },
          },
          {
            chatRoomMembership: {
              some: {
                userId: userId2,
              },
            },
          },
        ],
      },
    });
  
    if (existingRoom) {
      return existingRoom;
    }
  
    const newRoom = await prisma.chatRoom.create({
      data: {
        isDirectMessage: true,
        chatRoomMembership: {
          create: [
            { userId: userId1 },
            { userId: userId2 },
          ],
        },
      },
    });
  
    return newRoom;
}

export const createChatRoomWithMembers = async (name: string, members: string[], chatRoomImageUrl?: string) => {
  const room = await prisma.chatRoom.create({
    data: {
      name,
      isDirectMessage: false,
      chatRoomImageUrl,
      chatRoomMembership: {
        create: members.map((userId) => ({
          userId,
        })),
      },
    },
  });

  return room;
};





  


module.exports = {createUser, findUserByEmail, createSession, findSessionById, findUserById, deleteUserById, deleteSessionById, toggleDarkMode, toggleNotifications, updateUserProfileImage, findAllUsers, findFavoriteUsers, addFavorite, removeFavorite, findUserChatRooms, findPinnedChatRoomsByUser, findChatRoomByIdAndUserId, createDirectMessageChatRoom, createChatRoomWithMembers}