import { getAllMessages } from "../database/queries.js";

// Create a controller to render the homepage
async function getHomepage(req, res) {
  // get all the messages from the database
  const messages = await getAllMessages();

  // get user stored in session
  const user = req.user || null;

  res.render("pages/home", { messages: messages, user: user });
}

export { getHomepage };
