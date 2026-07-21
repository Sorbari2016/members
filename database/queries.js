import pool from "./pool.js";

// Create a Data Access Object pattern, instead of individual query functions

// USER
class User {
  constructor(pool) {
    this.pool = pool;
  }

  // change getUserByUsername -> getUserByEmail, get user by email
  async getUserByEmail(email) {
    const { rows } = await this.pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
    );
    return rows[0] || null;
  }

  // get user by id
  async getUserById(userId) {
    const { rows } = await this.pool.query(
      "SELECT * FROM users WHERE id = $1",
      [userId],
    );
    return rows[0] || null;
  }

  // add user to db
  async insertUser({ firstName, lastName, email, password }) {
    await this.pool.query(
      `INSERT INTO users (first_name, last_name, email, password) 
     VALUES($1, $2, $3, $4)`,
      [firstName, lastName, email, password],
    );
  }

  // update a user details
  async modifyUser(userId, { firstName, lastName, email }) {
    await this.pool.query(
      `
    UPDATE users
    SET first_name = $1, 
        last_name = $2, 
        email = $3
    WHERE id = $4
    `,
      [firstName, lastName, email, userId],
    );
  }

  // make user member
  async updateMemberShipStatus(userId) {
    await this.pool.query(
      "UPDATE users SET membership_status = 'member' WHERE id  = $1",
      [userId],
    );
  }

  // make user admin
  async updateAdminStatus(userId) {
    await this.pool.query("UPDATE users SET is_admin = TRUE WHERE id = $1", [
      userId,
    ]);
  }
}

// MESSAGE
class Message {
  constructor(pool) {
    this.pool = pool;
  }

  // change getAllMessages -> getMessages, get all messages
  async getMessages() {
    const { rows } = await this.pool.query(`
    SELECT m.*, 
    CONCAT(u.first_name, ' ',u.last_name) AS author, 
    u.is_admin, 
    u.membership_status
    FROM messages AS m
    JOIN users AS u ON id = m.user_id
    `);
    return rows;
  }

  // get a message by id
  async getMessageById(messageId) {
    const { rows } = await this.pool.query(
      `
    SELECT * 
    FROM messages
    WHERE message_id = $1
    `,
      [messageId],
    );
    return rows[0];
  }

  // add new message to db
  async insertMessage(messageTitle, messageText, userId) {
    await this.pool.query(
      `
    INSERT INTO messages (message_title, message_body, user_id)
    VALUES($1, $2, $3)
    `,
      [messageTitle, messageText, userId],
    );
  }

  // update existing message
  async updateMessageById(messageTitle, messageText, messageId) {
    await this.pool.query(
      `UPDATE messages SET message_title = $1, 
     message_body = $2
     WHERE message_id = $3
    `,
      [messageTitle, messageText, messageId],
    );
  }

  // remove message from db
  async removeMessage(messageId) {
    await this.pool.query("DELETE FROM messages WHERE message_id = $1", [
      messageId,
    ]);
  }
}

export const users = new User(pool);
export const messages = new Message(pool);
