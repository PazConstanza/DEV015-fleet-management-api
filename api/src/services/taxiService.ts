import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllTaxis = async (plate?: string, page = '1', limit = '10') => {
  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);
  
  const where: any = {};
  if (plate) where.plate = plate;

  return await prisma.taxis.findMany({
    where,
    skip: (pageNumber - 1) * limitNumber,
    take: limitNumber,
  });
};

export const getTaxiTrajectories = async (taxiId: number, date: string) => {
  const startDate = new Date(date);
  const endDate = new Date(startDate);
  endDate.setUTCHours(23, 59, 59, 999);

  return await prisma.taxis.findFirst({
    where: { id: taxiId },
    include: {
      trajectories: {
        where: {
          date: {
            gte: startDate,
            lte: endDate,
          },
        },
      },
    },
  });
};
