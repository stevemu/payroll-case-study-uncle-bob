-- CreateTable
CREATE TABLE "HoldPaymentMethod" (
    "empId" INTEGER NOT NULL,
    "address" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "HoldPaymentMethod_empId_key" ON "HoldPaymentMethod"("empId");
