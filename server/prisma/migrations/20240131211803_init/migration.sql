-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PreSignUpToken" (
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "credential_id" TEXT NOT NULL,
    "created_time" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PreSignUpToken_email_key" ON "PreSignUpToken"("email");
