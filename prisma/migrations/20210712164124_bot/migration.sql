-- CreateTable
CREATE TABLE "Guild" (
    "id" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GuildSettings" (
    "guildId" TEXT NOT NULL,
    "prefix" TEXT NOT NULL DEFAULT E'f.',
    "advancedErrors" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("guildId")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_guildMods" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_guildAdmins" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_guildMods_AB_unique" ON "_guildMods"("A", "B");

-- CreateIndex
CREATE INDEX "_guildMods_B_index" ON "_guildMods"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_guildAdmins_AB_unique" ON "_guildAdmins"("A", "B");

-- CreateIndex
CREATE INDEX "_guildAdmins_B_index" ON "_guildAdmins"("B");

-- AddForeignKey
ALTER TABLE "GuildSettings" ADD FOREIGN KEY ("guildId") REFERENCES "Guild"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_guildMods" ADD FOREIGN KEY ("A") REFERENCES "Guild"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_guildMods" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_guildAdmins" ADD FOREIGN KEY ("A") REFERENCES "Guild"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_guildAdmins" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
