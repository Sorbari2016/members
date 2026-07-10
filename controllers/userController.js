import {
  insertUser,
  getUserByUsername,
  updateMemberShipStatus,
} from "../database/queries.js";
import { getPassscode } from "../utilities/utility.js";
import { validationResult, matchedData } from "express-validator";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

// Define salt round for hashing algorithm
const saltRound = parseInt(process.env.SECRETSALT);

// Create a controller to get the sign-up page
async function getSignUpPage(req, res) {
  res.render("pages/sign-up", { formData: {}, messages: "" });
}

// Create controller to register a user
async function registerUser(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("pages/sign-up", {
      formData: {
        title: "Login Page",
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.username,
      },
      message: "",
      errors: errors.array(),
    });
  }

  // ** using username cause of passport
  const { firstName, lastName, username, password } = matchedData(req);
  console.log(username);

  // Check if user already exists
  const result = await getUserByUsername(username);

  // ** matching passwords (password & confirm password) handled by validationResult

  if (result.length > 0) {
    return res.render("pages/sign-up", {
      message: "User already exists. Try logging in.",
      formData: {},
    });
  }

  //   hash password
  const hashedPassword = await bcrypt.hash(password, saltRound);

  // Add user to database
  await insertUser(firstName, lastName, username, hashedPassword);

  res.redirect("/");
}

// Create method to get join the club page
async function getMembershipPage(req, res) {
  res.render("pages/join-club", { message: "" });
}

// Create a controller to update a user's membership status
async function registerMember(req, res) {
  // gather errors, if any
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("pages/join-club", {
      message: "",
      errors: errors.array(),
    });
  }

  // check if passcode is correct
  const { passcode } = matchedData(req);
  const secretPasscode = getPassscode();

  if (passcode !== secretPasscode) {
    return res.render("pages/join-club", {
      message: "Incorrect secret passcode",
    });
  }

  // update user's status
  const userId = parseInt(req.params["id"]);
  await updateMemberShipStatus(userId);
}

// exports
export { getSignUpPage, registerUser, getMembershipPage, registerMember };
