const { prisma } = require('../prisma/seed');
const cron = require('node-cron');

// Delete the expired session records from database at every 0:00 

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
