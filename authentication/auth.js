import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { users } from "../database/queries.js";

// Create a passport local strategy(username and password)
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      // get user
      const user = await users.getUserByEmail(username);

      if (!user) {
        return done(null, false, { message: "Incorrect Email address" });
      }

      //   check if passpords match
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        // passwords do not match!
        return done(null, false, { message: "Incorrect password" });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

// serialize user, converts user obj -> id, and store in sessions
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// deserilize user, use id created in above, to create user obj
passport.deserializeUser(async (id, done) => {
  try {
    //get user
    const user = await users.getUserById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
