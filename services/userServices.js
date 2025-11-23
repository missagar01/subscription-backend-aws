import pool from "../config/db.js";
import bcrypt from "bcrypt";

// FETCH USERS
export async function getAllUsersService() {
  const query = `
    SELECT id, username, name, email, role, last_login
    FROM users
    ORDER BY id DESC
  `;
  const result = await pool.query(query);
  return result.rows;
}

// CREATE USER
export async function createUserService({ username, name, email, password, role }) {
  const hashed = await bcrypt.hash(password, 10);

  const query = `
    INSERT INTO users (username, name, email, password, role)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, username, name, email, role, last_login
  `;

  const result = await pool.query(query, [
    username,
    name,
    email,
    hashed,
    role
  ]);

  return result.rows[0];
}

// UPDATE USER
export async function updateUserService({ username, name, email, password, role }) {
  let hashed = password;

  // Only hash if needed
  if (!password.startsWith("$2b$")) {
    hashed = await bcrypt.hash(password, 10);
  }

  const query = `
    UPDATE users
    SET name=$1, email=$2, password=$3, role=$4
    WHERE username=$5
    RETURNING id, username, name, email, role, last_login
  `;

  const result = await pool.query(query, [
    name,
    email,
    hashed,
    role,
    username
  ]);

  return result.rows[0];
}

// DELETE USER
export async function deleteUserService(username) {
  await pool.query("DELETE FROM users WHERE username=$1", [username]);
}
