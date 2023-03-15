/*
  Warnings:

  - Added the required column `type` to the `View` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ViewType" AS ENUM ('VIDEO', 'YOUTUBE', 'COMPONENT');

-- AlterTable
ALTER TABLE "View" ADD COLUMN     "filename" TEXT,
ADD COLUMN     "type" "ViewType" NOT NULL,
ADD COLUMN     "url" TEXT;
