-- CreateTable
CREATE TABLE "Users" (
    "Id" SERIAL NOT NULL,
    "Username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "PhoneNumber" INTEGER,
    "password" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Todo" (
    "Id" SERIAL NOT NULL,
    "Title" TEXT NOT NULL,
    "Description" TEXT,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
