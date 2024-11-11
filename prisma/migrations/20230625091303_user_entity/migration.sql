/*
  Warnings:

  - You are about to drop the column `patientFileId` on the `ShootData` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ShootData" DROP CONSTRAINT "ShootData_patientFileId_fkey";

-- AlterTable
ALTER TABLE "ShootData" DROP COLUMN "patientFileId";

-- CreateTable
CREATE TABLE "PatientFileShootData" (
    "patientFileId" INTEGER NOT NULL,
    "shootDataId" INTEGER NOT NULL,

    CONSTRAINT "PatientFileShootData_pkey" PRIMARY KEY ("patientFileId","shootDataId")
);

-- AddForeignKey
ALTER TABLE "PatientFileShootData" ADD CONSTRAINT "PatientFileShootData_patientFileId_fkey" FOREIGN KEY ("patientFileId") REFERENCES "PatientFile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientFileShootData" ADD CONSTRAINT "PatientFileShootData_shootDataId_fkey" FOREIGN KEY ("shootDataId") REFERENCES "ShootData"("id") ON DELETE CASCADE ON UPDATE CASCADE;
