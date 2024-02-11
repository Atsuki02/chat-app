
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()


interface UserCreateData {
    email: string;
    username: string;
    passwordHash: string;
}
  
interface UserFindData {
    email: string;
}

  

async function createUser(data: UserCreateData) {
    return prisma.user.create({data})
}

async function findUserByEmail( email: UserFindData) {
    return prisma.user.findUnique({where: { email } })
}

async function createSession(userId: string) {
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    return prisma.session.create({ data: { userId, expiresAt }})
}

async function findSessionById(sessionId: string) {
    return prisma.session.findUnique({ where: { id: sessionId } });
}

async function findUserById(userId: string) {
    return prisma.user.findUnique({ where: { id: userId } });
}

async function deleteUserById(userId: string) {
    await prisma.session.deleteMany({
        where: {
            userId: userId,
        },
    });
    return prisma.user.delete({
        where: {
            id: userId,
        },
    });
}

async function deleteSessionById(sessionId: string) {
    return prisma.session.delete({
        where: {
            id: sessionId,
        },
    });
}


module.exports = {createUser, findUserByEmail, createSession, findSessionById, findUserById, deleteUserById, deleteSessionById}