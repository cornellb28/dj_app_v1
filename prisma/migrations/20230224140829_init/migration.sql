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
    "size" INTEGER NOT NULL,
    "year" TEXT,
    "plays" TEXT,
    "bitrate" INTEGER,
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
INSERT INTO "new_Track" ("album", "artists", "bitrate", "bpm", "composers", "contentGroups", "createdAt", "fileType", "genres", "id", "initialKey", "length", "like", "location", "moods", "pinned", "plays", "remixArtists", "size", "timings", "title", "updateDate", "year") SELECT "album", "artists", "bitrate", "bpm", "composers", "contentGroups", "createdAt", "fileType", "genres", "id", "initialKey", "length", "like", "location", "moods", "pinned", "plays", "remixArtists", "size", "timings", "title", "updateDate", "year" FROM "Track";
DROP TABLE "Track";
ALTER TABLE "new_Track" RENAME TO "Track";
CREATE UNIQUE INDEX "Track_location_key" ON "Track"("location");
CREATE UNIQUE INDEX "Track_id_location_key" ON "Track"("id", "location");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
