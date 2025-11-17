// api/bot.js
// Teams bot endpoint for Vercel using Bot Framework Adapter
// Responds with text or Adaptive Cards based on user input

const { BotFrameworkAdapter } = require("botbuilder");

// Adapter with credentials from Vercel environment variables
const adapter = new BotFrameworkAdapter({
  appId: process.env.MicrosoftAppId,
  appPassword: process.env.MicrosoftAppPassword
});

// Adaptive Card samples
const textCard = {
  type: "AdaptiveCard",
  version: "1.4",
  body: [
    { type: "TextBlock", text: "Hello Felix 👋", weight: "Bolder", size: "Medium" },
    { type: "TextBlock", text: "This is a text-based Adaptive Card.", wrap: true }
  ]
};

const tableCard = {
  type: "AdaptiveCard",
  version: "1.4",
  body: [
    { type: "TextBlock", text: "Team Attendance", weight: "Bolder", size: "Medium" },
    {
      type: "ColumnSet",
      columns: [
        { type: "Column", items: [{ type: "TextBlock", text: "Name", weight: "Bolder" }] },
        { type: "Column", items: [{ type: "TextBlock", text: "Status", weight: "Bolder" }] }
      ]
    },
    {
      type: "ColumnSet",
      columns: [
        { type: "Column", items: [{ type: "TextBlock", text: "Felix" }] },
        { type: "Column", items: [{ type: "TextBlock", text: "Present" }] }
      ]
    }
  ]
};

const chartCard = {
  type: "AdaptiveCard",
  version: "1.4",
  body: [
    { type: "TextBlock", text: "Sales Performance", weight: "Bolder", size: "Medium" },
    { type: "TextBlock", text: "Q1: 🔵🔵🔵🔵🔵", wrap: true },
    { type: "TextBlock", text: "Q2: 🔵🔵🔵🔵", wrap: true },
    { type: "TextBlock", text: "Q3: 🔵🔵🔵🔵🔵🔵", wrap: true }
  ]
};

// Vercel function handler
module.exports = async (req, res) => {
  await adapter.processActivity(req, res, async (context) => {
    if (context.activity.type === "message") {
      const text = (context.activity.text || "").toLowerCase().trim();

      let card;
      if (text.includes("text")) {
        card = textCard;
      } else if (text.includes("table")) {
        card = tableCard;
      } else if (text.includes("chart")) {
        card = chartCard;
      }

      if (card) {
        await context.sendActivity({
          attachments: [
            {
              contentType: "application/vnd.microsoft.card.adaptive",
              content: card
            }
          ]
        });
      } else {
        await context.sendActivity("Try: 'text', 'table', or 'chart'.");
      }
    } else if (context.activity.type === "conversationUpdate") {
      // Welcome message when bot is added
      if (context.activity.membersAdded?.some(m => m.id === context.activity.recipient.id)) {
        await context.sendActivity("Welcome! Send 'text', 'table', or 'chart'.");
      }
    }
  });
};
