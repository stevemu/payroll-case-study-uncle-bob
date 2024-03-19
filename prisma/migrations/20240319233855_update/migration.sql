/*
  Warnings:

  - A unique constraint covering the columns `[memberId,empId]` on the table `UnionMembership` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "UnionMembership_memberId_key";

-- CreateIndex
CREATE UNIQUE INDEX "UnionMembership_memberId_empId_key" ON "UnionMembership"("memberId", "empId");
