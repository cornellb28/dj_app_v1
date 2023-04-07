/*
  Warnings:

  - You are about to alter the column `biterate` on the `Track` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `samplerate` on the `Track` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - Made the column `biterate` on table `Track` required. This step will fail if there are existing NULL values in that column.
  - Made the column `samplerate` on table `Track` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Track" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "createdAt" DATETIME NOT NULL,
    "location" TEXT NOT NULL,
    "bpm" TEXT,
    "album" TEXT,
    "fileType" TEXT,
    "initialKey" TEXT,
    "length" TEXT,
    "size" TEXT,
    "year" TEXT,
    "plays" TEXT,
    "biterate" INTEGER NOT NULL,
    "samplerate" INTEGER NOT NULL,
    "like" BOOLEAN NOT NULL,
    "pinned" BOOLEAN NOT NULL,
    "updateDate" DATETIME NOT NULL,
    "moods" TEXT,
    "timings" TEXT,
    "genres" TEXT,
    "composers" TEXT,
    "remixArtists" TEXT,
    "artists" TEXT,
    "contentGroups" TEXT
);
INSERT INTO "new_Track" ("album", "artists", "biterate", "bpm", "composers", "contentGroups", "createdAt", "fileType", "genres", "id", "initialKey", "length", "like", "location", "moods", "pinned", "plays", "remixArtists", "samplerate", "size", "timings", "title", "updateDate", "year") SELECT "album", "artists", "biterate", "bpm", "composers", "contentGroups", "createdAt", "fileType", "genres", "id", "initialKey", "length", "like", "location", "moods", "pinned", "plays", "remixArtists", "samplerate", "size", "timings", "title", "updateDate", "year" FROM "Track";
DROP TABLE "Track";
ALTER TABLE "new_Track" RENAME TO "Track";
CREATE UNIQUE INDEX "Track_location_key" ON "Track"("location");
CREATE UNIQUE INDEX "Track_id_location_key" ON "Track"("id", "location");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
