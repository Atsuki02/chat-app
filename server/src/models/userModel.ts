
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

async function findUserByEmail( email: string) {
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
    return prisma.user.findUnique({ 
        where: { id: userId }, 
        select: {
            id: true,
            username: true,
            email: true,
            isOnline: true,
            lastOnlineAt: true,
            profileImageUrl: true,
            darkMode: true,
            notifications: true,
            createdAt: true,
            updatedAt: true,
        } 
    });
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

async function toggleDarkMode(userId: string, darkMode: boolean) {
    return prisma.user.update({
      where: { id: userId },
      data: { darkMode },
    });
}

async function toggleNotifications(userId: string, notifications: boolean) {
    return prisma.user.update({
      where: { id: userId },
      data: { notifications },
    });
}

async function updateUserProfileImage(userId: string, imageUrl: string) {
    return prisma.user.update({
      where: { id: userId },
      data: { profileImageUrl: imageUrl },
    });
}

async function findAllUsers() {
    return prisma.user.findMany({
        select: {
            id: true,
            username: true,
            isOnline: true,
            lastOnlineAt: true,
            profileImageUrl: true,
            createdAt: true,
            updatedAt: true,
        }
    });
}

async function findFavoriteUsers(userId: string) {
    return prisma.favorite.findMany({
        where: {
            userId: userId
        },
        include: {
            favoriteUser: {
                select: {
                    id: true,
                    username: true,
                    isOnline: true,
                    lastOnlineAt: true,
                    profileImageUrl: true,
                    createdAt: true,
                    updatedAt: true,
                }
            }
        }
    });
}

async function addFavorite (userId: string, favoriteUserId: string) {
    return prisma.favorite.create({
        data: {
            userId,
            favoriteUserId,
        },
    });
}

async function removeFavorite (userId: string, favoriteUserId: string) {
    return prisma.favorite.deleteMany({
        where: {
            userId: userId,
            favoriteUserId: favoriteUserId,
        },
    });
}

module.exports = {createUser, findUserByEmail, createSession, findSessionById, findUserById, deleteUserById, deleteSessionById, toggleDarkMode, toggleNotifications, updateUserProfileImage, findAllUsers, findFavoriteUsers, addFavorite, removeFavorite}