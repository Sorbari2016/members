import { getMessageById, getUserById } from "../database/queries.js";
import { CustomNotFoundError, errorMessage } from "../errors/error.js";

// Create controller to get new message form
function getNewMessage(req, res) {
  res.render("pages/forms/new-message", {
    title: "Create new message",
    errorMessage: "",
  });
}

// Create controller to get edit message form
async function getEditMessage(req, res) {
  try {
    const messageId = parseInt(req.params["messageId"]);
    const message = await getMessageById(messageId);

    if (!message) {
      CustomNotFoundError("Message not found!");
    }

    res.render("pages/forms/edit-message", {
      title: "Edit message",
      message: message,
      errorMessage: "",
    });
  } catch (error) {
    console.error(error);
  }
}

export { getNewMessage, getEditMessage };
