/*
  Warnings:

  - You are about to drop the `Label` table. If the table is not empty, all the data it contains will be lost.
  - You are about to alter the column `playlistId` on the `PlaylistOnTrack` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `trackId` on the `PlaylistOnTrack` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to drop the column `album` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `artists` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `bitrate` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `bpm` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `composers` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `fileType` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `genres` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `initialKey` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `length` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `like` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `moods` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `pinned` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `plays` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `remixArtists` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `timings` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Track` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Label_name_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Label";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "TrackAttribute" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "like" BOOLEAN NOT NULL,
    "pinned" BOOLEAN NOT NULL,
    "year" TEXT,
    "album" TEXT,
    "plays" TEXT,
    "initialKey" TEXT,
    "bitrate" INTEGER,
    "length" TEXT,
    "fileType" TEXT,
    "trackId" INTEGER NOT NULL,
    "size" INTEGER NOT NULL,
    "bpm" TEXT,
    CONSTRAINT "TrackAttribute_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ArtistToTrack" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "artistId" INTEGER NOT NULL,
    "trackId" INTEGER NOT NULL,
    CONSTRAINT "ArtistToTrack_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ArtistToTrack_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GenreToTrack" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "genreId" INTEGER NOT NULL,
    "trackId" INTEGER NOT NULL,
    CONSTRAINT "GenreToTrack_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GenreToTrack_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Publisher" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PublisherToTrack" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "publisherId" INTEGER NOT NULL,
    "trackId" INTEGER NOT NULL,
    CONSTRAINT "PublisherToTrack_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "Publisher" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PublisherToTrack_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GroupToTrack" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "groupId" INTEGER NOT NULL,
    "trackId" INTEGER NOT NULL,
    CONSTRAINT "GroupToTrack_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GroupToTrack_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ComposerToTrack" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "composerId" INTEGER NOT NULL,
    "trackId" INTEGER NOT NULL,
    CONSTRAINT "ComposerToTrack_composerId_fkey" FOREIGN KEY ("composerId") REFERENCES "Composer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ComposerToTrack_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RemixerToTrack" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "remixerId" INTEGER NOT NULL,
    "trackId" INTEGER NOT NULL,
    CONSTRAINT "RemixerToTrack_remixerId_fkey" FOREIGN KEY ("remixerId") REFERENCES "Remixer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RemixerToTrack_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CommentToTrack" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "commentId" INTEGER NOT NULL,
    "trackId" INTEGER NOT NULL,
    CONSTRAINT "CommentToTrack_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CommentToTrack_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MoodToTrack" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "moodId" INTEGER NOT NULL,
    "trackId" INTEGER NOT NULL,
    CONSTRAINT "MoodToTrack_moodId_fkey" FOREIGN KEY ("moodId") REFERENCES "Mood" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MoodToTrack_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TimingToTrack" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "timingId" INTEGER NOT NULL,
    "trackId" INTEGER NOT NULL,
    CONSTRAINT "TimingToTrack_timingId_fkey" FOREIGN KEY ("timingId") REFERENCES "Timing" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TimingToTrack_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PlaylistOnTrack" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "playlistId" INTEGER NOT NULL,
    "trackId" INTEGER NOT NULL,
    CONSTRAINT "PlaylistOnTrack_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PlaylistOnTrack_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PlaylistOnTrack" ("id", "playlistId", "trackId") SELECT "id", "playlistId", "trackId" FROM "PlaylistOnTrack";
DROP TABLE "PlaylistOnTrack";
ALTER TABLE "new_PlaylistOnTrack" RENAME TO "PlaylistOnTrack";
CREATE UNIQUE INDEX "PlaylistOnTrack_playlistId_trackId_key" ON "PlaylistOnTrack"("playlistId", "trackId");
CREATE TABLE "new_Track" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "location" TEXT NOT NULL,
    "updateDate" DATETIME NOT NULL,
    "contentGroups" TEXT
);
INSERT INTO "new_Track" ("contentGroups", "createdAt", "id", "location", "title", "updateDate") SELECT "contentGroups", "createdAt", "id", "location", "title", "updateDate" FROM "Track";
DROP TABLE "Track";
ALTER TABLE "new_Track" RENAME TO "Track";
CREATE UNIQUE INDEX "Track_location_key" ON "Track"("location");
CREATE UNIQUE INDEX "Track_id_location_key" ON "Track"("id", "location");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "TrackAttribute_trackId_key" ON "TrackAttribute"("trackId");

-- CreateIndex
CREATE UNIQUE INDEX "Publisher_name_key" ON "Publisher"("name");
