-- AlterTable
ALTER TABLE "View" ADD COLUMN     "allowForEveryOne" BOOLEAN DEFAULT false,
ADD COLUMN     "allowOnlyAdmin" BOOLEAN DEFAULT false;
