-- CreateEnum
CREATE TYPE "user_roles" AS ENUM ('COMMON', 'ADMIN', 'DEVELOPER');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "user_roles" NOT NULL DEFAULT 'COMMON';
