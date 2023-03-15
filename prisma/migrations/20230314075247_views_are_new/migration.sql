-- CreateTable
CREATE TABLE "View" (
    "viewId" SERIAL NOT NULL,
    "component" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "View_pkey" PRIMARY KEY ("viewId")
);
