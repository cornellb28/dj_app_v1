/*
  Warnings:

  - You are about to drop the column `contentGroups` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Track` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TrackAttribute" ADD COLUMN "title" TEXT;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Track" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "location" TEXT NOT NULL,
    "updateDate" DATETIME NOT NULL
);
INSERT INTO "new_Track" ("createdAt", "id", "location", "updateDate") SELECT "createdAt", "id", "location", "updateDate" FROM "Track";
DROP TABLE "Track";
ALTER TABLE "new_Track" RENAME TO "Track";
CREATE UNIQUE INDEX "Track_location_key" ON "Track"("location");
CREATE UNIQUE INDEX "Track_id_location_key" ON "Track"("id", "location");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
