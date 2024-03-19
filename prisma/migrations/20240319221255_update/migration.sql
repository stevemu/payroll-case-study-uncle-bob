-- CreateTable
CREATE TABLE "ServiceCharge" (
    "memberId" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "amount" REAL NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ServiceCharge_memberId_date_key" ON "ServiceCharge"("memberId", "date");
