-- CreateTable
CREATE TABLE "SalariedClassification" (
    "empId" INTEGER NOT NULL,
    "salary" REAL NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "SalariedClassification_empId_key" ON "SalariedClassification"("empId");
