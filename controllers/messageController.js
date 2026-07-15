import {
  getMessageById,
  getUserById,
  insertMessage,
  updateMessageById,
} from "../database/queries.js";
import { CustomNotFoundError, errorMessage } from "../errors/error.js";
import { validationResult, matchedData } from "express-validator";

// Create controller to get new message form
function getNewMessage(req, res) {
  console.log(req.user.id);
  res.render("pages/forms/new-message", {
    title: "Create new message",
    message: "",
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

// Create controller to send a message
function createMessage(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("pages/forms/new-message", {
      title: "Edit message",
      message: {
        message_title: req.body.messageTitle,
        mesasage_body: req.body.messageBody,
      },
      errors: errors.array(),
    });
  }

  const { messageTitle, messageBody } = matchedData(req);

  // Get id of user auth, stored in session
  const userId = req.user.id;

  insertMessage(messageTitle, messageBody, userId);

  res.redirect("/");
}

// Create method to update message
async function updateMessage(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("pages/forms/edit-message", {
      title: "Edit message",
      message: {
        message_title: req.body.messageTitle,
        message_body: req.body.messageBody,
      },
      errors: errors.array(),
    });
  }

  const { messageTitle, messageBody } = matchedData(req);

  // Get previous data
  const messageId = parseInt(req.params["messageId"]);
  const message = await getMessageById(messageId);

  // store incoming data or previous data
  const updatedData = {
    message_title: messageTitle ?? message.message_title,
    message_body: messageBody ?? message.message_body,
  };

  // update Message
  await updateMessageById(
    updatedData.message_title,
    updatedData.message_body,
    messageId,
  );

  res.redirect("/");
}

export { getNewMessage, getEditMessage, createMessage, updateMessage };
