import { body } from "express-validator";
import { errorMessage } from "../errors/error.js";

const validateUser = () => {
  return [
    body("frstName")
      .trim()
      .isAlpha()
      .withMessage(errorMessage.alphaErr("First name"))
      .isLength({ min: 2, max: 50 })
      .withMessage(errorMessage.lengthErr("First name", 2, 50)), // aligns with db constraint
    body("lastName")
      .trim()
      .isAlpha()
      .withMessage(errorMessage.alphaErr("Last name"))
      .isLength({ min: 2, max: 50 })
      .withMessage(ErrorMessage.lengthErr("Last name", 2, 50)),
    body("username")
      .trim()
      .isEmail()
      .withMessage(errorMessage.emailErr())
      .notEmpty()
      .withMessage(errorMessage.requiredErr("Email"))
      .normalizeEmail(),
    body("password")
      .trim()
      .notEmpty()
      .withMessage(errorMessage.requiredErr("Password"))
      .isLength({ min: 8 })
      .withMessage(errorMessage.lengthMinErr("Password", 8))
      .matches(/[A-Z]/)
      .withMessage(errorMessage.atleastErr("Password", "uppercase letter"))
      .matches(/[a-z]/)
      .withMessage(errorMessage.atleastErr("Password", "lowercase letter"))
      .matches(/[0-9]/)
      .withMessage(errorMessage.atleastErr("Password", "number"))
      .matches(/[@$!%*?&]/)
      .withMessage(
        errorMessage.atleastErr("Password", "special character (@$!%*?&)"),
      ),
    body("confirmPassword")
      .trim()
      .notEmpty()
      .withMessage(errorMessage.confirmErr("password"))
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error(errorMessage.mismatchErr("Password"));
        }
        return true;
      }),
  ];
};

const validateMessage = () => {
  return [
    body("messageTitle")
      .trim()
      .notEmpty()
      .withMessage(errorMessage.requiredErr("title"))
      .isLength({ max: 255 })
      .withMessage(errorMessage.lengthMaxErr("Title", 255))
      .escape(),
    body("messageBody")
      .trim()
      .isLength({ max: 500 })
      .withMessage(errorMessage.lengthMaxErr("Message", 500))
      .escape(),
  ];
};

export { validateUser, validateMessage };
