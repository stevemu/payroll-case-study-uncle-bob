/*
  Warnings:

  - A unique constraint covering the columns `[memberId]` on the table `UnionMembership` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "UnionMembership_empId_memberId_key";

-- CreateIndex
CREATE UNIQUE INDEX "UnionMembership_memberId_key" ON "UnionMembership"("memberId");
