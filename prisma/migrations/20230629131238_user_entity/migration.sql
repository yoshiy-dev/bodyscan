-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lineId" TEXT,
ADD COLUMN     "lineName" TEXT;
