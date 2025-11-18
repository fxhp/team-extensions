const { BotFrameworkAdapter } = require('botbuilder');

// Create adapter with App ID + secret from environment variables
const adapter = new BotFrameworkAdapter({
  appId: process.env.MicrosoftAppId,
  appPassword: process.env.MicrosoftAppPassword
});

// Error handler with logging
adapter.onTurnError = async (context, error) => {
  console.error("❌ Bot error:", error);
  await context.sendActivity("Oops, something went wrong.");
};

// Simple bot logic
async function handleTurn(context) {
  if (context.activity.type === 'message') {
    console.log("📩 Incoming message:", context.activity.text);
    console.log("👤 From:", context.activity.from);

    await context.sendActivity(`Hello ${context.activity.from.name}, I am alive on Vercel!`);
  } else {
    console.log("ℹ️ Non-message activity received:", context.activity.type);
  }
}

// Vercel serverless function handler
module.exports = async (req, res) => {
  console.log("➡️ Request received at /api/messages");
  await adapter.processActivity(req, res, async (context) => {
    await handleTurn(context);
  });
};
