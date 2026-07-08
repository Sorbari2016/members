import { Client } from "pg";
import getDbConfig from "./config.js";

const pgConfig = getDbConfig();

const SQL = `
CREATE TABLE IF NOT EXISTS users (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    first_name VARCHAR(50) NOT NULL, 
    last_name VARCHAR(50) NOT NULL, 
    email VARCHAR(100) NOT NULL UNIQUE, 
    password VARCHAR(255) NOT NULL, 
    membership_status VARCHAR(50) DEFAULT 'non-member', 
    is_admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS messages (
    message_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    message_title VARCHAR(255) NOT NULL, 
    message_body TEXT, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO users (first_name, last_name, email, password) 
VALUES ('Clematins', 'Nwiibee', 'clematins@gmail.com', '12345'); 

INSERT INTO messages (message_title, message_body, user_id)
VALUES('Horny', 'I would like to fuck someone', 1); 

`;

async function createRelations() {
  console.log("Start...");
  const client = new Client(pgConfig);
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("Completed!");
}

createRelations();
