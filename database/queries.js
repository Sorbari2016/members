import pool from "./pool.js";

async function getUserByUsername(username) {
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
    username,
  ]);
  return rows;
}

// Create method to add a user to the db
async function insertUser(firstName, lastName, email, password) {
  await pool.query(
    `INSERT INTO users (first_name, last_name, email, password) 
     VALUES($1, $2, $3, $4)`,
    [firstName, lastName, email, password],
  );
}

// Create a method to add a message
async function insertMessage(messageTitle, messageText, userId) {
  await pool.query(
    `
    INSERT INTO messages (message_title, message_body
    VALUES($1, $2, $3)
    `,
    [messageText, messageText, userId],
  );
}

export { insertMessage, insertUser, getUserByUsername };
