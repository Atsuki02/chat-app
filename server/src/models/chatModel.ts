import prisma from "../prisma/PrismaClient";

async function findChatRoomById(chatRoomId: string) {
    return prisma.chatRoom.findUnique({
      where: {
        id: chatRoomId,
      },
      include: {
        messages: {
            include: {
                user: {
                    select: {
                      id: true, 
                      username: true, 
                    }
                  }
            }
          }, 
      },
    });
}






module.exports = { findChatRoomById }