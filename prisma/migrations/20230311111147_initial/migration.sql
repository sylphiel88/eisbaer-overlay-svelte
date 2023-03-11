-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "pin" TEXT NOT NULL,
    "refreshtoken" TEXT,
    "djId" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "DJ" (
    "djId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "gender" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER,

    CONSTRAINT "DJ_pkey" PRIMARY KEY ("djId")
);

-- CreateTable
CREATE TABLE "EventType" (
    "eventTypeId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "catchphrase" TEXT NOT NULL,

    CONSTRAINT "EventType_pkey" PRIMARY KEY ("eventTypeId")
);

-- CreateTable
CREATE TABLE "Event" (
    "eventId" SERIAL NOT NULL,
    "eventTypeId" INTEGER NOT NULL,
    "owName" TEXT,
    "owCatchPhrase" TEXT,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("eventId")
);

-- CreateTable
CREATE TABLE "Artist" (
    "artistId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("artistId")
);

-- CreateTable
CREATE TABLE "Album" (
    "albumId" SERIAL NOT NULL,
    "artistId" INTEGER NOT NULL,
    "year" INTEGER,
    "cover" TEXT,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("albumId")
);

-- CreateTable
CREATE TABLE "Song" (
    "songId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "albumId" INTEGER NOT NULL,

    CONSTRAINT "Song_pkey" PRIMARY KEY ("songId")
);

-- CreateTable
CREATE TABLE "SongOnEvent" (
    "eventId" INTEGER NOT NULL,
    "songId" INTEGER NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SongOnEvent_pkey" PRIMARY KEY ("eventId","songId")
);

-- CreateTable
CREATE TABLE "_DJToEventType" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_pin_key" ON "User"("pin");

-- CreateIndex
CREATE UNIQUE INDEX "User_refreshtoken_key" ON "User"("refreshtoken");

-- CreateIndex
CREATE UNIQUE INDEX "User_djId_key" ON "User"("djId");

-- CreateIndex
CREATE UNIQUE INDEX "DJ_userId_key" ON "DJ"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_DJToEventType_AB_unique" ON "_DJToEventType"("A", "B");

-- CreateIndex
CREATE INDEX "_DJToEventType_B_index" ON "_DJToEventType"("B");

-- AddForeignKey
ALTER TABLE "DJ" ADD CONSTRAINT "DJ_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_eventTypeId_fkey" FOREIGN KEY ("eventTypeId") REFERENCES "EventType"("eventTypeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("artistId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("albumId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SongOnEvent" ADD CONSTRAINT "SongOnEvent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("eventId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SongOnEvent" ADD CONSTRAINT "SongOnEvent_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("songId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DJToEventType" ADD CONSTRAINT "_DJToEventType_A_fkey" FOREIGN KEY ("A") REFERENCES "DJ"("djId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DJToEventType" ADD CONSTRAINT "_DJToEventType_B_fkey" FOREIGN KEY ("B") REFERENCES "EventType"("eventTypeId") ON DELETE CASCADE ON UPDATE CASCADE;
