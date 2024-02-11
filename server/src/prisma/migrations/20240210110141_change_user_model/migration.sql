/*
  Warnings:

  - The primary key for the `PinnedChatRoom` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `PinnedChatRoom` table. All the data in the column will be lost.
  - You are about to drop the column `chatRoomId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_chatRoomId_fkey";

-- AlterTable
ALTER TABLE "PinnedChatRoom" DROP CONSTRAINT "PinnedChatRoom_pkey",
DROP COLUMN "id";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "chatRoomId";
