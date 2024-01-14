-- CreateEnum
CREATE TYPE "FeedbackType" AS ENUM ('SUGGESTION', 'BUG', 'OTHER');

-- CreateEnum
CREATE TYPE "FeedbackStatus" AS ENUM ('OPEN', 'CLOSED');

-- CreateTable
CREATE TABLE "feedbacks" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "type" "FeedbackType" NOT NULL,
    "status" "FeedbackStatus" NOT NULL DEFAULT 'OPEN',
    "author_id" TEXT NOT NULL,

    CONSTRAINT "feedbacks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "feedbacks" ADD CONSTRAINT "feedbacks_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
