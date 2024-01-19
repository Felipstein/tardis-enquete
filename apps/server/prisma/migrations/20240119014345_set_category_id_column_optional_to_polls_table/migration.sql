-- DropForeignKey
ALTER TABLE "polls" DROP CONSTRAINT "polls_category_id_fkey";

-- AlterTable
ALTER TABLE "polls" ALTER COLUMN "category_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "polls" ADD CONSTRAINT "polls_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
