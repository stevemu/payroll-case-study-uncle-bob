/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Employee" (
    "empId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "hourlyRate" REAL NOT NULL,
    "classification" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TimeCard" (
    "empId" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "hours" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_empId_key" ON "Employee"("empId");

-- CreateIndex
CREATE UNIQUE INDEX "TimeCard_empId_date_key" ON "TimeCard"("empId", "date");
