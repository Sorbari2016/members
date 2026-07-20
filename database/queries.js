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

// Create query method to update a user's membership status
async function updateMemberShipStatus(userId) {
  await pool.query(
    "UPDATE users SET membership_status = 'member' WHERE id  = $1",
    [userId],
  );
}

async function updateAdminStatus(userId) {
  await pool.query("UPDATE users SET is_admin = TRUE WHERE id = $1", [userId]);
}

// Message Queriess

// Create query method to get all messages
async function getAllMessages() {
  const { rows } = await pool.query(`
    SELECT m.*, 
    CONCAT(u.first_name, ' ',u.last_name) AS author, 
    u.is_admin, 
    u.membership_status
    FROM messages AS m
    JOIN users AS u ON id = m.user_id
    `);
  return rows;
}

// Create query method to get a message by Id
async function getMessageById(messageId) {
  const { rows } = await pool.query(
    `
    SELECT * 
    FROM messages
    WHERE message_id = $1
    `,
    [messageId],
  );
  return rows[0];
}

// Create a method to add a message
async function insertMessage(messageTitle, messageText, userId) {
  await pool.query(
    `
    INSERT INTO messages (message_title, message_body, user_id)
    VALUES($1, $2, $3)
    `,
    [messageTitle, messageText, userId],
  );
}

// Create a query method to update a message
async function updateMessageById(messageTitle, messageText, messageId) {
  await pool.query(
    `UPDATE messages SET message_title = $1, 
     message_body = $2
     WHERE message_id = $3
    `,
    [messageTitle, messageText, messageId],
  );
}

export {
  insertMessage,
  insertUser,
  getUserByUsername,
  updateMemberShipStatus,
  getUserById,
  getAllMessages,
  getMessageById,
  updateMessageById,
  updateAdminStatus,
};
