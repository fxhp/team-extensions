const { BotFrameworkAdapter } = require("botbuilder");

// Mask the secret: show first 4 and last 4 characters only
function maskSecret(secret) {
  if (!secret) return "NOT SET";
  if (secret.length <= 8) return "SET (too short to mask safely)";
  return `${secret.substring(0, 4)}...${secret.substring(secret.length - 4)} (length: ${secret.length})`;
}

// Log App ID and Secret (masked)
console.log("MicrosoftAppId:", process.env.MicrosoftAppId || "NOT SET");
console.log("MicrosoftAppPassword:", maskSecret(process.env.MicrosoftAppPassword));

// Adapter with credentials from Vercel environment variables
const adapter = new BotFrameworkAdapter({
  appId: process.env.MicrosoftAppId,
  appPassword: process.env.MicrosoftAppPassword
});

// Sample Adaptive Card
const textCard = {
  type: "AdaptiveCard",
  version: "1.4",
  body: [
    { type: "TextBlock", text: "Hello Felix 👋", weight: "Bolder", size: "Medium" },
    { type: "TextBlock", text: "This is a text-based Adaptive Card.", wrap: true }
  ]
};

module.exports = async (req, res) => {
  // Log incoming request
  console.log("Incoming request:", JSON.stringify(req.body, null, 2));

  await adapter.processActivity(req, res, async (context) => {
    if (context.activity.type === "message") {
      const text = (context.activity.text || "").toLowerCase().trim();

      let responsePayload;
      if (text.includes("text")) {
        responsePayload = {
          attachments: [
            {
              contentType: "application/vnd.microsoft.card.adaptive",
              content: textCard
            }
          ]
        };
      } else {
        responsePayload = { text: "Try: 'text' for a sample Adaptive Card." };
      }

      // Log outgoing response
      console.log("Outgoing response:", JSON.stringify(responsePayload, null, 2));

      await context.sendActivity(responsePayload);
    } else if (context.activity.type === "conversationUpdate") {
      if (context.activity.membersAdded?.some(m => m.id === context.activity.recipient.id)) {
        const welcome = "Welcome! Send 'text' to see a sample Adaptive Card.";
        console.log("Outgoing welcome response:", welcome);
        await context.sendActivity(welcome);
      }
    }
  });
};
