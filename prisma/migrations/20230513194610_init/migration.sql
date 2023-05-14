/*
  Warnings:

  - You are about to drop the `ArtistToTrack` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Composer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ComposerToTrack` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MoodToTrack` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Remixer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RemixerToTrack` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Timing` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TimingToTrack` table. If the table is not empty, all the data it contains will be lost.
  - The primary key for the `GenreToTrack` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `GenreToTrack` table. All the data in the column will be lost.
  - The primary key for the `PublisherToTrack` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `PublisherToTrack` table. All the data in the column will be lost.
  - The primary key for the `GroupToTrack` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `GroupToTrack` table. All the data in the column will be lost.
  - You are about to drop the column `fileType` on the `TrackAttribute` table. All the data in the column will be lost.
  - The primary key for the `CommentToTrack` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `CommentToTrack` table. All the data in the column will be lost.
  - The primary key for the `PlaylistOnTrack` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `PlaylistOnTrack` table. All the data in the column will be lost.
  - Added the required column `like` to the `Playlist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Track` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Composer_name_key";

-- DropIndex
DROP INDEX "Remixer_name_key";

-- DropIndex
DROP INDEX "Timing_name_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ArtistToTrack";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Composer";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ComposerToTrack";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "MoodToTrack";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Remixer";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "RemixerToTrack";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Timing";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "TimingToTrack";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "ArtistsOnTrack" (
    "trackId" INTEGER NOT NULL,
    "artistId" INTEGER NOT NULL,

    PRIMARY KEY ("trackId", "artistId"),
    CONSTRAINT "ArtistsOnTrack_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ArtistsOnTrack_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ArtistToGenre" (
    "artistId" INTEGER NOT NULL,
    "genreId" INTEGER NOT NULL,

    PRIMARY KEY ("artistId", "genreId"),
    CONSTRAINT "ArtistToGenre_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ArtistToGenre_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ArtistOnPlaylist" (
    "playlistId" INTEGER NOT NULL,
    "artistId" INTEGER NOT NULL,
    CONSTRAINT "ArtistOnPlaylist_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ArtistOnPlaylist_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MoodsToTrack" (
    "moodId" INTEGER NOT NULL,
    "trackId" INTEGER NOT NULL,
    CONSTRAINT "MoodsToTrack_moodId_fkey" FOREIGN KEY ("moodId") REFERENCES "Mood" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MoodsToTrack_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GenreToTrack" (
    "trackId" INTEGER NOT NULL,
    "genreId" INTEGER NOT NULL,

    PRIMARY KEY ("trackId", "genreId"),
    CONSTRAINT "GenreToTrack_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GenreToTrack_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_GenreToTrack" ("genreId", "trackId") SELECT "genreId", "trackId" FROM "GenreToTrack";
DROP TABLE "GenreToTrack";
ALTER TABLE "new_GenreToTrack" RENAME TO "GenreToTrack";
CREATE TABLE "new_PublisherToTrack" (
    "publisherId" INTEGER NOT NULL,
    "trackId" INTEGER NOT NULL,

    PRIMARY KEY ("trackId", "publisherId"),
    CONSTRAINT "PublisherToTrack_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "Publisher" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PublisherToTrack_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PublisherToTrack" ("publisherId", "trackId") SELECT "publisherId", "trackId" FROM "PublisherToTrack";
DROP TABLE "PublisherToTrack";
ALTER TABLE "new_PublisherToTrack" RENAME TO "PublisherToTrack";
CREATE TABLE "new_GroupToTrack" (
    "groupId" INTEGER NOT NULL,
    "trackId" INTEGER NOT NULL,

    PRIMARY KEY ("trackId", "groupId"),
    CONSTRAINT "GroupToTrack_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GroupToTrack_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_GroupToTrack" ("groupId", "trackId") SELECT "groupId", "trackId" FROM "GroupToTrack";
DROP TABLE "GroupToTrack";
ALTER TABLE "new_GroupToTrack" RENAME TO "GroupToTrack";
CREATE TABLE "new_Playlist" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "like" BOOLEAN NOT NULL
);
INSERT INTO "new_Playlist" ("id", "name") SELECT "id", "name" FROM "Playlist";
DROP TABLE "Playlist";
ALTER TABLE "new_Playlist" RENAME TO "Playlist";
CREATE UNIQUE INDEX "Playlist_name_key" ON "Playlist"("name");
CREATE TABLE "new_TrackAttribute" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "size" INTEGER NOT NULL,
    "bpm" TEXT,
    "like" BOOLEAN NOT NULL,
    "pinned" BOOLEAN NOT NULL,
    "year" TEXT,
    "album" TEXT,
    "plays" TEXT,
    "initialKey" TEXT,
    "bitrate" INTEGER,
    "length" TEXT,
    "title" TEXT,
    "trackId" INTEGER NOT NULL,
    CONSTRAINT "TrackAttribute_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TrackAttribute" ("album", "bitrate", "bpm", "id", "initialKey", "length", "like", "pinned", "plays", "size", "title", "trackId", "year") SELECT "album", "bitrate", "bpm", "id", "initialKey", "length", "like", "pinned", "plays", "size", "title", "trackId", "year" FROM "TrackAttribute";
DROP TABLE "TrackAttribute";
ALTER TABLE "new_TrackAttribute" RENAME TO "TrackAttribute";
CREATE UNIQUE INDEX "TrackAttribute_trackId_key" ON "TrackAttribute"("trackId");
CREATE TABLE "new_CommentToTrack" (
    "commentId" INTEGER NOT NULL,
    "trackId" INTEGER NOT NULL,

    PRIMARY KEY ("trackId", "commentId"),
    CONSTRAINT "CommentToTrack_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CommentToTrack_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CommentToTrack" ("commentId", "trackId") SELECT "commentId", "trackId" FROM "CommentToTrack";
DROP TABLE "CommentToTrack";
ALTER TABLE "new_CommentToTrack" RENAME TO "CommentToTrack";
CREATE TABLE "new_PlaylistOnTrack" (
    "playlistId" INTEGER NOT NULL,
    "trackId" INTEGER NOT NULL,
    CONSTRAINT "PlaylistOnTrack_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PlaylistOnTrack_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PlaylistOnTrack" ("playlistId", "trackId") SELECT "playlistId", "trackId" FROM "PlaylistOnTrack";
DROP TABLE "PlaylistOnTrack";
ALTER TABLE "new_PlaylistOnTrack" RENAME TO "PlaylistOnTrack";
CREATE UNIQUE INDEX "PlaylistOnTrack_playlistId_trackId_key" ON "PlaylistOnTrack"("playlistId", "trackId");
CREATE TABLE "new_Track" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "location" TEXT NOT NULL,
    "updateDate" DATETIME NOT NULL,
    "fileType" TEXT,
    "size" TEXT NOT NULL
);
INSERT INTO "new_Track" ("createdAt", "id", "location", "updateDate") SELECT "createdAt", "id", "location", "updateDate" FROM "Track";
DROP TABLE "Track";
ALTER TABLE "new_Track" RENAME TO "Track";
CREATE UNIQUE INDEX "Track_location_key" ON "Track"("location");
CREATE UNIQUE INDEX "Track_id_location_key" ON "Track"("id", "location");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "ArtistOnPlaylist_playlistId_artistId_key" ON "ArtistOnPlaylist"("playlistId", "artistId");

-- CreateIndex
CREATE UNIQUE INDEX "MoodsToTrack_moodId_trackId_key" ON "MoodsToTrack"("moodId", "trackId");
