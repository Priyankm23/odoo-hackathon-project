import transporter, { accountEmail } from "../config/nodemailer.js";


export const sendWelcomeEmail = async (email, name) => {
  // Replace this with actual logic using Resend, Nodemailer, etc.
  console.log(`✅ Email sent to ${email} — Welcome ${name}!`);

   const mailOptions = {
    from: accountEmail,
    to: email,
    subject: "🎉 Welcome to our website!",
     html: `
      <div style="font-family: Arial, sans-serif; background-color: #f5f6fa; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; padding: 30px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
          <h2 style="color: #2f3640;">Hi ${name},</h2>
          <p style="font-size: 16px; color: #353b48;">
            🎉 Welcome to <strong>Subscription Tracker</strong>! <br />
            We're excited to help you take control of your subscriptions and never miss a renewal again.
          </p>
          <a href="https://your-subscription-tracker.com/login" style="display: inline-block; margin-top: 20px; background-color: #0097e6; color: white; padding: 12px 20px; border-radius: 5px; text-decoration: none; font-weight: bold;">
            Get Started
          </a>
          <p style="font-size: 14px; color: #718093; margin-top: 30px;">
            If you didn’t sign up for this, you can safely ignore this email.
          </p>
        </div>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.messageId);
  } catch (error) {
    console.error("❌ Failed to send email:", error.message);
  }
};

