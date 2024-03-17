-- CreateTable
CREATE TABLE "Employee" (
    "empId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "classification" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "HourlyClassification" (
    "empId" INTEGER NOT NULL,
    "rate" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "SalariedClassification" (
    "empId" INTEGER NOT NULL,
    "salary" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "CommissionedClassification" (
    "empId" INTEGER NOT NULL,
    "salary" REAL NOT NULL,
    "commissionRate" REAL NOT NULL
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
CREATE UNIQUE INDEX "HourlyClassification_empId_key" ON "HourlyClassification"("empId");

-- CreateIndex
CREATE UNIQUE INDEX "SalariedClassification_empId_key" ON "SalariedClassification"("empId");

-- CreateIndex
CREATE UNIQUE INDEX "CommissionedClassification_empId_key" ON "CommissionedClassification"("empId");

-- CreateIndex
CREATE UNIQUE INDEX "TimeCard_empId_date_key" ON "TimeCard"("empId", "date");
