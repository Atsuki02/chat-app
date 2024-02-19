const cron = require('node-cron');
const { markUsersOffline } = require('../models/userModel');

module.exports = () => {
    cron.schedule('* * * * *', async () => {
        try {
            await markUsersOffline();
            console.log('Successfully marked users offline');
        } catch (error) {
            console.error('Error marking users offline:', error);
        }
    });
} 