export default async function handler(req, res) {
  const commandId = req.body.commandId;

  let cardContent;

  if (commandId === "showText") {
    cardContent = {
      type: "AdaptiveCard",
      version: "1.4",
      body: [
        { type: "TextBlock", text: "Hello Felix 👋", weight: "Bolder", size: "Medium" },
        { type: "TextBlock", text: "This is a text-based Adaptive Card.", wrap: true }
      ]
    };
  } else if (commandId === "showTable") {
    cardContent = {
      type: "AdaptiveCard",
      version: "1.4",
      body: [
        { type: "TextBlock", text: "Team Attendance", weight: "Bolder", size: "Medium" },
        {
          type: "ColumnSet",
          columns: [
            { type: "Column", width: "stretch", items: [{ type: "TextBlock", text: "Name", weight: "Bolder" }] },
            { type: "Column", width: "stretch", items: [{ type: "TextBlock", text: "Status", weight: "Bolder" }] }
          ]
        },
        {
          type: "ColumnSet",
          columns: [
            { type: "Column", width: "stretch", items: [{ type: "TextBlock", text: "Felix" }] },
            { type: "Column", width: "stretch", items: [{ type: "TextBlock", text: "Present" }] }
          ]
        }
      ]
    };
  } else if (commandId === "showChart") {
    cardContent = {
      type: "AdaptiveCard",
      version: "1.4",
      body: [
        { type: "TextBlock", text: "Sales Performance", weight: "Bolder", size: "Medium" },
        { type: "TextBlock", text: "Q1: 🔵🔵🔵🔵🔵", wrap: true },
        { type: "TextBlock", text: "Q2: 🔵🔵🔵🔵", wrap: true },
        { type: "TextBlock", text: "Q3: 🔵🔵🔵🔵🔵🔵", wrap: true }
      ]
    };
  } else {
    cardContent = {
      type: "AdaptiveCard",
      version: "1.4",
      body: [
        { type: "TextBlock", text: "Unknown command.", weight: "Bolder", color: "Attention" }
      ]
    };
  }

  res.status(200).json({
    composeExtension: {
      type: "result",
      attachmentLayout: "list",
      attachments: [
        {
          contentType: "application/vnd.microsoft.card.adaptive",
          content: cardContent
        }
      ]
    }
  });
}
