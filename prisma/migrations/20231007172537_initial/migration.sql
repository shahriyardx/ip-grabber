-- CreateTable
CREATE TABLE "RegisterIp" (
    "id" TEXT NOT NULL,
    "req_id" TEXT NOT NULL,
    "ip" TEXT NOT NULL DEFAULT '',
    "fulfilled" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "RegisterIp_pkey" PRIMARY KEY ("id")
);
