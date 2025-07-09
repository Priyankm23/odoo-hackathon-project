import cron from 'node-cron';
import User from '../models/userSchema.js';
import { sendMonthlySummaryEmail } from '../utils/sendMonthlySummary.js';

// 🕒 Schedule to run at 10:00 AM on the 1st of every month
cron.schedule('30 9 9 * *', async () => {
  console.log("🔁 Running monthly summary email job...");

  try {
    const users = await User.find();

    for (const user of users) {
      // Assuming your sendMonthlySummaryEmail takes (email, name, summaryData)
      const summaryData = await getUserActivitySummary(user._id); // Fetch from DB or cache
      await sendMonthlySummaryEmail(user.email, user.name, summaryData);
    }

    console.log("✅ Monthly summary emails sent to all users.");
  } catch (err) {
    console.error("❌ Error sending summary emails:", err.message);
  }
});

// Stub for getting user summary (customize as needed)
const getUserActivitySummary = async (userId) => {
  // Replace this logic with your actual data aggregation
  const user=await User.find({userId});
  return {
    name: user.name,
    message: "check your report for your activity on website"
  };
};
