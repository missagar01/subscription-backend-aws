import pool from "../config/db.js";
import { toCamel } from "../utils/caseConverter.js";

// Get all subscriptions (admin)
export async function getAllSubscriptionsService() {
  const result = await pool.query(`SELECT * FROM subscription ORDER BY id DESC`);
  return toCamel(result.rows);
}

// Get subscriptions for logged in user only
export async function getMySubscriptionsService(username) {
  const result = await pool.query(
    `SELECT * FROM subscription WHERE subscriber_name = $1 ORDER BY id DESC`,
    [username]
  );
  return toCamel(result.rows);
}

// Dashboard aggregated data
export async function getDashboardStatsService(username, role) {

  let query = `
    SELECT *
    FROM subscription
    ORDER BY id DESC
  `;

  // If user is not admin → filter by their name
  if (role !== "admin") {
    query = `
      SELECT *
      FROM subscription
      WHERE subscriber_name = '${username}'
      ORDER BY id DESC
    `;
  }

  const result = await pool.query(query);
  return toCamel(result.rows);
}
