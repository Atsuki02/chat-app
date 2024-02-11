import { PrismaClient } from '@prisma/client';
import { chatRoomMemberships, chatRooms, favorites, messages, pinnedChatRooms, readReceipts, sessions, users } from './data';


export const prisma = new PrismaClient();



async function main() {
    await prisma.pinnedChatRoom.deleteMany({});
    await prisma.chatRoomMembership.deleteMany({});
    await prisma.readReceipt.deleteMany({});
    await prisma.message.deleteMany({});
    await prisma.chatRoom.deleteMany({});
    await prisma.favorite.deleteMany({});
    await prisma.session.deleteMany({});
    await prisma.user.deleteMany({});


    for (const user of users) {
        await prisma.user.create({
          data: user,
        });
    }

    for (const session of sessions) {
        await prisma.session.create({
          data: session,
        });
    }

    for (const favorite of favorites) {
        await prisma.favorite.create({
          data: favorite,
        });
    }

    
    for (const room of chatRooms) {
        await prisma.chatRoom.create({
          data: room,
        });
    }

    for (const message of messages){
        await prisma.message.create({
          data: message,
        });
    }

    for (const readReceipt of readReceipts) {
        await prisma.readReceipt.create({
          data: readReceipt,
        });
    }

    for (const membership of chatRoomMemberships) {
        await prisma.chatRoomMembership.create({
          data: membership,
        });
    }


    for (const pinnedRoom of pinnedChatRooms) {
        await prisma.pinnedChatRoom.create({
          data: pinnedRoom,
        });
    }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
