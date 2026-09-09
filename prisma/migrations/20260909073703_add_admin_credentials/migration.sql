-- CreateTable
CREATE TABLE "AdminCredentials" (
    "id" TEXT NOT NULL DEFAULT 'main',
    "passwordHash" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminCredentials_pkey" PRIMARY KEY ("id")
);
