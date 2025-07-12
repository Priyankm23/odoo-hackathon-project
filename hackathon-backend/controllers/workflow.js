import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");

import User from "../models/User.js";
import { sendWelcomeEmail } from "../utils/sendWelcomeEmails.js";

export const sendWelcome = serve(async (context) => {
  const userId = context.requestPayload.userId;

  const user = await fetchUser(context, userId);
  if (!user) {
    console.log(`User ${userId} not found`);
    return;
  }

  await context.run("send welcome email", async () => {
    console.log(`Sending welcome email to ${user.email}`);
    await sendWelcomeEmail(user.email, user.name);
  });
});

const fetchUser = async (context, userId) => {
  return await context.run("fetch user", async () => {
    const user = await User.findById(userId);
    return user?.toObject?.() ?? user ?? null;
  });
};
