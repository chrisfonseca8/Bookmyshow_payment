const cron = require('node-cron');
// seatRepo require moved inside the cron job to avoid circular dependency


function cronSession() {
  cron.schedule('*/5 * * * *', async () => {
    console.log(' Running seat cleanup cron every 5 miniutes');

    try {
      const seatRepo = require('../../repositories/seats');
      const result = await seatRepo.checkingTerminatedSession();

      console.log('Expired seats updated:', result);
    } catch (error) {
      console.error(' Error in cron job:', error);
    }
  });
}

module.exports = {
  cronSession
};