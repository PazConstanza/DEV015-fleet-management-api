-- CreateTable
CREATE TABLE "taxis" (
    "id" SERIAL NOT NULL,
    "plate" TEXT NOT NULL,

    CONSTRAINT "taxis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trajectories" (
    "id" SERIAL NOT NULL,
    "taxi_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "trajectories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "taxis_plate_key" ON "taxis"("plate");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "trajectories" ADD CONSTRAINT "trajectories_taxi_id_fkey" FOREIGN KEY ("taxi_id") REFERENCES "taxis"("id") ON DELETE CASCADE ON UPDATE CASCADE;
