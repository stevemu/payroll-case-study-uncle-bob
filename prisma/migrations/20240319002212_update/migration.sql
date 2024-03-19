-- CreateTable
CREATE TABLE "SalesReceipt" (
    "empId" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "amount" REAL NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "SalesReceipt_empId_date_key" ON "SalesReceipt"("empId", "date");
