/*
  Warnings:

  - You are about to drop the column `moods` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `timings` on the `Track` table. All the data in the column will be lost.

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
    "biterate" TEXT,
    "samplerate" TEXT,
    "like" BOOLEAN NOT NULL,
    "pinned" BOOLEAN NOT NULL,
    "updateDate" DATETIME NOT NULL
);
INSERT INTO "new_Track" ("album", "biterate", "bpm", "createdAt", "fileType", "id", "initialKey", "length", "like", "location", "pinned", "plays", "samplerate", "size", "title", "updateDate", "year") SELECT "album", "biterate", "bpm", "createdAt", "fileType", "id", "initialKey", "length", "like", "location", "pinned", "plays", "samplerate", "size", "title", "updateDate", "year" FROM "Track";
DROP TABLE "Track";
ALTER TABLE "new_Track" RENAME TO "Track";
CREATE UNIQUE INDEX "Track_location_key" ON "Track"("location");
CREATE UNIQUE INDEX "Track_id_location_key" ON "Track"("id", "location");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
