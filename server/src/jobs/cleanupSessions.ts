const { prisma } = require('../prisma/seed');
const cron = require('node-cron');

module.exports = () => {
  cron.schedule('0 0 * * *', async () => {
    console.log('Running a job at 00:00 to delete expired sessions');
    await prisma.session.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });
  });
};
