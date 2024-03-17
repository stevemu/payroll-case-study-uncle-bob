-- CreateTable
CREATE TABLE "CommissionedClassification" (
    "empId" INTEGER NOT NULL,
    "salary" REAL NOT NULL,
    "commissionRate" REAL NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "CommissionedClassification_empId_key" ON "CommissionedClassification"("empId");
