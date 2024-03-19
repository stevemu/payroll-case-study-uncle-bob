-- CreateTable
CREATE TABLE "UnionMembership" (
    "empId" INTEGER NOT NULL,
    "memberId" INTEGER NOT NULL,
    "dues" REAL NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UnionMembership_empId_memberId_key" ON "UnionMembership"("empId", "memberId");
