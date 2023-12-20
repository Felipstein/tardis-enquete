-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "access_token" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "expires_in" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
