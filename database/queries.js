import pool from "./pool.js";

// Create query method to get user by email
async function getUserByUsername(username) {
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
    username,
  ]);
  return rows;
}

// Create query method to get user by id
async function getUserById(userId) {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
    userId,
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

// Create query method to update a user's membership status
async function updateMemberShipStatus(userId) {
  await pool.query(
    "UPDATE users SET membership_status = 'member' WHERE id  = $1",
    [userId],
  );
}

export {
  insertMessage,
  insertUser,
  getUserByUsername,
  updateMemberShipStatus,
  getUserById,
};
