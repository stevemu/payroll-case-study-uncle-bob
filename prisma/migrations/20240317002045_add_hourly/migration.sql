/*
  Warnings:

  - You are about to drop the column `hourlyRate` on the `Employee` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "HourlyClassification" (
    "empId" INTEGER NOT NULL,
    "rate" REAL NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Employee" (
    "empId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "classification" TEXT NOT NULL
);
INSERT INTO "new_Employee" ("address", "classification", "empId", "name") SELECT "address", "classification", "empId", "name" FROM "Employee";
DROP TABLE "Employee";
ALTER TABLE "new_Employee" RENAME TO "Employee";
CREATE UNIQUE INDEX "Employee_empId_key" ON "Employee"("empId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "HourlyClassification_empId_key" ON "HourlyClassification"("empId");
