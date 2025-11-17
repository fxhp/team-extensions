// Minimal Hello World bot for Teams on Vercel
// Responds with plain text so you can confirm messages show up

export default async function handler(req, res) {
  // Log the incoming request for debugging
  console.log("Incoming request:", JSON.stringify(req.body, null, 2));

  // Always reply with a simple text message
  const responsePayload = {
    type: "message",
    text: "Hello world from my bot!"
  };

  // Log the outgoing response
  console.log("Outgoing response:", JSON.stringify(responsePayload, null, 2));

  // Send the response back to Teams
  res.status(200).json(responsePayload);
}
