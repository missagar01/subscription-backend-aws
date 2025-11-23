import { loginService } from "../services/auth.service.js";

export async function login(req, res) {
  try {
    const { username, password } = req.body;

    const result = await loginService(username, password);

    if (!result)
      return res.status(400).json({ error: "Invalid username or password" });

    return res.json(result);
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
