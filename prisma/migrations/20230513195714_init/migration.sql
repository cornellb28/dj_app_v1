/*
  Warnings:

  - You are about to drop the column `size` on the `TrackAttribute` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TrackAttribute" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
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
INSERT INTO "new_TrackAttribute" ("album", "bitrate", "bpm", "id", "initialKey", "length", "like", "pinned", "plays", "title", "trackId", "year") SELECT "album", "bitrate", "bpm", "id", "initialKey", "length", "like", "pinned", "plays", "title", "trackId", "year" FROM "TrackAttribute";
DROP TABLE "TrackAttribute";
ALTER TABLE "new_TrackAttribute" RENAME TO "TrackAttribute";
CREATE UNIQUE INDEX "TrackAttribute_trackId_key" ON "TrackAttribute"("trackId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
