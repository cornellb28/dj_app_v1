/*
  Warnings:

  - You are about to drop the column `samplerate` on the `Track` table. All the data in the column will be lost.

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
INSERT INTO "new_Track" ("album", "artists", "biterate", "bpm", "composers", "contentGroups", "createdAt", "fileType", "genres", "id", "initialKey", "length", "like", "location", "moods", "pinned", "plays", "remixArtists", "size", "timings", "title", "updateDate", "year") SELECT "album", "artists", "biterate", "bpm", "composers", "contentGroups", "createdAt", "fileType", "genres", "id", "initialKey", "length", "like", "location", "moods", "pinned", "plays", "remixArtists", "size", "timings", "title", "updateDate", "year" FROM "Track";
DROP TABLE "Track";
ALTER TABLE "new_Track" RENAME TO "Track";
CREATE UNIQUE INDEX "Track_location_key" ON "Track"("location");
CREATE UNIQUE INDEX "Track_id_location_key" ON "Track"("id", "location");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
