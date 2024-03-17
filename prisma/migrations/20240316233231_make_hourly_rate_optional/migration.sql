-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Employee" (
    "empId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "hourlyRate" REAL,
    "classification" TEXT NOT NULL
);
INSERT INTO "new_Employee" ("address", "classification", "empId", "hourlyRate", "name") SELECT "address", "classification", "empId", "hourlyRate", "name" FROM "Employee";
DROP TABLE "Employee";
ALTER TABLE "new_Employee" RENAME TO "Employee";
CREATE UNIQUE INDEX "Employee_empId_key" ON "Employee"("empId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
