import transporter, { accountEmail } from '../config/nodemailer.js'; // Extract your transporter if reused

export const sendMonthlySummaryEmail = async (email, name, summary) => {
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; background-color: #f5f6fa; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; padding: 30px;">
        <h2 style="color: #2f3640;">Hi ${name},</h2>
        <p style="font-size: 16px; color: #353b48;">Here’s your activity summary for this month:</p>
        <ul style="font-size: 15px;">
          <li><strong>Active Subscriptions:</strong> ${summary.activeSubscriptions}</li>
          <li><strong>Cancelled:</strong> ${summary.cancelled}</li>
          <li><strong>Upcoming Payments:</strong></li>
          <ul>
            ${summary.upcomingPayments.map(p => `<li>${p}</li>`).join('')}
          </ul>
        </ul>
        <p style="margin-top: 30px; font-size: 14px; color: #718093;">
          See you next month!
        </p>
      </div>
    </div>
  `;

  const mailOptions = {
    from: accountEmail,
    to: email,
    subject: "📊 Your Monthly Subscription Summary",
    html: htmlContent,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`📨 Summary sent to ${email}`);
  } catch (error) {
    console.error(`❌ Email to ${email} failed:`, error.message);
  }
};
