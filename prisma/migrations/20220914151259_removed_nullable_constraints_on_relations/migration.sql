/*
  Warnings:

  - Made the column `termId` on table `disciplines` required. This step will fail if there are existing NULL values in that column.
  - Made the column `disciplineId` on table `teachersDisciplines` required. This step will fail if there are existing NULL values in that column.
  - Made the column `teacherId` on table `teachersDisciplines` required. This step will fail if there are existing NULL values in that column.
  - Made the column `teachersDisciplineId` on table `tests` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "disciplines" ALTER COLUMN "termId" SET NOT NULL;

-- AlterTable
ALTER TABLE "teachersDisciplines" ALTER COLUMN "disciplineId" SET NOT NULL,
ALTER COLUMN "teacherId" SET NOT NULL;

-- AlterTable
ALTER TABLE "tests" ALTER COLUMN "teachersDisciplineId" SET NOT NULL;
