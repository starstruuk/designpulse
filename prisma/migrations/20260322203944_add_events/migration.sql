-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('CONFERENCE', 'WORKSHOP', 'WEBINAR', 'MEETUP', 'HACKATHON', 'AWARD');

-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('UPCOMING', 'LIVE', 'ARCHIVED');

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "EventType" NOT NULL,
    "status" "EventStatus" NOT NULL DEFAULT 'UPCOMING',
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "image" TEXT,
    "isFree" BOOLEAN NOT NULL DEFAULT true,
    "price" TEXT,
    "attendees" INTEGER NOT NULL DEFAULT 0,
    "maxAttendees" INTEGER,
    "tags" TEXT[],
    "url" TEXT,
    "hostName" TEXT NOT NULL,
    "hostRole" TEXT NOT NULL,
    "hostAvatar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);
