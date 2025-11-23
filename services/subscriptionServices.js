import pool from "../config/db.js";

export const insertSubscription = async (data) => {
  const query = `
    INSERT INTO subscription (
      timestamp, subscription_no, company_name, subscriber_name, 
      subscription_name, price, frequency, purpose
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
    RETURNING *;
  `;

  const values = [
    data.timestamp,
    data.subscriptionNo,
    data.companyName,
    data.subscriberName,
    data.subscriptionName,
    data.price,
    data.frequency,
    data.purpose,
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};

export const getAllSubscriptions = async () => {
  const result = await pool.query(
    "SELECT * FROM subscription ORDER BY id DESC"
  );
  return result.rows;
};


export const getLatestSubscriptionNumber = async () => {
  const result = await pool.query(`
    SELECT subscription_no 
    FROM subscription 
    ORDER BY id DESC 
    LIMIT 1
  `);

  return result.rows[0]?.subscription_no || null;
};
