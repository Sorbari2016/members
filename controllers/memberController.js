import { updateMemberShipStatus } from "../database/queries.js";
import { validationResult, matchedData } from "express-validator";
import { getPassscode } from "../utilities/utility.js";

// Create method to get join the club page
async function getMembershipPage(req, res) {
  res.render("pages/forms/join-club", {
    title: "Become A Member",
    message: "",
    user: req.user,
  });
}

// Create a controller to update a user's membership status
async function registerMember(req, res) {
  // gather errors, if any
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("pages/forms/join-club", {
      title: "Become A Member",
      message: "",
      errors: errors.array(),
    });
  }

  // check if passcode is correct
  const { passcode } = matchedData(req);
  const secretPasscode = getPassscode();

  if (passcode !== secretPasscode) {
    return res.render("pages/forms/join-club", {
      message: "Incorrect secret passcode",
    });
  }

  // update user's status
  const userId = parseInt(req.params["id"]);
  await updateMemberShipStatus(userId);

  res.redirect("/");
}

export { getMembershipPage, registerMember };
