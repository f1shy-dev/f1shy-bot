/*
  Warnings:

  - You are about to drop the column `isOwner` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "isOwner",
ADD COLUMN     "isBotOwner" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "BotSettings" (
    "botOwnerID" TEXT NOT NULL,
    "defaultPrefix" TEXT NOT NULL,
    "defaultAdvancedErrors" TEXT NOT NULL,

    PRIMARY KEY ("botOwnerID")
);
