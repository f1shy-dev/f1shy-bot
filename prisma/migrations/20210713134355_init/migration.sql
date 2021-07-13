/*
  Warnings:

  - The primary key for the `BotSettings` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "BotSettings" DROP CONSTRAINT "BotSettings_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD PRIMARY KEY ("id");
