const { BotFrameworkAdapter, MemoryStorage, ConversationState } = require('botbuilder');

// Adapter with Teams credentials (set in Vercel env vars)
const adapter = new BotFrameworkAdapter({
  appId: process.env.MicrosoftAppId,
  appPassword: process.env.MicrosoftAppPassword
});

// Optional: conversation state
const conversationState = new ConversationState(new MemoryStorage());

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
    const text = (context.activity.text || '').toLowerCase().trim();

    if (context.activity.type === 'message') {
      let card = null;

      if (text.includes('text')) {
        card = textCard;
      } else if (text.includes('table')) {
        card = tableCard;
      } else if (text.includes('chart')) {
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
        await context.sendActivity("Try: “text”, “table”, or “chart”.");
      }

      await conversationState.saveChanges(context);
    } else if (context.activity.type === 'conversationUpdate') {
      // Welcome in 1:1 chat
      if (context.activity.membersAdded?.some(m => m.id === context.activity.recipient.id)) {
        await context.sendActivity("Welcome! Send “text”, “table”, or “chart”.");
      }
    } else {
      await context.sendActivity("Ready. Send “text”, “table”, or “chart”.");
    }
  });
};
