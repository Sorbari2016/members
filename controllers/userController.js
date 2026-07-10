import { insertUser, getUserByUsername } from "../database/queries.js";
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

// exports
export { getSignUpPage, registerUser };
