import {
  insertUser,
  getUserByUsername,
  updateMemberShipStatus,
  getAllMessages,
} from "../database/queries.js";
import { getPassscode } from "../utilities/utility.js";
import "../authentication/auth.js";
import { validationResult, matchedData } from "express-validator";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import passport from "passport";

dotenv.config();

// Define salt round for hashing algorithm
const saltRound = parseInt(process.env.SECRETSALT);

// Create a controller to get the sign-up page
function getRegisterPage(req, res) {
  res.render("pages/forms/register", {
    title: "Register",
    formData: {},
    message: "",
  });
}

// Create controller to register a user
async function registerUser(req, res) {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      return res.status(400).render("pages/forms/register", {
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
      return res.render("pages/forms/register", {
        message: "User already exists. Try logging in.",
        formData: {},
      });
    }

    //   hash password
    const hashedPassword = await bcrypt.hash(password, saltRound);

    // Add user to database
    await insertUser(firstName, lastName, username, hashedPassword);

    res.redirect("/");
  } catch (error) {
    console.error(error);
  }
}

// Create method to get join the club page
async function getMembershipPage(req, res) {
  res.render("pages/forms/join-club", { message: "" });
}

// Create a controller to update a user's membership status
async function registerMember(req, res) {
  // gather errors, if any
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("pages/forms/join-club", {
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
}

// Create controller to get login page
async function getLoginPage(req, res) {
  res.render("pages/forms/login", {
    title: "Login",
    formData: {},
    message: "",
  });
}

// Create controller to login users
async function loginUser(req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    // check if there's a system or db error
    if (err) {
      return next(err);
    }

    // check if auth failed (wrong password or user not available)
    if (!user) {
      return res.status(401).render("pages/forms/login", {
        title: "Login",
        formData: { username: req.body.username },
        message: info.message || "Invalid Email address or password",
      });
    }

    // Establish a session via passport's internal logIn function
    req.logIn(user, (loginErr) => {
      if (loginErr) {
        return next(loginErr);
      }

      // successful auth
      res.redirect("/");
    });
  })(req, res, next); // invoke middleware function
}

// Create a controller to log out user
function logoutUser(req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
}

// exports
export {
  getRegisterPage,
  registerUser,
  getMembershipPage,
  registerMember,
  getLoginPage,
  loginUser,
  logoutUser,
};
