/*
  Warnings:

  - Made the column `id` on table `PinnedChatRoom` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "PinnedChatRoom" ALTER COLUMN "id" SET NOT NULL,
ADD CONSTRAINT "PinnedChatRoom_pkey" PRIMARY KEY ("id");
