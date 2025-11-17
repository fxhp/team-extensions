// Minimal Teams bot endpoint for Vercel
// Responds with Adaptive Cards for "text", "table", "chart"
// Logs both request and response

export default async function handler(req, res) {
  // Log the incoming request body
  console.log("Incoming request from Teams:", JSON.stringify(req.body, null, 2));

  const text = (req.body.text || "").toLowerCase().trim();

  // Sample Adaptive Cards
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

  let cardContent;
  if (text.includes("text")) {
    cardContent = textCard;
  } else if (text.includes("table")) {
    cardContent = tableCard;
  } else if (text.includes("chart")) {
    cardContent = chartCard;
  } else {
    cardContent = {
      type: "AdaptiveCard",
      version: "1.4",
      body: [
        { type: "TextBlock", text: "Unknown command. Try 'text', 'table', or 'chart'.", color: "Attention" }
      ]
    };
  }

  // Build the response
  const responsePayload = {
    type: "message",
    attachments: [
      {
        contentType: "application/vnd.microsoft.card.adaptive",
        content: cardContent
      }
    ]
  };

  // Log the outgoing response
  console.log("Outgoing response to Teams:", JSON.stringify(responsePayload, null, 2));

  // Send the response
  res.status(200).json(responsePayload);
}
