-- CreateTable
CREATE TABLE "MailPaymentMethod" (
    "empId" INTEGER NOT NULL,
    "address" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "DirectPaymentMethod" (
    "empId" INTEGER NOT NULL,
    "bank" TEXT NOT NULL,
    "account" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "MailPaymentMethod_empId_key" ON "MailPaymentMethod"("empId");

-- CreateIndex
CREATE UNIQUE INDEX "DirectPaymentMethod_empId_key" ON "DirectPaymentMethod"("empId");
