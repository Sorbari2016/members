import { messages } from "../database/queries.js";

// Create a controller to render the homepage
async function getHomepage(req, res) {
  // get all the messages from the database
  const usersMessages = await messages.getMessages();

  // get user stored in session
  const user = req.user || null;

  res.render("pages/home", { messages: usersMessages, user: user });
}

export { getHomepage };
