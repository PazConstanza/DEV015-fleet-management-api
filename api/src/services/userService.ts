import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

interface CreateUserInput {
    name: string;
    email: string;
    password: string;
}

export const createUser = async (input: CreateUserInput) => {
    return await prisma.user.create({
        data: input,
    });
};

export const getAllUsers = async (page: number, limit: number) => {
    return await prisma.user.findMany({
        skip: (page - 1) * limit,
        take: limit,
    });
};

export const updateUser = async (id: number, input: CreateUserInput) => {
    return await prisma.user.update({
        where: { id },
        data: input,
    });
};

export const deleteUser = async (id: number) => {
    return await prisma.user.delete({
        where: { id },
    });
};
